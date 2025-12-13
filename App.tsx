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
import { Product, PRODUCTS as INITIAL_PRODUCTS, SiteImages, DEFAULT_SITE_IMAGES } from './types';

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'catalog', 'admin'
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [siteImages, setSiteImages] = useState<SiteImages>(DEFAULT_SITE_IMAGES);

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
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />

      <main>
        {currentView === 'home' && (
            <>
                <Hero onNavigate={setCurrentView} />
                <Features images={siteImages.portfolio} />
                <Catalog products={products} addToCart={addToCart} onNavigate={setCurrentView} />
                <About images={siteImages.about} />
                <Contact images={siteImages.contact} />
            </>
        )}

        {currentView === 'catalog' && (
            <CatalogPage products={products} addToCart={addToCart} />
        )}

        {currentView === 'admin' && (
            <AdminPanel 
              products={products} 
              setProducts={setProducts} 
              siteImages={siteImages}
              setSiteImages={setSiteImages}
            />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;