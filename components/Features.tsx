import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteImages, Language } from '../types';
import { Plus, Minus, ArrowRight, Users, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeaturesProps {
    images: SiteImages['portfolio'];
    language: Language;
}

const Features: React.FC<FeaturesProps> = ({ images, language }) => {
  const container = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [clientCount, setClientCount] = useState(240);

  const t = {
    es: {
      philosophyTitle: "Filosofía",
      philosophyDesc: "Cada puntada cuenta una historia. Unimos tradición y modernidad en piezas hechas para perdurar.",
      textureTitle: "Texturas Reales",
      faqTitle: "Preguntas Frecuentes",
      faqs: [
        { q: "¿Cuánto tarda un pedido?", a: "Los productos personalizados toman de 5 a 10 días hábiles." },
        { q: "¿Hacen envíos al interior?", a: "Sí, enviamos a toda Bolivia mediante courier seguro." },
        { q: "¿Cómo cuido mis prendas?", a: "Lavar a mano con agua fría y secar en plano a la sombra." },
        { q: "¿Puedo personalizar diseños?", a: "¡Claro! Contáctanos para crear algo único para ti." }
      ],
      newDrop: "NUEVA COLECCIÓN",
      handmade: "HECHO A MANO",
      clientsTitle: "Comunidad Ashez",
      clientsSubtitle: "Clientes Felices"
    },
    en: {
      philosophyTitle: "Philosophy",
      philosophyDesc: "Every stitch tells a story. We unite tradition and modernity in pieces made to last.",
      textureTitle: "Real Textures",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        { q: "How long does an order take?", a: "Custom products take 5 to 10 business days." },
        { q: "Do you ship nationwide?", a: "Yes, we ship all over Bolivia via secure courier." },
        { q: "How do I care for my items?", a: "Hand wash with cold water and dry flat in the shade." },
        { q: "Can I customize designs?", a: "Of course! Contact us to create something unique for you." }
      ],
      newDrop: "NEW DROP",
      handmade: "HANDMADE",
      clientsTitle: "Ashez Community",
      clientsSubtitle: "Happy Clients"
    }
  }[language];

  // Live Counter Logic
  useEffect(() => {
    // Increment count every 60 seconds (approx 3 in 3 mins)
    const interval = setInterval(() => {
        setClientCount(prev => prev + 1);
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
            
            {/* Box 1: Intro Text (1x1) */}
            <div className="bento-item md:col-span-1 md:row-span-1 bg-white p-6 rounded-3xl shadow-sm flex flex-col justify-center border border-gray-100">
                <p className="text-xs font-bold uppercase text-primary tracking-widest mb-2">{t.philosophyTitle}</p>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    {t.philosophyDesc}
                </p>
            </div>

            {/* Box 2: Main Image (2x2) */}
            <div className="bento-item md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
                <img 
                    src={images.main} 
                    alt="Main Feature" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full z-10">
                    <span className="text-xs font-bold uppercase tracking-wider">{t.newDrop}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-display text-3xl tracking-wide">ASHEZ</p>
                </div>
            </div>

            {/* Box 3: FAQ (1x2) */}
            <div className="bento-item md:col-span-1 md:row-span-2 bg-secondary text-white p-6 rounded-3xl shadow-lg flex flex-col overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                
                <h3 className="font-display text-xl mb-6 z-10 relative">{t.faqTitle}</h3>
                
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 z-10 relative">
                    {t.faqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-gray-700/50 pb-2">
                            <button 
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full flex justify-between items-center text-left py-1 hover:text-primary transition-colors"
                            >
                                <span className="text-xs font-bold uppercase tracking-wider pr-2">{faq.q}</span>
                                {openFaq === idx ? <Minus size={14} className="flex-shrink-0 text-primary" /> : <Plus size={14} className="flex-shrink-0" />}
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-[11px] text-gray-400 leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Box 4: Texture Detail (1x1) */}
            <div className="bento-item md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group">
                <img 
                    src={images.smallLeft} 
                    alt="Texture" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <p className="text-white font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        {t.textureTitle}
                    </p>
                </div>
            </div>

            {/* Box 5: Secondary Image (3x1) */}
            <div className="bento-item md:col-span-3 md:row-span-1 bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-sm border border-gray-100 group">
                <div className="w-full md:w-1/3 relative h-32 md:h-auto overflow-hidden">
                    <img 
                        src={images.smallRight} 
                        alt="Handmade" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center items-start">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold uppercase text-gray-400 tracking-widest">{t.handmade}</span>
                    </div>
                    <h4 className="font-display text-2xl text-secondary mb-2">Artesanía Boliviana</h4>
                    <p className="text-sm text-gray-500 mb-4 max-w-md">Descubre la magia de los hilos y las manos que tejen historias.</p>
                    <a href="#catalog" className="flex items-center gap-2 text-xs font-bold uppercase text-primary hover:text-secondary transition-colors">
                        Ver Productos <ArrowRight size={14} />
                    </a>
                </div>
            </div>

            {/* Box 6: Client Counter (1x1) */}
            <div className="bento-item md:col-span-1 md:row-span-1 bg-primary text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="flex justify-between items-start relative z-10">
                   <p className="text-xs font-bold uppercase tracking-widest opacity-90">{t.clientsTitle}</p>
                   <Users size={16} className="opacity-80" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-baseline gap-1 mb-1">
                         {/* Live indicator dot */}
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse mr-2"></div>
                        <span className="font-display text-5xl font-bold">+{clientCount}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 border-t border-white/20 pt-2 mt-2">
                         <TrendingUp size={14} className="text-white" />
                         <p className="text-xs font-medium opacity-90">{t.clientsSubtitle}</p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Features;