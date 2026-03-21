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
      nebulaRef.current.rotation.y += delta * 0.1;

      const scrollY = window.scrollY;
      
      const targetScale = 4 + (scrollY * 0.005); 
      
      nebulaRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.1
      );
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