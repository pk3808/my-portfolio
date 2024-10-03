import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import './App.css'; // Import your CSS file

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'app dark' : 'app light'}>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-button"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <AppRoutes />
        <NavBar />
      </div>
    </Router>
  );
};

export default App;
