import React, { useState, useLayoutEffect, useRef } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteImages, Language } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
    images: SiteImages['contact'];
    language: Language;
}

const Contact: React.FC<ContactProps> = ({ images, language }) => {
  const container = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta General',
    message: ''
  });

  const t = {
    es: {
      title1: "Creamos",
      title2: "Para Ti",
      desc: "¿Quieres un diseño personalizado? ¿Tienes una idea para un bordado especial? Escríbenos directamente a WhatsApp.",
      formName: "Nombre Completo",
      formEmail: "Email (Opcional)",
      formSubject: "Asunto",
      formMessage: "Mensaje",
      sendBtn: "Enviar a WhatsApp",
      infoTitle: "Info de Contacto",
      followTitle: "Síguenos",
      subjects: {
        custom: "Pedido Personalizado",
        price: "Consulta de Precios",
        shipping: "Duda sobre envíos",
        other: "Otro"
      },
      workshop: "Taller Ashez",
      location: "Ubicación",
      shipping: "Envíos a todo el país"
    },
    en: {
      title1: "We Create",
      title2: "For You",
      desc: "Do you want a custom design? Have an idea for a special embroidery? Write to us directly on WhatsApp.",
      formName: "Full Name",
      formEmail: "Email (Optional)",
      formSubject: "Subject",
      formMessage: "Message",
      sendBtn: "Send to WhatsApp",
      infoTitle: "Contact Info",
      followTitle: "Follow Us",
      subjects: {
        custom: "Custom Order",
        price: "Price Inquiry",
        shipping: "Shipping Question",
        other: "Other"
      },
      workshop: "Ashez Workshop",
      location: "Location",
      shipping: "Shipping countrywide"
    }
  }[language];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
        gsap.from(".contact-reveal", {
            scrollTrigger: {
                trigger: ".contact-grid",
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, container);
    return () => ctx.revert();
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    
    // Construct WhatsApp message
    const waMessage = `Hola Ashez, mi nombre es ${name || 'Cliente'}. \nAsunto: ${subject}\n\n${message}`;
    const url = `https://wa.me/59176398780?text=${encodeURIComponent(waMessage)}`;
    
    window.open(url, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={container} id="contact" className="py-24 bg-secondary text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Header & Form */}
          <div className="contact-reveal">
            <h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] mb-8">
              {t.title1} <br/>
              <span className="text-primary">{t.title2}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              {t.desc}
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.formName}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre" 
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.formEmail}</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com" 
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.formSubject}</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                >
                    <option className="bg-secondary">{t.subjects.custom}</option>
                    <option className="bg-secondary">{t.subjects.price}</option>
                    <option className="bg-secondary">{t.subjects.shipping}</option>
                    <option className="bg-secondary">{t.subjects.other}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.formMessage}</label>
                <textarea 
                  rows={3} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="..." 
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary resize-none transition-colors"
                  required
                ></textarea>
              </div>

              <button type="submit" className="group mt-4 inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white rounded-full font-bold uppercase text-sm hover:bg-[#128C7E] transition-all duration-300">
                <MessageCircle size={18} className="mr-2" />
                <span>{t.sendBtn}</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Info & Socials */}
          <div className="contact-reveal flex flex-col justify-between h-full pt-12 lg:pt-0">
             <div className="grid gap-12">
                <div>
                    <h3 className="flex items-center gap-3 text-xl font-bold mb-6">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {t.infoTitle}
                    </h3>
                    <div className="space-y-6 text-gray-300">
                        <div className="flex items-start gap-4 group cursor-pointer hover:text-white transition-colors">
                            <Mail className="mt-1 text-gray-500 group-hover:text-primary transition-colors" size={20} />
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</p>
                                <p className="text-lg">ashez.ventas@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 group cursor-pointer hover:text-white transition-colors">
                            <Phone className="mt-1 text-gray-500 group-hover:text-primary transition-colors" size={20} />
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                                <p className="text-lg">+591 763 98 780</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 group cursor-pointer hover:text-white transition-colors">
                            <MapPin className="mt-1 text-gray-500 group-hover:text-primary transition-colors" size={20} />
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{t.location}</p>
                                <p className="text-lg">{t.shipping}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="flex items-center gap-3 text-xl font-bold mb-6">
                        <span className="w-2 h-2 border border-primary rounded-full"></span>
                        {t.followTitle}
                    </h3>
                    <div className="flex gap-4">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-secondary hover:border-white transition-all duration-300">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
             </div>

             {/* Bottom Image */}
             <div className="mt-12 hidden lg:block relative rounded-2xl overflow-hidden group">
                <img 
                    src={images.banner}
                    alt="Taller de costura" 
                    className="w-full h-48 object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    {t.workshop}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;