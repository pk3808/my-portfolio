import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faBlog, faHome, faWrench, faEnvelope, faCode, faProjectDiagram, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ darkMode }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState('/');
  const [visible, setVisible] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const lastScrollY = useRef(0); // Using ref to persist scroll position between renders
  
  // Scroll direction detection threshold
  const SCROLL_THRESHOLD = 5;
  const HIDE_THRESHOLD = 100;

  const location = useLocation();
  const isHome = location.pathname === "/home";

  const navItems = [
    { path: '/projects', icon: faProjectDiagram, label: 'Projects', color: '#FF6B6B' },
    { path: '/blogs', icon: faBlog, label: 'Blogs', color: '#4ECDC4' },
    { path: '/home', icon: faHome, label: 'Home', color: '#45B7D1' },
    { path: '/skills', icon: faWrench, label: 'Skills', color: '#96CEB4' },
    { path: '/contact', icon: faEnvelope, label: 'Contact', color: '#FFEAA7' }
  ];

  const handleNavigation = (path) => {
    setActive(path);
    navigate(path);
    if (isHome) {
      setActive("/home");
    }
  };

  // Improved scroll handler with direction detection
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Calculate scroll direction
    const scrollDirection = currentScrollY > lastScrollY.current 
      ? 'down' 
      : 'up';
    
    // Only trigger visibility change if we've scrolled more than the threshold
    if (Math.abs(currentScrollY - lastScrollY.current) > SCROLL_THRESHOLD) {
      // Hide when scrolling down past threshold
      if (scrollDirection === 'down' && currentScrollY > HIDE_THRESHOLD) {
        setVisible(false);
      } 
      // Show when scrolling up
      else if (scrollDirection === 'up') {
        setVisible(true);
      }
    }
    
    // Always show at the top of the page
    if (currentScrollY < HIDE_THRESHOLD) {
      setVisible(true);
    }
    
    lastScrollY.current = currentScrollY;
    setScrolling(true);
  };

  useEffect(() => {
    const onScroll = () => {
      handleScroll();
      clearTimeout(window.scrollTimeout);

      window.scrollTimeout = setTimeout(() => {
        setScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  useEffect(() => {
    setActive(location.pathname);
    // Show navbar when navigating to a new page
    setVisible(true);
  }, [location.pathname]);

  const toggleNavbar = () => {
    setNavbarVisible((prevState) => !prevState);
    // Also make sure navbar is visible when expanding
    setVisible(true);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
    }`}>
      {/* Desktop NavBar */}
      {navbarVisible && (
        <nav className={`fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 px-20 py-[6px] shadow-2xl rounded-full backdrop-blur-lg border transition-all duration-300 hidden md:block ${
          darkMode 
            ? 'bg-[#355E3B] border-[#080e08] shadow-cyan-500/20' 
            : 'bg-[#F3D7CA] border-white/20 shadow-black/10'
        }`} style={{
          boxShadow: darkMode 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        }}>
          <div className="flex items-center space-x-8">
            {/* Collapse Button */}
            <button
              onClick={toggleNavbar}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50' 
                  : 'bg-gradient-to-r from-orange-400 to-pink-400 text-white hover:shadow-lg hover:shadow-orange-500/50'
              }`}
            >
              <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
            </button>

            {/* Navigation Items */}
            <div className="flex items-center space-x-3 bg-black/5 dark:bg-white/5 rounded-full px-6 py-1">
              {navItems.map((item, index) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-7 py-2 rounded-full transition-all duration-300 ease-out group ${
                    active === item.path || (active === '/home' && isHome && item.path === '/home')
                      ? 'scale-110 shadow-lg'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background: active === item.path || (active === '/home' && isHome && item.path === '/home')
                      ? `linear-gradient(135deg, ${item.color}20, ${item.color}40)`
                      : hoveredItem === index
                      ? `linear-gradient(135deg, ${item.color}10, ${item.color}20)`
                      : 'transparent'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className={`text-lg transition-all duration-300 ${
                        active === item.path || (active === '/home' && isHome && item.path === '/home')
                          ? `text-[${item.color}] drop-shadow-lg`
                          : darkMode 
                          ? 'text-gray-300 group-hover:text-white' 
                          : 'text-gray-600 group-hover:text-gray-800'
                      }`}
                      style={{
                        color: active === item.path || (active === '/home' && isHome && item.path === '/home')
                          ? item.color
                          : undefined,
                        filter: active === item.path || (active === '/home' && isHome && item.path === '/home')
                          ? `drop-shadow(0 0 8px ${item.color}50)`
                          : undefined
                      }}
                    />
                    <span className={`font-medium transition-all duration-300 ${
                      active === item.path || (active === '/home' && isHome && item.path === '/home')
                        ? 'text-gray-900 dark:text-white font-semibold'
                        : darkMode 
                        ? 'text-gray-300 group-hover:text-white' 
                        : 'text-gray-600 group-hover:text-gray-800'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Active indicator */}
                  {(active === item.path || (active === '/home' && isHome && item.path === '/home')) && (
                    <div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full animate-pulse"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Collapsed State Button */}
      {!navbarVisible && (
        <div className="fixed left-6 bottom-6 z-50">
          <button
            onClick={toggleNavbar}
            className={`p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-lg border ${
              darkMode 
                ? 'bg-gray-900/80 border-gray-700/50 text-cyan-400 hover:shadow-cyan-500/50' 
                : 'bg-white/80 border-white/20 text-orange-500 hover:shadow-orange-500/50'
            }`}
          >
            <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Mobile NavBar */}
      <nav className={`fixed bottom-4 left-4 right-4 z-50 py-4 rounded-2xl backdrop-blur-lg border transition-all duration-300 md:hidden ${
        darkMode 
          ? 'bg-gray-900/90 border-gray-700/50 shadow-cyan-500/20' 
          : 'bg-white/90 border-white/30 shadow-black/10'
      }`} style={{
        boxShadow: darkMode 
          ? '0 20px 40px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
          : '0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)'
      }}>
        <div className="flex justify-evenly items-center px-2">
          {navItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative p-3 rounded-xl transition-all duration-300 ${
                active === item.path || (active === '/home' && isHome && item.path === '/home')
                  ? 'scale-110 shadow-lg'
                  : 'hover:scale-105'
              }`}
              style={{
                background: active === item.path || (active === '/home' && isHome && item.path === '/home')
                  ? `linear-gradient(135deg, ${item.color}20, ${item.color}40)`
                  : 'transparent'
              }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`transition-all duration-300 ${
                  active === item.path || (active === '/home' && isHome && item.path === '/home')
                    ? 'text-2xl'
                    : 'text-xl'
                }`}
                style={{
                  color: active === item.path || (active === '/home' && isHome && item.path === '/home')
                    ? item.color
                    : darkMode 
                    ? '#9CA3AF' 
                    : '#6B7280',
                  filter: active === item.path || (active === '/home' && isHome && item.path === '/home')
                    ? `drop-shadow(0 0 8px ${item.color}50)`
                    : undefined
                }}
              />
              
              {/* Mobile active indicator */}
              {(active === item.path || (active === '/home' && isHome && item.path === '/home')) && (
                <div 
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full animate-pulse"
                  style={{ backgroundColor: item.color }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;