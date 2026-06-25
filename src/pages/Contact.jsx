import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="w-full min-h-dvh flex flex-col justify-center relative overflow-hidden py-24 px-4 sm:px-6" id="contact">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] bg-brand-300/30 dark:bg-brand-700/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-opacity duration-1000"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10 mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-semibold text-brand-900 dark:text-brand-100 tracking-tight mb-4">
            Benimle İletişime Geç
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-brand-600 dark:text-brand-400 font-medium">
            Proje fikirlerinizi gerçeğe dönüştürelim.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <a href="mailto:selimkavaklicesme@gmail.com" className="group flex items-center p-6 glass-panel rounded-3xl hover:-translate-y-1 transition-all hover:shadow-xl">
            <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/50 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform shadow-inner">
              <Mail className="w-7 h-7 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-brand-900 dark:text-brand-100 mb-1">Email</h4>
              <p className="text-sm text-brand-600 dark:text-brand-400 break-all">selimkavaklicesme@gmail.com</p>
            </div>
          </a>

          <a href="https://linkedin.com/in/selimkavaklicesme" target="_blank" rel="noreferrer" className="group flex items-center p-6 glass-panel rounded-3xl hover:-translate-y-1 transition-all hover:shadow-xl">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform shadow-inner border border-blue-200 dark:border-blue-800/50">
              <Linkedin className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-brand-900 dark:text-brand-100 mb-1">LinkedIn</h4>
              <p className="text-sm text-brand-600 dark:text-brand-400">Benimle Bağlantı Kur</p>
            </div>
          </a>

          <a href="https://github.com/Skavces" target="_blank" rel="noreferrer" className="group flex items-center p-6 glass-panel rounded-3xl hover:-translate-y-1 transition-all hover:shadow-xl">
            <div className="w-14 h-14 bg-brand-200 dark:bg-brand-800 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform shadow-inner border border-brand-300 dark:border-brand-700">
              <Github className="w-7 h-7 text-brand-800 dark:text-brand-200" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-brand-900 dark:text-brand-100 mb-1">GitHub</h4>
              <p className="text-sm text-brand-600 dark:text-brand-400">Projelerimi ve Kodlarımı İncele</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
