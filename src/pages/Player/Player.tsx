import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { Videos } from "../../interfaces/Video";
import Forwarder from "../Forwarder/Forwarder";
import Page from "../Page/Page";

function Player() {
  const { video } = useParams();

  if (!video || !Videos.some((v) => v.id === video)) {
    return <Forwarder />;
  }

  return (
    <Page>
      <VideoPlayer videoId={video} />
    </Page>
  );
}

export default Player;
