import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dubstep from "./pages/Dubstep";
import Prompt from "./pages/Options/Prompt";
import Playlist from "./pages/Options/Playlist";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    if (document && document.querySelector("html")) {
      const doc = document.querySelector("html");
      if (doc) {
        doc.style.scrollBehavior = "auto";
        window.scroll({ top: 0 });
        doc.style.scrollBehavior = "";
      }
    }
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dubstep />} />
          <Route path="/options/prompt" element={<Prompt />} />
          <Route path="/options/playlist" element={<Playlist />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
