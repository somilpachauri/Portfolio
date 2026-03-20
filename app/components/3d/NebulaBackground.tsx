"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function NebulaBackground() {
  const { scene } = useGLTF("/need_some_space.glb");
  const nebulaRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (nebulaRef.current) {
      // 1. Perfect rotation in place
      nebulaRef.current.rotation.y += delta * 0.1;

      // 2. The Zoom-on-Scroll effect
      const scrollY = window.scrollY;
      
      // THE FIX: Change the base scale from 1 to something much larger like 3.5 or 4.
      // This forces the model to load massive right away.
      const targetScale = 4 + (scrollY * 0.005); 
      
      nebulaRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.1
      );
    }
  });

  // THE FIX: Add a rotation array [x, y, z]. 
  // Rotating the X-axis (e.g., 0.5 or -0.5) tilts it directly towards or away from the user.
  return (
    <group ref={nebulaRef} position={[0, 0, -5]} rotation={[0.5, 0, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/need_some_space.glb");