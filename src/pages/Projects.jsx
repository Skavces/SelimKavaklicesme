import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ArrowUpRight, Code, Database, Globe } from 'lucide-react';

export default function Projects() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const projects = [
    {
      title: "RenEl Enerji",
      description: "Güneş enerjisi şirketi için JWT/2FA korumalı admin paneli, proje/referans yönetimi ve medya yükleme özellikli fullstack kurumsal site. Docker + Nginx ile production deploy.",
      tech: ["React 19", "NestJS", "TypeORM", "PostgreSQL", "Docker", "Nginx"],
      icon: <Globe className="w-5 h-5 text-brand-500 dark:text-brand-300" />,
      images: ["/renelenerji.png"],
      url: "https://renelenerji.com"
    },
    {
      title: "New Temizlik",
      description: "Temizlik firması için hizmet tanıtımı, referanslar ve iletişim formu içeren modern kurumsal web sitesi.",
      tech: ["React", "NestJS", "PostgreSQL", "Tailwind CSS", "Docker"],
      icon: <Globe className="w-5 h-5 text-brand-500 dark:text-brand-300" />,
      images: ["/newtemizlik.png"],
      url: "https://newtemizlik.com"
    },
    {
      title: "Pablo Artisan Coffee",
      description: "Kafe için QR kodla erişilen dijital menü ve güvenli admin paneli. JWT + TOTP 2FA, brute-force koruması ve MinIO ile görsel yükleme. Docker Compose ile tek komutta ayağa kalkan production ortamı.",
      tech: ["React 18", "TypeScript", "NestJS", "TypeORM", "PostgreSQL", "MinIO", "Docker"],
      icon: <Globe className="w-5 h-5 text-brand-500 dark:text-brand-300" />,
      images: ["/pablo.png"],
      url: "#"
    },
    {
      title: "Yağhane",
      description: "3 rol paneli ve Socket.IO ile gerçek zamanlı senkronizasyon içeren uçtan uca zeytinyağı operasyon yönetim sistemi.",
      tech: ["React", "Express.js", "SQLite", "Socket.IO", "Tailwind CSS"],
      icon: <Database className="w-5 h-5 text-brand-500 dark:text-brand-300" />,
      images: ["/yaghane.png"],
      url: "https://github.com/Skavces/Yaghane-Uygulamasi"
    },
    {
      title: "Kelimo",
      description: "Reels tarzı dikey kaydırma, aralıklı tekrar ve 4 mini oyun içeren fullstack dil öğrenme uygulaması. Google OAuth, Cloudinary entegrasyonu ve Docker Compose ile containerized ortam.",
      tech: ["NestJS", "React", "React Native", "Prisma", "PostgreSQL", "Docker"],
      icon: <Globe className="w-5 h-5 text-brand-500 dark:text-brand-300" />,
      images: ["/dil.png"],
      url: "https://github.com/Skavces/KelimoApp"
    },
    {
      title: "SomaFM",
      description: "Bölgenin radyo ve medya organizasyonu için resmi web ve mobil uygulaması.",
      tech: ["NestJS", "React", "React-Native", "PostgreSQL"],
      icon: <Code className="w-5 h-5 text-brand-500 dark:text-brand-300" />,
      images: ["/somafm.jpg"],
      url: "https://github.com/berkesongul/somafm"
    }
  ];

  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center relative overflow-hidden py-24 px-4 sm:px-6" id="projects">
      {/* Subtle background element */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-brand-200/40 dark:bg-brand-800/20 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen opacity-50"></div>

      <div className="w-full max-w-6xl relative z-10 mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-brand-900 dark:text-brand-100 tracking-tight mb-8">
            Projelerim
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          {projects.map((project) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              className="cursor-pointer group relative glass-panel rounded-4xl p-6 sm:p-8 overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
            >
              {/* Soft Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none radial-gradient-spotlight">
                <div className="absolute -top-[150px] -right-[150px] w-[300px] h-[300px] bg-brand-500/10 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Project Image Area */}
                <div className="w-full h-48 sm:h-56 mb-8 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 relative group/img cursor-pointer flex items-center justify-center">
                  <img 
                    src={project.images[0]} 
                    alt={`${project.title} screenshot`} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover/img:scale-105 group-hover/img:shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-900/10 to-transparent pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex z-10 items-center justify-center w-12 h-12 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl shadow-inner text-brand-600 dark:text-brand-400">
                    {project.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-brand-900 dark:text-brand-100 mb-3">{project.title}</h3>
                <div className="mb-6 grow">
                  <p className="text-brand-700 dark:text-brand-300 text-sm leading-relaxed">{project.description}</p>
                </div>
                
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md text-xs font-medium text-brand-600 dark:text-brand-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-brand-200 dark:border-brand-800 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-800 flex items-center justify-center group-hover:bg-brand-800 dark:group-hover:bg-brand-200 group-hover:text-brand-50 dark:group-hover:text-brand-900 text-brand-600 dark:text-brand-400 transition-colors shadow-sm cursor-pointer" aria-label="View Project on GitHub">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}