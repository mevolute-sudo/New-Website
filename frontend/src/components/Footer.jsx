import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'SEO Optimization', href: '#services' },
    { name: 'PPC Advertising', href: '#services' },
    { name: 'Social Media', href: '#services' },
    { name: 'Web Development', href: '#services' },
    { name: 'UI/UX Design', href: '#services' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

export const Footer = () => {
  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden" data-testid="footer">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center"
              data-hover
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_cursor-char-motion/artifacts/ke8fiy4w_Logo%20evol.png" 
                alt="Evolute Marketing" 
                className="h-16 w-auto brightness-0 invert"
              />
            </a>
            
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Transforming businesses through innovative digital strategies. 
              We help brands evolve and thrive in the digital age.
            </p>

            <div className="flex gap-4">
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-hover transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                data-hover
                data-testid="footer-cta"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    data-hover
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    data-hover
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    data-hover
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Evolute Marketing. All rights reserved.
            </p>
            
            <p className="text-sm text-slate-500">
              Designed & Developed with{' '}
              <span className="text-accent">passion</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
