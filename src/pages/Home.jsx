import React from "react";
import { motion } from "framer-motion";
import SocialMediaIcons from "../components/SocialMediaIcons";
import { useNavigate } from "react-router-dom";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const Home = ({ darkMode }) => {
  const navigate = useNavigate();
  console.log("Rendering Home with darkMode:", darkMode);

  return (
    <ParallaxProvider>
      <div className="container mx-auto py-16 min-h-screen px-4 md:px-8 lg:px-16 home-background ">
        <Parallax speed={-10}>
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
              className={`fradius ${darkMode ? "bg-[#043927]" : "bg-[#FBCEB1]"
                } mt-20 md:mt-5 `}
            >
              <motion.div
                className="flex justify-center  items-center"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
              >
                <img
                  src={"../../public/images/Avataar.png"}
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
                  className={`flex justify-between items-center p-2 ${darkMode
                    ? "bg-[#1B4D3E] text-white"
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
                  className={`p-4 font-mono text-sm ${darkMode
                    ? "bg-[#023020] text-white"
                    : "bg-[#F2D2BD] text-gray-800"
                    }`}
                >
                  <p className="text-gray-400">// About me</p>
                  <h2 className="text-sm mb-2">
                    Hello, This is{" "}
                    <span
                      className={`${darkMode ? "text-yellow-400" : "text-cyan-600"
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
                    className={`${darkMode
                      ? "bg-[#18453B] text-white"
                      : "bg-[#F89880] text-black"
                      } p-4 rounded-md mt-2 w-full overflow-x-auto`}
                  >
                    <code
                      className={`block whitespace-pre-wrap break-words text-sm ${darkMode ? "text-white" : "text-black"
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
                    onClick={() =>
                      window.open(
                        "https://drive.google.com/uc?export=download&id=1GGRFEGmqbbmQXquxZauXMQ1YvtOqZ"
                      )
                    }
                    className={`mt-4 ${darkMode
                      ? "bg-[#ADFF2F] text-black"
                      : "bg-[#F88379] text-gray-800"
                      } text-black px-4 py-2 rounded hover:bg-cyan-400 transition`}
                  >
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </Parallax>
      </div>
      <div className="flex flex-row h-screen items-center justify-center ">

        {/* Main Content Section */}
        <motion.div
          className="flex flex-row  flex-grow  items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-[300px] md:w-[400px] relative mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="/gif/aboutme.gif"
              alt="3D Animation"
              className="rounded-lg hover:shadow-2xl w-[100%] transition-shadow duration-500"
            />
          </motion.div>

          <motion.div
            className="text-xl md:text-lg max-w-3xl px-4 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            <p
              className={`leading-relaxed ${darkMode ? "text-white" : "text-black"}`}
            >
              With years of hands-on experience in frameworks like React.js
              and Express.js, I bring ideas to life by crafting dynamic web
              applications. I strive to bridge the gap between aesthetics and
              functionality, ensuring every project is a work of excellence.
            </p>
          </motion.div>
        </motion.div>
        {/* Vertical About Me Section */}
        <div className={`flex flex-col items-center justify-center h-[30vh] w-[2vw]   ${darkMode ? "text-white bg-lime-600" : "text-gray-800 bg-orange-400"}`}>
          <h2
            className={`text-sm font-bold text-center ${darkMode ? "text-white" : "text-gray-800"}`}
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


    </ParallaxProvider>
  );
};

export default Home;
