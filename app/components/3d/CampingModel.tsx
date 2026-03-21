"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber"; 
import * as THREE from "three";
import { useRef } from "react";

export default function CampingModel({ inView }: { inView: boolean }) {
  const { scene } = useGLTF("/space_camping.glb");
  const groupRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);

  const { size } = useThree();
  const isMobile = size.width < 768;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const outPos = new THREE.Vector3(0, 2, 12);
    
    const inPos = isMobile 
      ? new THREE.Vector3(0, -0.8, 8.5) 
      : new THREE.Vector3(-3, 1.2, 4.0);

    const targetPosition = inView ? inPos : outPos;
    state.camera.position.lerp(targetPosition, 0.03);

    if (inView) {
      const lookX = isMobile ? 0 : -1.5;
      const lookY = isMobile ? -3.4 : -0.8;
      
      state.camera.lookAt(lookX, lookY, 0); 
    } else {
      state.camera.lookAt(0, 0, 0);
    }

    if (groupRef.current) {
      groupRef.current.position.y = -1.5 + Math.sin(t * 0.4) * 0.03;
      groupRef.current.rotation.y = -1.6 + Math.sin(t * 0.2) * 0.02;
    }

    if (coreLightRef.current && fillLightRef.current) {
      const flicker = Math.sin(t * 15) * 5 + Math.sin(t * 30) * 2 + (Math.random() * 2);
      coreLightRef.current.intensity = 100 + flicker * 5;
      fillLightRef.current.intensity = 40 + flicker;
    }
  });

  return (
    <group ref={groupRef}>
     <pointLight 
        ref={coreLightRef}
        position={[-1, -0.3, 0.7]} 
        color="#ffa500" 
        distance={8}
        decay={2}
      />

     <pointLight 
        ref={fillLightRef}
        position={[-0.6, 0.6, 1.0]} 
        color="#ff4500" 
        distance={10}
        decay={1.8}
      />
      
      <primitive 
        object={scene} 
        scale={1} 
        rotation={[-0.07, 0.2, -0.04]} 
      />
    </group>
  );
}

useGLTF.preload("/space_camping.glb");