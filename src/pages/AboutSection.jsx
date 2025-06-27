import React, { useState } from "react";
import { motion } from "framer-motion";

const AboutSection = ({ darkMode = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotateY: 0,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const contentVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const navigate = (path) => {
    console.log(`Navigating to ${path}`);
    // Replace with actual navigation logic
  };

  const nameText = "I'm Piyush Kumar";

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              darkMode ? 'bg-lime-400' : 'bg-orange-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="flex md:flex-row flex-col md:h-screen items-center justify-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Enhanced Image Section */}
        <motion.div
          className="w-[320px] md:w-[380px] h-[320px] md:h-[420px] relative mb-8 md:mb-0 md:mr-8"
          variants={imageVariants}
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Glowing background effect */}
          <motion.div 
            className={`absolute inset-0 rounded-2xl blur-2xl ${
              darkMode 
                ? 'bg-gradient-to-r from-lime-400/30 to-green-500/30' 
                : 'bg-gradient-to-r from-orange-400/30 to-pink-500/30'
            }`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 0.6 : 0.3
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Main image container */}
          <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ${
            darkMode 
              ? 'ring-2 ring-lime-400/40 shadow-lime-400/20' 
              : 'ring-2 ring-orange-400/40 shadow-orange-400/20'
          }`}>
            <img
              src="/images/aboutme.png"
              alt="3D Animation"
              className="w-full h-full object-contain transform transition-transform duration-500"
            />
            
            {/* Overlay gradient */}
            <div className={`absolute inset-0 ${
              darkMode 
                ? 'bg-gradient-to-t from-gray-900/20 to-transparent' 
                : 'bg-gradient-to-t from-white/10 to-transparent'
            }`} />
          </div>

          {/* Floating elements around image */}
          <motion.div
            className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
              darkMode ? 'bg-lime-400' : 'bg-orange-400'
            } opacity-60`}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute -bottom-4 -left-4 w-6 h-6 rounded-full ${
              darkMode ? 'bg-green-400' : 'bg-pink-400'
            } opacity-60`}
            animate={{
              y: [10, -10, 10],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        {/* Enhanced Content Section */}
        <motion.div
          className="flex md:flex-row md:w-[90%] flex-col flex-grow items-center"
          variants={contentVariants}
        >
          <motion.div
            className={`relative ${
              darkMode
                ? "bg-gradient-to-br from-slate-800/80 to-gray-900/80 shadow-2xl shadow-lime-900/20"
                : "bg-gradient-to-br from-white/80 to-orange-50/80 shadow-2xl shadow-orange-900/20"
            } p-8 md:p-12 mx-4 md:mx-8 mt-8 md:mt-0 rounded-3xl backdrop-blur-lg border ${
              darkMode ? 'border-lime-400/20' : 'border-orange-400/20'
            } transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2`}
            whileHover={{
              boxShadow: darkMode 
                ? "0 25px 50px -12px rgba(34, 197, 94, 0.25)" 
                : "0 25px 50px -12px rgba(251, 146, 60, 0.25)"
            }}
          >
            
            {/* Decorative corner elements */}
            <div className={`absolute top-4 right-4 w-12 h-12 ${
              darkMode ? 'bg-lime-400/10' : 'bg-orange-400/10'
            } rounded-full blur-xl`} />
            <div className={`absolute bottom-4 left-4 w-8 h-8 ${
              darkMode ? 'bg-green-400/10' : 'bg-pink-400/10'
            } rounded-full blur-lg`} />

            {/* Welcome Text with animation */}
            <motion.h3 
              className={`text-xl mb-4 font-medium ${
                darkMode ? 'text-lime-300' : 'text-orange-500'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Hello, Welcome 👋
            </motion.h3>

            {/* Enhanced Name with letter animation */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              style={{
                background: "linear-gradient(135deg, #13ACFF 0%, #D4E726 50%, #45DA13 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 200%"
              }}
            >
              {nameText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className="inline-block"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: Math.random() * 20 - 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Enhanced Description */}
            <motion.p
              className={`leading-relaxed mb-8 text-base md:text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              I'm an app and web developer at <span className={`font-semibold ${
                darkMode ? 'text-lime-300' : 'text-orange-600'
              }`}>IB Arts</span>, skilled in React, React Native, Node.js, and MongoDB. 
              I specialize in creating user-centric applications with a perfect blend of 
              <span className={`font-semibold ${
                darkMode ? 'text-lime-300' : 'text-orange-600'
              }`}> design and functionality</span>. With an engineering background and 
              hands-on experience, I thrive on solving complex problems and building 
              seamless digital experiences.
            </motion.p>

            {/* Enhanced Contact Button */}
            <motion.button
              className={`group relative px-8 py-3 font-semibold rounded-xl overflow-hidden ${
                darkMode 
                  ? 'bg-gradient-to-r from-lime-400 to-green-500 text-gray-900' 
                  : 'bg-gradient-to-r from-orange-400 to-pink-500 text-white'
              } shadow-lg transform transition-all duration-300`}
              onClick={() => navigate("/contact")}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </span>
              
              {/* Button hover effect */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Vertical Section */}
        <motion.div
          className={`hidden md:flex flex-col items-center justify-center h-full w-20 relative ${
            darkMode 
              ? 'bg-gradient-to-b from-lime-500 via-green-500 to-emerald-600' 
              : 'bg-gradient-to-b from-orange-400 via-pink-500 to-purple-500'
          } overflow-hidden`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-0.5 bg-white"
                style={{ top: `${i * 16.67}%` }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>

          {/* Enhanced vertical text */}
          <motion.h2
            className="text-sm font-bold text-white text-center px-3 py-6 tracking-[0.3em] z-10"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed"
            }}
            animate={{ 
              y: [-8, 8, -8],
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ABOUT ME
          </motion.h2>
          
          {/* Glowing accent */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;