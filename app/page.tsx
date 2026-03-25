"use client";

// 1. Added Suspense from react
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

// 2. Added dynamic from next/dynamic
import dynamic from "next/dynamic";

import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import Skills from "./components/ui/Skills";
import Projects from "./components/ui/Projects";
import Contact from "./components/ui/Contact";

// 3. THE MAGIC TRICK: Dynamically import the heavy 3D component.
// ssr: false is crucial because 3D models rely on the browser window and will crash if loaded on the server!
const NebulaBackground = dynamic(() => import("./components/3d/NebulaBackground"), { 
  ssr: false,
});

export default function Home() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);

  useEffect(() => {
    const updateDpr = () => {
      setDpr(window.innerWidth > 768 ? [1, 2] : [1, 1.5]);
    };

    updateDpr(); 
    window.addEventListener("resize", updateDpr); 
    
    return () => window.removeEventListener("resize", updateDpr);
  }, []);

  return (
    <main className="relative w-full bg-black overflow-hidden scroll-smooth">
      
      <div className="fixed inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={dpr} 
          gl={{ antialias: false, powerPreference: "high-performance" }} 
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          
          {/* 4. Wrap the dynamically loaded models in Suspense. 
              fallback={null} means it will just show empty space until the model is ready. */}
          <Suspense fallback={null}>
            <Environment preset="forest" /> 
            <NebulaBackground />
          </Suspense>

        </Canvas>
      </div>

      {/* The rest of your UI loads INSTANTLY because it's not waiting on the Canvas anymore! */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/60 via-oxford/40 to-transparent"></div>

      <div className="relative z-20 w-full pointer-events-none">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>

    </main>
  );
}