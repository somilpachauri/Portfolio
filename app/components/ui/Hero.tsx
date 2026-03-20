export default function Hero() {
  return (
    // REMOVED the bg-gradient so it is completely transparent, relying on the global overlay
    <section 
      id="about" 
      className="h-screen flex flex-col justify-center px-10 md:px-24 pt-20"
    >
      <div className="max-w-3xl z-10">
        
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wider drop-shadow-2xl">
          Hi, I am <span className="text-gold">Somil Pachauri.</span>
        </h1>
        
        <p className="text-platinum mt-4 text-lg md:text-xl max-w-xl drop-shadow-lg">
          A Full-stack developer building immersive and scalable websites
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex gap-4 pointer-events-auto">
          <a 
            href="#projects" 
            className="px-8 py-3 bg-gold text-black font-bold rounded-full hover:bg-platinum transition-all shadow-[0_0_20px_rgba(252,163,17,0.3)]"
          >
            View Projects
          </a>
          
          <a 
            href="#contact" 
            className="px-8 py-3 border border-platinum/50 text-white font-bold rounded-full hover:bg-oxford hover:border-oxford transition-all backdrop-blur-sm"
          >
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
}