import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { name: t.nav.home, href: '#inicio' },
    { name: t.nav.programs, href: '#programas' },
    { name: t.nav.trainers, href: '#entrenadores' },
    { name: t.nav.testimonials, href: '#testimonios' },
    { name: t.nav.contact, href: '#contacto' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-primary">GE</span>
              </div>
              <div>
                <div className="text-lg font-bold text-primary-foreground">{t.common.academyName}</div>
                <div className="text-xs opacity-90">{t.common.academySub}</div>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 block text-primary-foreground">{t.footer.quickLinks}</span>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-primary-foreground/90 hover:text-primary-foreground hover:underline transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 block text-primary-foreground">{t.footer.contact}</span>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="mt-0.5 opacity-90 shrink-0" />
                <a 
                  href="mailto:info@glacierelite.com" 
                  className="text-sm text-primary-foreground/90 hover:text-primary-foreground hover:underline transition-all duration-200 break-all"
                >
                  info@glacierelite.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="mt-0.5 opacity-90 shrink-0" />
                <a 
                  href="tel:+34912345678" 
                  className="text-sm text-primary-foreground/90 hover:text-primary-foreground hover:underline transition-all duration-200"
                >
                  +34 912 345 678
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 opacity-90 shrink-0" />
                <span className="text-sm text-primary-foreground/90 leading-relaxed">
                  {t.footer.address}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 block text-primary-foreground">{t.footer.followUs}</span>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-primary-foreground/80 text-center sm:text-left">
            © {currentYear} {t.common.academyName}. {t.common.rights} Desarrollado para Cuantico por Mario Mutis
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-sm text-primary-foreground/80 hover:text-white hover:underline transition-all duration-200">
              {t.common.privacyPolicy}
            </a>
            <a href="#" className="text-sm text-primary-foreground/80 hover:text-white hover:underline transition-all duration-200">
              {t.common.termsService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;