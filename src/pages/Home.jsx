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

      <div className={`container mx-auto py-16 min-h-screen px-4 md:px-8 lg:px-16 transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="relative group cursor-pointer inline-block">
          <img
            src="/images/house.png"
            alt="Game Mode"
            className="w-[35px] md:w-[40px] h-[35px] md:h-[45px] object-contain rounded-lg z-50 absolute animate-pulse transition-transform duration-300 ease-in-out group-hover:scale-110 top-[-20px] md:left-0"
            onClick={() => {
              window.location.href = "/";
            }}
          />
          <div className="absolute left-12 top-[-15px] items-center p-2 bg-slate-800 text-white text-xs rounded shadow-md transform transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
            <span>Switch to Game Mode</span>
          </div>
        </div>

        <Parallax speed={-5}>
          <div className="flex flex-col items-center justify-center mt-12 md:mt-20">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
                  darkMode ? "bg-slate-800 text-emerald-400 border border-slate-700" : "bg-white text-emerald-600 border border-slate-200 shadow-sm"
                }`}
             >
                ✨ Welcome to my portfolio
             </motion.div>

            <motion.h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Building Digital <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                Experiences
              </span>
            </motion.h1>

            <motion.p
              className={`text-center mt-6 text-lg md:text-xl max-w-2xl font-light ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            >
              I craft responsive websites and mobile apps that solve real problems.
            </motion.p>
          </div>

          <div className="flex md:flex-row flex-col items-center justify-center gap-10 mt-16 md:mt-24">
            {/* Profile Image */}
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${darkMode ? "bg-emerald-500" : "bg-emerald-400"}`}></div>
              <div className={`relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 ${darkMode ? "border-slate-800" : "border-white"} shadow-2xl`}>
                <img
                  src={"/images/avataar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Resume / Intro Card */}
            <motion.div
              className="w-full max-w-md"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className={`rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl transition-all hover:shadow-2xl ${
                darkMode
                  ? "bg-slate-800/80 border border-slate-700 text-white"
                  : "bg-white/90 border border-slate-100 text-slate-800"
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${darkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-100 text-emerald-600"}`}>
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Piyush Kumar</h3>
                    <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Professional Developer</p>
                  </div>
                </div>

                <p className={`mb-6 text-sm leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                  Specialized in building exceptional digital experiences. Currently focused on React, React Native, and full-stack development.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => window.location.href = "https://drive.google.com/uc?export=download&id=1XM6arc8Hg6w0Kimxv2Tyctb-xmiDkABu"}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${
                      darkMode
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    <Download size={18} />
                    <span>Resume</span>
                  </button>
                  <button
                    onClick={() => navigate("/contact")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all border ${
                      darkMode
                        ? "border-slate-600 hover:bg-slate-700 text-slate-300"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Parallax>
      </div>

      {/* About Section */}
      <div className={`py-20 md:py-32 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
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
                <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse ${darkMode ? "bg-cyan-500" : "bg-cyan-400"}`}></div>
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
                  ? "bg-slate-800 text-white shadow-black/20"
                  : "bg-white text-slate-800 shadow-slate-200/50"
              }`}>
                {/* Vertical Label - repositioned for better layout */}
                <div className="absolute -left-3 top-10 w-1 h-16 bg-gradient-to-b from-emerald-400 to-cyan-500 rounded-full"></div>

                <h3 className="text-emerald-500 font-semibold tracking-wide uppercase text-sm mb-3">Hello, Welcome</h3>

                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Piyush Kumar</span>
                </h2>

                <p className={`text-base md:text-lg leading-relaxed mb-8 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                  I'm an app and web developer at IB Arts, skilled in React, React Native, Node.js, and MongoDB. I specialize in creating user-centric applications with a blend of design and functionality. With an engineering background and hands-on experience, I thrive on solving problems and building seamless digital experiences.
                </p>

                <button
                  onClick={() => navigate("/contact")}
                  className={`group flex items-center gap-2 font-medium transition-colors ${
                    darkMode ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"
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
      <div className={`${darkMode ? "bg-slate-900" : "bg-slate-50"} py-10`}>
        <Projects darkMode={darkMode} isHorizontal={true} />
      </div>
      <div className="md:pl-[8vw]">
        <Contact darkMode={darkMode} hide={true} />
      </div>

      <footer className={`text-center py-8 border-t ${darkMode ? "bg-slate-900 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Piyush Kumar. All Rights Reserved.
        </p>
      </footer>
    </ParallaxProvider>
  );
};

export default Home;
