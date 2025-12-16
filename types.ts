export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number; // Optional discount price
  images: string[]; // Changed from single image to array
  category: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Language = 'es' | 'en';

export interface SiteImages {
  hero: {
    img1: string;
    img2: string;
  };
  portfolio: {
    main: string;
    smallLeft: string;
    smallRight: string;
  };
  about: {
    main: string;
    small: string;
  };
  contact: {
    banner: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  product: string;
  image: string;
}

export const DEFAULT_SITE_IMAGES: SiteImages = {
  hero: {
    img1: 'https://images.unsplash.com/photo-1582794543139-8ac92a90030a?q=80&w=300', // Detail embroidery
    img2: 'https://images.unsplash.com/photo-1632649666776-6554b7c8df02?q=80&w=300'  // Hands knitting
  },
  portfolio: {
    main: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800', // Center image
    smallLeft: 'https://images.unsplash.com/photo-1605218427368-35b80a37db2f?q=80&w=400', // Kit/Wools
    smallRight: 'https://images.unsplash.com/photo-1606622867087-0b0409249764?q=80&w=400' // Needle/Thread
  },
  about: {
    main: 'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=600', // Woman wearing knit
    small: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=300' // Detail wool
  },
  contact: {
    banner: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=600' // Workshop
  }
};

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Valentina M.",
    text: "El detalle del bordado es impresionante. Pedí un retrato de mi mascota y capturaron su esencia perfectamente.",
    product: "Retrato Bordado",
    image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600"
  },
  {
    id: 2,
    name: "Carlos R.",
    text: "La calidad de la lana es muy suave y el tejido es firme. Se nota el amor y el tiempo dedicado en cada punto.",
    product: "Bufanda Tejida",
    image: "https://images.unsplash.com/photo-1605218427368-35b80a37db2f?q=80&w=600"
  },
  {
    id: 3,
    name: "Sofia L.",
    text: "Compré un kit para empezar a bordar y los parches son hermosos. El packaging es precioso, ideal para regalo.",
    product: "Kit & Accesorios",
    image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=600"
  },
  {
    id: 4,
    name: "Andrea B.",
    text: "Me tejieron un suéter a medida y me queda perfecto. Es mi prenda favorita para el invierno paceño.",
    product: "Suéter Alpaca",
    image: "https://images.unsplash.com/photo-1621250320499-526462940263?q=80&w=600"
  },
  {
    id: 5,
    name: "Martín G.",
    text: "Mandé a personalizar una chaqueta de jean con un diseño floral en la espalda. Quedó increíble, muy recomendado.",
    product: "Chaqueta Custom",
    image: "https://images.unsplash.com/photo-1543854589-3221e9c20a8c?q=80&w=600"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cuadro personalizado',
    price: 480.00,
    category: 'Decoración',
    images: ['https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop'], 
    description: 'Bordado a mano 7cm aprox. Marco 15x20cm. Diseño floral único.'
  },
  {
    id: '2',
    name: 'Parches personalizados',
    price: 210.00,
    category: 'Accesorios',
    images: ['https://images.unsplash.com/photo-1601646274719-2cb832dd3b3c?q=80&w=800&auto=format&fit=crop'],
    description: 'Bordado a mano. Medida 5cm diámetro. Ideales para chaquetas.'
  },
  {
    id: '3',
    name: 'Pines personalizados',
    price: 110.00,
    category: 'Accesorios',
    images: ['https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop'],
    description: 'Bordado a mano. Medida 3,5cm diámetro. Acabado metálico.'
  }
];