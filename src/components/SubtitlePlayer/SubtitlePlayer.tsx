import React from 'react';
import { Subtext } from '../../interfaces/Subtext';
import Subtitle from '../Subtitle/Subtitle';

interface SubtitlePlayerProps {
  timestamp: number;
  subtexts: Subtext[];
}

const ms = (seconds: number) => Math.floor(seconds * 1000);

const SubtitlePlayer: React.FC<SubtitlePlayerProps> = ({ timestamp, subtexts }) => {
  const now = timestamp;
  const current = subtexts.findIndex((s) => now >= ms(s.start) && now <= ms(s.end));
  // in a gap between two subtitles, announce the upcoming one
  const next = current >= 0 ? current + 1 : subtexts.findIndex((s) => ms(s.start) > now);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 space-y-1 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-4 pt-12 text-center text-base font-bold sm:px-8 sm:pb-6 sm:text-2xl lg:text-3xl">
      {current >= 0 && <Subtitle key={current} subtext={subtexts[current]} />}
      {next >= 0 && next < subtexts.length && (
        <Subtitle key={next} subtext={subtexts[next]} deactivated />
      )}
    </div>
  );
};

export default SubtitlePlayer;
