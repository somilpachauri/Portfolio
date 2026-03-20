"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  // State to track which section is currently on screen
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section is in the viewport
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");
            if (currentId) {
              setActiveSection(currentId);
              
              // Silently update the URL hash without causing a page jump
              window.history.replaceState(null, "", `#${currentId}`);
            }
          }
        });
      },
      // Trigger when the section is at least 50% visible
      { threshold: 0.5 } 
    );

    // Tell the observer to watch every <section> on the page
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
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-platinum/10 px-10 md:px-24 py-6 flex justify-between items-center pointer-events-auto transition-all">
      
      <Link href="#about" className="text-white font-bold text-2xl tracking-widest hover:scale-105 transition-transform">
        SOMIL<span className="text-gold">.</span>
      </Link>

      <ul className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              href={`#${link.href}`} 
              // If this is the active section, make it gold. Otherwise, make it platinum.
              className={`transition-colors duration-300 ${
                activeSection === link.href ? "text-gold font-bold" : "text-platinum hover:text-gold"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      
    </nav>
  );
}