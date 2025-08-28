import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const entries = [
  {
    id: 1,
    label: "LetsKrunch",
    image: "/images/letsKrunch.png",
    title: "Practice SQL and Python Data Analysis",
    desc: [
      "Interactive platform to practice data analysis questions.",
      "Solve SQL challenges and Python pandas exercises.",
      "Get immediate feedback and hints.",
      "Technology used: React, Node.js, Python, PostgreSQL.",
    ],
    platforms: [
      {
        type: "web",
        url: "https://letskrunch.io",
        icon: "/images/web.png",
      },
    ],
    category: "web"
  },
  {
    id: 2,
    label: "r-datetime",
    image: "/images/rdatetime.png",
    title: "React Tailwind-themed DateTime Picker",
    desc: [
      "Lightweight React date-time picker with zero extra deps.",
      "Supports date, time, or combined datetime modes.",
      "Fully customizable via Tailwind CSS classes.",
      "Advanced features: range selection, presets, timezone selector.",
    ],
    platforms: [
      {
        type: "web",
        url: "https://www.npmjs.com/package/r-datetime",
        icon: "/images/web.png",
      },
    ],
    category: "web"
  },
  {
    id: 3,
    label: "Anime Oasis",
    image: "/images/animep.png",
    title: "Coolest anime wiki out there",
    desc: [
      "A vibrant platform designed for anime enthusiasts.",
      "In-depth wikis, character breakdowns, and episode guides.",
      "Stay updated with trending news from the anime world.",
      "Technology used: React, Tailwind CSS, Chakra UI.",
    ],
    platforms: [
      {
        type: "web",
        url: "https://animeoasis.example.com",
        icon: "/images/web.png",
      },
    ],
    category: "web"
  },
  {
    id: 4,
    label: "Multipoint Inspect",
    image: "/images/mpip.png",
    title: "One way solution for your home inspection",
    desc: [
      "Conduct comprehensive home inspections effortlessly.",
      "Ensure every corner is covered for safety and efficiency.",
      "Achieve peace of mind with our innovative solution.",
      "Technology used: React, Tailwind CSS, Chakra UI, MongoDB, ExpressJS.",
    ],
    platforms: [
      {
        type: "web",
        url: "https://app.multipointinspect.com/dashboard/",
        icon: "/images/web.png",
      },
    ],
    category: "web"
  },
  {
    id: 5,
    label: "Zawwar",
    image: "/images/zawwarp.png",
    title: "Test your knowledge about Islam and win prizes",
    desc: [
      "Interactive Islamic quiz platform.",
      "Test your knowledge about Islam.",
      "Earn points and win exciting rewards.",
      "Technology used: React Native, NodeJS, MongoDB.",
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
    category: "app"
  },
  {
    id: 6,
    label: "Star Launch",
    image: "/images/starlaunchp.png",
    title: "Your friendly space travel companion",
    desc: [
      "Plan your space travel with ease and confidence.",
      "Explore destinations and get safety tips.",
      "Stay updated with the latest in space exploration.",
      "Technology used: React Native, ExpressJS, Firebase.",
    ],
    platforms: [
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/starlaunch/id6736873282",
        icon: "/images/appstore.png",
      },
    ],
    category: "app"
  },
  {
    id: 7,
    label: "Vantrail",
    image: "/images/vantrailp.png",
    title: "All your vans in one place",
    desc: [
      "Manage all your van collections in one place.",
      "Discover tools to customize and explore van options.",
      "A hub for van enthusiasts to share and grow.",
      "Technology used: React Native, NodeJS, MongoDB, ExpressJS.",
    ],
    platforms: [
      {
        type: "appstore",
        url: "https://apps.apple.com/us/app/vantrail/id6670694819",
        icon: "/images/appstore.png",
      },
    ],
    category: "app"
  },
];

const PlatformLinks = ({ platforms }) => (
  <div className="platform-links w-[100px] h-[40px]">
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

const FilterToggle = ({ activeFilter, onFilterChange, darkMode }) => {
  const filters = [
    { key: "all", label: "All", icon: "🎯", count: entries.length },
    { key: "web", label: "Web", icon: "🌐", count: entries.filter(e => e.category === "web").length },
    { key: "app", label: "Apps", icon: "📱", count: entries.filter(e => e.category === "app").length }
  ];

  return (
    <div className="filter-toggle-container fixed top-4 hidden md:block right-10 z-50 md:absolute md:top-14 md:right-0">
      <div className={`filter-toggle-wrapper backdrop-blur-md rounded-xl border transition-all duration-300 transform hover:scale-[1.02] ${
        darkMode 
          ? "bg-gray-900/85 border-gray-700/50 shadow-xl shadow-emerald-500/10" 
          : "bg-white/90 border-gray-200/50 shadow-xl shadow-blue-500/10"
      }`}>
        <div className="p-1.5  ">
          <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={`filter-toggle-btn group relative px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 min-w-[80px] text-sm ${
                  activeFilter === filter.key
                    ? darkMode
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20"
                    : darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800/60"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/60"
                }`}
              >
                <span className="text-sm">{filter.icon}</span>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{filter.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeFilter === filter.key 
                      ? "bg-white/20 text-white/90" 
                      : darkMode 
                      ? "bg-gray-700/50 text-gray-400" 
                      : "bg-gray-200/50 text-gray-500"
                  }`}>
                    {filter.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Subtle decorative dot */}
        <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
          darkMode ? "bg-emerald-500" : "bg-blue-500"
        } opacity-40 animate-pulse`} />
      </div>
    </div>
  );
};

const Projects = ({ darkMode, h }) => {
  console.log("Rendering Home with darkMode:", darkMode);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [slides, setSlides] = useState(entries);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeoutRef = useRef(null);

  const timeRunning = 1000;
  const timeAutoNext = 1000;

  // Filter entries based on active filter
  useEffect(() => {
    const filtered = activeFilter === "all" 
      ? entries 
      : entries.filter(entry => entry.category === activeFilter);
    
    setFilteredEntries(filtered);
    setSlides(filtered);
    setCurrentSlide(0);
    
    // Clear timeout when filter changes
    clearTimeout(timeoutRef.current);
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    if (filter !== activeFilter) {
      setActiveFilter(filter);
    }
  };

  const moveSlide = (direction) => {
    if (isAnimating || filteredEntries.length <= 1) return;

    setIsAnimating(true);

    if (direction === "next") {
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides.push(updatedSlides.shift());
        return updatedSlides;
      });
      setCurrentSlide((prev) => (prev + 1) % filteredEntries.length);
    } else if (direction === "prev") {
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides.unshift(updatedSlides.pop());
        return updatedSlides;
      });
      setCurrentSlide((prev) => (prev - 1 + filteredEntries.length) % filteredEntries.length);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, timeRunning);
  };

  const navigateToSlide = (targetIndex) => {
    if (isAnimating || targetIndex === currentSlide || filteredEntries.length <= 1) return;

    const currentIndex = currentSlide;
    const distance = (targetIndex - currentIndex + filteredEntries.length) % filteredEntries.length;
    
    // Determine the shorter path
    const stepsForward = distance;
    const stepsBackward = filteredEntries.length - distance;
    
    const direction = stepsForward <= stepsBackward ? "next" : "prev";
    const steps = direction === "next" ? stepsForward : stepsBackward;

    // Clear any existing auto-advance timeout
    clearTimeout(timeoutRef.current);
    
    let currentStep = 0;
    const navigateStep = () => {
      if (currentStep < steps) {
        moveSlide(direction);
        currentStep++;
        setTimeout(navigateStep, timeRunning);
      } else {
        // Resume auto-advance after navigation is complete
        timeoutRef.current = setTimeout(() => {
          handleNext();
        }, timeAutoNext);
      }
    };

    navigateStep();
  };

  const handleNext = () => moveSlide("next");
  const handlePrev = () => moveSlide("prev");

  useEffect(() => {
    if (filteredEntries.length > 1) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, timeAutoNext);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [slides, filteredEntries.length]);

  // Show message when no projects match the filter
  if (filteredEntries.length === 0) {
    return (
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center relative">
        <FilterToggle 
          activeFilter={activeFilter} 
          onFilterChange={handleFilterChange} 
          darkMode={darkMode} 
        />
        <div className={`text-center mt-20 ${darkMode ? "text-white" : "text-black"}`}>
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            No projects found
          </h2>
          <p className="text-lg opacity-70">Try selecting a different filter option to explore more projects.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen relative">
      <FilterToggle 
        activeFilter={activeFilter} 
        onFilterChange={handleFilterChange} 
        darkMode={darkMode} 
      />
      
      <div className="carousel">
        <div className={`list mt-[10vh] md:mt-[14vh]`}>
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

        {filteredEntries.length > 1 && (
          <div className="thumbnail">
            {slides.map((slide, index) => {
              // Find the original index of this slide in the filtered entries array
              const originalIndex = filteredEntries.findIndex(entry => entry.id === slide.id);
              return (
                <div
                  key={slide.id}
                  className={`item ${index === 0 ? "active" : ""} cursor-pointer hover:opacity-80 transition-opacity duration-200`}
                  onClick={() => navigateToSlide(originalIndex)}
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
              );
            })}
          </div>
        )}

        {filteredEntries.length > 1 && (
          <div className={` ${darkMode ? "text-white" : "text-black"}`}>
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
        )}
      </div>
    </div>
  );
};

export default Projects;