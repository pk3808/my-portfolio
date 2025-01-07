import React, { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import ToggleButton from "./components/ToggleButton";
import "./App.css";
import SocialMediaIcons from "./components/SocialMediaIcons";
import Snowfall from "react-snowfall";
// import {snow} from "../public/images/snow.png"

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const location = useLocation();
  const isGameScreen = location.pathname === "/game";
  const isSplashScreen = location.pathname === "/";

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Snowfall
  snowflakeCount={25} // Adjust the number of snowflakes
  color={darkMode ? "#F0FFFF" : "#5F9EA0"} // Adjust color based on theme
  // images = {"../images/snow.png"}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh", // Full viewport height
    zIndex: 9999,
    pointerEvents: "none", // Ensure it doesn't block interactions
  }}
/>
      {!isGameScreen && !isSplashScreen && (
        <>
          <SocialMediaIcons darkMode={darkMode} />
          <ToggleButton darkMode={darkMode} toggleTheme={toggleTheme} />
          {console.log("Rendering NavBar with darkMode:", darkMode)}
          <NavBar darkMode={darkMode} /> {/* Directly pass darkMode */}
        </>
      )}
      <AppRoutes darkMode={darkMode} />
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
