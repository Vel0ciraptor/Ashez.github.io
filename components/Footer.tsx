import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white border-t border-gray-800">
       {/* Marquee */}
       <div className="w-full h-12 bg-primary flex items-center overflow-hidden whitespace-nowrap relative">
        <div className="animate-marquee flex gap-8 items-center min-w-full">
            {/* Duplicamos el contenido lo suficiente para asegurar que cubra pantallas grandes y el loop sea fluido */}
          {[...Array(20)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-bold uppercase tracking-widest text-xs text-white">Hecho a Mano en Bolivia</span>
              <span className="text-white">•</span>
              <span className="font-bold uppercase tracking-widest text-xs text-white">Diseños Personalizados</span>
              <span className="text-white">•</span>
              <span className="font-bold uppercase tracking-widest text-xs text-white">Calidad Premium</span>
              <span className="text-white">•</span>
            </React.Fragment>
          ))}
        </div>
       </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-display font-bold">
          ASHEZ<span className="text-xs align-top">✦</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Pedidos</a>
            <a href="https://wa.me/59176398780" className="hover:text-primary transition-colors">WhatsApp</a>
        </div>

        <div className="text-xs text-gray-500">
          © 2024 Ashez Artesanal. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;