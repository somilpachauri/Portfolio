"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import dynamic from "next/dynamic";

import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import Skills from "./components/ui/Skills";
import Projects from "./components/ui/Projects";
import Contact from "./components/ui/Contact";

const NebulaBackground = dynamic<{ isMobile: boolean }>(
  () => import("./components/3d/NebulaBackground"), 
  { ssr: false }
);

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); 
    window.addEventListener("resize", checkMobile); 
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative w-full bg-black overflow-hidden scroll-smooth">
      
      <div className="fixed inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 60 }}
          // THE FIX: Hard-cap mobile to 1x resolution. Desktop gets crisp 2x.
          dpr={isMobile ? 1 : [1, 2]} 
          gl={{ antialias: false, powerPreference: "high-performance" }} 
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          
          <Suspense fallback={null}>
            <Environment preset="forest" resolution={isMobile ? 256 : 1024} /> 
            
            {/* Pass the isMobile state into our 3D model */}
            <NebulaBackground isMobile={isMobile} />

            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
          </Suspense>

        </Canvas>
      </div>

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