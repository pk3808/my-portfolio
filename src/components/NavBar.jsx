import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-evenly">
        <button 
          onClick={() => navigate('/')} 
          className="hover:text-blue-400 text-lg"
        >
          Home
        </button>
        <button 
          onClick={() => navigate('/about')} 
          className="hover:text-blue-400 text-lg"
        >
          About
        </button>
        <button 
          onClick={() => navigate('/projects')} 
          className="hover:text-blue-400 text-lg"
        >
          Projects
        </button>
        <button 
          onClick={() => navigate('/skills')} 
          className="hover:text-blue-400 text-lg"
        >
          Skills
        </button>
        <button 
          onClick={() => navigate('/contact')} 
          className="hover:text-blue-400 text-lg"
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
