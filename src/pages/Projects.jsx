import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";
import { text } from "framer-motion/client";

const entries = [
  {
    id: 1,
    label: "Anime Oasis",
    image: "/images/animep.png",
    desc: "A vibrant platform designed for anime enthusiasts, offering in-depth wikis, character breakdowns, episode guides, and trending updates from the anime world.",
    title: "Coolest anime wiki out there",
    platforms: [
      { type: "web", url: "https://animeoasis.example.com", icon: "/images/web.png" },
    ],
  },
  {
    id: 2,
    label: "Multipoint Inspect",
    image: "/images/mpip.png",
    desc: "An innovative solution for conducting comprehensive home inspections, ensuring every corner is covered for safety, efficiency, and peace of mind.",
    title: "One way solution for your home inspection",
    platforms: [
      { type: "web", url: "https://multipointinspect.example.com", icon: "/images/web.png" },
    ],
  },
  {
    id: 3,
    label: "Zawwar",
    image: "/images/zawwarp.png",
    desc: "A fun and interactive Islamic quiz platform where users can test their knowledge about Islam, earn points, and win exciting rewards.",
    title: "Test your knowledge about Islam and win prizes",
    platforms: [
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=zawwar", icon: "/images/playstore.png" },
      { type: "appstore", url: "https://apps.apple.com/app/zawwar/id123456789", icon: "/images/appstore.png" },
    ],
  },
  {
    id: 4,
    label: "Star Launch",
    image: "/images/starlaunchp.png",
    desc: "Your ultimate companion for space travel planning, providing insights into destinations, safety tips, and the latest innovations in space exploration.",
    title: "Your friendly space travel companion",
    platforms: [
      { type: "appstore", url: "https://apps.apple.com/app/star-launch/id987654321", icon: "/images/appstore.png" },
    ],
  },
  {
    id: 5,
    label: "Vantrail",
    image: "/images/vantrailp.png",
    desc: "A centralized platform for van enthusiasts, offering tools to manage, explore, and customize van collections all in one place.",
    title: "All your vans in one place",
    platforms: [
      { type: "appstore", url: "https://apps.apple.com/app/vantrail/id456789123", icon: "/images/appstore.png" },
    ],
  },
];

const PlatformLinks = ({ platforms }) => (
  <div className="platform-links  w-[100px] h-[40px]">
    {platforms.map((platform, index) => (
      <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="platform-link">
        <img src={platform.icon} alt={`${platform.type} icon`} className="platform-icon" />
      </a>
    ))}
  </div>
);

const Projects = ({ darkMode }) => {
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
        <div className="list mt-[-5vh] md:mt-[0vh]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`item ${index === 0 ? "active" : ""}`}
            >
              <div className="content">
                <div className={`author ${darkMode ? "text-white" : "text-black mb-12"}`}>Projects</div>
                <div className="topic">{slide.label}</div>
                <div className={`title ${darkMode ? "text-white" : "text-black"}`}>{slide.title}</div>
                <div className={`desc ${darkMode ? "text-white" : "text-black"}`}>{slide.desc}</div>
                <PlatformLinks platforms={slide.platforms} />
              </div>
            </div>
          ))}
        </div>
        <div className="thumbnail">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`item ${index === currentSlide ? "active" : ""} justify-center items-center`}
            >
              <div className="content">
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-full object-contain py-3"
                />
                <div className={`title ${darkMode ? "text-white" : "text-black"} text-center`}>
                  {slide.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`arrows ${darkMode ? "text-white" : "text-black"}`}>
          <button className={` ${darkMode ? "bg-[#043927]" : "text-black"}`} id="prev" onClick={handlePrev} disabled={isAnimating}>
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
