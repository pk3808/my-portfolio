import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BrickBreaker = () => {
  const navigate = useNavigate();
  const [bricks, setBricks] = useState(createBricks());
  const [ball, setBall] = useState({ x: 50, y: 60, dx: 0.75, dy: 0.75 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const paddleRef = useRef();
  const [paddlePosition, setPaddlePosition] = useState(50);

  function createBricks() {
    const specialBricks = [
      { id: 2, navigateTo: "/contact" },
      { id: 5, navigateTo: "/blogs" },
      { id: 8, navigateTo: "/projects" },
      { id: 10, navigateTo: "/skills" },
      { id: 15, navigateTo: "/" },
    ].map((brick) => ({
      ...brick,
      isSpecial: true,
      hit: false,
      position: {
        top: Math.floor(brick.id / 7) * 12,
        left: (brick.id % 6) * 20,
      },
    }));

    const normalBricks = Array.from({ length: 15 }, (_, i) => ({
      id: i + 6,
      isSpecial: false,
      hit: false,
      position: {
        top: Math.floor(i / 5) * 12,
        left: (i % 5) * 20,
      },
    }));

    return [...normalBricks, ...specialBricks];
  }

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setBricks(createBricks()); // Reset bricks when starting a new game
  };

  useEffect(() => {
    if (isGameOver || !isGameStarted) return;

    const interval = setInterval(() => {
      setBall((prevBall) => {
        let { x, y, dx, dy } = prevBall;

        // Update ball position first
        x += dx;
        y += dy;

        // Check for game over condition
        if (y >= 100) {
          setIsGameOver(true);
          return prevBall; // Stop ball movement
        }

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
          dy = -dy; // Reverse direction when hitting the paddle
          y = 85; // Set ball position to be exactly at the paddle
        }

        // Brick collision
        let newBricks = [...bricks];
        let brickHit = false;

        // Check for collisions with each brick
        newBricks = newBricks.map((brick) => {
          if (
            !brick.hit &&
            y + 4 >= brick.position.top && // Adjusted for ball size
            y <= brick.position.top + 10 &&
            x + 4 >= brick.position.left &&
            x <= brick.position.left + 16
          ) {
            dy = -dy; // Reverse direction upon hitting the brick
            // Set ball position to be just above the brick to prevent overlapping
            y = brick.position.top - 4; // Adjust the position to be right above the brick
            brick.hit = true; // Mark the brick as hit
            brickHit = true; // Set flag to indicate a brick was hit

            // Special brick navigation
            if (brick.isSpecial) {
              navigate(brick.navigateTo);
            }
          }
          return brick;
        });

        // Update bricks state only if a brick was hit
        if (brickHit) {
          setBricks(newBricks);
        }

        // Return the updated ball position
        return { x, y, dx, dy };
      });
    }, 30); // Adjust this timing as needed

    return () => clearInterval(interval);
  }, [bricks, navigate, isGameOver, isGameStarted]);

  const handlePaddleMove = (direction) => {
    setPaddlePosition((prev) => {
      const newPosition = direction === "left" ? prev - 5 : prev + 5;
      return Math.max(0, Math.min(newPosition, 100));
    });
  };

  const restartGame = () => {
    setBall({ x: 50, y: 60, dx: 0.75, dy: 0.75 }); // Reset ball speed
    setBricks(createBricks());
    setIsGameOver(false);
    setIsGameStarted(false);
  };

  // Keyboard controls
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      handlePaddleMove("left");
    } else if (event.key === "ArrowRight") {
      handlePaddleMove("right");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      {!isGameStarted ? (
        <div className="text-center mb-4 justify-center justify-items-center justify-self-center mt-[90%] md:mt-[20%]">
          <p>Instructions: Use the left/right keys to move the paddle or swipe left/right on mobile!</p>
          <button onClick={startGame} className="mt-4 bg-gray-500 text-white p-2 rounded">OK</button>
        </div>
      ) : isGameOver ? (
        <div className="text-center mb-4 justify-center justify-items-center justify-self-center mt-[90%] md:mt-[20%] ">
          <p className="text-red-500 align-middle">Game Over!</p>
          <button onClick={restartGame} className="mt-4 bg-green-500 text-white p-2 rounded">Restart</button>
        </div>
      ) : (
        <>
          <div className="text-center mb-4" />
          <div className="grid grid-cols-10 gap-0 mt-2 relative" style={{ height: "40vh", width: "100%" }}>
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
                  <span className="text-white font-bold text-[10px] text-center">{brick.navigateTo.slice(1).toUpperCase()}</span>
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
          <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 sm:hidden"> {/* Hide on larger screens */}
            <button onClick={() => handlePaddleMove("left")} className="bg-gray-600 text-white p-2 rounded">Left</button>
            <button onClick={() => handlePaddleMove("right")} className="bg-gray-600 text-white p-2 rounded">Right</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BrickBreaker;
