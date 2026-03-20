"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CampingModel from "../3d/CampingModel";

export default function Contact() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center px-10 md:px-24 pointer-events-auto overflow-hidden"
    >
      {/* 3D BACKGROUND LAYER */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)" }}
      >
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fca311" />
          <Environment preset="night" />
          <CampingModel inView={inView} />
        </Canvas>
      </div>

      {/* UI LAYER - MATCHING YOUR SKETCH */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-start">
        
        {/* Form Container locked to the left */}
        <div className="w-full max-w-md">
          <form className="flex flex-col gap-4 bg-oxford/60 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
            
            {/* Heading moved inside the form container */}
            <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-4 border-b border-white/10 pb-4">
              Contact <span className="text-gold">Me.</span>
            </h2>
            
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-platinum text-sm font-semibold tracking-wider ml-1">Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-platinum text-sm font-semibold tracking-wider ml-1">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-platinum text-sm font-semibold tracking-wider ml-1">Message</label>
              <textarea 
                rows={4}
                placeholder="Hello Somil..." 
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="button" 
              className="mt-4 bg-gold text-black font-bold text-lg rounded-lg px-4 py-3 hover:bg-platinum transition-all shadow-[0_0_20px_rgba(252,163,17,0.2)]"
            >
              Send Transmission
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}