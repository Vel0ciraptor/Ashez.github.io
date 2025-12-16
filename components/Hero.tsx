import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Language, SiteImages } from '../types';

interface HeroProps {
  onNavigate: (page: string) => void;
  language: Language;
  images: SiteImages['hero'];
}

const Hero: React.FC<HeroProps> = ({ onNavigate, language, images }) => {
  const comp = useRef<HTMLElement>(null);

  const t = {
    es: {
      line1: "CELEBRANDO",
      line2Part1: "EL",
      line2Part2: "VALOR",
      line2Part3: "DEL",
      line3: "TIEMPO Y LA",
      line4: "CREATIVIDAD",
      desc: "con el propósito de crear piezas únicas",
      btn: "Ver Colección",
      floatingTitle: "Artista Textil Boliviana"
    },
    en: {
      line1: "CELEBRATING",
      line2Part1: "THE",
      line2Part2: "VALUE",
      line2Part3: "OF",
      line3: "TIME AND",
      line4: "CREATIVITY",
      desc: "with the purpose of creating unique pieces",
      btn: "View Collection",
      floatingTitle: "Bolivian Textile Artist"
    }
  }[language];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animación inicial
      tl.from(".hero-text-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      })
      .from(".hero-image-1", {
        scale: 0,
        rotation: -45,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.8")
      .from(".hero-image-2", {
        scale: 0,
        rotation: 45,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .from(".hero-desc", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
      .from(".hero-floating", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8");

    }, comp);

    return () => ctx.revert();
  }, [language]);

  return (
    <header ref={comp} id="home" className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Floating Description */}
        <div className="hero-floating absolute top-0 right-4 md:right-20 max-w-[200px] text-xs font-medium text-gray-500 hidden sm:block">
          <p className="font-bold text-secondary mb-1 uppercase">ASHEZ*</p>
          <p>{t.floatingTitle}</p>
        </div>

        {/* Main Title */}
        <div className="relative">
          <div className="font-display text-[12vw] md:text-[8rem] lg:text-[9rem] leading-[0.85] tracking-tighter uppercase break-words text-secondary">
            <div className="overflow-hidden">
                <span className="hero-text-line block">{t.line1}</span>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 flex-wrap overflow-hidden py-2">
              <div className="hero-text-line flex items-center gap-2 md:gap-4 flex-wrap">
                  <span>{t.line2Part1}</span>
                  <span className="text-primary">{t.line2Part2}</span>
                  
                  {/* Image inside text line 1 */}
                  <div className="hero-image-1 relative inline-block align-middle mx-2 md:mx-4">
                    <img 
                      src={images.img1}
                      alt="Detalle bordado flores" 
                      className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full border-2 border-primary bg-white -rotate-12 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>
                  
                  <span>{t.line2Part3}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center overflow-hidden">
              <span className="hero-text-line block">{t.line3}</span>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap overflow-hidden py-4">
               {/* Image inside text line 2 */}
              <div className="hero-image-2 relative inline-block align-middle -mt-2 mx-2">
                 <img 
                  src={images.img2}
                  alt="Manos tejiendo" 
                  className="w-20 h-20 md:w-32 md:h-32 object-cover rotate-12 z-10 relative rounded-2xl border-2 border-white shadow-lg"
                />
              </div>
              <span className="hero-text-line relative">
                {t.line4}<span className="text-primary">.</span>
              </span>
            </div>
          </div>

          <div className="hero-desc mt-6 md:ml-2 border-l-4 border-primary pl-6 py-2 opacity-0">
             <p className="text-lg md:text-xl font-medium text-gray-600 max-w-md italic">
                {t.desc}
             </p>
          </div>
        </div>

        <div className="hero-btn mt-12 opacity-0">
          <button 
            onClick={() => onNavigate('catalog')}
            className="inline-block border border-secondary px-10 py-4 rounded-full text-sm font-bold uppercase hover:bg-secondary hover:text-white transition-all duration-300"
          >
            {t.btn}
          </button>
        </div>
      </div>
      
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </header>
  );
};

export default Hero;