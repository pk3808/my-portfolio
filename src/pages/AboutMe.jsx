import React from "react";
import { motion } from "framer-motion";
const AboutMe = ({ darkMode }) => {
  return (
    <div className="flex md:flex-row flex-col  md:h-screen items-center justify-center">
      {/* Main Content Section */}
      <motion.div
        className="flex md:flex-row flex-col flex-grow  items-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-[300px] md:w-[500px] h-[300px] md:h-[300px] md:ml-[2vw] relative mb-8 image-container  md:mt-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <img
            src="/images/aboutme.png"
            alt="3D Animation"
            className="rounded-lg  w-[100%] h-[100%] md:ml-[2vw] mr-[auto] object-contain"
          />
        </motion.div>

        <div className="text-xl md:text-lg    px-4 text-justify  animated-border ml-[4vw] mr-[4vw] ">
          <p
            className={`leading-relaxed p-4 ${darkMode ? "text-white" : "text-black"}`}
          >
            With years of hands-on experience in frameworks like React.js and
            Express.js, I bring ideas to life by crafting dynamic web
            applications. I strive to bridge the gap between aesthetics and
            functionality, ensuring every project is a work of excellence.
            With years of hands-on experience in frameworks like React.js and
            Express.js, I bring ideas to life by crafting dynamic web
            applications. I strive to bridge the gap between aesthetics and
            functionality, ensuring every project is a work of excellence.
          </p>
          <p
            className={`leading-relaxed p-4 ${darkMode ? "text-white" : "text-black"}`}
          >
            With years of hands-on experience in frameworks like React.js and
            Express.js, I bring ideas to life by crafting dynamic web
            applications. I strive to bridge the gap between aesthetics and
            functionality, ensuring every project is a work of excellence.
          </p>
        </div>
      </motion.div>

      {/* Vertical About Me Section */}
      <div
        className={`flex-col items-center justify-center hidden md:block ${darkMode ? "text-white bg-lime-600" : "text-gray-800 bg-orange-400"}`}
      >
        <h2
          className={`text-sm font-bold text-center px-1 py-2 ${darkMode ? "text-white" : "text-gray-800"}`}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
            transform: "rotate(360deg)", // Flip text to make it natural
          }}
        >
          ABOUT ME
        </h2>
      </div>
    </div>
  );
};

export default AboutMe;
