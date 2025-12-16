import React, { useState, useEffect } from 'react';
import { ShoppingBag, Globe } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (page: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onNavigate, language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const texts = {
    es: { home: 'INICIO', catalog: 'CATÁLOGO' },
    en: { home: 'HOME', catalog: 'CATALOG' }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg-light/95 backdrop-blur-sm shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="font-display text-3xl tracking-wide font-bold flex items-center gap-1 group">
            ASHEZ<span className="text-sm align-top mb-4 text-primary group-hover:rotate-12 transition-transform">✦</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
            <button 
                onClick={() => onNavigate('home')} 
                className="hidden md:block text-sm font-bold text-secondary hover:text-primary"
            >
                {texts[language].home}
            </button>
            <button 
                onClick={() => onNavigate('catalog')} 
                className="hidden md:block text-sm font-bold text-secondary hover:text-primary"
            >
                {texts[language].catalog}
            </button>
            
            <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-xs font-bold border border-secondary rounded-full px-3 py-1 hover:bg-secondary hover:text-white transition-colors"
                title="Change Language"
            >
                <Globe size={14} />
                {language.toUpperCase()}
            </button>

            <button 
                onClick={onCartClick}
                className="relative bg-secondary text-white p-3 rounded-full hover:bg-primary transition-colors group shadow-lg"
            >
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce border-2 border-white">
                    {cartCount}
                </span>
                )}
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;