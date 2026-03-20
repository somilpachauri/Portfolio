"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function CampingModel({ inView }: { inView: boolean }) {
  const { scene } = useGLTF("/space_camping.glb");
  const groupRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. CAMERA GLIDE (Locked as requested)
    const outPos = new THREE.Vector3(0, 2, 12);
    const inPos = new THREE.Vector3(-3, 1.2, 4.0);
    const targetPosition = inView ? inPos : outPos;
    state.camera.position.lerp(targetPosition, 0.03);

    if (inView) {
      state.camera.lookAt(-1.5, -0.8, 0); 
    } else {
      state.camera.lookAt(0, 0, 0);
    }

    if (groupRef.current) {
      groupRef.current.position.y = -1.5 + Math.sin(t * 0.4) * 0.03;
      groupRef.current.rotation.y = -1.6 + Math.sin(t * 0.2) * 0.02;
    }

    // 2. LAYERED LIGHTING ALIGNMENT & FLICKER
    if (coreLightRef.current && fillLightRef.current) {
      const flicker = Math.sin(t * 15) * 5 + Math.sin(t * 30) * 2 + (Math.random() * 2);
      
      coreLightRef.current.intensity = 100 + flicker * 5; // Increased punch
      fillLightRef.current.intensity = 40 + flicker;
    }
  });

  return (
    <group ref={groupRef}>
      {/* CORE FIRE LIGHT: 
          Shifted X from -1.35 to -0.75 (Move Right)
          Shifted Z from 1.1 to 0.5 (Move Forward)
          Lowered Y to sit deeper in the logs
      */}
      <pointLight 
        ref={coreLightRef}
        position={[-0.2, -0.4, 1]} 
        color="#ffa500" 
        distance={8}
        decay={2}
      />

      {/* SOFT FILL LIGHT: 
          Shifted to match the new core position
      */}
      <pointLight 
        ref={fillLightRef}
        position={[-0.2, 0.3, 0.9]} 
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