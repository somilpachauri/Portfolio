"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const trailCursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const mainCursor = mainCursorRef.current;
    const trailCursor = trailCursorRef.current;
    if (!mainCursor || !trailCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      mainCursor.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
      trailCursor.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
    };

    const handleMouseLeave = () => setHidden(true);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches("a, button, input, textarea, [role='button']") ||
        target.closest("a, button, input, textarea, [role='button']")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handlePointerOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handlePointerOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
        body { overflow-x: hidden; }
      `}</style>

      <div
        ref={mainCursorRef}
        className={`fixed top-0 left-0 w-3 h-3 bg-gold rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${hidden ? 'opacity-0' : 'opacity-100'}`}
      />

      <div
        ref={trailCursorRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-gold/50 rounded-full pointer-events-none z-[9998] transition-all duration-[300ms] ease-out shadow-[0_0_20px_rgba(252,163,17,0.5)] 
          ${hidden ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
          ${isPointer ? 'scale-150 bg-gold/10' : ''}`} 
      />
    </>
  );
}