import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "Jeevdhara",
      description: "An AI-powered flutter apps built to assist in biodiversity conservation across Uttarakhand. It processes image uploads, utilizes Gemini and GPT-OSS models to classify native vs. invasive species, cross-references local forest jurisdictions, and features a dynamic gamified point system to encourage citizen reporting.",
      tech: ["Flutter","Dart","Python", "FastAPI", "Gemini AI", "GPT-OSS", "Uvicorn"],
      image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop", 
      github: "#",
      live: "#"
    },
    {
      title: "Ping | Real-time Chat",
      description: "A seamless, real-time messaging application built for cross-platform mobile communication. Features include instant message delivery, user authentication, and a clean, responsive UI designed for optimal mobile user experience.",
      tech: ["Flutter", "Dart", "Firebase", "WebSockets"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop", 
      github: "#",
      live: "#"
    },
    {
      title: "Java Download Accelerator",
      description: "A high-performance file downloading engine inspired by IDM. It drastically accelerates download speeds by dynamically splitting large files into multiple concurrent segments and downloading them simultaneously through multithreaded network connections.",
      tech: ["Java", "Multithreading", "Socket API", "Networking"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop", 
      github: "#",
      live: "#"
    },
    {
      title: "Immersive 3D Portfolio",
      description: "The very portfolio you are browsing. A highly interactive, performant 3D web experience built to showcase my projects. It features custom WebGL rendering, glassmorphism UI, and optimized 3D models seamlessly integrated into a modern web stack.",
      tech: ["Next.js", "React", "Three.js", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop", 
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-24 px-10 md:px-24 z-10 relative pointer-events-auto">
      
      <div className="mb-16">
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wider drop-shadow-lg">
          Featured <span className="text-gold">Projects.</span>
        </h2>
        <p className="text-platinum mt-4 text-lg max-w-xl drop-shadow-md">
          A selection of my recent work, ranging from 3D web experiences to complete apps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="flex flex-col bg-oxford/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-gold/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(252,163,17,0.1)]"
          >
            {/* Project Image */}
            <div className="h-64 overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oxford/90 to-transparent"></div>
            </div>

            {/* Project Details */}
            <div className="p-8 flex flex-col flex-grow relative z-10">
              
              {/* UPGRADED TITLE: Tighter tracking, metallic gradient transitioning to gold */}
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-platinum mb-4 tracking-tight group-hover:from-gold group-hover:to-yellow-200 transition-all duration-500 drop-shadow-sm">
                {project.title}
              </h3>

              {/* UPGRADED PARAGRAPH: Lighter font, looser line height, brightens on hover */}
              <p className="text-platinum/60 text-sm md:text-base leading-loose mb-8 flex-grow font-light group-hover:text-platinum/95 transition-colors duration-500">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs text-gold tracking-wider group-hover:border-gold/30 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6 mt-auto pt-4 border-t border-white/5">
                <Link href={project.github} className="flex items-center gap-2 text-platinum/80 hover:text-gold transition-colors text-sm font-bold tracking-wider uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  Code
                </Link>
                
                <Link href={project.live} className="flex items-center gap-2 text-platinum/80 hover:text-gold transition-colors text-sm font-bold tracking-wider uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Demo
                </Link>
              </div>
            </div>
            
          </div>
        ))}
      </div>
      
    </section>
  );
}