import React, { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import ToggleButton from "./components/ToggleButton";
import "./App.css";
import SocialMediaIcons from "./components/SocialMediaIcons";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const location = useLocation();
  const isGameScreen = location.pathname === "/game";

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {!isGameScreen && (
        <>
          <SocialMediaIcons darkMode={darkMode} />
          <ToggleButton darkMode={darkMode} toggleTheme={toggleTheme} />
          {console.log("Rendering NavBar with darkMode:", darkMode)}
          <NavBar darkMode={darkMode} /> {/* Directly pass darkMode */}
        </>
      )}
      <AppRoutes />
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
