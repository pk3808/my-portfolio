import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faShare, faTimes } from "@fortawesome/free-solid-svg-icons";

const SocialMediaIcons = ({ darkMode = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  const socialLinks = [
    {
      href: "http://discordapp.com/users/867786987146313758",
      icon: faDiscord,
      label: "Discord",
      hoverColor: "hover:bg-[#5865F2] hover:text-white",
      bgColor: "bg-[#5865F2]"
    },
    {
      href: "https://www.instagram.com/blaze_31_01/?igsh=cjJobmp6N2NkNmt6",
      icon: faInstagram,
      label: "Instagram",
      hoverColor: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      href: "https://github.com/pk3808",
      icon: faGithub,
      label: "GitHub",
      hoverColor: "hover:bg-gray-900 hover:text-white",
      bgColor: "bg-gray-900"
    },
    {
      href: "https://www.linkedin.com/in/piyush-kumar-724877217/",
      icon: faLinkedin,
      label: "LinkedIn",
      hoverColor: "hover:bg-[#0077B5] hover:text-white",
      bgColor: "bg-[#0077B5]"
    },
    {
      href: "mailto:piyush.kr.bpmce@gmail.com",
      icon: faEnvelope,
      label: "Email",
      hoverColor: "hover:bg-orange-500 hover:text-white",
      bgColor: "bg-orange-500"
    }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Check if screen size is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isDropdownOpen]);

  const SocialIcon = ({ link, className = "", showTooltip = false }) => {
    return (
      <div className="relative group">
        <a
          href={link.href}
          target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
          rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full
            transition-all duration-300 ease-in-out transform
            hover:scale-110 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${link.hoverColor}
            ${className}
          `}
          aria-label={link.label}
        >
          <FontAwesomeIcon icon={link.icon} size="lg" />
        </a>
        
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
            {link.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleDropdown}
          className={`
            w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-in-out
            flex items-center justify-center transform hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${darkMode 
              ? 'bg-[#355E3B] text-white hover:bg-[#2a4a2e]' 
              : 'bg-[#F3D7CA] text-gray-800 hover:bg-[#e8c5b5]'
            }
            ${isDropdownOpen ? 'rotate-45' : 'rotate-0'}
          `}
          aria-label={isDropdownOpen ? "Close social menu" : "Open social menu"}
          aria-expanded={isDropdownOpen}
        >
          {isDropdownOpen ? <FontAwesomeIcon icon={faTimes} size="lg" /> : <FontAwesomeIcon icon={faShare} size="lg" />}
        </button>

        {/* Mobile Dropdown */}
        {isDropdownOpen && (
          <div className={`
            absolute bottom-16 right-0 p-4 rounded-2xl shadow-2xl
            transform transition-all duration-300 ease-out
            ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}
            ${darkMode 
              ? 'bg-[#19616a] text-white border border-gray-600' 
              : 'bg-white text-gray-800 border border-gray-200'
            }
          `}>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <SocialIcon 
                    link={link} 
                    className={darkMode ? 'text-white' : 'text-gray-700'}
                  />
                  <span className="text-sm font-medium">{link.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Version
  return (
    <div className={`
      fixed left-6 top-1/2 transform -translate-y-1/2 z-50
      flex flex-col space-y-4 p-1 rounded-2xl shadow-lg
      transition-all duration-300 ease-in-out
      ${darkMode 
        ? 'bg-[#355E3B]/90 backdrop-blur-sm border border-gray-600' 
        : 'bg-[#F3D7CA]/90 backdrop-blur-sm border border-gray-200'
      }
    `}>
      {socialLinks.map((link, index) => (
        <SocialIcon 
          key={index}
          link={link} 
          className={darkMode ? 'text-white' : 'text-gray-700'}
          showTooltip={true}
        />
      ))}
    </div>
  );
};

export default SocialMediaIcons;