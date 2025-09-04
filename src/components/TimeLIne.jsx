import React, { useState } from "react";

const TimeLine = ({ darkMode, bg }) => {
  const [activeTab, setActiveTab] = useState("experience");

  const educationData = [
    {
      degree: "B.Tech in Electrical and Electronics Engineering",
      institution: "B.P Mandal College of Engineering, Madhepura (Bihar)",
      date: "2019 - 2023",
      marks: "8.04 CGPA",
      details:
        "Gained a strong understanding of electrical and electronics engineering principles, including circuit design, control systems, and embedded systems. Participated in projects and practical labs to apply theoretical knowledge. Developed problem-solving and teamwork skills through collaborative assignments.",
    },
    {
      degree: "Intermediate Science",
      institution: "Krishna Public School, CBSE Board",
      marks: "62.2%",
      date: "2019",
      details:
        "Studied core subjects such as Physics, Chemistry, and Mathematics, building a solid foundation for engineering studies. Developed an interest in analytical thinking and scientific problem-solving through coursework and practical applications.",
    },
  ];

  const experienceData = [
    {
      role: "App Developer",
      company: "IB Arts Pvt Ltd.",
      date: "Jan 2024 - Present",
      details:
        "As an App Developer at IB Arts Pvt Ltd., I design, develop, and deploy full-stack web and mobile applications. I specialize in creating interactive UIs with React.js and React Native, seamlessly integrating backend services using Node.js and MongoDB. Working with cross-functional teams, I deliver scalable solutions that meet business needs and enhance user experience. My role involves writing clean, maintainable code, optimizing performance, and implementing new features to stay current with industry trends. I also debug issues, ensure quality, and use tools like Next.js, Tailwind CSS, and Git to streamline development and maintain code consistency.",
      technologies: [
        "React JS",
        "React Native",
        "MongoDB",
        "Next Js",
        "Node JS",
        "Tailwind CSS",
      ],
    },
    // {
    //   role: "App Developer Intern",
    //   company: "IB Arts Pvt Ltd.",
    //   date: "Jan 2024 - July 2024",
    //   details:
    //     "Built responsive UI components using React and integrated APIs. Collaborated with the design team to create visually appealing and user-friendly interfaces.Worked on full-stack web development using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    //   technologies: ["React", "HTML", "CSS", "React Native", "JavaScript"],
    // },
  ];

  const renderContent = () => {
    const data = activeTab === "experience" ? experienceData : educationData;
    return (
      <div className="space-y-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`relative p-6 border-l-6 ${
              darkMode
                ? "border-green-500 bg-[#022a02]"
                : "border-orange-500 bg-[#FBCEB1]"
            } rounded-r-lg transition-all duration-300 hover:translate-x-2`}
          >
            {/* Timeline Dot */}
            <div
              className={`absolute -left-3 top-6 w-6 h-6 rounded-full border-4 ${
                darkMode
                  ? "bg-green-500 border-green-300"
                  : "bg-orange-500 border-orange-300"
              }`}
            ></div>
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className={`text-xl font-bold mb-1 ${
                  darkMode ? "text-green-100" : "text-gray-800"
                }`}>
                  {activeTab === "experience" ? item.role : item.degree}
                </h3>
                <h4 className={`text-lg font-semibold ${
                  darkMode ? "text-green-200" : "text-orange-700"
                }`}>
                  {item.company || item.institution}
                </h4>
              </div>
              <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  darkMode 
                    ? "bg-green-600 text-green-100" 
                    : "bg-orange-600 text-orange-100"
                }`}>
                  {item.date}
                </span>
                {item.marks && (
                  <span className={`text-sm font-medium mt-2 px-3 py-1 rounded-full ${
                    darkMode 
                      ? "bg-green-700 text-green-100" 
                      : "bg-orange-700 text-orange-100"
                  }`}>
                    Score: {item.marks}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className={`text-base leading-relaxed mb-4 ${
              darkMode ? "text-green-50" : "text-gray-700"
            }`}>
              {item.details}
            </p>

            {/* Technologies */}
            {item.technologies && (
              <div className="flex flex-wrap gap-3">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 text-sm font-semibold bg-yellow-600 text-black rounded-md border-2 border-yellow-500 hover:bg-yellow-500 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`flex md:flex-row flex-col min-h-screen ${
        bg
          ? "bg-transparent"
          : darkMode
          ? "bg-transparent text-white"
          : "bg-[#F5F5DC] text-black"
      }`}
    >
      {/* Left Menu - Desktop */}
      <div className="hidden md:flex flex-col justify-center w-60 px-8 ml-20">
        <div className="space-y-4">
          {["experience", "education"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full py-4 px-6 text-left relative font-bold text-lg border-l-4 transition-all duration-300 ${
                activeTab === tab
                  ? darkMode
                    ? "border-green-500 bg-[#004225] text-green-100"
                    : "border-orange-500 bg-[#FBCEB1] text-orange-800"
                  : darkMode
                  ? "border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-200"
                  : "border-gray-400 text-gray-600 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              <span className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-3 ${
                  activeTab === tab
                    ? darkMode
                      ? "bg-green-500"
                      : "bg-orange-500"
                    : "bg-gray-400"
                }`}></span>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden w-full px-4 pt-8 pb-4">
        <div className="flex w-full rounded-lg overflow-hidden border-2 border-gray-300">
          {["experience", "education"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-center font-bold transition-all duration-300 ${
                activeTab === tab
                  ? darkMode
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-4 md:px-8 py-8">
        <div className="max-w-4xl">
          {renderContent()}
        </div>
      </div>

      {/* Vertical Timeline Indicator - Desktop */}
      <div className="hidden md:flex flex-col justify-center items-center w-16">
        <div
          className={`w-12 h-48 flex items-center justify-center rounded-lg ${
            darkMode ? "bg-lime-600" : "bg-orange-400"
          }`}
        >
          <h2
            className={`text-sm font-bold text-center ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            TIMELINE
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;