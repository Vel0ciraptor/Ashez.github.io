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