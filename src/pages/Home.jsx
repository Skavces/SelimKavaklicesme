import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import ProfileCard from '../components/ProfileCard';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="w-full min-h-dvh flex flex-col justify-center relative overflow-hidden py-24 px-4 sm:px-6" id="home">
      
      {/* Very Subtle Background Noise/Gradient */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-brand-200/50 dark:bg-brand-800/50 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 transition-opacity duration-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-brand-300/30 dark:bg-brand-700/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-40 transition-opacity duration-1000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col">
        
        {/* Main Hero Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          <motion.div 
            className="flex-1 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            <motion.h1 
               variants={itemVariants} 
               className="text-5xl sm:text-6xl md:text-7xl font-semibold text-brand-900 dark:text-brand-100 tracking-tight leading-[1.05] mb-4 text-balance"
            >
               Selim Kavaklıçeşme
            </motion.h1>

            <motion.h2 
               variants={itemVariants} 
               className="text-2xl sm:text-3xl font-medium text-brand-700 dark:text-brand-300 tracking-tight mb-6 text-balance"
            >
               Küçük ve orta ölçekli işletmeler için kurumsal web çözümleri ve mini ERP sistemleri geliştiriyorum.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-brand-600 dark:text-brand-400 max-w-xl leading-relaxed mb-10">
              İşletmenizin ihtiyaçlarına özel dijital çözümler üretiyor; yönetim panelleri, stok takibi, müşteri yönetimi ve daha fazlasını tek çatı altında sunuyorum.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
               <a href="#projects" className="px-6 py-3 bg-brand-900 dark:bg-brand-50 text-brand-50 dark:text-brand-900 font-medium rounded-xl hover:scale-95 transition-transform duration-300 shadow-lg">
                  Projeleri Görüntüle
               </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/3 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[320px] h-[440px] transform md:scale-[0.85] lg:scale-100 origin-center md:origin-right mx-auto md:mx-0 flex justify-center items-center">
              <ProfileCard 
                avatarUrl="https://github.com/Skavces.png"
                title="Backend Developer"
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