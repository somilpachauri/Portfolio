"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

export default function NebulaBackground({ isMobile }: { isMobile?: boolean }) {
  const { scene } = useGLTF("/need_some_space.glb");
  const nebulaRef = useRef<THREE.Group>(null);
  const scrollY = useRef(0);

  const targetScaleVec = useMemo(() => new THREE.Vector3(4, 4, 4), []);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useFrame((state, delta) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += delta * 0.1;

      if (!isMobile) {
        const targetScale = 4 + (scrollY.current * 0.005); 
        targetScaleVec.set(targetScale, targetScale, targetScale);
        nebulaRef.current.scale.lerp(targetScaleVec, 0.1);
      } else {
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