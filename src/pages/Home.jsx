import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import TimeLIne from "../components/TimeLIne";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";
import { Download, User, ArrowRight } from "lucide-react";

const Home = ({ darkMode }) => {
  const [scrollingUp, setScrollingUp] = useState(false);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("/images/flyingd.png");
  let scrollTimeout = null;
  const navigate = useNavigate();

  useEffect(() => {
    const textElements = document.querySelectorAll(".animated-text span");
    textElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollingUp(false);
        setImageSrc("/images/flyingd.png");
      } else {
        setScrollingUp(true);
        setImageSrc("/images/flyingu.png");
      }

      setShowFlyingImage(true);
      lastScrollY = currentScrollY;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setShowFlyingImage(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return (
    <ParallaxProvider>
      {showFlyingImage && (
        <motion.div
          className="fixed top-[20vh] right-0 transform-gpu md:w-[70px] md:h-[75px] w-[50px] h-[200px] z-50 pointer-events-none"
          initial={{ x: 0 }}
          animate={{
            x: scrollingUp ? [0, 5, -5, 0] : [0, -5, 5, 0],
            y: window.scrollY > 100 ? [0, 0] : [window.scrollY, window.scrollY],
          }}
          transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
          style={{
            transformOrigin: "center",
            transform: scrollingUp ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <img
            src={imageSrc}
            alt="Flying Image"
            className="w-[40px] md:w-[70px] h-[65px] md:h-[75px] object-contain rounded-lg z-50 absolute"
          />
        </motion.div>
      )}

      {/* Hero Section - Full Height Viewport */}
      <div className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#011601]" : "bg-slate-50"}`}>

        {/* Background Gradient Mesh - Subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? "bg-[#ADFF2F]" : "bg-emerald-300"}`}></div>
            <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? "bg-emerald-600" : "bg-cyan-300"}`}></div>
        </div>

        {/* Game Mode Switch - Absolute Position */}
        <div className="absolute top-24 left-4 md:left-8 z-50 group cursor-pointer inline-block">
          <img
            src="/images/house.png"
            alt="Game Mode"
            className="w-[35px] md:w-[40px] h-[35px] md:h-[45px] object-contain rounded-lg animate-pulse transition-transform duration-300 ease-in-out group-hover:scale-110"
            onClick={() => {
              window.location.href = "/";
            }}
          />
          <div className={`absolute left-12 top-2 items-center p-2 text-xs rounded shadow-md transform transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap ${darkMode ? "bg-[#022a02] text-[#ADFF2F]" : "bg-slate-800 text-white"}`}>
            <span>Switch to Game Mode</span>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

            {/* Left Column: Text & CTA */}
            <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
                    darkMode ? "bg-[#045106] text-[#ADFF2F] border border-[#ADFF2F]/30" : "bg-white text-emerald-600 border border-slate-200 shadow-sm"
                  }`}
               >
                  ✨ Welcome to my portfolio
               </motion.div>

              <motion.h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight ${darkMode ? "text-white" : "text-slate-900"}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              >
                Building Digital <br className="hidden lg:block" />
                <span className={`text-transparent bg-clip-text ${darkMode ? "bg-gradient-to-r from-[#ADFF2F] to-emerald-400" : "bg-gradient-to-r from-emerald-500 to-cyan-500"}`}>
                  Experiences
                </span>
              </motion.h1>

              <motion.p
                className={`text-lg md:text-xl max-w-lg mb-8 font-light leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                I craft responsive websites and mobile apps that solve real problems.
                Specialized in React, React Native, and full-stack development.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <button
                  onClick={() => window.location.href = "https://drive.google.com/uc?export=download&id=1XM6arc8Hg6w0Kimxv2Tyctb-xmiDkABu"}
                  className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold transition-all transform hover:-translate-y-1 ${
                    darkMode
                      ? "bg-[#ADFF2F] hover:bg-[#bfff4d] text-black shadow-lg shadow-[#ADFF2F]/20"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                  }`}
                >
                  <Download size={20} />
                  <span>Resume</span>
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all border ${
                    darkMode
                      ? "border-[#ADFF2F]/50 hover:bg-[#ADFF2F]/10 text-[#ADFF2F]"
                      : "border-slate-300 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span>Contact Me</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column: Profile Image */}
            <div className="flex-1 flex justify-center lg:justify-end relative">
              <motion.div
                className="relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {/* Glow Effect behind image */}
                <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 scale-110 ${darkMode ? "bg-[#ADFF2F]" : "bg-emerald-400"}`}></div>

                {/* Main Image Container */}
                <div className={`relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-[6px] shadow-2xl ${darkMode ? "border-[#022a02] bg-[#022a02]" : "border-white bg-slate-100"}`}>
                  <img
                    src={"/images/avataar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge (Glassmorphism) */}
                <motion.div
                  className={`absolute -bottom-6 -left-6 md:bottom-0 md:-left-10 p-4 rounded-2xl backdrop-blur-md shadow-xl border flex items-center gap-3 ${
                    darkMode
                      ? "bg-[#011601]/80 border-[#ADFF2F]/20 text-white"
                      : "bg-white/80 border-white text-slate-800"
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                   <div className={`p-2.5 rounded-full ${darkMode ? "bg-[#ADFF2F] text-black" : "bg-emerald-100 text-emerald-600"}`}>
                      <User size={20} />
                   </div>
                   <div>
                      <p className={`text-xs font-medium uppercase tracking-wider ${darkMode ? "text-[#ADFF2F]" : "text-emerald-600"}`}>Professional</p>
                      <p className="font-bold text-sm md:text-base">Software Developer</p>
                   </div>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* About Section */}
      <div className={`py-20 md:py-32 ${darkMode ? "bg-[#011601]" : "bg-slate-50"}`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* 3D Image */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse ${darkMode ? "bg-[#ADFF2F]" : "bg-cyan-400"}`}></div>
                <img
                  src="/images/aboutme.png"
                  alt="About Me"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`relative p-8 md:p-10 rounded-2xl shadow-xl ${
                darkMode
                  ? "bg-[#022a02] text-white shadow-black/40 border border-[#ADFF2F]/10"
                  : "bg-white text-slate-800 shadow-slate-200/50"
              }`}>
                {/* Vertical Label - repositioned for better layout */}
                <div className={`absolute -left-3 top-10 w-1 h-16 rounded-full ${darkMode ? "bg-gradient-to-b from-[#ADFF2F] to-emerald-500" : "bg-gradient-to-b from-emerald-400 to-cyan-500"}`}></div>

                <h3 className={`font-semibold tracking-wide uppercase text-sm mb-3 ${darkMode ? "text-[#ADFF2F]" : "text-emerald-500"}`}>Hello, Welcome</h3>

                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  I'm <span className={`text-transparent bg-clip-text ${darkMode ? "bg-gradient-to-r from-[#ADFF2F] to-emerald-400" : "bg-gradient-to-r from-emerald-400 to-cyan-500"}`}>Piyush Kumar</span>
                </h2>

                <p className={`text-base md:text-lg leading-relaxed mb-8 ${darkMode ? "text-slate-200" : "text-slate-600"}`}>
                  I'm an app and web developer at IB Arts, skilled in React, React Native, Node.js, and MongoDB. I specialize in creating user-centric applications with a blend of design and functionality. With an engineering background and hands-on experience, I thrive on solving problems and building seamless digital experiences.
                </p>

                <button
                  onClick={() => navigate("/contact")}
                  className={`group flex items-center gap-2 font-medium transition-colors ${
                    darkMode ? "text-[#ADFF2F] hover:text-[#bfff4d]" : "text-emerald-600 hover:text-emerald-700"
                  }`}
                >
                  Let's work together <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <TimeLIne darkMode={darkMode} />
      <Skills darkMode={darkMode} show={true} hide={true} />
      <div className={`${darkMode ? "bg-[#011601]" : "bg-slate-50"} py-10`}>
        <Projects darkMode={darkMode} isHorizontal={true} />
      </div>
      <div className="md:pl-[8vw]">
        <Contact darkMode={darkMode} hide={true} />
      </div>

      <footer className={`text-center py-8 border-t ${darkMode ? "bg-[#011601] border-[#022a02] text-slate-400" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Piyush Kumar. All Rights Reserved.
        </p>
      </footer>
    </ParallaxProvider>
  );
};

export default Home;
