import { Navigate } from "react-router-dom";
import { getRandomVideo } from "../../interfaces/Video";

function Forwarder() {
  return <Navigate to={`/${getRandomVideo()}`} replace />;
}

export default Forwarder;
