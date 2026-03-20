export default function Skills() {
  // THE TS FIX: We define exactly what a Skill object looks like. 
  // The "?" makes 'invert' optional, so TS won't complain if it's missing!
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
      
      <div className="text-center mb-16 px-10">
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wider drop-shadow-lg">
          My <span className="text-gold">Arsenal.</span>
        </h2>
        <p className="text-platinum mt-4 text-lg max-w-xl mx-auto drop-shadow-md">
          The technologies I use to build digital experiences and hunt for vulnerabilities.
        </p>
      </div>

      {/* Top Carousel Row */}
      <div className="relative w-full flex overflow-hidden pause-on-hover group mb-6 mask-fade">
        <div className="flex w-max animate-scroll gap-6 px-3">
          {duplicatedTopRow.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="flex flex-col items-center justify-center w-40 h-40 bg-white/[0.02] border border-white/20 rounded-2xl backdrop-blur-md hover:border-gold hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-300 cursor-pointer"
            >
              <img 
                src={skill.icon} 
                alt={skill.name} 
                // THE LOGO FIX: Removed brightness-0 so the inside details of the logos are preserved!
                className={`w-16 h-16 mb-4 drop-shadow-xl ${skill.invert ? 'invert opacity-90' : ''}`} 
              />
              <span className="text-white font-bold tracking-wider drop-shadow-md">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Carousel Row (Reverse) */}
      <div className="relative w-full flex overflow-hidden pause-on-hover group mask-fade">
        <div className="flex w-max animate-scroll-reverse gap-6 px-3">
          {duplicatedBottomRow.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="flex flex-col items-center justify-center w-40 h-40 bg-white/[0.02] border border-white/20 rounded-2xl backdrop-blur-md hover:border-gold hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-300 cursor-pointer"
            >
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className={`w-16 h-16 mb-4 drop-shadow-xl ${skill.invert ? 'invert opacity-90' : ''}`} 
              />
              <span className="text-white font-bold tracking-wider drop-shadow-md">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}