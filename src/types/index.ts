export type ProductCategory =
  | 'All'
  | 'Living Room'
  | 'Dining'
  | 'Seating'
  | 'Bedroom'
  | 'Storage'
  | 'Lighting';

export type SpaceSlug = 'living-room' | 'dining-room' | 'bedroom' | 'home-office';

export interface ProductFinish {
  name: string;
  swatchHex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  space: SpaceSlug;
  price: number;
  image: string;
  alt: string;
  shortDescription: string;
  description: string;
  dimensions: string;
  materials: string;
  leadTime: string;
  finishes: ProductFinish[];
}

export interface SpaceItem {
  id: SpaceSlug;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  filterCategory: ProductCategory;
  curatedNotes: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  publishedDate: string;
  author: string;
  image: string;
  alt: string;
  paragraphs: string[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  tagline: string;
  image: string;
  alt: string;
  targetCategory: ProductCategory;
}

export interface CartItem {
  product: Product;
  finish: string;
  quantity: number;
}

export type InfoModalTopic =
  | 'philosophy'
  | 'story'
  | 'craftsmanship'
  | 'sustainability'
  | 'careers'
  | 'shipping'
  | 'returns'
  | 'faqs'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | null;
