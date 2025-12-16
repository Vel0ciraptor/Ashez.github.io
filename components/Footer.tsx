import React from 'react';
import { Lock } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  onNavigate?: (page: string) => void;
  language?: Language;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, language = 'es' }) => {
  
  const texts = {
    es: {
      marquee: ["Hecho a Mano en Bolivia", "Diseños Personalizados", "Calidad Premium"],
      privacy: "Privacidad",
      orders: "Pedidos",
      rights: "Todos los derechos reservados."
    },
    en: {
      marquee: ["Handmade in Bolivia", "Custom Designs", "Premium Quality"],
      privacy: "Privacy",
      orders: "Orders",
      rights: "All rights reserved."
    }
  };

  const t = texts[language];

  return (
    <footer className="bg-secondary text-white border-t border-gray-800">
       {/* Marquee */}
       <div className="w-full h-12 bg-primary flex items-center overflow-hidden whitespace-nowrap relative">
        <div className="animate-marquee flex gap-8 items-center min-w-full">
          {[...Array(20)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-bold uppercase tracking-widest text-xs text-white">{t.marquee[0]}</span>
              <span className="text-white">•</span>
              <span className="font-bold uppercase tracking-widest text-xs text-white">{t.marquee[1]}</span>
              <span className="text-white">•</span>
              <span className="font-bold uppercase tracking-widest text-xs text-white">{t.marquee[2]}</span>
              <span className="text-white">•</span>
            </React.Fragment>
          ))}
        </div>
       </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-display font-bold">
          ASHEZ<span className="text-xs align-top">✦</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-400">
             {/* Admin Link hidden in footer */}
            {onNavigate && (
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="opacity-20 hover:opacity-100 hover:text-primary transition-all"
                  title="Admin Access"
                >
                  <Lock size={14} />
                </button>
            )}
            <a href="https://wa.me/59176398780" className="hover:text-primary transition-colors">WhatsApp</a>
        </div>

        <div className="text-xs text-gray-500">
          © 2026 Ashez Artesanal. {t.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;