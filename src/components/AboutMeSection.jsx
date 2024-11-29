import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const AboutMeSection = ({ darkMode }) => {
  const aboutMeVariants = {
    hidden: { opacity: 0, x: 0 }, // Fully transparent and centered
    focusImage: { opacity: 1, x: 0 }, // Focused on the image
    final: { opacity: 1, x: "-100%" }, // Move the image to the left
  };
  
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the section is visible
    triggerOnce: true, // Only trigger once
  });

  return (
    <motion.div
      ref={ref}
      className="flex md:flex-row flex-col flex-grow items-center"
    >
      {/* Animated Image */}
      <motion.div
        className="w-[300px] md:w-[500px] h-[300px] md:h-[300px] mt-[40vh] md:mt-0 relative mb-8 image-container"
        initial="hidden"
        animate={inView ? "final" : "focusImage"}
        variants={aboutMeVariants}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="/images/aboutme.png"
          alt="3D Animation"
          className="rounded-lg w-[100%] h-[100%] md:ml-[2vw] mr-[auto] object-contain"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="text-xl md:text-lg max-w-[90%] px-4 text-justify animated-border ml-[auto] mr-[auto]"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={contentVariants}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className={`leading-relaxed p-4 ${darkMode ? "text-white" : "text-black"}`}>
          With years of hands-on experience in frameworks like React.js and
          Express.js, I bring ideas to life by crafting dynamic web applications.
          I strive to bridge the gap between aesthetics and functionality,
          ensuring every project is a work of excellence.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutMeSection;
