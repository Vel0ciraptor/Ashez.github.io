import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalog from './components/Catalog';
import CatalogPage from './components/CatalogPage';
import AdminPanel from './components/AdminPanel';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Testimonials from './components/Testimonials';
import { Product, PRODUCTS as INITIAL_PRODUCTS, SiteImages, DEFAULT_SITE_IMAGES, Language, Testimonial, DEFAULT_TESTIMONIALS } from './types';

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'catalog', 'admin'
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [siteImages, setSiteImages] = useState<SiteImages>(DEFAULT_SITE_IMAGES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [language, setLanguage] = useState<Language>('es');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    const index = cartItems.findIndex(item => item.id === productId);
    if (index > -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    }
  };

  return (
    <div className="antialiased scroll-smooth relative">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={setCurrentView}
        language={language}
        setLanguage={setLanguage}
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        language={language}
      />

      <main>
        {currentView === 'home' && (
            <>
                <Hero onNavigate={setCurrentView} language={language} images={siteImages.hero} />
                <Testimonials language={language} testimonials={testimonials} />
                <Features images={siteImages.portfolio} language={language} />
                <Catalog products={products} addToCart={addToCart} onNavigate={setCurrentView} language={language} />
                <About images={siteImages.about} language={language} />
                <Contact images={siteImages.contact} language={language} />
            </>
        )}

        {currentView === 'catalog' && (
            <CatalogPage products={products} addToCart={addToCart} language={language} />
        )}

        {currentView === 'admin' && (
            <AdminPanel 
              products={products} 
              setProducts={setProducts} 
              siteImages={siteImages}
              setSiteImages={setSiteImages}
              testimonials={testimonials}
              setTestimonials={setTestimonials}
            />
        )}
      </main>
      <Footer onNavigate={setCurrentView} language={language} />
    </div>
  );
}

export default App;