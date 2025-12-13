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
    images: ['/images/product-1.jpg'], 
    description: 'Bordado a mano 7cm aprox. Marco 15x20cm.'
  },
  {
    id: '2',
    name: 'Parches personalizados',
    price: 210.00,
    category: 'Accesorios',
    images: ['/images/product-2.jpg'],
    description: 'Bordado a mano. Medida 5cm diámetro.'
  },
  {
    id: '3',
    name: 'Pines personalizados',
    price: 110.00,
    category: 'Accesorios',
    images: ['/images/product-3.jpg'],
    description: 'Bordado a mano. Medida 3,5cm diámetro.'
  }
];