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
            className={`leading-relaxed p-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {" "}
            I'm Piyush Kumar, a passionate app developer at IB Arts in Kolkata.
            With a solid foundation in **React**, **JavaScript**, **Node.js**,
            **Express**, and **Next.js**, I specialize in building dynamic,
            user-centric web applications. I combine **aesthetic design** with
            **functional excellence** to create seamless digital experiences. My
            journey started with a Bachelor's degree in Electrical and
            Electronics Engineering (8.0 CGPA), and since then, I've contributed
            to multiple successful projects at IB Arts. Proficient in HTML, CSS,
            Git, and Java, I bring technical expertise and a commitment to
            continuous learning to every challenge I tackle. I thrive on solving
            complex problems, refining user experiences, and transforming ideas
            into reality through code. My goal is to bridge creativity with
            technology, ensuring that every project is not just functional but
            exceptional.
          </p>
        </div>
      </motion.div>

      {/* Vertical About Me Section */}
      <div
        className={`flex-col items-center justify-center hidden md:block ${
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
