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

export interface SiteImages {
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

export const DEFAULT_SITE_IMAGES: SiteImages = {
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