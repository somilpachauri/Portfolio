"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// 1. We import useMemo to help us store our vector
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

export default function NebulaBackground({ isMobile }: { isMobile?: boolean }) {
  const { scene } = useGLTF("/need_some_space.glb");
  const nebulaRef = useRef<THREE.Group>(null);
  const scrollY = useRef(0);

  // THE FIX: We create the target vector EXACTLY ONCE when the component loads.
  // This stops the memory leak and completely prevents the browser from freezing.
  const targetScaleVec = useMemo(() => new THREE.Vector3(4, 4, 4), []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += delta * 0.1;

      if (!isMobile) {
        const targetScale = 4 + (scrollY.current * 0.005); 
        
        // Update our existing vector instead of creating a new one
        targetScaleVec.set(targetScale, targetScale, targetScale);
        nebulaRef.current.scale.lerp(targetScaleVec, 0.1);
      } else {
        // Stop forcing the phone to re-apply the scale 60 times a second if it's already set
        if (nebulaRef.current.scale.x !== 4) {
          nebulaRef.current.scale.set(4, 4, 4);
        }
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