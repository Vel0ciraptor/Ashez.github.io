import React, { useState, useLayoutEffect, useRef } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import gsap from 'gsap';

interface CatalogPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ products, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const gridRef = useRef<HTMLDivElement>(null);

  // Derive categories from products
  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useLayoutEffect(() => {
    // Animate grid items when filtered products change
    if (!gridRef.current) return;
    
    const ctx = gsap.context(() => {
        gsap.fromTo(".catalog-page-item", 
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
    }, gridRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl uppercase text-secondary mb-4">Catálogo</h1>
            <p className="text-gray-500 max-w-2xl">Explora todas nuestras piezas únicas. Desde bordados personalizados hasta tejidos exclusivos.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between sticky top-24 z-30 bg-bg-light/95 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white">
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                            selectedCategory === cat 
                            ? 'bg-secondary text-white' 
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                />
            </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
             <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
            <div className="text-center py-24 text-gray-400">
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
        )}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product, addToCart: (p: Product) => void }> = ({ product, addToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div 
            className="catalog-page-item group bg-white rounded-3xl p-3 hover:shadow-xl transition-all duration-300"
        >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                 {/* Discount Tag */}
                 {product.discountPrice && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            Oferta
                        </span>
                    </div>
                )}

                {/* Carousel Controls */}
                {product.images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white"
                        >
                            <ChevronRight size={16} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                            {product.images.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-primary' : 'bg-white/60'}`} 
                                />
                            ))}
                        </div>
                    </>
                )}

                <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                />
                
                <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-primary transition-colors shadow-lg active:scale-95 z-20"
                >
                    <Plus size={20} />
                </button>
            </div>

            <div className="px-2 pb-2">
                <h3 className="font-bold text-base text-secondary line-clamp-1" title={product.name}>{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center gap-2">
                    {product.discountPrice ? (
                        <>
                             <span className="font-display text-lg font-bold text-red-500">{product.discountPrice} Bs.</span>
                             <span className="text-xs text-gray-400 line-through">{product.price} Bs.</span>
                        </>
                    ) : (
                        <span className="font-display text-lg font-bold text-primary">{product.price} Bs.</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;