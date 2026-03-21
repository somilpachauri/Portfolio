"use client";

import { useGLTF, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function AstronautModel() {
  const { scene } = useGLTF("/astronaut_on_moon.glb"); 
  
  const astronautRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (astronautRef.current) {
      const targetX = (state.pointer.y * Math.PI) / 4; 
      const targetY = (state.pointer.x * Math.PI) / 4; 

      astronautRef.current.rotation.x = THREE.MathUtils.lerp(astronautRef.current.rotation.x, targetX, 0.1);
      astronautRef.current.rotation.y = THREE.MathUtils.lerp(astronautRef.current.rotation.y, targetY, 0.1);
    }
  });

  return (
    <group ref={astronautRef} position={[4, 2, 1]}>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        
        <group position={[0, -2, 0]}> 
          
          <primitive 
            object={scene} 
            scale={0.05} 
            rotation={[0, -Math.PI / 2, 0]} 
          />
          
        </group>
        
      </Float>
      
    </group>
  );
}

useGLTF.preload("/astronaut_on_moon.glb");