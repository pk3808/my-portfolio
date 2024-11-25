import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";
import { desc, time, title } from "framer-motion/client";

const entries = [
  {
    id: 1,
    label: "Anime Oasis",
    image: "/images/animep.png",
    desc: "A vibrant platform designed for anime enthusiasts, offering in-depth wikis, character breakdowns, episode guides, and trending updates from the anime world.",
    title: "Coolest anime wiki out there",
  },
  {
    id: 2,
    label: "Multipoint Inspect",
    image: "/images/mpip.png",
    desc: "An innovative solution for conducting comprehensive home inspections, ensuring every corner is covered for safety, efficiency, and peace of mind.",
    title: "One way solution for your home inspection",
  },
  {
    id: 3,
    label: "Zawwar",
    image: "/images/zawwarp.png",
    desc: "A fun and interactive Islamic quiz platform where users can test their knowledge about Islam, earn points, and win exciting rewards.",
    title: "Test your knowledge about Islam and win prizes",
  },
  {
    id: 4,
    label: "Star Launch",
    image: "/images/starlaunchp.png",
    desc: "Your ultimate companion for space travel planning, providing insights into destinations, safety tips, and the latest innovations in space exploration.",
    title: "Your friendly space travel companion",
  },
  {
    id: 5,
    label: "Vantrail",
    image: "/images/vantrailp.png",
    desc: "A centralized platform for van enthusiasts, offering tools to manage, explore, and customize van collections all in one place.",
    title: "All your vans in one place",
  },
];


const Projects = ( {darkMode}) => {
  console.log("Rendering Home with darkMode:", darkMode);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(entries);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeoutRef = useRef(null);

  const timeRunning = 1000;
  const timeAutoNext = 1000;

  const moveSlide = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (direction === "next") {
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides.push(updatedSlides.shift());
        return updatedSlides;
      });
    } else if (direction === "prev") {
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides.unshift(updatedSlides.pop());
        return updatedSlides;
      });
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, timeRunning);
  };

  const handleNext = () => moveSlide("next");
  const handlePrev = () => moveSlide("prev");

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, timeAutoNext);

    return () => clearTimeout(timeoutRef.current);
  }, [slides]);

  return (
    <div className="container mx-auto  min-h-screen">
      <div className="carousel">
        <div className="list mt-[-10vh] md:mt-[0vh]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`item ${index === 0 ? "active" : ""}`}
            >
              <div className="content">
              <div className={`author ${darkMode ? "text-white" : "text-black"}`}>Projects</div>
                <div className="topic">{slide.label}</div>
                <div className={`title ${darkMode ? "text-white" : "text-black"}`}>{slide.title}</div>
                <div className={`desc ${darkMode ? "text-white" : "text-black"}`}>{slide.desc}</div>
                {/* <div className="buttons">
                  <button className={``}>SEE MORE</button>
                  <button>SUBSCRIBE</button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="thumbnail ">
          {slides.map((slide) => (
            <div key={slide.id} className="item">
              <div className="content">
                <img src={slide.image} alt={slide.label} />
                <div className={`title ${darkMode ? "text-white" : "text-black"}`}>{slide.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`arrows ${darkMode ? "text-white" : "text-black"}`}>
          <button id="prev"  onClick={handlePrev} disabled={isAnimating}>
            ⇐
          </button>
          <button id="next" onClick={handleNext} disabled={isAnimating}>
            ⇒
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
