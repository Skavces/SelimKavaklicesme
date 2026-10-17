import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { fadeUp, stagger, EASE_OUT } from '../lib/motion';
import ProfileCard from '../components/ProfileCard';

export default function Home() {
  return (
    <section className="w-full min-h-dvh flex flex-col justify-center relative overflow-hidden py-24 px-4 sm:px-6" id="home">
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col">
        
        {/* Main Hero Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          <motion.div 
            className="flex-1 flex flex-col items-start"
            variants={stagger(0.25)}
            initial="hidden"
            animate="visible"
          >
            
            <motion.p
               variants={fadeUp}
               className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.18em] text-brand-500 mb-6 flex items-center gap-3"
            >
               <span className="inline-block w-8 h-px bg-brand-400"></span>
               Soma, Manisa · 39.19°N 27.61°E
            </motion.p>

            <motion.h1 
               variants={fadeUp} 
               className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold text-brand-900 tracking-[-0.045em] leading-[0.95] mb-6 text-balance"
            >
               Selim Kavaklıçeşme
            </motion.h1>

            <motion.h2 
               variants={fadeUp} 
               className="text-2xl sm:text-3xl font-medium text-brand-700 tracking-[-0.02em] leading-snug mb-6 text-balance"
            >
               İşletmeniz için web sitesi ve yönetim yazılımı geliştiriyorum.
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-brand-600 max-w-xl leading-relaxed mb-10">
              Kurumsal siteden stok ve sipariş takibine kadar, işinize özel sistemleri fikirden canlıya tek başıma kuruyorum. İki site şu an canlıda, bir sistem de bir işletmede her gün kullanılıyor.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
               <a href="#contact" className="btn btn-primary px-6 py-3">
                  Projeni Anlat
               </a>
               <a href="#projects" className="btn btn-ghost px-6 py-3">
                  Çalışmalarımı Gör
               </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/3 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.96, rotate: -2, y: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
          >
            <div className="relative w-[320px] h-[440px] transform md:scale-[0.85] lg:scale-100 origin-center md:origin-right mx-auto md:mx-0 flex justify-center items-center">
              <ProfileCard 
                avatarUrl="https://github.com/Skavces.png"
                title="Fullstack Web Developer"
                contactText="İletişime Geç"
                onContactClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = "#contact";
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}