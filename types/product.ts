export interface OldProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string | null;
  categoryId?: number;
  images: string[];
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  rating: number | null;
  reviewCount: number | null;
  isBestSeller: boolean | null;
  isNew: boolean | null;
  categoryId: number;
  createdAt: Date | null;
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

export interface StarRatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}
