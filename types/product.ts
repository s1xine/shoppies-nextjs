export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string | null;
  categoryId?: number;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string | null;
  slug: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}
