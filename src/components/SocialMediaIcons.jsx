import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import share from "../assets/neural.png";
const SocialMediaIcons = ({ darkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to check if the screen size is mobile
  const checkMobile = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile); // Update on resize

    return () => {
      window.removeEventListener("resize", checkMobile); // Clean up the event listener
    };
  }, []);

  return (
    <>
      {/* Social Icons for Desktop */}
      {isMobile ? null : (
        <div className={`social-icons-desktop  ${darkMode ? 'bg-[#355E3B] text-white' : 'bg-[#F3D7CA] text-gray-800'}`}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className="" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:example@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      )}

      {/* Social Icons for Mobile (Dropdown) */}
      {isMobile && (
        <div className="social-icons-mobile">
          <button
            onClick={toggleDropdown}
            className={`social-toggle-btn ${darkMode ? "dark" : "light"}`}
          >
            <img src={share} className="w-8 h-8" />
          </button>

          {isDropdownOpen && (
            <div className={`social-dropdown ${darkMode ? 'bg-[#19616a] text-white' : 'bg-white text-gray-800'}`}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="mailto:example@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SocialMediaIcons;
