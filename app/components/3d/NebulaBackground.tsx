"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// Accept the isMobile prop from page.tsx
export default function NebulaBackground({ isMobile }: { isMobile?: boolean }) {
  const { scene } = useGLTF("/need_some_space.glb");
  const nebulaRef = useRef<THREE.Group>(null);
  
  // FIX 1: Create a highly efficient ref to track scrolling
  const scrollY = useRef(0);

  useEffect(() => {
    // This updates the scroll position silently without interrupting the 3D renderer
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    
    // passive: true makes scrolling buttery smooth by not blocking the main thread
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += delta * 0.1;

      // FIX 2: Only scale up the transparent nebula on Desktop!
      // Scaling transparent objects on mobile causes massive "Alpha Overdraw" lag.
      if (!isMobile) {
        // Read from our optimized scrollY.current instead of window.scrollY
        const targetScale = 4 + (scrollY.current * 0.005); 
        
        nebulaRef.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale), 
          0.1
        );
      } else {
        // On mobile, lock the scale to 4 so it doesn't crash the GPU as they scroll down
        nebulaRef.current.scale.set(4, 4, 4);
      }
    }
  });

  return (
    <group ref={nebulaRef} position={[0, 0, -5]} rotation={[0.5, 0, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/need_some_space.glb");