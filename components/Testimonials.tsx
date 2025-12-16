import React, { useState, useEffect } from 'react';
import { Star, MousePointerClick } from 'lucide-react';
import { Language, Testimonial } from '../types';

interface TestimonialsProps {
  language: Language;
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ language, testimonials }) => {
  const [activeBg, setActiveBg] = useState<string>('');

  const t = {
    es: {
      title: "LO QUE DICEN DE",
      subtitle: "ASHEZ✦",
      instruction: "Haz clic en una tarjeta para ver el detalle",
    },
    en: {
      title: "HAPPY",
      subtitle: "CLIENTS",
      instruction: "Click on a card to see the detail",
    }
  }[language];

  // Set initial background
  useEffect(() => {
    if (testimonials.length > 0) {
      setActiveBg(testimonials[0].image);
    }
  }, [testimonials]);

  return (
    <section className="py-24 bg-white relative overflow-hidden group/section">
      
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out">
        {/* Base Layer */}
        <div className="absolute inset-0 bg-gray-50"></div>
        
        {/* Active Image Layer with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 opacity-20 blur-xl scale-110"
          style={{ backgroundImage: `url(${activeBg})` }}
        ></div>
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
           <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wide text-secondary mb-2">
            {t.title} <span className="text-primary italic">{t.subtitle}</span>
          </h2>
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
             <MousePointerClick size={12} /> {t.instruction}
          </p>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div className="relative z-10 w-full overflow-hidden mask-image-linear-gradient">
        {/* The gradient masks the edges for a smooth fade effect */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white/80 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused]">
            {/* We duplicate the list to create the infinite loop effect */}
            {[...testimonials, ...testimonials].map((review, index) => (
                <div 
                    key={`${review.id}-${index}`} 
                    className="w-[280px] md:w-[350px] flex-shrink-0 px-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                    onClick={() => setActiveBg(review.image)}
                >
                    <div className="h-full bg-white rounded-3xl p-2 shadow-lg border border-gray-100 flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 group">
                            <img 
                                src={review.image} 
                                alt={review.product} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                                    {review.product}
                                </span>
                            </div>
                        </div>

                        <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex text-primary mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm italic leading-relaxed mb-4 line-clamp-3">
                                    "{review.text}"
                                </p>
                            </div>
                            <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {review.name.charAt(0)}
                                </div>
                                <p className="text-secondary font-bold font-display tracking-wide text-sm">
                                    {review.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;