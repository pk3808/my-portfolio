import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import TimeLIne from "../components/TimeLIne";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";
import AboutSection from "./AboutSection";

const Home = ({ darkMode }) => {
  console.log("Rendering Home with darkMode:", darkMode);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("/images/flyingd.png"); // Default image
  let scrollTimeout = null;
  const navigate = useNavigate();

  useEffect(() => {
    const textElements = document.querySelectorAll(".animated-text span");
    textElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`; // delay each letter's animation
    });
  }, []);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScrollingUp(false);
        setImageSrc("/images/flyingd.png"); // Normal image when scrolling down
      } else {
        // Scrolling up
        setScrollingUp(true);
        setImageSrc("/images/flyingu.png"); // Different image or rotate the existing one
      }

      setShowFlyingImage(true); // Show the flying image

      lastScrollY = currentScrollY;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Hide the flying image after scrolling stops
      scrollTimeout = setTimeout(() => {
        setShowFlyingImage(false);
      }, 200); // Adjust the delay if needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout); // Clean up timeout on unmount
      }
    };
  }, []);
  return (
    <ParallaxProvider>
      {showFlyingImage && (
        <motion.div
          className="fixed top-[20vh] right-0 transform-gpu md:w-[70px] md:h-[75px] w-[50px] h-[200px] z-50"
          initial={{ x: 0 }}
          animate={{
            x: scrollingUp ? [0, 5, -5, 0] : [0, -5, 5, 0],
            y: window.scrollY > 100 ? [0, 0] : [window.scrollY, window.scrollY], // Adjust vertical movement
          }}
          transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
          style={{
            transformOrigin: "center",
            position: "fixed", // Fix position relative to viewport
            top: "20vh", // You can adjust this for where you want the image to appear
            right: "0",
            transform: scrollingUp ? "rotateY(180deg)" : "rotateY(0deg)", // Rotate when scrolling up
          }}
        >
          <img
            src={imageSrc}
            alt="Flying Image"
            className="w-[40px] md:w-[70px] h-[65px] md:h-[75px] object-contain rounded-lg z-50 absolute"
          />
        </motion.div>
      )}

      <div className="container mx-auto py-16 min-h-screen px-4 md:px-8 lg:px-16 home-background  ">
        <div className="relative group cursor-pointer">
          {/* Image with bounce animation */}
          <img
            src="/images/house.png"
            alt="Game Mode"
            className="w-[35px] md:w-[40px] h-[35px] md:h-[45px] object-contain rounded-lg z-50 absolute  animate-pulse transition-transform duration-300 ease-in-out group-hover:scale-110 top-[-5.5vh] md:left-[-3.3%]"
            onClick={() => {
              window.location.href = "/"; // Adjust the navigation route if needed
            }}
          />
          {/* Tooltip with animation */}
          <div className="absolute left-[1%]  items-center p-2 bg-gray-800 text-white text-sm rounded shadow-md transform transition-opacity duration-1000 ease-in-out opacity-0 group-hover:opacity-100">
            <span>Home!</span>
          </div>
        </div>

        <Parallax speed={-12}>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-4xl font-bold text-center md:mt-8 mt-20 font-['MyCustomFont']"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to My Portfolio
          </motion.h1>

          <motion.p
            className="text-center mt-4 text-base md:text-lg lg:text-lg font-['MyCustomFont']"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            Explore my work and get to know me!
          </motion.p>

          <div className="flex md:flex-row flex-col items-center justify-around">
            <div
              className={`fradius ${
                darkMode ? "bg-[#022a02]" : "bg-[#FBCEB1]"
              } mt-20 md:mt-5 `}
            >
              <motion.div
                className="flex justify-center  items-center"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.3, ease: "easeOut" }}
              >
                <img
                  src={"/images/avataar.png"}
                  alt="Profile"
                  className=" md:w-[100%] md:max-h-[50vh] w-[350px] h-[350px] rounded-full  transition-shadow duration-300 ease-in-out "
                />
                {/* Scrolling icon animation */}
              </motion.div>
            </div>
            <motion.div
              className="md:hidden mt-[8vh] flex justify-center border border-gray-400  rounded-full p-2 pt-4"
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
            <motion.div
              className="flex justify-center mt-[10vh] md:mt-4 items-center w-[105%] md:w-[40%] "
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
            >
              <div className="mt-4 md:max-w-[100%] md:w-[100%] max-w-[95%] text-white rounded-lg shadow-lg overflow-hidden md:h-[300px]">
                <div
                  className={`flex justify-between items-center p-2 ${
                    darkMode
                      ? "bg-[#012001] text-white"
                      : "bg-[#FBCEB1] text-gray-800"
                  }`}
                >
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <p className="text-sm font-mono">Download</p>
                </div>
                <div
                  className={`p-4 font-mono text-sm ${
                    darkMode
                      ? "bg-[#022a02]  text-white"
                      : "bg-[#F2D2BD] text-gray-800"
                  }`}
                >
                  <p className="text-gray-400">// Hello there</p>
                  <h2 className="text-sm mb-2">
                    Hello, This is{" "}
                    <span
                      className={`${
                        darkMode ? "text-yellow-400" : "text-cyan-600"
                      }`}
                    >
                      Piyush Kumar
                    </span>
                    , I'm a Professional Software Developer.
                  </h2>
                  <h2 className="text-xl text-cyan-400 mb-2">
                    Download My Resume
                  </h2>
                  <p className="text-gray-400">
                    // Click below to download my resume in PDF format
                  </p>
                  <pre
                    className={`${
                      darkMode
                        ? "bg-[#18453B] text-white"
                        : "bg-[#F89880] text-black"
                    } p-4 rounded-md mt-2 w-full overflow-x-auto`}
                  >
                    <code
                      className={`block whitespace-pre-wrap break-words text-sm ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      &lt;<span className="text-blue-400">button</span>
                      <span className="text-yellow-400 px-2">class</span>= "
                      <span className="text-green-400">download-btn</span>
                      "&gt;Download&lt;/
                      <span className="text-blue-400">button</span>&gt;
                    </code>
                  </pre>
                  <button
                    onClick={() => {
                      window.location.href =
                        "https://drive.google.com/uc?export=download&id=1XM6arc8Hg6w0Kimxv2Tyctb-xmiDkABu";
                    }}
                    className={`mt-4 ${
                      darkMode
                        ? "bg-[#ADFF2F] text-black"
                        : "bg-[#F88379] text-gray-800"
                    } text-black px-4 py-2 rounded hover:bg-cyan-400 transition`}
                    aria-label="Download Resume"
                  >
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Parallax>
      </div>
      <div className="flex md:flex-row flex-col  md:h-screen items-center justify-center ">
        {/* Main Content Section */}
        <motion.div
          className="w-[300px] md:w-[300px] h-[300px] md:h-[350px] md:ml-[2vw] relative  image-container  md:mt-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <img
            src="/images/aboutme.png"
            alt="3D Animation"
            className="rounded-lg  w-[100%] h-[100%]   object-contain"
          />
        </motion.div>
        <motion.div
          className="flex md:flex-row md:w-[90%]  flex-col flex-grow  items-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className={`text-center  ${
              darkMode
                ? "bg-[#022a02] shadow-green-900"
                : "bg-[#FBCEB1] shadow-orange-900"
            } p-10 md:text-left px-4 ml-[4vw] mr-[8vw] mt-10 shadow-lg  rounded-lg transform transition-all duration-300 hover:scale-105`}
          >
            {/* Greeting Text */}
            <h3 className="text-yellow-400 text-lg mb-2">Hello, Welcome</h3>

            {/* Name Heading with animation and gradient */}
            <h1
              className={`text-3xl md:text-4xl font-bold ${
                darkMode ? "text-white" : "text-black"
              } animated-text`}
              style={{
                background:
                  "linear-gradient(90deg,rgb(19, 172, 255),rgb(212, 231, 38),rgb(69, 218, 19))", // gradient excluding green and orange
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {`I'm Piyush Kumar`.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </h1>

            {/* Short Introduction */}
            <p
              className={`leading-relaxed mt-4 mb-6 text-sm md:text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              "I'm an app and web developer at IB Arts, skilled in React, React
              Native, Node.js, and MongoDB. I specialize in creating
              user-centric applications with a blend of design and
              functionality. With an engineering background and hands-on
              experience, I thrive on solving problems and building seamless
              digital experiences."
            </p>

            {/* Contact Button */}
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md"
              onClick={() => navigate("/contact")}
            >
              Contact Me
            </button>
          </div>
        </motion.div>
        {/* Vertical About Me Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-16 mr-2">
          <div
            className={`w-12 h-48 flex items-center justify-center rounded-lg ${
              darkMode ? "bg-lime-600" : "bg-orange-400"
            }`}
          >
            <h2
              className={`text-sm font-bold text-center ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              ABOUT ME
            </h2>
          </div>
        </div>
      </div>

      <TimeLIne darkMode={darkMode} />
      <Skills darkMode={darkMode} show={true} hide={true} />
      <div className="h-screen">
        <Projects darkMode={darkMode} />{" "}
      </div>
      <div className="md:pl-[8vw]">
        <Contact darkMode={darkMode} hide={true} />
      </div>
      {/* Footer */}
      <footer
        className={`text-center py-2 ${
          darkMode ? "bg-[#022a02] text-white" : "bg-orange-300 text-black"
        }`}
      >
        <p>
          &copy; {new Date().getFullYear()} Piyush Kumar. All Rights Reserved.
        </p>
      </footer>
    </ParallaxProvider>
  );
};

export default Home;
