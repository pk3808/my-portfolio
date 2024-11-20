import React, { useState } from "react";

const Home = () => {
  const [showLogos, setShowLogos] = useState(false);

  const techLogos = [
    { name: "JavaScript", src: "/images/js.png" },
    { name: "React", src: "/images/reactjs.png" },
    { name: "Next.js", src: "/images/nextjs.png" },
    { name: "Tailwind CSS", src: "/images/tailwind.png" },
    { name: "React Native", src: "/images/reactnative.png" },
    { name: "Java", src: "/images/java.png" },
    { name: "C++", src: "/images/c++.png" },
    { name: "Node.js", src: "/images/node.png" },
    { name: "MongoDB", src: "/images/mongodb.png" },
    { name: "Git", src: "/images/git.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Animated Sphere with Click Here */}
      {!showLogos && (
        <div
          className="absolute top-[45%] z-10 bg-gradient-to-r from-blue-500 to-green-400 rounded-full md:h-[80px] md:w-[80px] h-[60px] w-[60px] flex items-center justify-center animate-pop-out cursor-pointer"
          onClick={() => setShowLogos(true)}
        >
          <span className="text-white font-bold md:text-sm text-xs">Click Here</span>
        </div>
      )}

      {/* Boy Floating */}
      <div className="relative flex items-center justify-center">
        <img
          src="/images/yoga.png"
          alt="3D Animation"
          className="rounded-lg h-[320px] w-[320px] floating-effect"
        />

        {/* Rotating Circle with Logos */}
        {showLogos && (
          <div className="absolute h-[500px] w-[500px] flex items-center justify-center rotate-animation">
            {techLogos.map((logo, index) => (
              <div
                key={index}
                className="absolute bg-white md:h-[60px] md:w-[60px] h-[40px] w-[40px] rounded-full flex items-center justify-center shadow-lg"
                style={{
                  transform: `rotate(${(index * 360) / techLogos.length}deg) translate(200px)`,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="md:h-[50px] md:w-[50px] w-[30px] h-[30px] object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
