"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import dynamic from "next/dynamic";

import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import Skills from "./components/ui/Skills";
import Projects from "./components/ui/Projects";

const NebulaBackground = dynamic<{ isMobile: boolean }>(
  () => import("./components/3d/NebulaBackground"), 
  { ssr: false }
);

const Contact = dynamic(
  () => import("./components/ui/Contact"), 
  { ssr: false }
);

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [loadContactChunk, setLoadContactChunk] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); 
    window.addEventListener("resize", checkMobile); 
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Phase 1: Silently fetch the 3D model files in the background
  useEffect(() => {
    const handleScroll = () => {
      // Trigger the download as soon as they start scrolling
      if (window.scrollY > 50 && !loadContactChunk) {
        setLoadContactChunk(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Fallback: If they don't scroll, fetch it after 3 seconds anyway
    const timer = setTimeout(() => setLoadContactChunk(true), 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [loadContactChunk]);

  return (
    <main className="relative w-full bg-black overflow-hidden scroll-smooth">
      
      <div className="fixed inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={isMobile ? 1 : [1, 2]} 
          gl={{ antialias: false, powerPreference: "high-performance", alpha: false }} 
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          
          <Suspense fallback={null}>
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
        <div className="relative w-full">
          {loadContactChunk && <Contact />}
        </div>
      </div>

    </main>
  );
}