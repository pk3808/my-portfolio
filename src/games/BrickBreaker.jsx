import React, { useState, useEffect, useRef } from "react";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Contact from "../pages/Contact";
import AboutMe from "../pages/AboutMe";
import left from "../assets/left.png";
import rotate from "../assets/rotate.png";
import TimeLine from "../components/TimeLIne";
import { useNavigate } from "react-router-dom";

const BrickBreaker = ({ darkMode }) => {
  console.log("Rendering BrickBreaker with darkMode:", darkMode);
  const paddleHitSound = useRef(null);
  const brickHitSound = useRef(null);
  const specialBrickHitSound = useRef(null);
  const gameOverSound = useRef(null);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  const [paddle, setPaddle] = useState({
    x: 150,
    y: 450,
    width: 100,
    height: 10,
  });
  const [ball, setBall] = useState({
    x: 200,
    y: 300,
    dx: 1.5,
    dy: 1.5,
    radius: 5,
  });
  const [bricks, setBricks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  
  // Enhanced visual effects state
  const [particles, setParticles] = useState([]);
  const [ballTrail, setBallTrail] = useState([]);
  const [hitEffect, setHitEffect] = useState(null);
  const [brickAnimations, setBrickAnimations] = useState([]);

  // Enhanced brick colors and gradients
  const brickStyles = {
    normal: {
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
      shadowColor: '#FF6347',
      glowIntensity: 5
    },
    special: {
      gradient: ['#FFD700', '#FFA500', '#FF8C00'],
      shadowColor: '#FFD700',
      glowIntensity: 12,
      pulseSpeed: 0.05
    }
  };

  // Initialize bricks with enhanced properties
  useEffect(() => {
    const brickRows = 4;
    const brickCols = 6;
    const brickWidth = 45.5;
    const brickHeight = 20;
    const padding = 10;
    const offsetTop = 50;
    const offsetLeft = 35;

    const initialBricks = [];
    const initialAnimations = [];
    
    for (let row = 0; row < brickRows; row++) {
      for (let col = 0; col < brickCols; col++) {
        const isSpecial =
          (row === brickRows - 2 && (col === 1 || col === 3 || col === 5)) ||
          (row === brickRows - 3 && (col === 0 || col === 4));
        
        const brickIndex = col + row * brickCols;
        
        initialBricks.push({
          x: col * (brickWidth + padding) + offsetLeft,
          y: row * (brickHeight + padding) + offsetTop,
          width: brickWidth,
          height: brickHeight,
          hit: false,
          isSpecial,
          title: getComponentByBrick(brickIndex).title,
          colorIndex: Math.floor(Math.random() * brickStyles.normal.colors.length),
          health: isSpecial ? 2 : 1,
          maxHealth: isSpecial ? 2 : 1,
          crackLevel: 0
        });

        // Initialize animation state for each brick
        initialAnimations.push({
          scale: 1,
          rotation: 0,
          pulse: 0,
          shake: { x: 0, y: 0 },
          fadeOut: 0,
          hitFlash: 0
        });
      }
    }
    setBricks(initialBricks);
    setBrickAnimations(initialAnimations);
  }, []);

  // Function to assign component and title by brick
  const getComponentByBrick = (index) => {
    switch (index) {
      case 13:
        return { component: <TimeLine darkMode={darkMode} bg={true} />, title: "TimeLine" };
      case 17:
        return { component: <AboutMe darkMode={darkMode} />, title: "AboutMe" };
      case 6:
        return { component: <Projects darkMode={darkMode} h={false} />, title: "Projects" };
      case 15:
        return { component: <Skills darkMode={darkMode} show={true} hide={true} />, title: "Skills" };
      case 10:
        return { component: <Contact darkMode={darkMode} />, title: "Contact" };
      case 14:
        return { component: <AboutMe darkMode={darkMode} />, title: "AboutMe" };
      default:
        return { component: null, title: "" };
    }
  };

  // Enhanced particle system
  const createParticles = (x, y, color, count = 8) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x,
        y,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 1,
        decay: 0.02,
        color,
        size: Math.random() * 3 + 1,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  // Create brick destruction animation
  const createBrickDestroyEffect = (brick, index) => {
    setBrickAnimations(prev => {
      const newAnimations = [...prev];
      newAnimations[index] = {
        ...newAnimations[index],
        fadeOut: 1,
        scale: 1.2,
        rotation: (Math.random() - 0.5) * 30
      };
      return newAnimations;
    });

    // Create debris particles
    const centerX = brick.x + brick.width / 2;
    const centerY = brick.y + brick.height / 2;
    const debrisParticles = [];
    
    for (let i = 0; i < 12; i++) {
      debrisParticles.push({
        x: centerX + (Math.random() - 0.5) * brick.width,
        y: centerY + (Math.random() - 0.5) * brick.height,
        dx: (Math.random() - 0.5) * 8,
        dy: (Math.random() - 0.5) * 8,
        life: 1,
        decay: 0.015,
        color: brick.isSpecial ? '#FFD700' : brickStyles.normal.colors[brick.colorIndex],
        size: Math.random() * 4 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    setParticles(prev => [...prev, ...debrisParticles]);
  };

  // Create hit effect
  const createHitEffect = (x, y) => {
    setHitEffect({ x, y, size: 0, life: 1 });
  };

  // Create brick hit animation
  const createBrickHitAnimation = (index) => {
    setBrickAnimations(prev => {
      const newAnimations = [...prev];
      newAnimations[index] = {
        ...newAnimations[index],
        hitFlash: 1,
        shake: { 
          x: (Math.random() - 0.5) * 4, 
          y: (Math.random() - 0.5) * 4 
        },
        scale: 0.9
      };
      return newAnimations;
    });
  };

  // Paddle movement for keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      setPaddle((prev) => {
        if (e.key === "ArrowLeft") {
          return { ...prev, x: Math.max(prev.x - 20, 0) };
        } else if (e.key === "ArrowRight") {
          return { ...prev, x: Math.min(prev.x + 20, 400 - prev.width) };
        }
        return prev;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mobile touch control for paddle movement
  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const relativeTouchX = touchX - canvasRect.left;

    setPaddle((prev) => ({
      ...prev,
      x: Math.min(
        Math.max(relativeTouchX - prev.width / 2, 0),
        canvasRect.width - prev.width
      ),
    }));
  };

  // Enhanced collision detection with better physics
  const getCollisionSide = (ballX, ballY, ballRadius, rectX, rectY, rectWidth, rectHeight) => {
    const ballCenterX = ballX;
    const ballCenterY = ballY;
    
    const closestX = Math.max(rectX, Math.min(ballCenterX, rectX + rectWidth));
    const closestY = Math.max(rectY, Math.min(ballCenterY, rectY + rectHeight));
    
    const distanceX = ballCenterX - closestX;
    const distanceY = ballCenterY - closestY;
    
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      return distanceX > 0 ? 'right' : 'left';
    } else {
      return distanceY > 0 ? 'bottom' : 'top';
    }
  };

  // Game loop for ball movement and collision detection
  useEffect(() => {
    if (gameOver || modalComponent) return;

    const interval = setInterval(() => {
      setBall((prev) => {
        let { x, y, dx, dy, radius } = prev;

        const speed = Math.sqrt(dx * dx + dy * dy);
        const maxSpeed = 8;
        const minSpeed = 2;
        
        if (speed > maxSpeed) {
          const ratio = maxSpeed / speed;
          dx *= ratio;
          dy *= ratio;
        } else if (speed < minSpeed) {
          const ratio = minSpeed / speed;
          dx *= ratio;
          dy *= ratio;
        }

        setBallTrail(prevTrail => {
          const newTrail = [...prevTrail, { x, y, opacity: 1 }];
          return newTrail.slice(-8);
        });

        if (x + dx < radius || x + dx > 400 - radius) {
          dx = -dx;
          createHitEffect(x, y);
          createParticles(x, y, '#0095DD', 4);
        }
        if (y + dy < radius) {
          dy = -dy;
          createHitEffect(x, y);
          createParticles(x, y, '#0095DD', 4);
        }

        if (
          y + dy > paddle.y - radius &&
          y + dy < paddle.y + paddle.height + radius &&
          x > paddle.x - radius &&
          x < paddle.x + paddle.width + radius
        ) {
          const hitPos = (x - paddle.x) / paddle.width;
          const angle = (hitPos - 0.5) * Math.PI / 3;
          
          const speed = Math.sqrt(dx * dx + dy * dy);
          dx = Math.sin(angle) * speed;
          dy = -Math.abs(Math.cos(angle) * speed);
          
          dx *= 1.08;
          dy *= 1.08;
          
          createHitEffect(x, paddle.y);
          createParticles(x, paddle.y, '#5f5de6', 6);
          paddleHitSound.current.play();
        }

        // Enhanced brick collision with damage system
        const updatedBricks = bricks.map((brick, index) => {
          if (
            !brick.hit &&
            x + radius > brick.x &&
            x - radius < brick.x + brick.width &&
            y + radius > brick.y &&
            y - radius < brick.y + brick.height
          ) {
            const collisionSide = getCollisionSide(x, y, radius, brick.x, brick.y, brick.width, brick.height);
            
            if (collisionSide === 'left' || collisionSide === 'right') {
              dx = -dx;
            } else {
              dy = -dy;
            }
            
            const currentSpeed = Math.sqrt(dx * dx + dy * dy);
            const speedMultiplier = Math.min(1.03, 1 + (8 - currentSpeed) * 0.01);
            dx *= speedMultiplier;
            dy *= speedMultiplier;
            
            console.log(`Brick hit: ${index + 1}`);
            
            const centerX = brick.x + brick.width / 2;
            const centerY = brick.y + brick.height / 2;
            createHitEffect(centerX, centerY);
            createBrickHitAnimation(index);
            
            // Damage system
            const newHealth = brick.health - 1;
            const newCrackLevel = brick.maxHealth - newHealth;
            
            if (newHealth <= 0) {
              // Brick destroyed
              createBrickDestroyEffect(brick, index);
              
              if (brick.isSpecial) {
                createParticles(centerX, centerY, '#FFD700', 16);
                specialBrickHitSound.current.play();
                console.log(`Special brick destroyed at index: ${index}`);
                const { component, title } = getComponentByBrick(index);
                setModalComponent(component);
                setModalTitle(title);
              } else {
                createParticles(centerX, centerY, brickStyles.normal.colors[brick.colorIndex], 12);
                brickHitSound.current.play();
              }

              return { ...brick, hit: true, health: 0 };
            } else {
              // Brick damaged but not destroyed
              createParticles(centerX, centerY, brick.isSpecial ? '#FFD700' : brickStyles.normal.colors[brick.colorIndex], 6);
              brickHitSound.current.play();
              return { ...brick, health: newHealth, crackLevel: newCrackLevel };
            }
          }
          return brick;
        });
        setBricks(updatedBricks);

        if (y + dy > 500) {
          setGameOver(true);
          gameOverSound.current.play();
          return prev;
        }

        return { ...prev, x: x + dx, y: y + dy, dx, dy };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [ball, bricks, gameOver, paddle, modalComponent]);

  // Update animations and effects
  useEffect(() => {
    const interval = setInterval(() => {
      // Update particles with rotation
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + p.dx,
          y: p.y + p.dy,
          life: p.life - p.decay,
          dx: p.dx * 0.98,
          dy: p.dy * 0.98 + 0.1,
          rotation: p.rotation ? p.rotation + (p.rotationSpeed || 0) : 0
        })).filter(p => p.life > 0)
      );

      // Update brick animations
      setBrickAnimations(prev => 
        prev.map(anim => ({
          scale: Math.min(1, anim.scale + (1 - anim.scale) * 0.1),
          rotation: anim.rotation * 0.95,
          pulse: anim.pulse + brickStyles.special.pulseSpeed,
          shake: {
            x: anim.shake.x * 0.9,
            y: anim.shake.y * 0.9
          },
          fadeOut: Math.max(0, anim.fadeOut - 0.02),
          hitFlash: Math.max(0, anim.hitFlash - 0.05)
        }))
      );

      setBallTrail(prev => 
        prev.map((t, i) => ({
          ...t,
          opacity: t.opacity * 0.9
        })).filter(t => t.opacity > 0.1)
      );

      setHitEffect(prev => {
        if (!prev) return null;
        const newEffect = {
          ...prev,
          size: prev.size + 2,
          life: prev.life - 0.05
        };
        return newEffect.life > 0 ? newEffect : null;
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Enhanced drawing with improved brick visuals
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 400, 500);

    // Draw ball trail
    ballTrail.forEach((trail, index) => {
      ctx.globalAlpha = trail.opacity * 0.3;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, ball.radius * (0.3 + index * 0.1), 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    });
    ctx.globalAlpha = 1;

    // Draw paddle with glow effect
    ctx.save();
    ctx.shadowColor = "#5f5de6";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#5f5de6";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.restore();

    // Draw ball with enhanced glow
    ctx.save();
    ctx.shadowColor = "#0095DD";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // Draw bricks with enhanced visuals and animations
    bricks.forEach((brick, index) => {
      if (!brick.hit) {
        const anim = brickAnimations[index] || {};
        
        ctx.save();
        
        // Apply transformations
        const centerX = brick.x + brick.width / 2;
        const centerY = brick.y + brick.height / 2;
        
        ctx.translate(centerX + (anim.shake?.x || 0), centerY + (anim.shake?.y || 0));
        ctx.scale(anim.scale || 1, anim.scale || 1);
        ctx.rotate((anim.rotation || 0) * Math.PI / 180);
        
        // Set opacity for fade out effect
        ctx.globalAlpha = 1 - (anim.fadeOut || 0);
        
        if (brick.isSpecial) {
          // Special brick with animated gradient and pulse effect
          const pulseScale = 1 + Math.sin(anim.pulse || 0) * 0.1;
          const gradient = ctx.createLinearGradient(-brick.width/2, -brick.height/2, brick.width/2, brick.height/2);
          gradient.addColorStop(0, brickStyles.special.gradient[0]);
          gradient.addColorStop(0.5, brickStyles.special.gradient[1]);
          gradient.addColorStop(1, brickStyles.special.gradient[2]);
          
          ctx.shadowColor = brickStyles.special.shadowColor;
          ctx.shadowBlur = brickStyles.special.glowIntensity * pulseScale;
          ctx.fillStyle = gradient;
          
          // Add hit flash effect
          if (anim.hitFlash > 0) {
            ctx.shadowColor = "#FFFFFF";
            ctx.shadowBlur = 20 * anim.hitFlash;
          }
          
          ctx.fillRect(-brick.width/2, -brick.height/2, brick.width, brick.height);
          
          // Add border
          ctx.strokeStyle = "#FFF";
          ctx.lineWidth = 1;
          ctx.strokeRect(-brick.width/2, -brick.height/2, brick.width, brick.height);
          
        } else {
          // Normal brick with damage visualization
          const baseColor = brickStyles.normal.colors[brick.colorIndex];
          let fillColor = baseColor;
          
          // Darken brick based on damage
          if (brick.crackLevel > 0) {
            const damage = brick.crackLevel / brick.maxHealth;
            const darkenFactor = damage * 0.4;
            fillColor = shadeColor(baseColor, -darkenFactor);
          }
          
          ctx.shadowColor = brickStyles.normal.shadowColor;
          ctx.shadowBlur = brickStyles.normal.glowIntensity;
          ctx.fillStyle = fillColor;
          
          // Add hit flash effect
          if (anim.hitFlash > 0) {
            ctx.shadowColor = "#FFFFFF";
            ctx.shadowBlur = 15 * anim.hitFlash;
            ctx.fillStyle = interpolateColor(fillColor, "#FFFFFF", anim.hitFlash);
          }
          
          ctx.fillRect(-brick.width/2, -brick.height/2, brick.width, brick.height);
          
          // Add crack effects for damaged bricks
          if (brick.crackLevel > 0) {
            ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            // Draw crack lines
            for (let i = 0; i < brick.crackLevel; i++) {
              const startX = -brick.width/2 + Math.random() * brick.width;
              const startY = -brick.height/2 + Math.random() * brick.height;
              const endX = startX + (Math.random() - 0.5) * brick.width * 0.5;
              const endY = startY + (Math.random() - 0.5) * brick.height * 0.5;
              
              ctx.moveTo(startX, startY);
              ctx.lineTo(endX, endY);
            }
            ctx.stroke();
          }
          
          // Add subtle border
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-brick.width/2, -brick.height/2, brick.width, brick.height);
        }
        
        ctx.restore();
        
        // Draw special brick text
        if (brick.isSpecial && brick.title) {
          ctx.save();
          ctx.globalAlpha = 1 - (anim.fadeOut || 0);
          ctx.fillStyle = "#000";
          ctx.font = "bold 10px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          // Add text shadow for better readability
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 2;
          
          ctx.fillText(
            brick.title,
            centerX + (anim.shake?.x || 0),
            centerY + (anim.shake?.y || 0)
          );
          ctx.restore();
        }
      }
    });

    // Draw particles with rotation
    particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.translate(particle.x, particle.y);
      if (particle.rotation) {
        ctx.rotate(particle.rotation * Math.PI / 180);
      }
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
      ctx.restore();
    });
    ctx.globalAlpha = 1;

    // Draw hit effect
    if (hitEffect) {
      ctx.globalAlpha = hitEffect.life;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(hitEffect.x, hitEffect.y, hitEffect.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      ctx.globalAlpha = 1;
    }

    if (gameOver) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", 200, 250);
    }
  }, [paddle, ball, bricks, gameOver, particles, ballTrail, hitEffect, brickAnimations]);

  // Helper function to shade colors
  const shadeColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  // Helper function to interpolate between colors
  const interpolateColor = (color1, color2, factor) => {
    const c1 = parseInt(color1.replace("#", ""), 16);
    const c2 = parseInt(color2.replace("#", ""), 16);
    
    const r1 = (c1 >> 16) & 0xFF;
    const g1 = (c1 >> 8) & 0xFF;
    const b1 = c1 & 0xFF;
    
    const r2 = (c2 >> 16) & 0xFF;
    const g2 = (c2 >> 8) & 0xFF;
    const b2 = c2 & 0xFF;
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  const handleRestart = () => {
    setBall({ x: 200, y: 300, dx: 1.5, dy: 1.5, radius: 5 });
    setGameOver(false);
    setBricks((prev) => prev.map((brick) => ({ 
      ...brick, 
      hit: false, 
      health: brick.maxHealth,
      crackLevel: 0 
    })));
    setModalComponent(null);
    setModalTitle("");
    setParticles([]);
    setBallTrail([]);
    setHitEffect(null);
    setBrickAnimations(prev => prev.map(() => ({
      scale: 1,
      rotation: 0,
      pulse: 0,
      shake: { x: 0, y: 0 },
      fadeOut: 0,
      hitFlash: 0
    })));
  };
  
  useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleNavigate = () => {
    navigate("/home");
  };
  
  return (
    <>
      <div
        className="flex flex-col items-center p-5 bg-[#1a1a2e] min-h-screen text-gray-200 justify-center w-[100vw] h-[100vh]"
        onTouchMove={handleTouchMove}
      >
         <div className="absolute top-10 left-10 group cursor-pointer">
          {/* Image with bounce animation */}
          <img
            src="/images/house.png"
            alt="Game Mode"
            className="w-[45px] md:w-[40px] h-[45px] md:h-[45px] object-contain rounded-lg z-50 transform transition-transform duration-300 hover:scale-110"
            onClick={() => {
              window.location.href = "/"; // Adjust the navigation route if needed
            }}
          />
          {/* Tooltip with animation */}
          <div className="absolute left-[1%]  items-center p-2 bg-gray-800 text-white text-sm rounded shadow-md transform transition-opacity duration-1000 ease-in-out opacity-0 group-hover:opacity-100">
            <span>Home!</span>
          </div>
        </div>

        <div className="text-lg md:hidden my-2">
          <span className="text-yellow-400" onClick={handleNavigate}>⪡</span> Check out default Mode
        </div>

        <canvas
          ref={canvasRef}
          width="400"
          height="480"
          className="border-2 border-[#5f5de6] rounded-lg bg-[#16213e] w-full max-w-md mx-6"
        />
        {gameOver && (
          <button
            onClick={handleRestart}
            className="mt-5 px-6 py-2 bg-[#5f5de6] text-white rounded-lg hover:bg-[#5f5de6]"
          >
            <img src={rotate} alt="Restart" className="w-6 h-6" />
          </button>
        )}

        {modalComponent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto w-full">
            <div className="bg-[#172c2c] rounded-lg w-full max-w-[95vw] relative">
              <h2 className="text-xl font-bold text-center mb-4 mt-4">{modalTitle}</h2>

              <button
                onClick={() => setModalComponent(null)}
                className="absolute top-4 right-2 text-gray-500 bg-transparent hover:text-white"
              >
                ✖
              </button>

              <div className="modal-content max-h-[85vh] overflow-auto">
                {modalComponent}
              </div>
            </div>
          </div>
        )}
        <audio ref={paddleHitSound} src="sound/hit.mp3" preload="auto"></audio>
        <audio ref={brickHitSound} src="sound/brickhit.mp3" preload="auto"></audio>
        <audio ref={specialBrickHitSound} src="sound/special.mp3" preload="auto"></audio>
        <audio ref={gameOverSound} src="sound/over.mp3" preload="auto"></audio>
      </div>
    </>
  );
};

export default BrickBreaker;