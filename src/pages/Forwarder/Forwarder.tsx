import { Navigate } from "react-router-dom";
import { Videos } from "../../interfaces/Video";

function Forwarder() {
  return <Navigate to={`/${Videos[0].id}`} replace />;
}

export default Forwarder;
