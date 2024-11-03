import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Blogs from '../pages/Blogs';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';
import BrickBreaker from '../games/BrickBreaker';
import SplashScreen from '../pages/SplashScreen';
import Game from '../games/Game';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/game" element={<BrickBreaker />} /> */}
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default AppRoutes;
