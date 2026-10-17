import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { fadeUp, stagger, inView } from '../lib/motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section className="w-full relative pt-20 sm:pt-24 pb-48 sm:pb-72 px-4 sm:px-6" id="contact">
      <div className="w-full max-w-6xl relative z-10 mx-auto">
        <motion.div 
          variants={stagger()}
          {...inView}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-900 tracking-[-0.035em] mb-4">
            Benimle İletişime Geç
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-brand-600 font-medium">
            Proje fikirlerinizi gerçeğe dönüştürelim.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={stagger(0.15)}
          {...inView}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <motion.a variants={fadeUp} href="mailto:selimkavaklicesme@gmail.com" className="group flex items-center p-6 sheet sheet-link">
            <div className="mr-5 group-hover:scale-105 transition-transform duration-300">
              <Mail className="w-10 h-10 text-brand-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-brand-900 mb-1">Email</h4>
              <p className="font-mono text-xs text-brand-600 break-all">selimkavaklicesme@gmail.com</p>
            </div>
          </motion.a>

          <motion.a variants={fadeUp} href="https://linkedin.com/in/selimkavaklicesme" target="_blank" rel="noreferrer" className="group flex items-center p-6 sheet sheet-link">
            <div className="mr-5 group-hover:scale-105 transition-transform duration-300">
              <Linkedin className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-brand-900 mb-1">LinkedIn</h4>
              <p className="text-sm text-brand-600">Benimle Bağlantı Kur</p>
            </div>
          </motion.a>

          <motion.a variants={fadeUp} href="https://github.com/Skavces" target="_blank" rel="noreferrer" className="group flex items-center p-6 sheet sheet-link">
            <div className="mr-5 group-hover:scale-105 transition-transform duration-300">
              <Github className="w-10 h-10 text-brand-800" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-brand-900 mb-1">GitHub</h4>
              <p className="text-sm text-brand-600">Projelerimi ve Kodlarımı İncele</p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
