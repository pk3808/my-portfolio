import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const entries = [
  {
    id: 1,
    label: "Anime Oasis",
    image: "/images/animep.png",
    desc: [
      "A vibrant platform designed for anime enthusiasts.",
      "In-depth wikis, character breakdowns, and episode guides.",
      "Stay updated with trending news from the anime world.",
      "Technology used: React, Tailwind CSS, Chakra ui.",
    ],
    title: "Coolest anime wiki out there",
    platforms: [
      {
        type: "web",
        url: "https://animeoasis.example.com",
        icon: "/images/web.png",
      },
    ],
  },
  {
    id: 2,
    label: "Multipoint Inspect",
    image: "/images/mpip.png",
    title: "One way solution for your home inspection",
    desc: [
      "Conduct comprehensive home inspections effortlessly.",
      "Ensure every corner is covered for safety and efficiency.",
      "Achieve peace of mind with our innovative solution.",
      "Technology used: React, Tailwind CSS, Chakra ui,mongoDB,ExpressJS",
    ],
    platforms: [
      {
        type: "web",
        url: "https://app.multipointinspect.com/dashboard/",
        icon: "/images/web.png",
      },
    ],
  },
  {
    id: 3,
    label: "Zawwar",
    image: "/images/zawwarp.png",
    title: "Test your knowledge about Islam and win prizes",
    desc: [
      "Interactive Islamic quiz platform.",
      "Test your knowledge about Islam.",
      "Earn points and win exciting rewards.",
      "Technology used: React Native,NodeJS, MongoDB",
    ],
    platforms: [
      {
        type: "playstore",
        url: "https://play.google.com/store/apps/details?id=com.zawwar",
        icon: "/images/playstore.png",
      },
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/zawwar/id6677025088",
        icon: "/images/appstore.png",
      },
    ],
  },
  {
    id: 4,
    label: "Star Launch",
    image: "/images/starlaunchp.png",
    title: "Your friendly space travel companion",
    desc: [
      "Plan your space travel with ease and confidence.",
      "Explore destinations and get safety tips.",
      "Stay updated with the latest in space exploration.",
      "Technology used: React Native,ExpressJS, Firebase,",
    ],
    platforms: [
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/starlaunch/id6736873282",
        icon: "/images/appstore.png",
      },
    ],
  },
  {
    id: 5,
    label: "Vantrail",
    image: "/images/vantrailp.png",
    title: "All your vans in one place",
    desc: [
      "Manage all your van collections in one place.",
      "Discover tools to customize and explore van options.",
      "A hub for van enthusiasts to share and grow.",
      "Technology used: React Native,NodeJS, MongoDB,ExpressJS",
    ],
    platforms: [
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/vantrail/id6670694819",
        icon: "/images/appstore.png",
      },
    ],
  },
];

const PlatformLinks = ({ platforms }) => (
  <div className="platform-links  w-[100px] h-[40px]">
    {platforms.map((platform, index) => (
      <a
        key={index}
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className="platform-link"
      >
        <img
          src={platform.icon}
          alt={`${platform.type} icon`}
          className="platform-icon"
        />
      </a>
    ))}
  </div>
);

const Projects = ({ darkMode, h }) => {
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
        <div className={`list mt-[10vh] md:mt-[14vh] `}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`item ${index === 0 ? "active" : ""}`}
            >
              <div className="content max-w-[60vw]">
                <div
                  className={`author ${
                    darkMode ? "text-white" : "text-black "
                  }`}
                >
                  Projects
                </div>
                <div className="topic">{slide.label}</div>
                <div
                  className={`title ${darkMode ? "text-white" : "text-black"}`}
                >
                  {slide.title}
                </div>
                <div
                  className={`desc my-4 ${darkMode ? "text-white" : "text-black"}`}
                >
                  <ul className="list-disc pl-5">
                    {slide.desc.map((point, idx) => (
                      <h1 className="md:text-lg text-[15px]" key={idx}>{point}</h1>
                    ))}
                  </ul>
                </div>
                
                <PlatformLinks platforms={slide.platforms} />
              </div>
            </div>
          ))}
        </div>
        <div className="thumbnail">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`item ${index === currentSlide ? "active" : ""} `}
            >
              <div className="content">
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-full object-contain py-3"
                />
                <div
                  className={`title ${
                    darkMode ? "text-white" : "text-black"
                  } text-center `}
                >
                  {slide.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`arrows ${darkMode ? "text-white" : "text-black"}`}>
          <button
            className={` ${darkMode ? "bg-[#043927]" : "text-black"}`}
            id="prev"
            onClick={handlePrev}
            disabled={isAnimating}
          >
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
