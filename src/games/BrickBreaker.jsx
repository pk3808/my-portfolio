import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BrickBreaker = () => {
  const navigate = useNavigate();
  const [bricks, setBricks] = useState(createBricks());
  const [ball, setBall] = useState({ x: 50, y: 60, dx: 2, dy: 2 });
  const [isGameOver, setIsGameOver] = useState(false);
  const paddleRef = useRef();
  const [paddlePosition, setPaddlePosition] = useState(50);

  function createBricks() {
    const specialBricks = [
      { id: 2, navigateTo: "/contact" },
      { id: 5, navigateTo: "/blogs" },
      { id: 8, navigateTo: "/projects" },
      { id: 10, navigateTo: "/skills" },
      { id: 15, navigateTo: "/" }, // Customize the original path as needed
    ].map((brick) => ({
      ...brick,
      isSpecial: true,
      hit: false,
      position: {
        top: Math.floor(brick.id / 5) * 12,
        left: (brick.id % 5) * 20 + 10,
      },
    }));

    const normalBricks = Array.from({ length: 15 }, (_, i) => ({
      id: i + 6, // Avoid collision with special bricks
      isSpecial: false,
      hit: false,
      position: {
        top: Math.floor(i / 5) * 12,
        left: (i % 5) * 20 + 10,
      },
    }));

    return [...specialBricks, ...normalBricks];
  }

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setBall((prevBall) => {
        let { x, y, dx, dy } = prevBall;
        x += dx;
        y += dy;

        // Wall collision
        if (x <= 0 || x >= 100) dx = -dx;
        if (y <= 0) dy = -dy;

        // Paddle collision
        const paddle = paddleRef.current.getBoundingClientRect();
        if (
          y >= 85 &&
          x >= (paddle.left / window.innerWidth) * 100 &&
          x <= (paddle.right / window.innerWidth) * 100
        ) {
          dy = -dy;
        }

        // Check for game over
        if (y >= 100) {
          setIsGameOver(true);
          return prevBall;
        }

        // Brick collision
        const newBricks = bricks.map((brick) => {
          if (
            !brick.hit &&
            y >= brick.position.top &&
            y <= brick.position.top + 10 &&
            x >= brick.position.left &&
            x <= brick.position.left + 16
          ) {
            dy = -dy;
            brick.hit = true;

            // Special brick navigation
            if (brick.isSpecial) navigate(brick.navigateTo);

            return brick;
          }
          return brick;
        });
        setBricks(newBricks);

        return { x, y, dx, dy };
      });
    }, 20);

    return () => clearInterval(interval);
  }, [bricks, navigate, isGameOver]);

  const handlePaddleMove = (direction) => {
    setPaddlePosition((prev) => {
      const newPosition = direction === "left" ? prev - 5 : prev + 5;
      return Math.max(0, Math.min(newPosition, 100));
    });
  };

  const restartGame = () => {
    setBall({ x: 50, y: 60, dx: 2, dy: 2 });
    setBricks(createBricks());
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="text-center mb-4">
        <p>Use the left/right keys to move the paddle or swipe left/right on mobile!</p>
        {isGameOver && <button onClick={restartGame} className="mt-4 bg-blue-500 text-white p-2 rounded">Restart</button>}
      </div>

      <div className="grid grid-cols-5 gap-2 mt-10 relative" style={{ height: "80vh", width: "100%" }}>
        {bricks.map((brick) => (
          <div
            key={brick.id}
            style={{
              position: "absolute",
              top: `${brick.position.top}%`,
              left: `${brick.position.left}%`,
            }}
            className={`w-16 h-8 ${brick.hit ? "opacity-0" : (brick.isSpecial ? "bg-yellow-400" : "bg-blue-500")} rounded-lg`}
          >
            {brick.isSpecial ? (
              <span className="text-white font-bold">{brick.navigateTo.slice(1).toUpperCase()}</span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Paddle */}
      <div
        ref={paddleRef}
        className="w-32 h-4 bg-gray-700 mt-4 rounded-full"
        style={{ position: "absolute", bottom: "10%", left: `${paddlePosition}%` }}
      />

      {/* Ball */}
      <div
        className="w-4 h-4 bg-red-500 rounded-full"
        style={{
          position: "absolute",
          left: `${ball.x}%`,
          top: `${ball.y}%`,
        }}
      />

      {/* Keyboard controls */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4">
        <button onClick={() => handlePaddleMove("left")} className="bg-gray-600 text-white p-2 rounded">Left</button>
        <button onClick={() => handlePaddleMove("right")} className="bg-gray-600 text-white p-2 rounded">Right</button>
      </div>
    </div>
  );
};

export default BrickBreaker;
