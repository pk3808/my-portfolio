import React, { useState } from "react";

const TimeLine = ({ darkMode , bg}) => {
  const [activeTab, setActiveTab] = useState("experience");

  const educationData = [
    {
      degree: "B.Tech in Electrical and Electronics Engineering",
      institution: "XYZ University",
      date: "2016 - 2020",
      details:
        "Focused on circuit design, control systems, and embedded technology.",
    },
    {
      degree: "Intermediate Science",
      institution: "ABC College",
      date: "2014 - 2016",
      details: "Specialized in Physics, Chemistry, and Mathematics.",
    },
  ];

  const experienceData = [
    {
      role: "Software Engineer",
      company: "Tech Solutions Inc.",
      date: "2022 - Present",
      details:
        "Worked on full-stack web development using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.", 
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      role: "Frontend Developer Intern",
      company: "Web Innovators",
      date: "2021 - 2022",
      details:
        "Built responsive UI components using React and integrated APIs. Collaborated with the design team to create visually appealing and user-friendly interfaces.Worked on full-stack web development using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
        technologies: ["React", "HTML", "CSS"],
    },
  ];

  const renderContent = () => {
    const data = activeTab === "experience" ? experienceData : educationData;
    return data.map((item, index) => (
      <div
        key={index}
        className={`mb-6 p-4 border-l-4 ${
          darkMode ? "border-green-500" : "border-orange-500"
        } backdrop-blur-md bg-opacity-50 hover:scale-105 transition-transform duration-300 rounded-md shadow-lg`}
      >
        <h3 className="text-lg font-bold">
          {activeTab === "experience" ? item.role : item.degree} -{" "}
          {item.company || item.institution}
        </h3>
        <p className="text-sm text-gray-500">{item.date}</p>
        <p>{item.details}</p>
        {item.technologies && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-medium bg-gray-700 text-white rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`flex md:flex-row flex-col h-[100vh] items-center justify-center ${
        bg
        ? "bg-transparent"
        : darkMode
        ? "bg-[#032903] text-white"
        : "bg-[#F5F5DC] text-black"
      }`}
    >
      {/* Left Menu */}
      <div className="flex flex-col items-center justify-center w-[35vw]">
        {["experience", "education"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 m-2 relative group font-semibold ${
              activeTab === tab ? "text-green-500" : "text-gray-500"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-green-500 group-hover:h-full transition-all duration-300 ${
                activeTab === tab ? "h-full" : ""
              }`}
            ></span>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Right Content */}
      <div
        className={`md:w-[65vw] w-full ${
          darkMode ? "border-green-500" : "border-orange-500"
        }`}
      >
        {renderContent()}
      </div>

      {/* Vertical Timeline */}
      <div
        className={`flex-col items-center justify-center hidden md:block ml-[10vw] w-7 h-[170px] self-center ${
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
            transform: "rotate(360deg)",
          }}
        >
          Timeline
        </h2>
      </div>
    </div>
  );
};

export default TimeLine;
