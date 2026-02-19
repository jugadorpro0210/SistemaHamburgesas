
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burgers' | 'drinks' | 'desserts';
  image: string;
  ingredients?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export type AppWindow = 'menu' | 'cart' | 'ai' | 'profile' | 'admin';
