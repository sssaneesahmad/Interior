import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { PRODUCTS, WHITE_GLOVE_THRESHOLD } from '../data/catalog';
import type { Product, ProductCategory } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface ProductDetailPageProps {
  product: Product;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToBag: (product: Product, finish: string, quantity: number) => void;
  onBuyNow: (product: Product, finish: string, quantity: number) => void;
  onNavigateHome: () => void;
  onNavigateShop: (category?: ProductCategory) => void;
  onNavigateProduct: (slug: string) => void;
  onOpenConsultation: () => void;
}

type AccordionSection = 'dimensions' | 'materials' | 'delivery';

export function ProductDetailPage({
  product,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onBuyNow,
  onNavigateHome,
  onNavigateShop,
  onNavigateProduct,
  onOpenConsultation,
}: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes[0]?.name ?? 'Standard Finish',
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<AccordionSection>('dimensions');

  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedFinish(product.finishes[0]?.name ?? 'Standard Finish');
    setQuantity(1);
  }, [product]);

  const isWishlisted = wishlistIds.includes(product.id);
  const activeMedia = product.gallery[selectedImageIndex] ?? product.gallery[0];
  const pairedProducts = product.pairedProductIds
    .map((id) => PRODUCTS.find((item) => item.id === id))
    .filter((item): item is Product => Boolean(item));

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-[#F7F3ED] pb-20 md:pb-0">
      {/* Breadcrumb Strip */}
      <div className="border-b border-[#E6DDD1] bg-[#F1EBE3]/70">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="text-[12px] text-[#625B54] flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#171614] cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => onNavigateShop('All')}
              className="hover:text-[#171614] cursor-pointer"
            >
              Shop
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => onNavigateShop(product.category)}
              className="hover:text-[#171614] cursor-pointer"
            >
              {product.category}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#171614] font-medium">{product.name}</span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigateShop('All')}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#574638] hover:text-[#171614] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to All Products</span>
          </button>
        </div>
      </div>

      {/* Main Contiguous PDP Layout */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6DDD1] border border-[#E6DDD1]">
                <ImageWithFallback
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between text-[12px] text-[#625B54] px-0.5">
                <span>{activeMedia.caption}</span>
                <span className="tabular-nums">
                  0{selectedImageIndex + 1} / 0{product.gallery.length}
                </span>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-3 gap-3.5 pt-1">
                {product.gallery.map((media, idx) => {
                  const isActive = idx === selectedImageIndex;
                  return (
                    <button
                      key={media.caption}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`View image ${idx + 1}: ${media.caption}`}
                      className={`group relative aspect-[4/3] overflow-hidden bg-[#E6DDD1] border transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#292521] ring-1 ring-[#292521]'
                          : 'border-[#E6DDD1] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <ImageWithFallback
                        src={media.src}
                        alt={media.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Contiguous Purchase Module */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#F1EBE3] border border-[#E6DDD1] p-6 sm:p-8 lg:p-9">
              <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#574638]">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{product.sku}</span>
                <span aria-hidden="true">·</span>
                <span>{product.availability}</span>
              </div>

              <h1 className="font-editorial text-[36px] sm:text-[44px] leading-[1.08] font-normal text-[#171614] mt-2.5">
                {product.name}
              </h1>

              <div className="mt-3 flex items-baseline gap-4">
                <span className="text-[22px] font-medium text-[#171614] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[12.5px] text-[#625B54]">
                  {product.price >= WHITE_GLOVE_THRESHOLD
                    ? 'Includes complimentary white-glove delivery'
                    : product.leadTime}
                </span>
              </div>

              <p className="text-[14.5px] leading-[1.7] text-[#4C453E] mt-5">
                {product.description}
              </p>

              {/* Finish Selector */}
              <div className="mt-7 pt-6 border-t border-[#D8CFC2]">
                <p className="text-[12px] font-medium text-[#292521] mb-3">
                  Select Finish:{' '}
                  <span className="text-[#574638]">{selectedFinish}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.finishes.map((finish) => {
                    const active = selectedFinish === finish.name;
                    return (
                      <button
                        key={finish.name}
                        type="button"
                        onClick={() => setSelectedFinish(finish.name)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-[12.5px] rounded-[3px] border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#F7F3ED] border-[#292521] text-[#171614] font-medium'
                            : 'bg-transparent border-[#C9B8A5] text-[#4C453E] hover:border-[#574638]'
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

              {/* Quantity & Purchase CTAs */}
              <div className="mt-7 space-y-3">
                <div className="flex items-stretch gap-3">
                  <div className="inline-flex items-center border border-[#C9B8A5] bg-[#F7F3ED] rounded-[3px] shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-11 h-12 inline-flex items-center justify-center text-[#292521] hover:bg-[#E6DDD1] cursor-pointer"
                    >
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <span className="w-10 text-center text-[14px] font-medium tabular-nums text-[#171614]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-11 h-12 inline-flex items-center justify-center text-[#292521] hover:bg-[#E6DDD1] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToBag(product, selectedFinish, quantity)}
                    className="flex-1 h-12 px-6 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
                  >
                    Add to Bag — {formatPrice(product.price * quantity)}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    aria-label={
                      isWishlisted ? 'Remove from shortlist' : 'Save to shortlist'
                    }
                    aria-pressed={isWishlisted}
                    className="w-12 h-12 border border-[#C9B8A5] bg-[#F7F3ED] rounded-[3px] inline-flex items-center justify-center text-[#292521] hover:border-[#292521] transition-colors shrink-0 cursor-pointer"
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
                  onClick={() => onBuyNow(product, selectedFinish, quantity)}
                  className="w-full h-11 px-6 border border-[#292521] bg-transparent text-[#292521] text-[12.5px] font-medium tracking-[0.05em] uppercase rounded-[3px] hover:bg-[#292521] hover:text-[#F7F3ED] transition-colors cursor-pointer"
                >
                  Proceed Directly to Checkout
                </button>
              </div>

              {/* Specification Accordions */}
              <div className="mt-7 pt-4 border-t border-[#D8CFC2] divide-y divide-[#D8CFC2]">
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion('dimensions')}
                    aria-expanded={openAccordion === 'dimensions'}
                    className="w-full py-3.5 flex items-center justify-between text-left text-[13.5px] font-medium text-[#171614] cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Ruler className="w-4 h-4 text-[#574638]" aria-hidden="true" />
                      <span>Dimensions &amp; Proportions</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'dimensions' ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {openAccordion === 'dimensions' && (
                    <p className="pb-4 text-[13.5px] leading-[1.65] text-[#4C453E] tabular-nums">
                      {product.dimensions}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion('materials')}
                    aria-expanded={openAccordion === 'materials'}
                    className="w-full py-3.5 flex items-center justify-between text-left text-[13.5px] font-medium text-[#171614] cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#574638]" aria-hidden="true" />
                      <span>Materials &amp; Care</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'materials' ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {openAccordion === 'materials' && (
                    <div className="pb-4 space-y-2 text-[13.5px] leading-[1.65] text-[#4C453E]">
                      <p>{product.materials}</p>
                      <p className="text-[#625B54]">{product.careInstructions}</p>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion('delivery')}
                    aria-expanded={openAccordion === 'delivery'}
                    className="w-full py-3.5 flex items-center justify-between text-left text-[13.5px] font-medium text-[#171614] cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#574638]" aria-hidden="true" />
                      <span>White-Glove Delivery &amp; 30-Day Trial</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'delivery' ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {openAccordion === 'delivery' && (
                    <p className="pb-4 text-[13.5px] leading-[1.65] text-[#4C453E]">
                      {product.leadTime}. Complimentary white-glove threshold &amp;
                      in-room placement on orders above $2,500, backed by our
                      30-day home trial and 10-year structural guarantee.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#D8CFC2] text-[12.5px] text-[#574638] flex items-center justify-between gap-2">
                <span>Need physical finish swatches?</span>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="font-medium underline underline-offset-4 text-[#292521] hover:text-[#574638] cursor-pointer"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete the Space — Related Pieces */}
      <section className="py-14 sm:py-18 bg-[#F1EBE3] border-t border-[#E6DDD1]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-4 mb-9">
            <div>
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-2">
                CURATED PAIRINGS
              </p>
              <h2 className="font-editorial text-[32px] sm:text-[38px] leading-tight text-[#171614]">
                Complete the Space
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateShop('All')}
              className="inline-flex items-center gap-2 text-[12.5px] font-medium tracking-[0.06em] uppercase text-[#292521] hover:text-[#574638] cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {pairedProducts.map((item) => (
              <article
                key={item.id}
                className="group bg-[#F7F3ED] border border-[#E6DDD1] hover:border-[#C9B8A5] transition-colors flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => onNavigateProduct(item.slug)}
                  className="aspect-[4/3] w-full overflow-hidden bg-[#E6DDD1] block cursor-pointer"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
                <div className="p-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] tracking-[0.12em] uppercase text-[#625B54]">
                      {item.category}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigateProduct(item.slug)}
                      className="text-left cursor-pointer"
                    >
                      <h3 className="font-editorial text-[23px] text-[#171614] group-hover:text-[#574638] transition-colors">
                        {item.name}
                      </h3>
                    </button>
                  </div>
                  <span className="text-[14.5px] font-medium text-[#171614] tabular-nums shrink-0">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Buy Bar (Compact <= 64px) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#F7F3ED]/96 backdrop-blur-md border-t border-[#D8CFC2] px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-editorial text-[18px] leading-tight text-[#171614] truncate">
            {product.name}
          </p>
          <p className="text-[12.5px] font-medium text-[#574638] tabular-nums">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAddToBag(product, selectedFinish, quantity)}
          className="px-5 py-2.5 bg-[#292521] text-[#F7F3ED] text-[12.5px] font-medium rounded-[3px] whitespace-nowrap shrink-0 cursor-pointer"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
