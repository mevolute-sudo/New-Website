import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
              isScrolled
                ? 'glass shadow-lg shadow-primary/5'
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              data-hover
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_cursor-char-motion/artifacts/ke8fiy4w_Logo%20evol.png" 
                alt="Evolute Marketing" 
                className="h-16 w-auto brightness-0 invert"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  data-hover
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => scrollToSection('#contact')}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-hover transition-colors duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              data-hover
              data-testid="nav-cta-button"
            >
              Let's Talk
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
              whileTap={{ scale: 0.9 }}
              data-hover
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden px-6"
          >
            <div className="glass rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors duration-300 ${
                      activeSection === item.href.replace('#', '')
                        ? 'bg-primary/20 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="mt-2 px-4 py-3 rounded-xl bg-primary text-white font-medium text-lg"
                  data-testid="mobile-cta-button"
                >
                  Let's Talk
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
