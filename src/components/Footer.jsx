const links = [
  { href: '#about', label: 'Hakkımda' },
  { href: '#projects', label: 'İşler' },
  { href: '#contact', label: 'İletişim' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-brand-200 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-500">
        <p>© {currentYear} Selim Kavaklıçeşme · Soma / Manisa</p>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-brand-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
