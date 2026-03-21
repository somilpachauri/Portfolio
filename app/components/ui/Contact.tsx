"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CampingModel from "../3d/CampingModel";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("Establishing secure connection...");

    const formSubmitData = new FormData(e.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "225d6213-6df7-4d1d-8bf2-ca473c10ce4b";
    formSubmitData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formSubmitData, 
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage("Transmission sent successfully! 🚀");
        setFormData({ name: "", email: "", message: "" }); 
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Failed to send. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
      setStatusMessage("Critical error. Please check your connection.");
    } finally {
      setTimeout(() => setStatus("idle"), 5000); 
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col justify-end md:justify-center px-6 md:px-24 pb-12 md:pb-0 pointer-events-auto overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-[-10] pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)" }}
      >
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fca311" />
          <Environment preset="night" />
          <CampingModel inView={inView} />
        </Canvas>
      </div>


<div className="relative z-10 w-full max-w-6xl mx-auto flex justify-center md:justify-start">
  <div className="w-full max-w-md">
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-black/20 md:bg-oxford/40 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
      
      <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-4 border-b border-white/10 pb-4">
        Contact <span className="text-gold">Me.</span>
      </h2>
      
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="flex flex-col gap-1 mt-2">
              <label className="text-platinum text-sm font-semibold tracking-wider ml-1">Name</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Somil" 
                className="bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-platinum text-sm font-semibold tracking-wider ml-1">Email</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="somilpachauri@gmail.com" 
                className="bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-platinum text-sm font-semibold tracking-wider ml-1">Message</label>
              <textarea 
                rows={4}
                name="message" 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hello Somil..." 
                className="bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="mt-4 bg-gold text-black font-bold text-lg rounded-lg px-4 py-3 hover:bg-platinum transition-all shadow-[0_0_20px_rgba(252,163,17,0.2)] disabled:bg-platinum/50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status !== "idle" && (
              <p className={`text-center mt-2 text-sm font-semibold ${status === "success" ? 'text-green-400' : 'text-red-400'}`}>
                {statusMessage}
              </p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}