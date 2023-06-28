import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dubstep from "./pages/Dubstep";
import Prompt from "./pages/Options/Prompt";

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
        <Route path="/" element={<Dubstep />} />
        <Route path="/options/prompt" element={<Prompt />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
