import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom"; // for navigation with special bricks

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-16 min-h-screen px-4 md:px-8 lg:px-16 font-['MyCustomFont']">

      {/* Animate the title */}
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:mt-8 mt-14"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Welcome to My Portfolio
      </motion.h1>

      {/* Animate the description */}
      <motion.p
        className="text-center mt-4 text-base md:text-lg lg:text-xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        Explore my work and get to know me!
      </motion.p>

      <motion.div
        className="flex justify-center mt-16 md:mt-8 items-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={"../../public/images/Avataar.png"}
          alt="Profile"
          className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 md:rounded-full rounded-half shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        />
      </motion.div>
      <div className="text-center mt-4 text-base md:text-lg lg:text-xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-transparent bg-clip-text" onClick={() => navigate("/game")}> Play to know me better</div>
    </div>
  );
};

export default Home;
