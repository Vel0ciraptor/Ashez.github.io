import React, { useLayoutEffect, useRef } from 'react';
import { Plus, Heart } from 'lucide-react';
import { Product, Language } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CatalogProps {
  products: Product[];
  addToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
  language: Language;
}

const Catalog: React.FC<CatalogProps> = ({ products, addToCart, onNavigate, language }) => {
  const container = useRef<HTMLElement>(null);
  
  const t = {
    es: {
      title1: "Nuestras",
      title2: "Creaciones",
      offer: "Oferta",
      viewAll: "Ver Todo el Catálogo"
    },
    en: {
      title1: "Our",
      title2: "Creations",
      offer: "Sale",
      viewAll: "View Full Catalog"
    }
  }[language];

  // Show only first 3 items on the home page preview
  const previewProducts = products.slice(0, 3);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.from(".catalog-title", {
        scrollTrigger: {
          trigger: ".catalog-title",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".catalog-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

    }, container);
    return () => ctx.revert();
  }, [products]);

  return (
    <section ref={container} id="catalog" className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="catalog-title font-display text-5xl md:text-6xl uppercase tracking-wide">
            {t.title1} <span className="text-primary">{t.title2}</span>
          </h2>
        </div>

        <div className="catalog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewProducts.map((product) => (
            <div 
              key={product.id}
              className="product-card group cursor-pointer"
            >
              {/* Image Container */}
              <div className="bg-white rounded-[2.5rem] p-4 aspect-square flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-white p-2 rounded-full shadow-sm hover:text-primary transition-colors">
                     <Heart size={20} />
                  </div>
                </div>

                {product.discountPrice && (
                    <div className="absolute top-6 left-6 z-10">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {t.offer}
                        </span>
                    </div>
                )}
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.5rem]"></div>
                
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-3xl drop-shadow-md group-hover:scale-105 transition-transform duration-700 relative z-0"
                />

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-primary transition-colors shadow-lg active:scale-95"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 px-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-text-dim text-sm mt-1">{product.category}</p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-1">{product.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    {product.discountPrice ? (
                        <>
                            <span className="text-sm text-gray-400 line-through decoration-red-500">{product.price.toFixed(2)} Bs.</span>
                            <span className="font-display text-xl font-bold text-red-500">{product.discountPrice.toFixed(2)} Bs.</span>
                        </>
                    ) : (
                        <span className="font-display text-xl font-bold text-primary">{product.price.toFixed(2)} Bs.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
             <button 
                onClick={() => onNavigate('catalog')}
                className="px-8 py-3 bg-transparent border border-secondary rounded-full text-secondary font-bold uppercase hover:bg-secondary hover:text-white transition-all text-sm"
             >
                {t.viewAll}
             </button>
        </div>
      </div>
    </section>
  );
};

export default Catalog;