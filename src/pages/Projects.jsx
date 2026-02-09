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
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
          : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
        : darkMode
          ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
          : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200"
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`group relative h-[450px] overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-lg"
      }`}
    >
      {/* Background Image Area - Top Half */}
      <div className="h-[240px] overflow-hidden relative">
         <img
          src={project.image}
          alt={project.label}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md bg-black/40 text-white border border-white/20 shadow-sm">
            {project.category === 'app' ? 'App' : 'Web'}
            </span>
        </div>
      </div>


      {/* Content Section - Bottom Half */}
      <div className={`p-6 flex flex-col h-[210px] justify-between ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
        <div>
            <h3 className={`text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}>
            {project.label}
            </h3>

            <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            {project.description}
            </p>
        </div>

        <div>
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech, i) => (
                <span
                key={i}
                className={`text-xs px-2 py-1 rounded-md border ${
                    darkMode
                    ? "bg-slate-700/50 border-slate-600 text-slate-300"
                    : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
                >
                {tech}
                </span>
            ))}
            {project.techStack.length > 3 && (
                 <span className={`text-xs px-2 py-1 rounded-md border ${darkMode ? "border-slate-600 text-slate-400" : "border-slate-200 text-slate-500"}`}>+{project.techStack.length - 3}</span>
            )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
            {project.links.map((link, i) => (
                <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors shadow-sm border ${
                    darkMode
                    ? "bg-slate-700 hover:bg-emerald-600 hover:text-white border-slate-600 text-slate-300"
                    : "bg-slate-50 hover:bg-emerald-500 hover:text-white border-slate-200 text-slate-600"
                }`}
                title={link.type}
                >
                {link.icon}
                </a>
            ))}
            </div>
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
      isHorizontal ? "py-10" : "min-h-screen py-24"
      } px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}>
      <div className={`${isHorizontal ? "w-full" : "max-w-7xl mx-auto"}`}>
        {/* Header */}
        <div className={`text-center ${isHorizontal ? "mb-8" : "mb-16"}`}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${darkMode
              ? "from-white to-slate-400"
              : "from-slate-900 to-slate-600"
              } bg-clip-text text-transparent`}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            A collection of applications and tools I've built to solve real-world problems.
          </motion.p>
        </div>

        {/* Filter */}
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
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide px-4">
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
            <p className={`text-xl ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
