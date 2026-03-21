"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import NebulaBackground from "./components/3d/NebulaBackground";

import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import Skills from "./components/ui/Skills";
import Projects from "./components/ui/Projects";
import Contact from "./components/ui/Contact";

export default function Home() {
  return (
    <main className="relative w-full bg-black overflow-hidden scroll-smooth">
      
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <Environment preset="forest" /> 
          <NebulaBackground />
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