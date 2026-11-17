import { Routes, Route } from "react-router-dom";

import Forwarder from "./pages/Forwarder/Forwarder";
import Player from "./pages/Player/Player";

function App() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
      <Routes>
        <Route path="/" element={<Forwarder />} />
        <Route path="/:video/" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
