import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { JOURNAL_ARTICLES, PRODUCTS, SPACES } from '../data/catalog';
import type { JournalArticle, Product, ProductCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (slug: string) => void;
  onSelectSpace: (category: ProductCategory) => void;
  onSelectArticle: (article: JournalArticle) => void;
  onViewAllShop: () => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectSpace,
  onSelectArticle,
  onViewAllShop,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const normalized = query.trim().toLowerCase();

  const matchingProducts = useMemo(() => {
    if (!normalized) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(normalized) ||
        p.category.toLowerCase().includes(normalized) ||
        p.materials.toLowerCase().includes(normalized) ||
        p.shortDescription.toLowerCase().includes(normalized),
    );
  }, [normalized]);

  const matchingSpaces = useMemo(() => {
    if (!normalized) return [];
    return SPACES.filter(
      (s) =>
        s.title.toLowerCase().includes(normalized) ||
        s.description.toLowerCase().includes(normalized),
    );
  }, [normalized]);

  const matchingArticles = useMemo(() => {
    if (!normalized) return [];
    return JOURNAL_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(normalized) ||
        a.category.toLowerCase().includes(normalized) ||
        a.excerpt.toLowerCase().includes(normalized),
    );
  }, [normalized]);

  if (!isOpen) return null;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Search Atelier Sorel"
    >
      <div
        className="absolute inset-0 bg-[#171614]/50 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full bg-[#F7F3ED] border-b border-[#E6DDD1] shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-3 pb-4 border-b border-[#C9B8A5]">
            <Search className="w-5 h-5 text-[#574638] shrink-0" strokeWidth={1.6} aria-hidden="true" />
            <label htmlFor="atelier-search-input" className="sr-only">
              Search furniture, spaces, or materials
            </label>
            <input
              ref={inputRef}
              id="atelier-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search walnut, boucle, sofa, dining, bedroom..."
              className="flex-1 bg-transparent text-[16px] sm:text-[18px] text-[#171614] placeholder:text-[#625B54] focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="w-10 h-10 inline-flex items-center justify-center text-[#292521] hover:text-[#171614] cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 space-y-8">
            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#625B54]">
                  {normalized ? 'Matching Pieces' : 'Signature Pieces'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewAllShop();
                  }}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#574638] hover:text-[#171614] cursor-pointer"
                >
                  <span>Browse Full Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {matchingProducts.length === 0 ? (
                <p className="text-[14px] text-[#625B54]">
                  No pieces found matching “{query}”. Try “walnut”, “linen”, or “sofa”.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matchingProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProduct(product.slug);
                      }}
                      className="group text-left bg-[#F1EBE3] border border-[#E6DDD1] hover:border-[#C9B8A5] p-3 flex sm:flex-col gap-3.5 transition-colors cursor-pointer"
                    >
                      <div className="w-20 h-16 sm:w-full sm:h-auto sm:aspect-[4/3] bg-[#E6DDD1] overflow-hidden shrink-0">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10.5px] tracking-[0.12em] uppercase text-[#625B54]">
                          {product.category}
                        </p>
                        <p className="font-editorial text-[20px] text-[#171614] truncate">
                          {product.name}
                        </p>
                        <p className="text-[13px] font-medium text-[#574638] tabular-nums mt-0.5">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Spaces & Articles if searching */}
            {(matchingSpaces.length > 0 || matchingArticles.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E6DDD1]">
                {matchingSpaces.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#625B54] mb-3">
                      Spaces
                    </p>
                    <ul className="space-y-2.5">
                      {matchingSpaces.map((space) => (
                        <li key={space.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectSpace(space.filterCategory);
                            }}
                            className="inline-flex items-center gap-2 text-[15px] font-editorial text-[#171614] hover:text-[#574638] cursor-pointer"
                          >
                            <span>{space.title}</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {matchingArticles.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#625B54] mb-3">
                      Journal Stories
                    </p>
                    <ul className="space-y-2.5">
                      {matchingArticles.map((article) => (
                        <li key={article.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectArticle(article);
                            }}
                            className="inline-flex items-center gap-2 text-[15px] font-editorial text-[#171614] hover:text-[#574638] cursor-pointer text-left"
                          >
                            <span>{article.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
