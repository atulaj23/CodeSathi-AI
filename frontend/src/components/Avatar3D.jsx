import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Avatar3D() {
  const group = useRef();
  
  try {
    // मॉडल लोड करने की कोशिश करें
    const { scene, animations } = useGLTF('/avatars/male.glb', true);
    const { actions, names } = useAnimations(animations, group);

    useEffect(() => {
      if (names && names.length > 0 && actions) {
        const defaultAction = actions[names[0]];
        if (defaultAction) {
          defaultAction.reset().fadeIn(0.5).play();
        }
      }
      return () => {
        if (names && names.length > 0 && actions && actions[names[0]]) {
          actions[names[0]].fadeOut(0.5);
        }
      };
    }, [actions, names]);

    return (
      <group ref={group} dispose={null} position={[0, -1, 0]} scale={[1.1, 1.1, 1.1]}>
        <primitive object={scene} />
      </group>
    );

  } catch (error) {
    console.error("3D Model loading failed, showing fallback cube:", error);
    
    // अगर मॉडल लोड न हो, तो क्रैश होने के बजाय यह सुंदर 3D नियॉन क्यूब दिखाएगा
    return (
      <mesh position={[0, 0, 0]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.8} />
      </mesh>
    );
  }
}

// इसे अभी के लिए कमेंट कर देते हैं ताकि अगर फाइल न हो तो ये क्रैश न करे
// useGLTF.preload('/avatars/male.glb');