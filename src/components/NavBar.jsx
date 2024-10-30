import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faBlog, faHome, faWrench, faEnvelope,faCode, faProjectDiagram  } from '@fortawesome/free-solid-svg-icons';
import project from '../assets/project.png';
const NavBar = ({ darkMode }) => {
  
  console.log(darkMode, "darkMode--");
  
  const navigate = useNavigate();
  const [active, setActive] = useState('/'); // Track the active route
  const [visible, setVisible] = useState(true); // Track visibility of the NavBar
  const [scrolling, setScrolling] = useState(false); // Track if scrolling is happening
  let lastScrollY = window.scrollY; // Store last scroll position

  const handleNavigation = (path) => {
    setActive(path);
    navigate(path);
  };

  const handleScroll = () => {
    // Check if scrolling is happening
    if (!scrolling) {
      setScrolling(true); // Start scrolling
    }

    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setVisible(false);
    } else {
      // Scrolling up
      setVisible(true);
    }
    lastScrollY = window.scrollY; // Update last scroll position
  };

  useEffect(() => {
    const onScroll = () => {
      handleScroll();
      clearTimeout(window.scrollTimeout); 

      
      window.scrollTimeout = setTimeout(() => {
        setScrolling(false); 
      }, 100); 
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(window.scrollTimeout); 
    };
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${visible ? 'opacity-1000' : 'opacity-0'}`}>
      {/* NavBar for screens md and above */}
      <nav 
        className={`fixed bottom-5 left-10 right-10 z-50 py-4 shadow-lg rounded-[25px] 
          ${darkMode ? 'bg-[#023020] text-white' : 'bg-[#F2D7D9] text-gray-800'} hidden md:block`}
      >
        <div className="container mx-auto flex justify-evenly">
          <button 
            onClick={() => handleNavigation('/projects')} 
            className={`hover:text-cyan-400 text-lg flex items-center space-x-2 ${active === '/projects' ? 'font-bold text-cyan-400' : ''}`}
          >
            <FontAwesomeIcon icon={ faProjectDiagram } /> {/* Projects icon */}
            <span>Projects</span>
          </button>
          <button 
            onClick={() => handleNavigation('/blogs')} 
            className={`hover:text-cyan-400 text-lg flex items-center space-x-2 ${active === '/blogs' ? 'font-bold text-cyan-400' : ''}`}
          >
            <FontAwesomeIcon icon={faBlog} /> {/* Blogs icon */}
            <span>Blogs</span>
          </button>
         
          <button 
            onClick={() => handleNavigation('/home')} 
            className={`hover:text-cyan-400 text-lg flex items-center space-x-2 ${active === '/' ? 'font-bold text-cyan-400' : ''}`}
          >
            <FontAwesomeIcon icon={faHome} /> {/* Skills icon */}
            <span>Home</span>
          </button>
          <button 
            onClick={() => handleNavigation('/skills')} 
            className={`hover:text-cyan-400 text-lg flex items-center space-x-2 ${active === '/skills' ? 'font-bold text-cyan-400' : ''}`}
          >
            <FontAwesomeIcon icon={faWrench} /> {/* Skills icon */}
            <span>Skills</span>
          </button>
          <button 
            onClick={() => handleNavigation('/contact')} 
            className={`hover:text-cyan-400 text-lg flex items-center space-x-2 ${active === '/contact' ? 'font-bold text-cyan-400' : ''}`}
          >
            <FontAwesomeIcon icon={faEnvelope} /> {/* Contact icon */}
            <span>Contact</span>
          </button>
        </div>
      </nav>

      {/* NavBar for screens below md (icons only) */}
  {/* NavBar for screens below md (icons only) */}
<nav 
  className={`fixed bottom-5 left-5 right-5 z-50 py-[10px] rounded-[10px] 
    ${darkMode ? 'bg-[#023020] drop-shadow-2xl text-white' : 'bg-[#F2D7D9] text-gray-800'} md:hidden`} // Show only on small screens
>
  <div className="container mx-auto flex justify-evenly">
    <button 
      onClick={() => handleNavigation('/projects')} 
      className={`hover:text-cyan-400 text-lg relative transition duration-300 ease-in-out ${active === '/projects' ? 'text-cyan-400' : darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <FontAwesomeIcon 
        icon={ faProjectDiagram } 
        className={`${active === '/projects' ? 'text-3xl' : 'text-xl'}`} // Increase size if active
      /> {/* Projects icon */}
    </button>

    <button 
      onClick={() => handleNavigation('/blogs')} 
      className={`hover:text-cyan-400 text-lg relative transition duration-300 ease-in-out ${active === '/blogs' ? 'text-cyan-400' : darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <FontAwesomeIcon 
        icon={faBlog} 
        className={`${active === '/blogs' ? 'text-3xl' : 'text-xl'}`} // Increase size if active
      /> {/* Blogs icon */}
    </button>

    <button 
      onClick={() => handleNavigation('/')} 
      className={`hover:text-cyan-400 text-lg relative transition duration-300 ease-in-out ${active === '/' ? 'text-cyan-400' : darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <FontAwesomeIcon 
        icon={faHome} 
        className={`${active === '/' ? 'text-3xl' : 'text-xl'}`} // Increase size if active
      /> {/* Home icon */}
      {active === '/' && <div className="absolute bottom--2 left-1/2 transform -translate-x-1/2 w-full h-1 bg-cyan-400 transition-all duration-300 ease-in-out"></div>}
    </button>

    <button 
      onClick={() => handleNavigation('/skills')} 
      className={`hover:text-cyan-400 text-lg relative transition duration-300 ease-in-out ${active === '/skills' ? 'text-cyan-400' : darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <FontAwesomeIcon 
        icon={faWrench} 
        className={`${active === '/skills' ? 'text-3xl' : 'text-xl'}`} // Increase size if active
      /> {/* Skills icon */}
    </button>

    <button 
      onClick={() => handleNavigation('/contact')} 
      className={`hover:text-cyan-400 text-lg relative transition duration-300 ease-in-out ${active === '/contact' ? 'text-cyan-400' : darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <FontAwesomeIcon 
        icon={faEnvelope} 
        className={`${active === '/contact' ? 'text-3xl' : 'text-xl'}`} // Increase size if active
      /> {/* Contact icon */}
    </button>
  </div>
</nav>

    </div>
  );
};

export default NavBar;
