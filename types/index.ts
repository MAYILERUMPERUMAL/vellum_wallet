export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: 'men' | 'women' | 'leather' | 'minimal' | 'travel';
  material: 'full-grain' | 'genuine' | 'synthetic' | 'canvas';
  color: 'black' | 'brown' | 'tan' | 'navy' | 'green' | 'burgundy';
  price: number;
  oldPrice?: number;
  badge?: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  colors: string[];
  materials: string[];
  brands: string[];
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
