import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-content",
            start: "top 75%",
        }
      });

      tl.from(".about-line", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      })
      .from(".about-box", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

      // Image Parallax
      gsap.to(".about-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".about-img-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="about" className="relative overflow-hidden py-24 bg-white">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="about-content lg:col-span-7 flex flex-col justify-center">
            <div className="about-line flex items-center space-x-2 mb-6">
              <span className="h-px w-12 bg-primary"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-primary">Sobre Ashez</span>
            </div>
            
            <h2 className="font-display text-5xl sm:text-7xl font-black leading-none mb-8 uppercase">
              <span className="about-line block">No es solo</span>
              <span className="about-line block text-outline text-gray-300">Ropa.</span>
              <span className="about-line block text-primary">Es Arte.</span>
            </h2>

            <div className="about-box relative pl-0 lg:pl-12 mt-8">
              <div className="bg-bg-light p-8 rounded-r-3xl border-l-4 border-primary shadow-lg max-w-xl">
                <p className="text-xl font-medium mb-6 italic font-display text-secondary">
                  "{`El tejido conecta generaciones y el bordado cuenta historias. En Ashez, cada prenda lleva una parte de nuestra esencia.`}"
                </p>
                <p className="text-text-dim text-sm leading-relaxed mb-8">
                  Fundada con la pasión por rescatar técnicas textiles ancestrales, ASHEZ fusiona el diseño contemporáneo con la calidez del trabajo manual. Creemos en la moda lenta, en prendas que duran y en el detalle que hace única a cada pieza bordada o tejida.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Taller Creativo</span>
                    <span className="font-bold font-display text-2xl">Bolivia</span>
                  </div>
                  <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white bg-secondary hover:bg-primary transition-all duration-300 group">
                    <span className="text-sm font-bold mr-2">Contáctanos</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="about-img-container lg:col-span-5 relative mt-12 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4]">
              <div className="absolute inset-0 bg-gray-100 rounded-[3rem] transform rotate-6 scale-105 z-0"></div>
              
              <div className="about-img relative h-full w-full rounded-[3rem] overflow-hidden z-10 shadow-2xl group">
                <img 
                  src="/images/about-main.jpg"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=600"; }}
                  alt="Mujer con prenda tejida" 
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Rotating Badge */}
                <div className="absolute top-6 right-6 bg-secondary text-white w-20 h-20 rounded-full flex items-center justify-center animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2 fill-current">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text fontSize="13" fontWeight="bold" letterSpacing="2">
                      <textPath href="#circlePath">
                        HANDMADE • LOVE • ASHEZ •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Star size={16} className="text-primary fill-current" />
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 md:-left-16 z-20 hidden md:block">
                <img 
                  src="/images/about-detail.jpg"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=300"; }}
                  alt="Lana y agujas" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl transform hover:-rotate-12 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;