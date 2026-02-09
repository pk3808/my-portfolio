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
  ];

  const renderContent = () => {
    const data = activeTab === "experience" ? experienceData : educationData;
    return (
      <div className="space-y-8 relative pl-2">
        {/* Vertical Line */}
        <div className={`absolute left-[13px] top-8 bottom-0 w-0.5 ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>

        {data.map((item, index) => (
          <div
            key={index}
            className={`relative pl-8 transition-all duration-300 group hover:translate-x-1`}
          >
            {/* Timeline Dot */}
            <div
              className={`absolute left-0 top-8 w-3 h-3 rounded-full border-2 z-10 ${darkMode
                ? "bg-slate-900 border-emerald-500 group-hover:bg-emerald-500"
                : "bg-white border-emerald-500 group-hover:bg-emerald-500"
                } transition-colors duration-300 transform -translate-x-[5px]`}
              style={{ marginLeft: '11px' }} // Center on the line (11px + 6px radius center = 17px? No.)
            ></div>
            {/*
                Line is at left-[13px]. Center is ~14px.
                Dot needs to be centered at 14px.
                Dot width 12px. Center is 6px.
                So Dot left should be 14 - 6 = 8px.
             */}
             <div
              className={`absolute left-[8px] top-8 w-3 h-3 rounded-full border-2 z-10 ${darkMode
                ? "bg-slate-900 border-emerald-500 group-hover:bg-emerald-500"
                : "bg-white border-emerald-500 group-hover:bg-emerald-500"
                } transition-colors duration-300`}
            ></div>

            <div className={`p-6 rounded-2xl border ${darkMode
              ? "bg-slate-800 border-slate-700 hover:border-slate-600"
              : "bg-white border-slate-200 hover:border-emerald-200 shadow-sm hover:shadow-md"
              } transition-all duration-300`}>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"
                      }`}>
                      {activeTab === "experience" ? item.role : item.degree}
                    </h3>
                    <h4 className={`text-lg font-medium ${darkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}>
                      {item.company || item.institution}
                    </h4>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${darkMode
                      ? "bg-slate-700 text-slate-300"
                      : "bg-slate-100 text-slate-600"
                      }`}>
                      {item.date}
                    </span>
                    {item.marks && (
                      <span className={`text-xs font-semibold mt-2 px-3 py-1 rounded-full ${darkMode
                        ? "bg-slate-700 text-emerald-400"
                        : "bg-slate-100 text-emerald-600"
                        }`}>
                        Score: {item.marks}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-6 ${darkMode ? "text-slate-300" : "text-slate-600"
                  }`}>
                  {item.details}
                </p>

                {/* Technologies */}
                {item.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors duration-200 ${darkMode
                          ? "bg-slate-700/50 text-emerald-300 border-slate-600"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`flex md:flex-row flex-col min-h-screen ${bg
        ? "bg-transparent"
        : darkMode
          ? "bg-slate-900 text-white"
          : "bg-slate-50 text-slate-900"
        }`}
    >
      {/* Left Menu - Desktop */}
      <div className="hidden md:flex flex-col justify-start pt-32 w-60 px-8 ml-20">
        <div className="space-y-2 sticky top-32">
          {["experience", "education"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full py-3 px-4 text-left font-medium text-lg rounded-lg transition-all duration-300 ${activeTab === tab
                ? darkMode
                  ? "bg-slate-800 text-white shadow-lg shadow-black/20"
                  : "bg-white text-emerald-600 shadow-md shadow-emerald-100/50"
                : darkMode
                  ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
            >
              <span className="flex items-center">
                 {/* Bullet Point */}
                <span className={`w-2 h-2 rounded-full mr-3 transition-colors ${activeTab === tab
                  ? darkMode
                    ? "bg-emerald-400"
                    : "bg-emerald-500"
                  : "bg-slate-300"
                  }`}></span>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden w-full px-4 pt-8 pb-4">
        <div className={`flex w-full rounded-xl overflow-hidden border p-1 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
          {["experience", "education"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 text-center font-medium text-sm rounded-lg transition-all duration-300 ${activeTab === tab
                ? darkMode
                  ? "bg-slate-700 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-700 shadow-sm"
                : darkMode
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-4 md:px-8 py-8 md:pt-32">
        <div className="max-w-4xl">
          {renderContent()}
        </div>
      </div>

       {/* Vertical Timeline Indicator - Desktop - Repurposed as stylistic element */}
       <div className="hidden md:flex flex-col justify-center items-center w-16 mr-8">
          <div
            className={`w-[1px] h-48 ${darkMode ? "bg-gradient-to-b from-transparent via-slate-700 to-transparent" : "bg-gradient-to-b from-transparent via-slate-300 to-transparent"
              }`}
          ></div>
           <div className={`writing-mode-vertical text-xs tracking-[0.2em] font-medium uppercase py-4 ${darkMode ? "text-slate-600" : "text-slate-400"}`} style={{ writingMode: 'vertical-rl' }}>
            Timeline
           </div>
           <div
            className={`w-[1px] h-48 ${darkMode ? "bg-gradient-to-b from-transparent via-slate-700 to-transparent" : "bg-gradient-to-b from-transparent via-slate-300 to-transparent"
              }`}
          ></div>
      </div>
    </div>
  );
};

export default TimeLine;
