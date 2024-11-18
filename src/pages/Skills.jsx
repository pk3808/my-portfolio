import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Boy Floating */}
      <div className="flex flex-col items-center justify-center relative">
        <img
          src="/images/yoga.png"
          alt="3D Animation"
          className="rounded-lg h-[320px] w-[320px] floating-effect"
        />

        {/* First Circular Floating Group (3 Boxes) */}
        <div className="absolute w-[400px] h-[400px] flex items-center justify-center">
          <div className="circular-motion-container orbit-one">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`floating-box orbit-one-box box-${index + 1}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Second Circular Floating Group (5 Boxes) */}
        <div className="absolute w-[500px] h-[500px] flex items-center justify-center">
          <div className="circular-motion-container orbit-two">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`floating-box orbit-two-box box-${index + 1}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
