// src/pages/Game.js
import React, { useState } from "react";
import GameSplash from "../components/gameSplash";
import BrickBreakerGame from "../games/BrickBreaker";
const Game = ({ darkMode }) => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashDismiss = () => {
    setShowSplash(false); // Hide the splash screen when dismissed
  };

  return (
    <div className="container ">
      {showSplash ? (
        <GameSplash onDismiss={handleSplashDismiss} />
      ) : (
        <BrickBreakerGame darkMode={darkMode} />
      )}
    </div>
  );
};

export default Game;
