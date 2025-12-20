import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Navbar = () => {
  const { language, setLanguage, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.catalogue', path: '/catalogue' },
  ];

  const whatsappNumber = '213795443714';
  const whatsappMessage = encodeURIComponent(
    language === 'ar' 
      ? 'السلام عليكم، نحب نحجز كوستيم' 
      : 'Bonjour, je souhaite réserver un costume'
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${
      scrolled 
        ? 'bg-card/95 shadow-elegant border border-border/60' 
        : 'bg-card/80 border border-border/40'
    } backdrop-blur-xl rounded-2xl`}>
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 transition-all duration-300 ${
              scrolled ? 'border-primary' : 'border-primary/60'
            } group-hover:border-primary group-hover:shadow-gold`}>
              <img src={logo} alt="Classimo Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`text-lg md:text-xl font-bold text-gradient-gold ${dir === 'rtl' ? 'font-arabic' : 'font-display'}`}>
              {language === 'ar' ? 'كلاسيمو' : 'Classimo'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-xl p-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-gold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* WhatsApp CTA - Desktop */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 md:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden lg:inline">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-xl px-3"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">
                {language === 'ar' ? 'FR' : 'عربي'}
              </span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-secondary/80 rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-64 pb-4' : 'max-h-0'
        }`}>
          <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl transition-all duration-300 text-center font-medium ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-gold'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            
            {/* WhatsApp CTA - Mobile */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              {language === 'ar' ? 'تواصل عبر واتساب' : 'Contacter via WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;