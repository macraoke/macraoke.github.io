import parseSRT from "parse-srt";
import React, { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Subtext, SUBTEXT_DURATION } from '../../interfaces/Subtext';
import SubtitlePlayer from '../SubtitlePlayer/SubtitlePlayer';

interface VideoPlayerProps {
  videoId: string;
}

const UPDATE_INTERVAL = 200;

const formatTime = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const [timestamp, setTimestamp] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [subtexts, setSubtexts] = useState<Subtext[]>([]);
  const [player, setPlayer] = useState<YouTubePlayer | undefined>(undefined);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setSubtexts([]);
    setTimestamp(0);
    setDuration(0);
    fetch(`${import.meta.env.BASE_URL}subtitles/${props.videoId}.srt`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        const loadedSubtexts = parseSRT(text) as Subtext[];
        if (cancelled || loadedSubtexts.length === 0) return;
        const delay = SUBTEXT_DURATION / 1000;
        const first321subtext: Subtext = {
          id: 0,
          start: loadedSubtexts[0].start - 1 - 2 * SUBTEXT_DURATION / 1000,
          end: loadedSubtexts[0].start - delay,
          text: "(3, 2, 1)"
        };
        setSubtexts([first321subtext, ...loadedSubtexts]);
      })
      .catch((error) => console.error("Could not load subtitles", error));
    return () => { cancelled = true; };
  }, [props.videoId]);

  // poll the player position while the video is playing
  useEffect(() => {
    if (!player || !playing) return;
    const tick = () => setTimestamp(Math.ceil(player.getCurrentTime() * 1000));
    tick();
    const id = setInterval(tick, UPDATE_INTERVAL);
    return () => clearInterval(id);
  }, [player, playing]);

  const togglePlay = () => {
    if (!player) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  };

  // space bar toggles play / pause
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      const target = event.target as HTMLElement;
      if (["INPUT", "BUTTON", "A", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
      event.preventDefault();
      togglePlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onVideoStateChange = (event: YouTubeEvent) => {
    const target: YouTubePlayer = event.target;
    setPlayer(target);
    setPlaying(event.data === YouTube.PlayerState.PLAYING);
    const videoDuration = target.getDuration() * 1000;
    if (videoDuration > 0) setDuration(videoDuration);
    setTimestamp(Math.ceil(target.getCurrentTime() * 1000));
  };

  const onSeekerUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toTimestamp = parseInt(event.target.value);
    player?.seekTo(toTimestamp / 1000, true);
    setTimestamp(toTimestamp);
  };

  return (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl shadow-pink-500/10 ring-1 ring-white/10">
        <YouTube
          videoId={props.videoId}
          className="absolute inset-0"
          iframeClassName="h-full w-full"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              controls: 0,
              cc_load_policy: 3,
              iv_load_policy: 3,
              rel: 0,
            },
          }}
          onReady={(event: YouTubeEvent) => setPlayer(event.target)}
          onStateChange={onVideoStateChange}
        />
        {!!player && subtexts.length > 0 && (
          <SubtitlePlayer timestamp={timestamp + SUBTEXT_DURATION} subtexts={subtexts} />
        )}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className="btn min-w-[7.5rem] justify-center"
          onClick={togglePlay}
          disabled={!player}
        >
          {playing ? "⏸ Pause" : "▶ Lecture"}
        </button>
        <span className="w-24 text-sm tabular-nums text-zinc-400">
          {formatTime(timestamp)} / {formatTime(duration)}
        </span>
        <input
          type="range"
          aria-label="Position dans la vidéo"
          className="h-2 min-w-0 flex-1 cursor-pointer accent-pink-400"
          min={0}
          max={duration}
          value={timestamp}
          onChange={onSeekerUpdate}
          disabled={!player}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
