import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Scene from '../../public/Scene.jsx';

const Home = () => {
  return (
    <div className="container mx-auto py-16 min-h-screen">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}> 
        <OrbitControls minDistance={1} maxDistance={-30} />
        <ambientLight  /> 
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;
