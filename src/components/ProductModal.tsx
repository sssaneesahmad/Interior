import { useEffect, useState } from 'react';
import { ArrowRight, Heart, Ruler, ShieldCheck, Truck, X } from 'lucide-react';
import type { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToBag: (product: Product, finish: string) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigateProduct: (slug: string) => void;
}

export function ProductModal({
  product,
  isWishlisted,
  onClose,
  onAddToBag,
  onToggleWishlist,
  onNavigateProduct,
}: ProductModalProps) {
  const [selectedFinish, setSelectedFinish] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedFinish(product.finishes[0]?.name ?? 'Standard Finish');
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="absolute inset-0 bg-[#171614]/55 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[960px] max-h-[90vh] overflow-y-auto bg-[#F7F3ED] border border-[#E6DDD1] shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-[#F7F3ED]/90 border border-[#E6DDD1] inline-flex items-center justify-center text-[#292521] hover:bg-[#FFFFFF] cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
        </button>

        {/* Left Product Photograph */}
        <div className="lg:col-span-6 bg-[#E6DDD1] aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
          <ImageWithFallback
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Purchase & Specification Module */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#574638]">
              {product.category}
            </p>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h2 className="font-editorial text-[32px] sm:text-[36px] leading-tight text-[#171614]">
                {product.name}
              </h2>
              <span className="text-[18px] font-medium text-[#171614] tabular-nums shrink-0">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="text-[14.5px] leading-[1.68] text-[#4C453E] mt-4">
              {product.description}
            </p>

            {/* Finish Swatches */}
            <div className="mt-6">
              <p className="text-[12px] font-medium text-[#292521] mb-2.5">
                Finish: <span className="text-[#574638]">{selectedFinish}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.finishes.map((finish) => {
                  const isActive = selectedFinish === finish.name;
                  return (
                    <button
                      key={finish.name}
                      type="button"
                      onClick={() => setSelectedFinish(finish.name)}
                      className={`inline-flex items-center gap-2 px-3 py-2 text-[12px] border rounded-[3px] transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#292521] bg-[#F1EBE3] text-[#171614] font-medium'
                          : 'border-[#D8CFC2] bg-transparent text-[#4C453E] hover:border-[#A39483]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="w-3.5 h-3.5 rounded-full border border-[#171614]/20 shrink-0"
                        style={{ backgroundColor: finish.swatchHex }}
                      />
                      <span>{finish.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specifications */}
            <dl className="mt-6 pt-5 border-t border-[#E6DDD1] space-y-2.5 text-[13px]">
              <div className="flex items-start gap-2.5 text-[#4C453E]">
                <Ruler className="w-4 h-4 text-[#574638] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Dimensions</dt>
                  <dd className="tabular-nums">{product.dimensions}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-[#4C453E]">
                <ShieldCheck className="w-4 h-4 text-[#574638] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Materials</dt>
                  <dd>{product.materials}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-[#4C453E]">
                <Truck className="w-4 h-4 text-[#574638] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Lead time</dt>
                  <dd>{product.leadTime}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E6DDD1]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToBag(product, selectedFinish);
                  onClose();
                }}
                className="flex-1 py-3.5 px-6 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
              >
                Add to Bag — {formatPrice(product.price)}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                aria-label={
                  isWishlisted
                    ? `Remove ${product.name} from wishlist`
                    : `Save ${product.name} to wishlist`
                }
                aria-pressed={isWishlisted}
                className="w-12 h-12 border border-[#C9B8A5] rounded-[3px] inline-flex items-center justify-center text-[#292521] hover:bg-[#F1EBE3] transition-colors shrink-0 cursor-pointer"
              >
                <Heart
                  className={`w-4.5 h-4.5 ${
                    isWishlisted ? 'fill-[#574638] text-[#574638]' : ''
                  }`}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateProduct(product.slug);
              }}
              className="w-full py-2 text-[12.5px] font-medium tracking-[0.04em] text-[#574638] hover:text-[#171614] inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Product Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
