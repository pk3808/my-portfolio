import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faBlog, faHome, faWrench, faEnvelope, faCode, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import CollapseIcon from '../../public/images/collapse.png'; // Add your image here

const NavBar = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState('/');
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ x: 10, y: window.innerHeight - 70 });
  const [isDragging, setIsDragging] = useState(false);

  const handleNavigation = (path) => {
    setActive(path);
    navigate(path);
  };

  // Handle drag events for the collapsed icon
  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 25, // Adjust to keep the center aligned with the cursor
        y: e.clientY - 25,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {collapsed ? (
        // Collapsed Button (movable and clickable)
        <div
          className="fixed z-50 w-[50px] h-[50px] rounded-full cursor-pointer md:block hidden hover:transform hover:scale-110"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            background: darkMode ? '#014421' : '#FFDDCC',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => setCollapsed(false)}
        >
          <img
            src={CollapseIcon}
            alt="Collapse Icon"
            className="w-full h-full object-contain p-2"
          />
        </div>
      ) : (
        <div
          className={`fixed bottom-5 left-10 right-10 z-50 py-4 shadow-lg rounded-[25px] hidden md:block ${
            visible ? 'opacity-100' : 'opacity-0'
          } ${darkMode ? 'bg-[#01411C] text-white' : 'bg-[#FFDDCC] text-gray-800'}`}
        >
          <div className="container mx-auto flex justify-between items-center">
            {/* Collapse Button */}
            <button
              className="absolute left-5 top-2 w-[40px] h-[40px] rounded-full bg-lime-300 flex items-center justify-center cursor-pointer"
              onClick={() => setCollapsed(true)}
            >
              <img src={CollapseIcon} alt="Collapse Icon" className="w-3/4 h-3/4 hover:scale-[1.5]" />
            </button>

            {/* Navigation Buttons */}
            <div className="flex justify-evenly w-full">
              <button
                onClick={() => handleNavigation('/projects')}
                className={`text-lg flex items-center space-x-2 ${
                  active === '/projects'
                    ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                    : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
              >
                <FontAwesomeIcon icon={faProjectDiagram} />
                <span>Projects</span>
              </button>

              <button
                onClick={() => handleNavigation('/blogs')}
                className={`text-lg flex items-center space-x-2 ${
                  active === '/blogs'
                    ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                    : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
              >
                <FontAwesomeIcon icon={faBlog} />
                <span>Blogs</span>
              </button>

              <button
                onClick={() => handleNavigation('/home')}
                className={`text-lg flex items-center space-x-2 ${
                  active === '/home'
                    ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                    : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </button>

              <button
                onClick={() => handleNavigation('/skills')}
                className={`text-lg flex items-center space-x-2 ${
                  active === '/skills'
                    ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                    : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
              >
                <FontAwesomeIcon icon={faWrench} />
                <span>Skills</span>
              </button>

              <button
                onClick={() => handleNavigation('/contact')}
                className={`text-lg flex items-center space-x-2 ${
                  active === '/contact'
                    ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                    : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      )}
           <nav
        className={`fixed bottom-2 left-5 right-5 z-50 py-[15px] rounded-[10px] 
          ${
            darkMode
              ? "bg-[#014421] drop-shadow-2xl text-white"
              : "bg-[#FFDDCC] text-gray-800"
          } md:hidden`}
      >
        <div className="container mx-auto flex justify-evenly">
          <button
            onClick={() => handleNavigation("/projects")}
            className={`${
              active === "/projects"
                ? darkMode
                  ? "text-[#7cfc00]"
                  : "text-[#FA5F55]"
                : darkMode
                ? "text-white"
                : "text-gray-800"
            } transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faProjectDiagram}
              className={`${active === "/projects" ? "text-3xl" : "text-xl"}`}
            />
          </button>

          <button
            onClick={() => handleNavigation("/blogs")}
            className={`${
              active === "/blogs"
                ? darkMode
                  ? "text-[#7cfc00]"
                  : "text-[#FA5F55]"
                : darkMode
                ? "text-white"
                : "text-gray-800"
            } transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faBlog}
              className={`${active === "/blogs" ? "text-3xl" : "text-xl"}`}
            />
          </button>

          <button
            onClick={() => handleNavigation("/home")}
            className={`${
              active === "/home"
                ? darkMode
                  ? "text-[#7cfc00]"
                  : "text-[#FA5F55]"
                : darkMode
                ? "text-white"
                : "text-gray-800"
            } transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`${active === "/home" ? "text-3xl" : "text-xl"}`}
            />
          </button>

          <button
            onClick={() => handleNavigation("/skills")}
            className={`${
              active === "/skills"
                ? darkMode
                  ? "text-[#7cfc00]"
                  : "text-[#FA5F55]"
                : darkMode
                ? "text-white"
                : "text-gray-800"
            } transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faWrench}
              className={`${active === "/skills" ? "text-3xl" : "text-xl"}`}
            />
          </button>

          <button
            onClick={() => handleNavigation("/contact")}
            className={`${
              active === "/contact"
                ? darkMode
                  ? "text-[#7cfc00]"
                  : "text-[#FA5F55]"
                : darkMode
                ? "text-white"
                : "text-gray-800"
            } transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className={`${active === "/contact" ? "text-3xl" : "text-xl"}`}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
