import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Smartphone, Globe } from "lucide-react";

// Project Data
const entries = [
  {
    id: 1,
    label: "LetsKrunch",
    image: "/images/letsKrunch.png",
    title: "Practice SQL and Python Data Analysis",
    description: "Interactive platform to practice data analysis questions. Solve SQL challenges and Python pandas exercises with immediate feedback.",
    techStack: ["React", "Node.js", "Python", "PostgreSQL"],
    links: [
      { type: "web", url: "https://letskrunch.io", icon: <Globe size={18} /> },
    ],
    category: "web",
  },
  {
    id: 2,
    label: "r-datetime",
    image: "/images/rdatetime.png",
    title: "React Tailwind-themed DateTime Picker",
    description: "Lightweight React date-time picker with zero extra deps. Fully customizable via Tailwind CSS classes.",
    techStack: ["React", "Tailwind CSS", "NPM"],
    links: [
      { type: "npm", url: "https://www.npmjs.com/package/r-datetime", icon: <ExternalLink size={18} /> },
    ],
    category: "web",
  },
  {
    id: 3,
    label: "Anime Oasis",
    image: "/images/animep.png",
    title: "Coolest anime wiki out there",
    description: "A vibrant platform designed for anime enthusiasts. In-depth wikis, character breakdowns, and episode guides.",
    techStack: ["React", "Tailwind CSS", "Chakra UI"],
    links: [
      { type: "web", url: "https://animeoasis.example.com", icon: <Globe size={18} /> },
    ],
    category: "web",
  },
  {
    id: 4,
    label: "Multipoint Inspect",
    image: "/images/mpip.png",
    title: "One way solution for your home inspection",
    description: "Conduct comprehensive home inspections effortlessly. Ensure every corner is covered for safety and efficiency.",
    techStack: ["React", "Tailwind", "MongoDB", "Express"],
    links: [
      { type: "web", url: "https://app.multipointinspect.com/dashboard/", icon: <Globe size={18} /> },
    ],
    category: "web",
  },
  {
    id: 5,
    label: "Zawwar",
    image: "/images/zawwarp.png",
    title: "Test your knowledge about Islam",
    description: "Interactive Islamic quiz platform. Test your knowledge about Islam, earn points and win exciting rewards.",
    techStack: ["React Native", "NodeJS", "MongoDB"],
    links: [
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.zawwar", icon: <Smartphone size={18} /> },
      { type: "appstore", url: "https://apps.apple.com/us/app/zawwar/id6677025088", icon: <Smartphone size={18} /> },
    ],
    category: "app",
  },
  {
    id: 6,
    label: "Star Launch",
    image: "/images/starlaunchp.png",
    title: "Your friendly space travel companion",
    description: "Plan your space travel with ease and confidence. Explore destinations and get safety tips.",
    techStack: ["React Native", "ExpressJS", "Firebase"],
    links: [
      { type: "appstore", url: "https://apps.apple.com/us/app/starlaunch/id6736873282", icon: <Smartphone size={18} /> },
    ],
    category: "app",
  },
  {
    id: 7,
    label: "Vantrail",
    image: "/images/vantrailp.png",
    title: "All your vans in one place",
    description: "Manage all your van collections, discover tools to customize and explore van options.",
    techStack: ["React Native", "NodeJS", "MongoDB"],
    links: [
      { type: "appstore", url: "https://apps.apple.com/us/app/vantrail/id6670694819", icon: <Smartphone size={18} /> },
    ],
    category: "app",
  },
];

const FilterButton = ({ filter, label, activeFilter, onClick, darkMode }) => {
  const isActive = activeFilter === filter;
  return (
    <button
      onClick={() => onClick(filter)}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${isActive
        ? darkMode
          ? "bg-[#045106] text-white shadow-lg shadow-green-900/30"
          : "bg-[#F88379] text-gray-900 shadow-lg shadow-orange-500/30"
        : darkMode
          ? "bg-[#022a02] text-gray-400 hover:bg-[#033a03] hover:text-white"
          : "bg-[#FBCEB1] text-gray-700 hover:bg-[#F2D2BD] hover:text-gray-900"
        }`}
    >
      {label}
    </button>
  );
};

const ProjectCard = ({ project, darkMode }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl border ${darkMode
        ? "bg-[#012001] border-[#045106] hover:border-[#ADFF2F] hover:shadow-lg hover:shadow-green-900/20"
        : "bg-[#F7F9F2] border-[#FBCEB1] hover:border-[#F88379] hover:shadow-xl hover:shadow-orange-200"
        } transition-all duration-300 hover:-translate-y-2`}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? "from-[#012001] via-transparent" : "from-[#F7F9F2] via-transparent"} to-transparent z-10`} />
        <img
          src={project.image}
          alt={project.label}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${darkMode ? "bg-black/60 text-[#ADFF2F] border border-[#045106]" : "bg-white/90 text-[#F88379] shadow-sm"
            }`}>
            {project.category === 'app' ? 'App' : 'Web'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white group-hover:text-[#ADFF2F]" : "text-gray-900 group-hover:text-[#F88379]"} transition-colors`}>
          {project.label}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded-md ${darkMode
                ? "bg-[#022a02] text-gray-300 border border-[#045106]"
                : "bg-[#FBCEB1]/30 text-gray-700 border border-[#FBCEB1]"
                }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${darkMode
                ? "bg-[#022a02] text-gray-400 hover:bg-[#045106] hover:text-[#ADFF2F]"
                : "bg-[#F2D2BD] text-gray-700 hover:bg-[#F88379] hover:text-white"
                }`}
              title={link.type}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ darkMode, isHorizontal = false }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? entries
    : entries.filter(project => project.category === activeFilter);

  return (
    <div className={`transition-colors duration-300 ${
      // If horizontal (in Home), remove min-h-screen to fit better
      isHorizontal ? "py-10" : "min-h-screen py-24"
      } px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-[#011601]" : "bg-gradient-to-b from-[#F7F9F2] to-[#FEECE2]"
      }`}>
      <div className={`${isHorizontal ? "w-full" : "max-w-7xl mx-auto"}`}>
        {/* Header */}
        <div className={`text-center ${isHorizontal ? "mb-8" : "mb-16"}`}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${darkMode
              ? "from-white via-[#ADFF2F] to-[#045106]"
              : "from-gray-900 via-[#F88379] to-[#FBCEB1]"
              } bg-clip-text text-transparent`}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            A collection of applications and tools I've built to solve real-world problems.
          </motion.p>
        </div>

        {/* Filter - Hide in horizontal mode if desired, or keep it. Keeping for now but maybe less margin. */}
        {!isHorizontal && (
          <div className="flex justify-center mb-12 gap-4">
            <FilterButton
              filter="all"
              label="All Projects"
              activeFilter={activeFilter}
              onClick={setActiveFilter}
              darkMode={darkMode}
            />
            <FilterButton
              filter="web"
              label="Web Apps"
              activeFilter={activeFilter}
              onClick={setActiveFilter}
              darkMode={darkMode}
            />
            <FilterButton
              filter="app"
              label="Mobile Apps"
              activeFilter={activeFilter}
              onClick={setActiveFilter}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Layout Conditionally */}
        {isHorizontal ? (
          // Horizontal Scroll Layout
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
            {filteredProjects.map((project) => (
              <div key={project.id} className="min-w-[300px] md:min-w-[350px] snap-center">
                <ProjectCard
                  project={project}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>
        ) : (
          // Standard Grid Layout
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  darkMode={darkMode}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className={`text-xl ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;