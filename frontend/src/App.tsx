import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dubstep from "./pages/Dubstep";
import Prompt from "./pages/Options/Prompt";
import Playlist from "./pages/Options/Playlist";
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
