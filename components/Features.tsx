import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features: React.FC = () => {
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Left column reveal
      gsap.from(".feature-left", {
        scrollTrigger: {
          trigger: ".feature-left",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
      });

      // Right column reveal
      gsap.from(".feature-right", {
         scrollTrigger: {
          trigger: ".feature-right",
          start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
      });

      // Center image scale effect
      gsap.fromTo(".feature-main-img", 
        { scale: 0.8, borderRadius: "8rem" },
        {
          scrollTrigger: {
            trigger: ".feature-main-img-container",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
          scale: 1,
          borderRadius: "2rem",
          ease: "none"
        }
      );

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="portfolio" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="md:col-span-3 flex flex-col justify-between h-full space-y-12">
            <div className="feature-left">
              <p className="text-sm font-bold uppercase mb-4 text-gray-400 tracking-wider">KIT DE BORDADO INICIAL</p>
              <p className="font-medium leading-relaxed text-lg">
                TU SEÑAL PARA COMENZAR A CREAR
              </p>
            </div>
            
            <div className="feature-left relative group cursor-pointer">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 relative z-10 mx-auto md:mx-0">
                <img 
                  src="/images/feature-1.jpg"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1605218427368-35b80a37db2f?q=80&w=400"; }}
                  alt="Detalle de tejido" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p className="text-xs mt-4 font-medium text-gray-500 text-center md:text-left">
                Texturas que se sienten vivas.
              </p>
            </div>
          </div>

          {/* Center Image */}
          <div className="feature-main-img-container md:col-span-6 relative flex justify-center py-10 md:py-0">
            <div className="feature-main-img relative w-full max-w-md aspect-[3/4] bg-[#F0F0F0] overflow-hidden shadow-2xl">
              <img 
                src="/images/feature-main.jpg"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1606239105435-08bb947ce730?q=80&w=800"; }}
                alt="Chompa tejida artesanal" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-8 right-8 bg-secondary text-white w-24 h-24 rounded-full flex flex-col items-center justify-center text-center p-2 transform rotate-12 border-2 border-white border-dashed animate-pulse">
                <span className="text-2xl font-bold leading-none text-primary">NEW</span>
                <span className="text-xs font-bold uppercase">DROP</span>
              </div>
              
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <p className="font-display text-white text-4xl tracking-widest drop-shadow-md">ASHEZ</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 flex flex-col justify-between h-full space-y-12">
            <div className="feature-right flex flex-col items-center">
              <img 
                src="/images/feature-2.jpg"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1606622867087-0b0409249764?q=80&w=400"; }}
                alt="Hilo y Aguja" 
                className="w-40 h-40 object-cover rounded-full drop-shadow-xl mb-4 hover:scale-110 transition-transform"
              />
              <span className="font-display text-8xl text-outline text-gray-300 select-none">A</span>
            </div>
            
            <div className="feature-right">
              <p className="text-sm font-bold uppercase mb-4 text-gray-400 tracking-wider">Diseño</p>
              <h3 className="font-bold mb-2 text-xl">PERSONALIZADO</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Desde bordados intrincados hasta tejidos cálidos. Creamos prendas que reflejan tu estilo con la calidez de lo hecho a mano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;