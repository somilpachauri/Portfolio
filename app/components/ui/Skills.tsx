export default function Skills() {
  type Skill = {
    name: string;
    icon: string;
    invert?: boolean;
  };

  const topRow: Skill[] = [
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", invert: true },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invert: true },
  ];

  const bottomRow: Skill[] = [
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "Kali Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kalilinux/kalilinux-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  ];

  const duplicatedTopRow = [...topRow, ...topRow, ...topRow];
  const duplicatedBottomRow = [...bottomRow, ...bottomRow, ...bottomRow];

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      
      <div className="text-center mb-10 md:mb-16 px-6 md:px-10">
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wider drop-shadow-lg">
          My <span className="text-gold">Arsenal.</span>
        </h2>
        <p className="text-platinum mt-4 text-sm md:text-lg max-w-xl mx-auto drop-shadow-md">
          The technologies I use to build digital experiences and hunt for vulnerabilities.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden pause-on-hover group mb-4 md:mb-6 mask-fade">
        <div className="flex w-max animate-scroll gap-3 md:gap-6 px-3">
          {duplicatedTopRow.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 bg-[#0a0a0a]/95 md:bg-white/[0.02] border border-white/20 rounded-xl md:rounded-2xl md:backdrop-blur-md hover:border-gold hover:bg-[#1a1a1a] md:hover:bg-white/10 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(252,163,17,0.3)] transition-all duration-300 cursor-pointer"
            >
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className={`w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-4 drop-shadow-xl ${skill.invert ? 'invert opacity-90' : ''}`} 
              />
              <span className="text-white text-[11px] md:text-base font-bold tracking-wider drop-shadow-md">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full flex overflow-hidden pause-on-hover group mask-fade">
        <div className="flex w-max animate-scroll-reverse gap-3 md:gap-6 px-3">
          {duplicatedBottomRow.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 bg-[#0a0a0a]/95 md:bg-white/[0.02] border border-white/20 rounded-xl md:rounded-2xl md:backdrop-blur-md hover:border-gold hover:bg-[#1a1a1a] md:hover:bg-white/10 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(252,163,17,0.3)] transition-all duration-300 cursor-pointer"
            >
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className={`w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-4 drop-shadow-xl ${skill.invert ? 'invert opacity-90' : ''}`} 
              />
              <span className="text-white text-[11px] md:text-base font-bold tracking-wider drop-shadow-md">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}