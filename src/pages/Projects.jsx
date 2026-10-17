import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { fadeUp, fadeUpGroup, inView } from '../lib/motion';
import CornerMarks from '../components/CornerMarks';
import { ArrowUpRight, Github, MonitorCheck, Globe } from 'lucide-react';

const projects = [
  {
    title: "RenEl Enerji",
    sector: "Güneş enerjisi şirketi",
    status: "Canlıda",
    summary:
      "Kurumsal site ve içeriğin tamamını yönetilebilir kılan bir admin panel. Ziyaretçiyi teklif talebine yönlendiren araçlar içeriyor.",
    highlights: [
      "Anlık sonuç veren tasarruf hesaplayıcı",
      "Yapay zeka destekli sohbet asistanı",
      "Proje, referans ve blog yönetimi; sayaçlar otomatik güncellenir",
      "JWT + 2FA korumalı admin paneli, hata ve işlem logları",
      "SEO için prerender, Umami analitik",
    ],
    tech: ["React 19", "NestJS", "PostgreSQL", "Redis", "Docker", "Nginx"],
    image: "/renelenerji.png",
    link: { href: "https://renelenerji.com", label: "Siteyi Ziyaret Et", icon: Globe },
  },
  {
    title: "New Temizlik",
    sector: "GES panel temizlik ve bakım firması",
    status: "Canlıda",
    summary:
      "Hizmetlerini, referanslarını ve sık sorulan soruları tanıtan, teklif taleplerini doğrudan panele düşüren kurumsal site.",
    highlights: [
      "Hero ve iletişim formundan gelen talepler admin panelde toplanır",
      "Blog, SSS ve referanslar panelden yönetilir",
      "Arama motorları için sayfa başı meta, JSON-LD ve dinamik sitemap",
      "GitHub Actions ile VPS'e otomatik deploy",
      "Kendi sunucusunda çalışan Umami analitik",
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker", "GitHub Actions"],
    image: "/newtemizlik.png",
    link: { href: "https://newtemizlik.com", label: "Siteyi Ziyaret Et", icon: Globe },
  },
  {
    title: "Yağhane Yönetim Sistemi",
    sector: "Zeytinyağı işletmesi",
    status: "İşletmede yerel çalışıyor",
    summary:
      "Yağhanenin günlük operasyonunu ve stok takibini yöneten mini ERP. İnternet bağlantısına bağlı değil, işletmedeki bilgisayarda yerel ağda çalışıyor.",
    highlights: [
      "3 ayrı rol paneli, her rol sadece kendi işini görür",
      "Socket.IO ile ekranlar arası gerçek zamanlı senkronizasyon",
      "Satış, takip ve stok akışı tek sistemde",
      "SQLite ile kurulumu ve yedeği basit, harici sunucu gerektirmez",
    ],
    tech: ["React", "Express.js", "SQLite", "Socket.IO", "Tailwind CSS"],
    image: "/yaghane.png",
    link: {
      href: "https://github.com/Skavces/Yaghane-Uygulamasi",
      label: "Kaynak Kodu",
      icon: Github,
    },
  },
];

export default function Projects() {
  return (
    <section className="w-full flex flex-col items-center relative overflow-hidden py-24 px-4 sm:px-6" id="projects">
      <div className="w-full max-w-6xl relative z-10 mx-auto flex flex-col gap-10">
        <motion.div
          variants={fadeUp}
          {...inView}
          className="text-center mb-6 pt-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-900 tracking-[-0.035em] mb-4">
            Seçili İşler
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto">
            Gerçek işletmeler için geliştirdiğim ve bugün kullanılan üç sistem.
          </p>
        </motion.div>

        {projects.map((project, i) => {
          const LinkIcon = project.link.icon;
          return (
            <motion.article
              key={project.title}
              variants={fadeUpGroup()}
              {...inView}
              className="sheet p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <CornerMarks label={`SİSTEM ${String(i + 1).padStart(2, '0')}/${String(projects.length).padStart(2, '0')}`} />
              <motion.div variants={fadeUp} className={`group rounded-tag overflow-hidden border border-brand-800/15 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={project.image}
                  alt={`${project.title} ekran görüntüsü`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="tag px-3">
                    <MonitorCheck className="w-3.5 h-3.5" />
                    {project.status}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-500">{project.sector}</span>
                </div>

                <h3 className="text-3xl font-semibold text-brand-900 mb-3">{project.title}</h3>
                <p className="text-brand-700 leading-relaxed mb-5">{project.summary}</p>

                <ul className="space-y-2 mb-6">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-brand-700 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-[1px] bg-brand-500 shrink-0"></span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="tag normal-case tracking-normal text-brand-600">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary self-start px-5 py-3"
                >
                  <LinkIcon className="w-4 h-4" />
                  {project.link.label}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
