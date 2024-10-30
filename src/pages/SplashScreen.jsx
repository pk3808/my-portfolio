// SplashScreen.js
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader"; // Your custom loader component
import "../App.css";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";

const SplashScreen = ({ onSelectMode }) => {
    const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Show options after 1.5 seconds
    const timer = setTimeout(() => setShowOptions(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-screen">
      {!showOptions ? (
        <Loader /> // Show loader initially
      ) : (
        <div className="mode-selection">
          <button onClick={() => navigate('/home')} className="mode-button">
            Default Mode
          </button>
          <button onClick={() => navigate('/game')} className="mode-button">
            Game Mode
          </button>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
