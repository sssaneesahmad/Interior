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

export interface ProductGalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  space: SpaceSlug;
  price: number;
  availability: 'In Stock' | 'Made to Order';
  image: string;
  alt: string;
  gallery: ProductGalleryImage[];
  shortDescription: string;
  description: string;
  dimensions: string;
  materials: string;
  careInstructions: string;
  leadTime: string;
  finishes: ProductFinish[];
  pairedProductIds: string[];
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

export type AppRoute =
  | { page: 'home' }
  | { page: 'shop'; category?: ProductCategory; space?: SpaceSlug | 'all' }
  | { page: 'product'; slug: string }
  | { page: 'cart' }
  | { page: 'checkout' }
  | { page: 'not-found' };

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
