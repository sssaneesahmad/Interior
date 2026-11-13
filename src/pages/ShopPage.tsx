import { useMemo, useState } from 'react';
import { ArrowRight, Heart, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, SPACES } from '../data/catalog';
import type { Product, ProductCategory, SpaceSlug } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ConsultationBanner } from '../components/ConsultationBanner';

interface ShopPageProps {
  initialCategory?: ProductCategory;
  initialSpace?: SpaceSlug | 'all';
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateProduct: (slug: string) => void;
  onOpenConsultation: () => void;
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

type AvailabilityFilter = 'all' | 'In Stock' | 'Made to Order';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export function ShopPage({
  initialCategory = 'All',
  initialSpace = 'all',
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onNavigateHome,
  onNavigateProduct,
  onOpenConsultation,
}: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [selectedSpace, setSelectedSpace] = useState<SpaceSlug | 'all'>(initialSpace);
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchSpace =
        selectedSpace === 'all' || product.space === selectedSpace;
      const matchAvailability =
        availability === 'all' || product.availability === availability;
      const matchSaved = !savedOnly || wishlistIds.includes(product.id);
      const matchQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.materials.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query);

      return (
        matchCategory &&
        matchSpace &&
        matchAvailability &&
        matchSaved &&
        matchQuery
      );
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'name-asc') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [
    selectedCategory,
    selectedSpace,
    availability,
    savedOnly,
    searchTerm,
    sortBy,
    wishlistIds,
  ]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSpace !== 'all' ||
    availability !== 'all' ||
    savedOnly ||
    searchTerm.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSpace('all');
    setAvailability('all');
    setSavedOnly(false);
    setSearchTerm('');
    setSortBy('featured');
  };

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-[#F7F3ED]">
      {/* Editorial Shop Header */}
      <section className="bg-[#F1EBE3] border-b border-[#E6DDD1] py-12 sm:py-16">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="text-[12px] text-[#625B54] mb-4 flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#171614] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#292521] font-medium">All Products</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-[640px]">
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-3">
                THE ATELIER COLLECTION
              </p>
              <h1 className="font-editorial text-[40px] sm:text-[52px] leading-[1.06] font-normal text-[#171614]">
                Considered Furniture &amp; Lighting
              </h1>
              <p className="text-[15px] leading-[1.65] text-[#4C453E] mt-3">
                Architectural forms crafted in solid American walnut, Roman
                travertine, and Belgian flax for residential living and studio
                interiors.
              </p>
            </div>

            <div className="text-[13px] text-[#574638] tabular-nums shrink-0">
              Showing {filteredProducts.length} of {PRODUCTS.length} pieces
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Mobile Filter Bar Trigger + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#E6DDD1] lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F1EBE3] border border-[#C9B8A5] rounded-[3px] text-[13px] font-medium text-[#292521] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>{mobileFiltersOpen ? 'Hide Filters' : 'Filter Pieces'}</span>
            </button>

            <div className="flex items-center gap-2.5">
              <label htmlFor="shop-sort-mobile" className="sr-only">
                Sort products
              </label>
              <select
                id="shop-sort-mobile"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3.5 py-2.5 bg-[#F1EBE3] border border-[#C9B8A5] rounded-[3px] text-[13px] font-medium text-[#292521] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Sidebar Filters */}
            <aside
              aria-label="Catalog filters"
              className={`lg:col-span-3 lg:sticky lg:top-24 space-y-8 ${
                mobileFiltersOpen ? 'block pb-8 border-b border-[#E6DDD1] lg:border-b-0' : 'hidden lg:block'
              }`}
            >
              {/* Search inside shop */}
              <div>
                <label
                  htmlFor="shop-filter-search"
                  className="block text-[11px] font-medium tracking-[0.16em] uppercase text-[#574638] mb-3"
                >
                  Search Collection
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-[#625B54] absolute left-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <input
                    id="shop-filter-search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Walnut, linen, chair..."
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[13.5px] text-[#171614] placeholder:text-[#625B54] focus:border-[#292521] focus:outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#574638] mb-3">
                  Category
                </p>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map((category) => {
                    const active = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`text-left px-3 py-2 text-[13.5px] rounded-[3px] transition-colors cursor-pointer flex items-center justify-between ${
                          active
                            ? 'bg-[#292521] text-[#F7F3ED] font-medium'
                            : 'text-[#4C453E] hover:bg-[#F1EBE3] hover:text-[#171614]'
                        }`}
                      >
                        <span>{category}</span>
                        <span className="text-[11.5px] opacity-75 tabular-nums">
                          {category === 'All'
                            ? PRODUCTS.length
                            : PRODUCTS.filter((p) => p.category === category).length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Room / Space */}
              <div className="pt-6 border-t border-[#E6DDD1]">
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#574638] mb-3">
                  By Space
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedSpace('all')}
                    className={`text-left px-3 py-2 text-[13.5px] rounded-[3px] transition-colors cursor-pointer ${
                      selectedSpace === 'all'
                        ? 'bg-[#E6DDD1] text-[#171614] font-medium'
                        : 'text-[#4C453E] hover:bg-[#F1EBE3]'
                    }`}
                  >
                    All Spaces
                  </button>
                  {SPACES.map((space) => (
                    <button
                      key={space.id}
                      type="button"
                      onClick={() => setSelectedSpace(space.id)}
                      className={`text-left px-3 py-2 text-[13.5px] rounded-[3px] transition-colors cursor-pointer ${
                        selectedSpace === space.id
                          ? 'bg-[#E6DDD1] text-[#171614] font-medium'
                          : 'text-[#4C453E] hover:bg-[#F1EBE3]'
                      }`}
                    >
                      {space.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="pt-6 border-t border-[#E6DDD1]">
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#574638] mb-3">
                  Availability
                </p>
                <div className="flex flex-col gap-2 text-[13.5px] text-[#4C453E]">
                  {(['all', 'In Stock', 'Made to Order'] as AvailabilityFilter[]).map(
                    (opt) => (
                      <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="shop-availability"
                          checked={availability === opt}
                          onChange={() => setAvailability(opt)}
                          className="accent-[#292521] cursor-pointer"
                        />
                        <span>{opt === 'all' ? 'All Pieces' : opt}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              {/* Saved Shortlist */}
              <div className="pt-6 border-t border-[#E6DDD1] space-y-3">
                <button
                  type="button"
                  onClick={() => setSavedOnly((prev) => !prev)}
                  aria-pressed={savedOnly}
                  className={`w-full inline-flex items-center justify-between px-3.5 py-2.5 text-[13px] font-medium rounded-[3px] border transition-colors cursor-pointer ${
                    savedOnly
                      ? 'bg-[#292521] text-[#F7F3ED] border-[#292521]'
                      : 'bg-[#F1EBE3] text-[#292521] border-[#D8CFC2] hover:border-[#A39483]'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Heart
                      className={`w-3.5 h-3.5 ${savedOnly ? 'fill-current' : ''}`}
                      aria-hidden="true"
                    />
                    <span>Saved Shortlist</span>
                  </span>
                  <span className="tabular-nums">{wishlistIds.length}</span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[12.5px] text-[#574638] hover:text-[#171614] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reset all filters</span>
                  </button>
                )}
              </div>
            </aside>

            {/* Product Grid Column */}
            <div className="lg:col-span-9">
              {/* Desktop Sort Toolbar */}
              <div className="hidden lg:flex items-center justify-between pb-5 mb-7 border-b border-[#E6DDD1]">
                <div className="text-[13px] text-[#4C453E]">
                  {selectedCategory === 'All'
                    ? 'All architectural furniture & lighting'
                    : `Category: ${selectedCategory}`}
                </div>

                <div className="flex items-center gap-3">
                  <label htmlFor="shop-sort-desktop" className="text-[12.5px] text-[#625B54]">
                    Sort by
                  </label>
                  <select
                    id="shop-sort-desktop"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3.5 py-2 bg-[#F1EBE3] border border-[#D8CFC2] hover:border-[#A39483] rounded-[3px] text-[13px] font-medium text-[#292521] cursor-pointer"
                  >
                    <option value="featured">Featured Order</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Alphabetical (A–Z)</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-[#F1EBE3] border border-[#E6DDD1] py-20 px-6 text-center">
                  <h2 className="font-editorial text-[30px] text-[#171614] mb-2">
                    No pieces match your current filters
                  </h2>
                  <p className="text-[14px] text-[#625B54] max-w-md mx-auto mb-6">
                    Adjust your category, space, or search query to view the full
                    Atelier Sorel catalog.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-6 py-3 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                  {filteredProducts.map((product) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    return (
                      <article
                        key={product.id}
                        className="group bg-[#F7F3ED] border border-[#E6DDD1] hover:border-[#C9B8A5] transition-all duration-300 flex flex-col"
                      >
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E6DDD1]">
                          <button
                            type="button"
                            onClick={() => onNavigateProduct(product.slug)}
                            className="w-full h-full block cursor-pointer"
                            aria-label={`Open ${product.name} details`}
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
                                ? `Remove ${product.name} from shortlist`
                                : `Save ${product.name} to shortlist`
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

                        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-[#FAF7F2]">
                          <div>
                            <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#625B54]">
                              <span>{product.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{product.availability}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => onNavigateProduct(product.slug)}
                              className="mt-1.5 text-left block w-full cursor-pointer"
                            >
                              <h2 className="font-editorial text-[25px] leading-snug text-[#171614] group-hover:text-[#574638] transition-colors">
                                {product.name}
                              </h2>
                            </button>

                            <p className="text-[13.5px] leading-[1.55] text-[#4C453E] mt-2 line-clamp-2">
                              {product.shortDescription}
                            </p>

                            {/* Material Swatch Preview */}
                            <div className="mt-3.5 flex items-center gap-2">
                              {product.finishes.map((finish) => (
                                <span
                                  key={finish.name}
                                  title={finish.name}
                                  aria-label={finish.name}
                                  className="w-3.5 h-3.5 rounded-full border border-[#171614]/20 inline-block"
                                  style={{ backgroundColor: finish.swatchHex }}
                                />
                              ))}
                              <span className="text-[11.5px] text-[#625B54] ml-1">
                                {product.finishes.length} finishes
                              </span>
                            </div>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#E6DDD1] flex items-center justify-between gap-3">
                            <span className="text-[16px] font-medium text-[#171614] tabular-nums">
                              {formatPrice(product.price)}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onNavigateProduct(product.slug)}
                                className="inline-flex items-center gap-1 px-2.5 py-2 text-[12px] font-medium text-[#4C453E] hover:text-[#171614] cursor-pointer"
                              >
                                <span>Details</span>
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onQuickAdd(product)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#292521] text-[#F7F3ED] text-[12px] font-medium rounded-[3px] hover:bg-[#171614] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
                                <span>Add</span>
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
          </div>
        </div>
      </section>

      <ConsultationBanner onOpenConsultation={onOpenConsultation} />
    </div>
  );
}
