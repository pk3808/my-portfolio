import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const ExplorationMode3D = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const rocketRef = useRef(null);
  const planetsRef = useRef([]);
  const animationIdRef = useRef(null);
  const keysRef = useRef({});
  const rocketVelocityRef = useRef(new THREE.Vector3());
  const targetPlanetRef = useRef(null);
  const landingRef = useRef(false);
  const nearestPlanetRef = useRef(null);
  const rocketRotationRef = useRef({ x: 0, z: 0 });
  const asteroidsRef = useRef([]);
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nearestPlanet, setNearestPlanet] = useState(null);

  // Planet data with portfolio information
  const planetData = [
    {
      name: 'Mercury',
      size: 0.8,
      distance: 15,
      color: 0x8C7853,
      speed: 0.02,
      section: 'About Me',
      content: {
        title: 'About Me',
        description: "I'm Piyush Kumar, a passionate app developer at IB Arts in Kolkata. With a solid foundation in React, JavaScript, Node.js, Express, and Next.js, I specialize in building dynamic, user-centric web applications.",
        details: [
          'Full-stack developer with 5+ years of experience',
          'Proficient in React, JavaScript, Node.js, Express, Next.js',
          'Strong background in HTML, CSS, Git, and Java',
          'Bachelor’s in Electrical and Electronics Engineering (8.0 CGPA)',
          'Committed to continuous learning and solving complex problems',
          'Bridges creativity with technology to deliver exceptional experiences'
        ]
      }
    },
    {
      name: 'Venus',
      size: 1.2,
      distance: 22,
      color: 0xFFC649,
      speed: 0.015,
      section: 'Skills',
      content: {
        title: 'Technical Skills',
        description: 'My technological arsenal for building amazing experiences',
        details: [
          'Frontend: React, Three.js, WebGL, TypeScript',
          'Backend: Node.js, REST APIs',
          'Database: MongoDB',
          '3D Graphics: Three.js, Blender, WebGL shaders',
          'Tools: Git, Docker, AWS, CI/CD pipelines'
        ]
      }
    },
    {
      name: 'Earth',
      size: 1.5,
      distance: 30,
      color: 0x6B93D6,
      speed: 0.01,
      section: 'Projects',
      content: {
        title: 'Featured Projects',
        description: 'Innovative solutions that push the boundaries of web development',
        details: [
          'LetsKrunch - Practice SQL and Python Data Analysis platform',
          'r-datetime - React Tailwind-themed DateTime Picker',
          'Anime Oasis - Interactive anime wiki platform',
          'Multipoint Inspect - Home inspection solution',
          'Zawwar - Interactive Islamic quiz app',
          'Star Launch - Space travel companion app',
          'Vantrail - Van collections management app'
        ]
      }
    },
    {
      name: 'Mars',
      size: 1.0,
      distance: 40,
      color: 0xCD5C5C,
      speed: 0.008,
      section: 'Experience',
      content: {
        title: 'Professional Experience',
        description: 'Journey through my career in technology',
        details: [
          'App Developer - IB Arts Pvt Ltd. (August 2024 - Present)',
          'App Developer Intern - IB Arts Pvt Ltd. (Jan 2024 - July 2024)'
        ]
      }
    },
    {
      name: 'Jupiter',
      size: 3.0,
      distance: 55,
      color: 0xD8CA9D,
      speed: 0.005,
      section: 'Contact',
      content: {
        title: 'Get In Touch',
        description: 'Ready to collaborate on your next big project?',
        details: [
          'Email: piyush.kr.bpmce@gmail.com',
          'LinkedIn: https://www.linkedin.com/in/piyush-kumar-724877217/',
          'GitHub: /pk3808',
          'Phone: +91 840 970 5445',

        ]
      }
    }
  ];

  const initScene = useCallback(() => {
    // Scene setup - Darker space
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000008);  // Darker background
    scene.fog = new THREE.FogExp2(0x000010, 0.005);  // Darker fog
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 20, 50);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2, 300);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Create enhanced sun with dynamic corona effect
    const sunGeometry = new THREE.SphereGeometry(3, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      emissive: 0xff9900,
      emissiveIntensity: 2
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Sun corona effect with shader
    const coronaGeometry = new THREE.SphereGeometry(5, 32, 32);
    const coronaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = mix(vec3(1.0, 0.7, 0.2), vec3(1.0, 0.3, 0.1), intensity);
          gl_FragColor = vec4(color * intensity * 1.5, intensity * 0.5);
        }
      `,
      transparent: true,
      side: THREE.BackSide
    });
    const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
    scene.add(corona);

    // Animated sun surface
    const sunSurfaceGeometry = new THREE.SphereGeometry(3.1, 64, 64);
    const sunSurfaceMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const sunSurface = new THREE.Mesh(sunSurfaceGeometry, sunSurfaceMaterial);
    scene.add(sunSurface);

    // Create enhanced planets with glow effects
    const planets = [];
    planetData.forEach((planetInfo, index) => {
      const planetGroup = new THREE.Group();

      // Main planet with specular highlights
      const planetGeometry = new THREE.SphereGeometry(planetInfo.size, 64, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: planetInfo.color,
        specular: 0xffffff,
        shininess: 30,
        emissive: planetInfo.color,
        emissiveIntensity: 0.1
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.castShadow = true;
      planet.receiveShadow = true;
      planetGroup.add(planet);

      // Planet glow effect with shader
      const glowGeometry = new THREE.SphereGeometry(planetInfo.size * 1.3, 32, 16);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(planetInfo.color) },
          viewVector: { value: camera.position }
        },
        vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(normalMatrix * viewVector);
            intensity = pow(0.6 - dot(vNormal, vNormel), 2.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, intensity * 0.5);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      planetGroup.add(glow);

      // Planet rings for some planets
      if (planetInfo.name === 'Jupiter') {
        const ringGeometry = new THREE.RingGeometry(planetInfo.size * 1.5, planetInfo.size * 2.2, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x888888,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        planetGroup.add(ring);
      }

      // Orbital path visualization
      const orbitGeometry = new THREE.RingGeometry(planetInfo.distance - 0.1, planetInfo.distance + 0.1, 128);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      planetGroup.position.x = planetInfo.distance;
      planetGroup.userData = planetInfo;

      scene.add(planetGroup);
      planets.push(planetGroup);
    });
    planetsRef.current = planets;

    // Create enhanced rocket with better details and visibility
    const rocketGroup = new THREE.Group();

    // Main rocket body with brighter metallic material
    const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.45, 3.5, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,  // Brighter white
      metalness: 0.9,    // More reflective
      roughness: 0.2     // Smoother surface
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    rocketGroup.add(body);

    // Rocket nose cone with emissive material
    const noseGeometry = new THREE.ConeGeometry(0.35, 1.5, 16);
    const noseMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3333,
      emissive: 0xff2222,
      emissiveIntensity: 0.7  // Brighter emission
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 2.25;
    rocketGroup.add(nose);

    // Engine section - brighter
    const engineGeometry = new THREE.CylinderGeometry(0.45, 0.5, 0.8, 12);
    const engineMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,  // Brighter gray
      metalness: 0.8,
      roughness: 0.3
    });
    const engine = new THREE.Mesh(engineGeometry, engineMaterial);
    engine.position.y = -2.1;
    rocketGroup.add(engine);

    // Rocket fins with metallic accents
    for (let i = 0; i < 4; i++) {
      const finGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.8);
      const finMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.7
      });
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      const angle = (i / 4) * Math.PI * 2;
      fin.position.x = Math.cos(angle) * 0.5;
      fin.position.z = Math.sin(angle) * 0.5;
      fin.position.y = -1.5;

      // Rotate fins outward
      fin.rotation.y = angle;
      fin.rotation.z = Math.PI / 12;

      rocketGroup.add(fin);

      // Add metallic edge to fins - brighter
      const edgeGeometry = new THREE.BoxGeometry(0.05, 1.5, 0.85);
      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaff,  // Brighter blue
        emissive: 0x6699ff,
        emissiveIntensity: 0.5  // More visible
      });
      const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
      edge.position.z = 0.4;
      fin.add(edge);
    }

    // Rocket windows with glow effect
    for (let i = 0; i < 3; i++) {
      const windowGeometry = new THREE.CircleGeometry(0.12, 16);
      const windowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4444ff,
        emissive: 0x2255ff,
        emissiveIntensity: 0.8  // Brighter
      });
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      const angle = (i / 3) * Math.PI * 2;
      window.position.x = Math.cos(angle) * 0.33;
      window.position.z = Math.sin(angle) * 0.33;
      window.position.y = 0.5;
      window.lookAt(new THREE.Vector3(Math.cos(angle) * 2, 0.5, Math.sin(angle) * 2));
      rocketGroup.add(window);
    }

    // Thruster flames with brighter animated glow
    const flameGeometry = new THREE.ConeGeometry(0.22, 1.5, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5500,  // Brighter orange
      transparent: true,
      opacity: 0.95     // More opaque
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.y = -3.2;
    flame.rotation.x = Math.PI;
    flame.visible = false;
    rocketGroup.add(flame);
    rocketGroup.flame = flame;

    // Inner blue flame - brighter
    const blueFlameGeometry = new THREE.ConeGeometry(0.12, 1.2, 8);
    const blueFlameMaterial = new THREE.MeshBasicMaterial({
      color: 0x55ccff,  // Brighter blue
      transparent: true,
      opacity: 0.95
    });
    const blueFlame = new THREE.Mesh(blueFlameGeometry, blueFlameMaterial);
    blueFlame.position.y = -3.1;
    blueFlame.rotation.x = Math.PI;
    blueFlame.visible = false;
    rocketGroup.add(blueFlame);
    rocketGroup.blueFlame = blueFlame;

    // Add navigation lights
    const navLightGeometry = new THREE.SphereGeometry(0.08, 8, 8);

    // Red navigation light (port side)
    const redLight = new THREE.Mesh(navLightGeometry, new THREE.MeshBasicMaterial({
      color: 0xff0000,
      emissive: 0xff2222,
      emissiveIntensity: 0.8
    }));
    redLight.position.set(-0.4, 0, -0.5);
    rocketGroup.add(redLight);

    // Green navigation light (starboard side)
    const greenLight = new THREE.Mesh(navLightGeometry, new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      emissive: 0x22ff22,
      emissiveIntensity: 0.8
    }));
    greenLight.position.set(0.4, 0, -0.5);
    rocketGroup.add(greenLight);

    // White tail light
    const tailLight = new THREE.Mesh(navLightGeometry, new THREE.MeshBasicMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.6
    }));
    tailLight.position.set(0, -2.8, 0);
    rocketGroup.add(tailLight);

    // Cockpit glow
    const cockpitLight = new THREE.PointLight(0x4488ff, 1, 5);
    cockpitLight.position.set(0, 1.2, 0);
    rocketGroup.add(cockpitLight);

    rocketGroup.position.set(0, 5, 45);
    rocketGroup.castShadow = true;
    scene.add(rocketGroup);
    rocketRef.current = rocketGroup;

    // Create asteroid belt between Mars and Jupiter
    const asteroidBelt = new THREE.Group();
    scene.add(asteroidBelt);

    // Create asteroid geometries
    const asteroidGeometries = [
      new THREE.DodecahedronGeometry(0.25, 0),
      new THREE.TorusKnotGeometry(0.2, 0.08, 32, 8),
      new THREE.IcosahedronGeometry(0.22, 1),
      new THREE.OctahedronGeometry(0.26, 0),
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.TetrahedronGeometry(0.28, 0)
    ];

    // Create asteroid materials
    const asteroidMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x664400, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0x555577, metalness: 0.3 })
    ];

    // Create asteroids
    const asteroids = [];
    for (let i = 0; i < 150; i++) {
      const geometry = asteroidGeometries[Math.floor(Math.random() * asteroidGeometries.length)];
      const material = asteroidMaterials[Math.floor(Math.random() * asteroidMaterials.length)];

      const asteroid = new THREE.Mesh(geometry, material);

      // Position in a belt between Mars and Jupiter
      const distance = 45 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;

      asteroid.position.x = Math.cos(angle) * distance;
      asteroid.position.z = Math.sin(angle) * distance;
      asteroid.position.y = (Math.random() - 0.5) * 4;

      // Random rotation and scale
      asteroid.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.4 + Math.random() * 0.8;
      asteroid.scale.set(scale, scale, scale);

      // Random movement properties
      asteroid.userData = {
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        orbitSpeed: (0.001 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
        originalDistance: distance,
        originalAngle: angle
      };

      asteroid.castShadow = true;
      asteroidBelt.add(asteroid);
      asteroids.push(asteroid);
    }
    asteroidsRef.current = asteroids;

    // Add stars with varying sizes
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    const starsSizes = [];
    for (let i = 0; i < 10000; i++) {
      starsVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
      // Random size between 0.5 and 3
      starsSizes.push(0.5 + Math.random() * 2.5);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starsSizes, 1));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    mountRef.current.appendChild(renderer.domElement);
  }, []);

  const handleKeyDown = useCallback((event) => {
    keysRef.current[event.code] = true;

    // Handle Enter key for landing
    if (event.code === 'Enter' && nearestPlanetRef.current && !landingRef.current) {
      const planet = nearestPlanetRef.current;
      landingRef.current = true;
      targetPlanetRef.current = planet;

      // Landing animation
      const landingPosition = planet.position.clone();
      landingPosition.y += planet.userData.size + 2;

      // Smooth landing
      const rocket = rocketRef.current;
      const startPos = rocket.position.clone();
      let landingProgress = 0;

      const animateLanding = () => {
        landingProgress += 0.03;
        if (landingProgress <= 1) {
          rocket.position.lerpVectors(startPos, landingPosition, landingProgress);
          // Slow down rotation during landing
          const targetRotation = new THREE.Euler(0, rocket.rotation.y, 0);
          rocket.rotation.x = THREE.MathUtils.lerp(rocket.rotation.x, targetRotation.x, 0.1);
          rocket.rotation.z = THREE.MathUtils.lerp(rocket.rotation.z, targetRotation.z, 0.1);
          requestAnimationFrame(animateLanding);
        } else {
          // Reset velocity on landing
          rocketVelocityRef.current.set(0, 0, 0);
          setSelectedPlanet(planet.userData);
          setShowModal(true);
          setTimeout(() => {
            landingRef.current = false;
            targetPlanetRef.current = null;
          }, 1000);
        }
      };
      animateLanding();
    }
  }, []);

  const handleKeyUp = useCallback((event) => {
    keysRef.current[event.code] = false;
  }, []);

  const updateRocket = useCallback(() => {
    if (!rocketRef.current) return;

    const rocket = rocketRef.current;
    const keys = keysRef.current;
    const velocity = rocketVelocityRef.current;
    const acceleration = 0.005;  // Increased acceleration
    const maxSpeed = 0.5;        // Higher top speed
    const friction = 0.95;       // Less friction for smoother drifting
    const bankingAmount = 0.7;   // More natural banking
    const pitchAmount = 0.6;     // More responsive pitching

    // Don't allow movement during landing
    if (landingRef.current) return;

    // Handle input and calculate movement direction
    let isThrusting = false;
    let pitchInput = 0;
    let bankInput = 0;

    if (keys['KeyW'] || keys['ArrowUp']) {
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(rocket.quaternion);
      forward.multiplyScalar(acceleration);
      velocity.add(forward);
      isThrusting = true;
      pitchInput = -1; // Pitch down when moving forward
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      const backward = new THREE.Vector3(0, 0, 1);
      backward.applyQuaternion(rocket.quaternion);
      backward.multiplyScalar(acceleration);
      velocity.add(backward);
      isThrusting = true;
      pitchInput = 1; // Pitch up when moving backward
    }
    if (keys['KeyA'] || keys['ArrowLeft']) {
      rocket.rotation.y += 0.04;
      bankInput = -1; // Bank left
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      rocket.rotation.y -= 0.04;
      bankInput = 1; // Bank right
    }
    if (keys['KeyQ']) {
      velocity.y += acceleration;
      isThrusting = true;
      pitchInput = -0.5; // Slight pitch up when ascending
    }
    if (keys['KeyE']) {
      velocity.y -= acceleration;
      isThrusting = true;
      pitchInput = 0.5; // Slight pitch down when descending
    }

    // Apply realistic banking and pitching
    const rocketRot = rocketRotationRef.current;

    // Banking (roll) when turning
    const targetBankZ = bankInput * bankingAmount;
    rocketRot.z = THREE.MathUtils.lerp(rocketRot.z, targetBankZ * 0.7, 0.08);

    // Pitching when moving forward/backward or up/down
    const velocityLength = velocity.length();
    const pitchFromVelocity = velocity.y * pitchAmount;
    const targetPitchX = (pitchInput * pitchAmount * 0.3) + (pitchFromVelocity * 0.5);
    rocketRot.x = THREE.MathUtils.lerp(rocketRot.x, targetPitchX * 0.8, 0.07);

    // Apply rotations to rocket
    rocket.rotation.x = rocketRot.x;
    rocket.rotation.z = rocketRot.z;

    // Show/hide thruster flames with realistic effect
    if (rocket.flame && rocket.blueFlame) {
      rocket.flame.visible = isThrusting;
      rocket.blueFlame.visible = isThrusting;

      if (isThrusting) {
        // Animate flames with flickering effect
        const flameScale = 0.8 + Math.random() * 0.6;
        rocket.flame.scale.set(flameScale, flameScale, flameScale);

        const blueFlameScale = 0.7 + Math.random() * 0.4;
        rocket.blueFlame.scale.set(blueFlameScale, blueFlameScale, blueFlameScale);
      }
    }

    // Apply friction and speed limit
    velocity.multiplyScalar(friction);
    if (velocity.length() > maxSpeed) {
      velocity.normalize().multiplyScalar(maxSpeed);
    }

    // Update position
    rocket.position.add(velocity);

    // Find nearest planet for landing indicator
    let nearestPlanet = null;
    let minDistance = Infinity;

    planetsRef.current.forEach((planet) => {
      const distance = rocket.position.distanceTo(planet.position);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPlanet = planet;
      }
    });

    // Update nearest planet reference and UI
    const landingRange = 8; // Distance threshold for landing
    if (minDistance < landingRange) {
      nearestPlanetRef.current = nearestPlanet;
      setNearestPlanet(nearestPlanet.userData);
    } else {
      nearestPlanetRef.current = null;
      setNearestPlanet(null);
    }

    // Improved camera system with better following
    const camera = cameraRef.current;
    const idealOffset = new THREE.Vector3(0, 5, 10); // Closer to rocket
    idealOffset.applyQuaternion(rocket.quaternion);
    const idealPosition = rocket.position.clone().add(idealOffset);

    // Smooth camera following with slight banking
    camera.position.lerp(idealPosition, 0.1); // Faster camera following

    // Look ahead of the rocket based on velocity
    const lookAhead = velocity.clone().multiplyScalar(5);
    const lookTarget = rocket.position.clone().add(lookAhead);
    camera.lookAt(lookTarget);
  }, []);

  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

    // Update sun corona effect
    if (sceneRef.current.children[4]) { // Corona index
      const corona = sceneRef.current.children[4];
      if (corona.material && corona.material.uniforms) {
        corona.material.uniforms.time.value = performance.now() * 0.001;
      }
    }

    // Rotate planets around sun with individual rotation
    planetsRef.current.forEach((planetGroup, index) => {
      const planetInfo = planetData[index];
      const time = Date.now() * 0.001;

      // Orbital motion
      planetGroup.position.x = Math.cos(time * planetInfo.speed) * planetInfo.distance;
      planetGroup.position.z = Math.sin(time * planetInfo.speed) * planetInfo.distance;

      // Planet self-rotation
      planetGroup.children[0].rotation.y += 0.02;

      // Animate glow effect
      if (planetGroup.children[1]) {
        planetGroup.children[1].material.uniforms.viewVector.value =
          cameraRef.current.position.clone();
      }

      // Animate rings
      if (planetGroup.children[2]) {
        planetGroup.children[2].rotation.z += 0.01;
      }
    });

    // Update asteroids
    asteroidsRef.current.forEach(asteroid => {
      // Rotation
      asteroid.rotation.x += asteroid.userData.rotationSpeed;
      asteroid.rotation.y += asteroid.userData.rotationSpeed * 0.8;

      // Orbital movement
      asteroid.userData.originalAngle += asteroid.userData.orbitSpeed;
      asteroid.position.x = Math.cos(asteroid.userData.originalAngle) * asteroid.userData.originalDistance;
      asteroid.position.z = Math.sin(asteroid.userData.originalAngle) * asteroid.userData.originalDistance;

      // Slight vertical oscillation
      asteroid.position.y = (Math.sin(Date.now() * 0.001 + asteroid.userData.originalAngle) * 1.5);
    });

    // Update rocket
    updateRocket();

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, [updateRocket]);

  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    initScene();
    animate();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [initScene, animate, handleKeyDown, handleKeyUp, handleResize]);

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlanet(null);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {/* Controls UI - Spaceship Console */}
      <div className="absolute top-4 left-4 text-[#0ff] bg-gray-900 bg-opacity-90 p-4 rounded-xl border-2 border-[#0ff] backdrop-blur-sm font-mono shadow-[0_0_15px_rgba(0,255,255,0.5)]">
        <h3 className="text-lg font-bold mb-2 flex items-center">
          <span className="mr-2 text-yellow-400">🚀</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            NAVIGATION CONSOLE
          </span>
        </h3>
        <div className="text-sm space-y-1 text-cyan-300">
          <div className="flex justify-between">
            <span>THRUST:</span>
            <span className="font-bold">W/↑</span>
          </div>
          <div className="flex justify-between">
            <span>REVERSE:</span>
            <span className="font-bold">S/↓</span>
          </div>
          <div className="flex justify-between">
            <span>PORT:</span>
            <span className="font-bold">A/←</span>
          </div>
          <div className="flex justify-between">
            <span>STARBOARD:</span>
            <span className="font-bold">D/→</span>
          </div>
          <div className="flex justify-between">
            <span>ASCEND:</span>
            <span className="font-bold">Q</span>
          </div>
          <div className="flex justify-between">
            <span>DESCEND:</span>
            <span className="font-bold">E</span>
          </div>
          <div className="mt-3 pt-2 border-t border-cyan-700">
            <div className="flex justify-between text-yellow-300 font-semibold">
              <span>LANDING:</span>
              <span>ENTER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Landing Indicator */}
      {nearestPlanet && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-green-600 to-cyan-600 px-6 py-3 rounded-lg border-2 border-green-400 animate-pulse backdrop-blur-sm">
          <div className="text-center">
            <div className="text-lg font-bold flex items-center justify-center">
              <span className="mr-2">🪐</span>
              {nearestPlanet.name}
            </div>
            <div className="text-sm mt-1">{nearestPlanet.section}</div>
            <div className="text-xs mt-2 text-green-200 bg-black bg-opacity-30 p-1 rounded">
              PRESS [ENTER] TO INITIATE LANDING SEQUENCE
            </div>
          </div>
        </div>
      )}

      {/* Planet Info - Enhanced Spaceship Display */}
      <div className="absolute top-4 right-4 text-[#0ff] bg-gray-900 bg-opacity-90 p-5 rounded-xl max-w-sm border-2 border-[#0ff] backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 rounded-xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center">
              <span className="mr-2 text-yellow-400">🌌</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                PLANETARY DATABASE
              </span>
            </h3>
            <div className="text-xs text-cyan-400 bg-cyan-900 bg-opacity-50 px-2 py-1 rounded">
              ACTIVE
            </div>
          </div>

          <div className="space-y-3">
            {planetData.map((planet, index) => (
              <div
                key={index}
                className={`relative p-3 rounded-lg transition-all duration-300 overflow-hidden ${nearestPlanet?.name === planet.name
                  ? 'bg-gradient-to-r from-cyan-900/70 to-blue-900/70 border border-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.5)]'
                  : 'bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700'
                  }`}
              >
                {/* Planet status indicator */}
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${nearestPlanet?.name === planet.name
                    ? 'bg-gradient-to-b from-cyan-400 to-blue-500'
                    : 'bg-gray-600'
                    }`}
                ></div>

                <div className="flex items-center space-x-3 pl-2">
                  <div className="relative">
                    <div
                      className="w-5 h-5 rounded-full shadow-lg"
                      style={{ backgroundColor: `#${planet.color.toString(16).padStart(6, '0')}` }}
                    />
                    {nearestPlanet?.name === planet.name && (
                      <div className="absolute -inset-1 bg-cyan-400 rounded-full animate-ping opacity-70"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${nearestPlanet?.name === planet.name
                      ? 'text-cyan-300'
                      : 'text-gray-300'
                      }`}>
                      {planet.name}
                      <span className="text-xs ml-2 font-normal text-gray-400">
                        {planet.distance} AU
                      </span>
                    </div>
                    <div className={`text-xs ${nearestPlanet?.name === planet.name
                      ? 'text-cyan-200'
                      : 'text-gray-400'
                      }`}>
                      {planet.section}
                    </div>
                  </div>
                  {nearestPlanet?.name === planet.name && (
                    <div className="text-cyan-300 animate-pulse">
                      <div className="relative flex h-3 w-3">
                        <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></div>
                        <div className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-cyan-400 text-center bg-gray-900/50 p-2 rounded border border-cyan-800">
            <div className="flex justify-center space-x-1">
              <span className="text-yellow-400">⚠</span>
              <span>APPROACH PLANET & PRESS [ENTER] FOR DATA ACCESS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Spaceship Computer Interface */}
      {showModal && selectedPlanet && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.5)]">
            {/* Scan lines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 animate-scan"></div>

            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-cyan-500 rounded-xl blur-xl opacity-20 animate-pulse"></div>

            {/* Modal content */}
            <div className="relative z-10 p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 shadow-lg mt-1"
                    style={{ backgroundColor: `#${selectedPlanet.color.toString(16).padStart(6, '0')}` }}
                  />
                  <div>
                    <div className="text-sm text-cyan-400 font-mono">ACTIVE DATABASE ENTRY</div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {selectedPlanet.content.title}
                    </h2>
                    <div className="text-sm text-cyan-300 mt-1">
                      PLANET: {selectedPlanet.name} | DISTANCE: {selectedPlanet.distance} AU
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="text-cyan-300 hover:text-white text-3xl transition-colors hover:scale-110 transform bg-cyan-900/30 rounded-full w-10 h-10 flex items-center justify-center border border-cyan-700"
                >
                  ×
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-6"></div>

              {/* Content */}
              <div className="mb-8">
                <p className="text-cyan-200 text-lg font-light leading-relaxed mb-8 italic">
                  "{selectedPlanet.content.description}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlanet.content.details.map((detail, index) => (
                    <div
                      key={index}
                      className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-500 hover:border-cyan-300 transition-all group hover:bg-gray-800/50"
                    >
                      <div className="flex items-start">
                        <div className="bg-cyan-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-200 group-hover:text-cyan-100">{detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-cyan-800/50">
                <div className="text-cyan-400 text-sm font-mono mb-4 sm:mb-0">
                  SYSTEM STATUS: <span className="text-green-400">NOMINAL</span>
                </div>

                <button
                  onClick={closeModal}
                  className="relative bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 px-6 py-3 rounded-lg transition-all group overflow-hidden font-semibold"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">🚀</span>
                    CONTINUE EXPLORATION
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </button>
              </div>
            </div>

            {/* Terminal bottom bar */}
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-t border-cyan-700/50 p-3 text-sm text-cyan-400 font-mono flex items-center">
              <div className="flex items-center mr-6">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>NAVIGATION SYSTEMS ONLINE</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                <span>DATABASE ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorationMode3D;