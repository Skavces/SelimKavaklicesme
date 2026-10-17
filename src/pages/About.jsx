import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { fadeUp, stagger, inView } from '../lib/motion';
import CornerMarks from '../components/CornerMarks';
import { BookOpen, MapPin } from 'lucide-react';

const steps = [
  { title: "Görüşme", text: "İşinizi ve ihtiyacınızı dinliyorum. Soma'daysanız yüz yüze, değilseniz online görüşürüz." },
  { title: "Kapsam ve takvim", text: "Ne yapılacağını, ne zaman biteceğini ve teklifi netleştiriyoruz." },
  { title: "Geliştirme", text: "Çalışan hâlini aşama aşama gösteriyorum, geri bildiriminizle ilerliyoruz." },
  { title: "Canlıya alma ve destek", text: "Sistemi yayına alıyorum. Sonrasında güncelleme, düzeltme ve bakım desteği veriyorum." },
];

export default function About() {
  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center relative overflow-hidden pt-32 pb-24 px-4 sm:px-6" id="about">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          {...inView}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-900 tracking-[-0.035em] mb-4">
            Hakkımda
          </h2>
        </motion.div>

        <motion.div
          variants={stagger()}
          {...inView}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Main Bio Card */}
          <motion.div
            variants={fadeUp}
            className="sheet p-8 sm:p-12 flex flex-col items-center text-center"
          >
            <CornerMarks />
            <span className="tag gap-2 px-3 py-1.5 mb-8">
              <MapPin className="w-4 h-4" />
              Soma / Manisa
            </span>

            <p className="text-brand-700 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              İşletmeler için web sitesi ve yönetim yazılımı geliştiriyorum. Soma içinde yüz yüze görüşerek, Soma dışındaki işletmelerle online çalışıyorum.
            </p>
            <p className="text-brand-700 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              Tek kişiyim: görüşmeden canlıya almaya kadar muhatabınız hep ben oluyorum, araya kimse girmiyor.
            </p>
            <p className="text-brand-700 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Teslimden sonra da bırakmıyorum. Güncelleme, düzeltme ve bakım desteği veriyorum.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-auto">
              <a href="#contact" className="btn btn-primary px-8 py-4 w-full sm:w-auto">
                Projeni Anlat
              </a>
              <a href="/Selim_Kavaklicesme_CV.pdf" target="_blank" className="btn btn-ghost px-8 py-4 w-full sm:w-auto">
                <BookOpen className="w-5 h-5" />
                <span>CV'mi İndir</span>
              </a>
            </div>
          </motion.div>

          {/* Process Card */}
          <motion.div
            variants={fadeUp}
            className="sheet p-8 sm:p-12 flex flex-col justify-center"
          >
            <CornerMarks label="SÜREÇ · 4 ADIM" />
            <h3 className="text-2xl font-semibold text-brand-900 mb-8 text-center">
              Nasıl Çalışıyorum
            </h3>

            <ol className="flex flex-col gap-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="shrink-0 w-9 h-9 rounded-tag border border-brand-800/20 flex items-center justify-center font-mono text-xs text-brand-700">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-brand-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-brand-600 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-brand-500">
              React · NestJS · PostgreSQL · Docker
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
