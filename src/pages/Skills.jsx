import React, { useState, useEffect } from "react";

const Skills = ({ darkMode, show, hide }) => {
  const [showLogos, setShowLogos] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [clickedSkill, setClickedSkill] = useState(null);
  const [orbitsVisible, setOrbitsVisible] = useState(false);
  const [autoHighlight, setAutoHighlight] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Move techLogos definition before useEffect
  const techLogos = [
    { name: "JavaScript", src: "/images/js.png", description: "Dynamic programming language" },
    { name: "React", src: "/images/reactjs.png", description: "UI library for building interfaces" },
    { name: "Next.js", src: "/images/nextjs.png", description: "Full-stack React framework" },
    { name: "Tailwind CSS", src: "/images/tailwind.png", description: "Utility-first CSS framework" },
    { name: "React Native", src: "/images/reactnative.png", description: "Mobile app development" },
    { name: "Java", src: "/images/java.png", description: "Object-oriented programming" },
    { name: "C++", src: "/images/c++.png", description: "Systems programming language" },
    { name: "Node.js", src: "/images/node.png", description: "JavaScript runtime environment" },
    { name: "MongoDB", src: "/images/mongodb.png", description: "NoSQL database solution" },
    { name: "Git", src: "/images/git.png", description: "Version control system" },
  ];

  useEffect(() => {
    if (show) {
      setTimeout(() => setShowLogos(true), 300);
      setTimeout(() => setOrbitsVisible(true), 800);
    }
  }, [show]);

  // Auto-cycle through skills
  useEffect(() => {
    if (showLogos && isAutoPlaying) {
      const interval = setInterval(() => {
        setAutoHighlight(prev => {
          const next = prev === null ? 0 : (prev + 1) % techLogos.length;
          return next;
        });
      }, 2000); // Change every 2 seconds

      return () => clearInterval(interval);
    }
  }, [showLogos, isAutoPlaying, techLogos.length]);

  const handleSkillClick = (index) => {
    setClickedSkill(index);
    setAutoHighlight(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    setTimeout(() => setClickedSkill(null), 2000);
  };

  const handleSkillHover = (index) => {
    setHoveredSkill(index);
    setIsAutoPlaying(false); // Pause auto-play on hover
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="min-h-screen flex flex-row items-center justify-center relative overflow-hidden">
      {/* Animated Background Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Auto-play Control Button */}
      {showLogos && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={toggleAutoPlay}
            className={`px-3 py-2 rounded-full text-white text-xs font-semibold shadow-lg transition-all duration-300 ${
              isAutoPlaying 
                ? 'bg-gradient-to-r from-blue-500 to-green-400 hover:shadow-xl' 
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto'}
          </button>
        </div>
      )}

      {/* Enhanced Click Button with Ripple Effect */}
      {!showLogos && (
        <div className="absolute top-[45%] z-10 cursor-pointer group" onClick={() => setShowLogos(true)}>
          {/* Ripple rings */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-ping opacity-20 scale-150"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-pulse opacity-30 scale-125"></div>
          
          {/* Main button */}
          <div className="relative bg-gradient-to-r from-blue-500 to-green-400 rounded-full md:h-[80px] md:w-[80px] h-[60px] w-[60px] flex items-center justify-center shadow-lg group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-300">
            <span className="text-white font-bold md:text-sm text-xs animate-bounce">Click Here</span>
          </div>
        </div>
      )}

      {/* Character with Enhanced Animation */}
      <div className="relative flex items-center justify-center w-[90vw] md:w-[100vw]">
        {/* Character shadow */}
        <div className="absolute bottom-0 md:bottom-8 left-1/2 transform -translate-x-1/2 translate-y-16 w-24 h-6 bg-black opacity-10 rounded-full blur-sm animate-pulse"></div>
        
        <img
          src="/images/yoga.png"
          alt="3D Animation"
          className={`md:h-[320px] md:w-[320px] h-[260px] w-[260px] transition-all duration-500 ${
            showLogos ? 'animate-pulse' : 'animate-pulse'
          }`}
        />

        {/* Orbit Rings */}
        {orbitsVisible && (
          <>
            <div className="absolute h-[450px] w-[450px] border border-white opacity-5 rounded-full animate-spin"></div>
            <div className="absolute h-[500px] w-[500px] border border-white opacity-3 rounded-full" style={{animation: 'spin 20s linear infinite reverse'}}></div>
          </>
        )}

        {/* Enhanced Skill Logos with Staggered Animation */}
        {showLogos && (
          <div className="absolute h-[500px] w-[400px] flex items-center justify-center" style={{animation: 'spin 25s linear infinite'}}>
            {techLogos.map((logo, index) => {
              const isActive = autoHighlight === index || hoveredSkill === index;
              
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 cursor-pointer ${
                    isActive ? 'scale-125 z-10' : ''
                  } ${clickedSkill === index ? 'animate-ping' : ''}`}
                  style={{
                    transform: `rotate(${(index * 360) / techLogos.length}deg) translate(200px)`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={() => handleSkillHover(index)}
                  onMouseLeave={handleSkillLeave}
                  onClick={() => handleSkillClick(index)}
                >
                  <div className={`relative bg-white md:h-[60px] md:w-[60px] h-[35px] w-[35px] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                    isActive ? 'scale-125 shadow-2xl' : ''
                  }`}>
                    {/* Enhanced glow effect */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-white rounded-full opacity-40 animate-ping"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-full opacity-20 animate-pulse"></div>
                      </>
                    )}
                    
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="md:h-[50px] md:w-[50px] w-[30px] h-[30px] object-contain transition-transform duration-300 relative z-10"
                    />
                  </div>
                  
                  {/* Enhanced tooltip - always show for active skill */}
                  {isActive && (
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg text-xs whitespace-nowrap opacity-95 shadow-xl min-w-max animate-pulse">
                      <div className="font-semibold text-sm">{logo.name}</div>
                      <div className="text-gray-300 text-xs mt-1">{logo.description}</div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Skill Info Display */}
        {(autoHighlight !== null || clickedSkill !== null) && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none z-20">
            <div className="bg-white text-gray-800 px-6 py-3 rounded-full shadow-xl animate-bounce font-semibold border-2 border-gray-100">
              {clickedSkill !== null ? (
                <span>✨ {techLogos[clickedSkill].name} Selected!</span>
              ) : (
                <span>📍 {techLogos[autoHighlight].name}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Side Panel */}
      {hide && (
        <div
          className={`flex-col items-center justify-center hidden md:block w-7 h-[135px] self-center transform transition-all duration-500 hover:scale-110 hover:shadow-lg ${
            darkMode ? "text-white bg-lime-600" : "text-gray-800 bg-orange-400"
          }`}
        >
          <h2
            className={`text-sm font-bold text-center px-1 py-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              transform: "rotate(360deg)",
            }}
          >
            Skills
          </h2>
        </div>
      )}
    </div>
  );
};

export default Skills;