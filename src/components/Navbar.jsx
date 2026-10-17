import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { EASE_OUT } from "../lib/motion";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute("id"));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [location.pathname]);

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Ana Sayfa", id: "home" },
    { name: "Hakkımda", id: "about" },
    { name: "Projeler", id: "projects" },
    { name: "İletişim", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 sm:px-6 transition-all duration-500`}
    >
      <div 
        className={`flex items-center justify-between w-full max-w-5xl rounded-sheet transition-all duration-500 ${
          isScrolled 
            ? "sheet backdrop-blur-sm py-3 px-6" 
            : "bg-transparent border-transparent py-4 px-2"
        }`}
      >
        {/* Logo / Name */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-control bg-brand-800 text-brand-50 flex items-center justify-center transition-colors">
            <span className="font-bold text-sm tracking-tighter">SK</span>
          </div>
          <span className="hidden sm:block font-display text-[15px] font-bold tracking-[-0.02em] ml-2">
            Selim Kavaklıçeşme
          </span>
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 rounded-control border border-brand-800/15 p-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] rounded-tag transition-colors group"
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-brand-800 rounded-tag"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-brand-50"
                    : "text-brand-500 group-hover:text-brand-800"
                }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          
          <button 
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex btn btn-primary px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em]"
          >
            Bana Ulaşın
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-control hover:bg-black/5 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-4 w-[calc(100%-2rem)] max-w-md mx-auto sheet backdrop-blur-sm p-4 md:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-4 text-left rounded-control font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${
                    activeSection === item.id 
                      ? "bg-brand-800 text-brand-50" 
                      : "hover:bg-black/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <hr className="border-brand-200 my-2" />
              <button 
                onClick={() => handleNavClick("contact")}
                className="btn btn-primary w-full py-4 font-mono text-[11px] uppercase tracking-[0.14em]"
              >
                Bana Ulaşın
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}