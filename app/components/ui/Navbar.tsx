"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");
            if (currentId) {
              setActiveSection(currentId);
              window.history.replaceState(null, "", `#${currentId}`);
            }
          }
        });
      },
      { threshold: 0.5 } 
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Contact", href: "contact" },
  ];

  return (
 <nav className="fixed top-0 left-0 w-full z-[999] bg-black/40 backdrop-blur-xl border-b border-white/10 pointer-events-auto transition-all">
      
      <div className="px-6 md:px-24 py-5 flex justify-between items-center w-full">
        <Link 
          href="#about" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-white font-bold text-2xl tracking-widest hover:scale-105 transition-transform"
        >
          SOMIL<span className="text-gold">.</span>
        </Link>

        <ul className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={`#${link.href}`} 
                className={`transition-colors duration-300 ${
                  activeSection === link.href ? "text-gold font-bold" : "text-platinum hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      <div 
        className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center py-8 gap-8 transition-all duration-300 origin-top ${
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            href={`#${link.href}`} 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-lg uppercase tracking-widest transition-colors duration-300 ${
              activeSection === link.href ? "text-gold font-bold drop-shadow-[0_0_8px_rgba(252,163,17,0.8)]" : "text-platinum hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

    </nav>
  );
}