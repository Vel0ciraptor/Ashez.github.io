import React from 'react';
import { X, Trash2, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const itemList = cartItems.map(item => {
        const price = item.discountPrice || item.price;
        return `- ${item.name} (${price} Bs.)`;
    }).join('\n');
    
    const message = `Hola ASHEZ, estoy interesado en comprar los siguientes productos:\n\n${itemList}\n\nTotal: ${total.toFixed(2)} Bs.\n\n¿Podrían indicarme los métodos de pago y envío?`;
    
    const whatsappUrl = `https://wa.me/59176398780?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <h2 className="font-display text-2xl uppercase">Tu Bolsa ({cartItems.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageCircle size={32} />
                  </div>
                  <p>Tu bolsa está vacía.</p>
                  <button onClick={onClose} className="text-primary font-bold hover:underline">
                    Ir a la tienda
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <motion.div 
                    layout
                    key={`${item.id}-${index}`} 
                    className="flex gap-4 items-center bg-bg-light p-3 rounded-xl"
                  >
                    <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      <div className="flex gap-2 items-center mt-1">
                          {item.discountPrice ? (
                            <>
                                <span className="font-bold text-red-500">{item.discountPrice.toFixed(2)} Bs.</span>
                                <span className="text-[10px] text-gray-400 line-through">{item.price.toFixed(2)} Bs.</span>
                            </>
                          ) : (
                              <span className="font-bold text-primary">{item.price.toFixed(2)} Bs.</span>
                          )}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Total Estimado</span>
                  <span className="font-display text-3xl font-bold">{total.toFixed(2)} Bs.</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-full font-bold uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <MessageCircle size={20} />
                  Pedir por WhatsApp
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-3">
                  Serás redirigido a WhatsApp para coordinar el pago y envío con +59176398780
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;