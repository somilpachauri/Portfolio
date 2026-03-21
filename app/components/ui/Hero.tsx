export default function Hero() {
  return (
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

        <div className="mt-10 flex flex-col sm:flex-row gap-4 pointer-events-auto w-full max-w-xs sm:max-w-none">
        
    <a 
      href="/Somil_Pachauri_CV.pdf" 
      download="Somil_Pachauri_CV.pdf"
      className="flex items-center gap-2 px-8 py-3 bg-gold text-black font-bold rounded-full hover:bg-platinum transition-all duration-300 shadow-[0_0_20px_rgba(252,163,17,0.3)] hover:-translate-y-1"
      >
      <span>Download CV</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </a>
  
    <a 
    href="https://www.linkedin.com/in/somilpachauri" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-2 px-8 py-3 border border-platinum/50 text-white font-bold rounded-full hover:bg-oxford hover:border-oxford transition-all duration-300 backdrop-blur-sm hover:-translate-y-1"
    >
      <span>Follow Me</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </a>

  </div>

      </div>
    </section>
  );
}