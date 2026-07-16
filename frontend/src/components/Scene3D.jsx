import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import Avatar3D from './Avatar3D';

const SceneLoader = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 rounded-2xl z-10 border border-white/5">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-3 text-xs text-blue-400 animate-pulse">Loading Scene...</p>
  </div>
);

export default function Scene3D() {
  return (
    <div className="relative w-full h-[450px] rounded-2xl border border-white/10 bg-slate-950 shadow-2xl overflow-hidden">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true }}
        >
          {/* बिना किसी बाहरी फाइलों के चलने वाली लाइट्स */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 4, 3]} intensity={1.5} />
          <pointLight position={[-3, -3, -3]} intensity={0.5} />

          <group position={[0, -0.5, 0]}>
            <Avatar3D />
          </group>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 1.8}
          />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}