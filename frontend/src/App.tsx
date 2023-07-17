import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";

import Login from "./pages/Login";
import Dubstep from "./pages/Dubstep";
import Prompt from "./pages/Options/Prompt";
import Playlist from "./pages/Options/Playlist";
import NewPlaylist from "./pages/NewPlaylist";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dubstep />} />
          <Route path="/options/prompt" element={<Prompt />} />
          <Route path="/options/playlist" element={<Playlist />} />
          <Route path="/playlist" element={<NewPlaylist />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
