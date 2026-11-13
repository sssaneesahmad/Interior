import { useMemo, useState } from 'react';
import { ArrowRight, Heart, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import type { Product, ProductCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductsSectionProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onNavigateProduct: (slug: string) => void;
  onNavigateShop: (category?: ProductCategory) => void;
  onQuickAdd: (product: Product) => void;
}

const CATEGORIES: ProductCategory[] = [
  'All',
  'Living Room',
  'Dining',
  'Seating',
  'Bedroom',
  'Storage',
  'Lighting',
];

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function ProductsSection({
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onOpenProduct,
  onNavigateProduct,
  onNavigateShop,
  onQuickAdd,
}: ProductsSectionProps) {
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    const base = PRODUCTS.filter((item) => {
      const categoryMatch =
        activeCategory === 'All' || item.category === activeCategory;
      const savedMatch = !showSavedOnly || wishlistIds.includes(item.id);
      return categoryMatch && savedMatch;
    });

    if (sortBy === 'price-asc') {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...base].sort((a, b) => b.price - a.price);
    }
    return base;
  }, [activeCategory, showSavedOnly, sortBy, wishlistIds]);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section
      id="featured-products"
      className="py-16 sm:py-20 lg:py-24 bg-[#F1EBE3]"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-[580px]">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-3">
              CURATED COLLECTION
            </p>
            <h2 className="font-editorial text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.08] font-normal text-[#171614] mb-3">
              Curated for Inspired Living
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#4C453E]">
              A considered selection of furniture and home accents, chosen for
              their beauty, function, and enduring appeal.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateShop(activeCategory)}
            className="group self-start md:self-auto inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] uppercase text-[#292521] hover:text-[#574638] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
          >
            <span className="border-b border-[#292521]/40 group-hover:border-[#574638] pb-0.5">
              Shop All Products
            </span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D8CFC2]">
          <div
            role="tablist"
            aria-label="Filter furniture by category"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category && !showSavedOnly;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setShowSavedOnly(false);
                    onSelectCategory(category);
                  }}
                  className={`px-3.5 py-2 text-[12.5px] font-medium tracking-[0.03em] rounded-[3px] whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#292521] text-[#F7F3ED]'
                      : 'bg-transparent text-[#4C453E] hover:bg-[#E6DDD1] hover:text-[#171614]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowSavedOnly((prev) => !prev)}
              aria-pressed={showSavedOnly}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-medium rounded-[3px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                showSavedOnly
                  ? 'bg-[#292521] text-[#F7F3ED] border-[#292521]'
                  : 'bg-[#F7F3ED] text-[#292521] border-[#D8CFC2] hover:border-[#A39483]'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`}
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <span className="tabular-nums">Saved ({wishlistIds.length})</span>
            </button>

            <label className="sr-only" htmlFor="product-sort">
              Sort products
            </label>
            <select
              id="product-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3.5 py-2 bg-[#F7F3ED] border border-[#D8CFC2] hover:border-[#A39483] rounded-[3px] text-[12.5px] font-medium text-[#292521] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#F7F3ED] border border-[#E6DDD1] py-16 px-6 text-center">
            <p className="font-editorial text-[28px] text-[#171614] mb-2">
              {showSavedOnly
                ? 'No saved pieces yet'
                : 'No pieces match this selection'}
            </p>
            <p className="text-[14px] text-[#625B54] max-w-md mx-auto mb-6">
              {showSavedOnly
                ? 'Tap the heart icon on any piece to curate your personal shortlist.'
                : 'Explore the complete collection to view all handcrafted furniture.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setShowSavedOnly(false);
                onSelectCategory('All');
              }}
              className="px-5 py-2.5 bg-[#292521] text-[#F7F3ED] text-[12.5px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
            >
              View All Pieces
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <article
                  key={product.id}
                  className="group bg-[#F7F3ED] border border-[#E6DDD1] hover:border-[#C9B8A5] transition-all duration-300 flex flex-col"
                >
                  {/* Uniform 4:3 Image Frame */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E6DDD1]">
                    <button
                      type="button"
                      onClick={() => onNavigateProduct(product.slug)}
                      className="w-full h-full block cursor-pointer text-left"
                      aria-label={`View ${product.name} product page`}
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product)}
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.name} from saved items`
                          : `Save ${product.name} to wishlist`
                      }
                      aria-pressed={isWishlisted}
                      className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-[#F7F3ED]/92 backdrop-blur-xs border border-[#E6DDD1] inline-flex items-center justify-center text-[#292521] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#574638] text-[#574638]' : ''
                        }`}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#625B54]">
                        {product.category}
                      </p>
                      <button
                        type="button"
                        onClick={() => onNavigateProduct(product.slug)}
                        className="mt-1.5 text-left block w-full cursor-pointer"
                      >
                        <h3 className="font-editorial text-[24px] leading-snug text-[#171614] group-hover:text-[#574638] transition-colors">
                          {product.name}
                        </h3>
                      </button>
                      <p className="text-[13.5px] leading-[1.55] text-[#4C453E] mt-2 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#E6DDD1] flex items-center justify-between gap-3">
                      <span className="text-[15px] font-medium text-[#171614] tabular-nums">
                        {formatPrice(product.price)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="px-3 py-2 text-[12px] font-medium text-[#4C453E] hover:text-[#171614] transition-colors cursor-pointer"
                        >
                          Quick View
                        </button>
                        <button
                          type="button"
                          onClick={() => onQuickAdd(product)}
                          aria-label={`Add ${product.name} to shopping bag`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#292521] text-[#F7F3ED] text-[12px] font-medium rounded-[3px] hover:bg-[#171614] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
