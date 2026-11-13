import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { WHITE_GLOVE_THRESHOLD } from '../data/catalog';
import type { CartItem } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface CartPageProps {
  items: CartItem[];
  promoCode: string;
  orderNote: string;
  onApplyPromoCode: (code: string) => void;
  onUpdateOrderNote: (note: string) => void;
  onUpdateQuantity: (productId: string, finish: string, delta: number) => void;
  onRemoveItem: (productId: string, finish: string) => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateProduct: (slug: string) => void;
  onNavigateCheckout: () => void;
}

export function CartPage({
  items,
  promoCode,
  orderNote,
  onApplyPromoCode,
  onUpdateOrderNote,
  onUpdateQuantity,
  onRemoveItem,
  onNavigateHome,
  onNavigateShop,
  onNavigateProduct,
  onNavigateCheckout,
}: CartPageProps) {
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoFeedback, setPromoFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const discountRate = promoCode.toUpperCase() === 'ATELIER10' ? 0.1 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const discountedSubtotal = subtotal - discountAmount;
  const shippingCost =
    items.length === 0 || discountedSubtotal >= WHITE_GLOVE_THRESHOLD ? 0 : 180;
  const estimatedTotal = discountedSubtotal + shippingCost;
  const progressPct = Math.min(
    100,
    Math.round((discountedSubtotal / WHITE_GLOVE_THRESHOLD) * 100),
  );
  const remainingForFreeShipping = Math.max(
    0,
    WHITE_GLOVE_THRESHOLD - discountedSubtotal,
  );

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  const handlePromoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) {
      onApplyPromoCode('');
      setPromoFeedback(null);
      return;
    }
    if (cleaned === 'ATELIER10') {
      onApplyPromoCode('ATELIER10');
      setPromoFeedback({
        type: 'success',
        text: 'Studio privilege ATELIER10 applied (10% off).',
      });
    } else {
      setPromoFeedback({
        type: 'error',
        text: 'Unrecognized code. Try ATELIER10 for 10% studio privilege.',
      });
    }
  };

  return (
    <div className="bg-[#F7F3ED] min-h-[75vh] py-12 sm:py-16">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#625B54] mb-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#171614] cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#171614] font-medium">Shopping Bag</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E6DDD1]">
          <h1 className="font-editorial text-[38px] sm:text-[48px] leading-[1.08] font-normal text-[#171614]">
            Your Shopping Bag
          </h1>
          <button
            type="button"
            onClick={onNavigateShop}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#574638] hover:text-[#171614] cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E6DDD1] flex items-center justify-center text-[#574638] mb-5">
              <ShoppingBag className="w-7 h-7" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h2 className="font-editorial text-[32px] text-[#171614] mb-2">
              Your shopping bag is empty
            </h2>
            <p className="text-[14.5px] leading-[1.65] text-[#625B54] mb-7">
              Browse our curated walnut, travertine, and linen pieces to begin
              composing your space.
            </p>
            <button
              type="button"
              onClick={onNavigateShop}
              className="px-7 py-3.5 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
            >
              Explore All Products
            </button>
          </div>
        ) : (
          <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Line Items */}
            <div className="lg:col-span-8 space-y-8">
              <ul className="divide-y divide-[#E6DDD1] border-b border-[#E6DDD1]">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.finish}`}
                    className="py-6 first:pt-0 flex flex-col sm:flex-row gap-5 sm:gap-6"
                  >
                    <button
                      type="button"
                      onClick={() => onNavigateProduct(item.product.slug)}
                      className="w-full sm:w-40 aspect-[4/3] bg-[#E6DDD1] overflow-hidden shrink-0 cursor-pointer"
                    >
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <div className="flex-1 flex flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] tracking-[0.14em] uppercase text-[#625B54]">
                            {item.product.category} · {item.product.sku}
                          </p>
                          <button
                            type="button"
                            onClick={() => onNavigateProduct(item.product.slug)}
                            className="text-left cursor-pointer"
                          >
                            <h2 className="font-editorial text-[26px] leading-snug text-[#171614] hover:text-[#574638] transition-colors">
                              {item.product.name}
                            </h2>
                          </button>
                          <p className="text-[13.5px] text-[#4C453E] mt-0.5">
                            Finish: <span className="font-medium">{item.finish}</span>
                          </p>
                          <p className="text-[12.5px] text-[#625B54] mt-1">
                            {item.product.leadTime}
                          </p>
                        </div>

                        <p className="text-[17px] font-medium text-[#171614] tabular-nums shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="inline-flex items-center border border-[#C9B8A5] bg-[#F1EBE3] rounded-[3px]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.finish, -1)
                            }
                            aria-label={`Decrease quantity of ${item.product.name}`}
                            className="w-9 h-9 inline-flex items-center justify-center text-[#292521] hover:bg-[#E6DDD1] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-9 text-center text-[13px] font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.finish, 1)
                            }
                            aria-label={`Increase quantity of ${item.product.name}`}
                            className="w-9 h-9 inline-flex items-center justify-center text-[#292521] hover:bg-[#E6DDD1] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.finish)}
                          className="inline-flex items-center gap-1.5 text-[12.5px] text-[#625B54] hover:text-[#171614] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery / Project Note */}
              <div>
                <label
                  htmlFor="cart-order-note"
                  className="block text-[12px] font-medium tracking-[0.06em] uppercase text-[#574638] mb-2"
                >
                  Delivery Access or Architectural Note (Optional)
                </label>
                <textarea
                  id="cart-order-note"
                  rows={3}
                  value={orderNote}
                  onChange={(e) => onUpdateOrderNote(e.target.value)}
                  placeholder="Elevator dimensions, preferred delivery week, or room placement notes..."
                  className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] placeholder:text-[#625B54] focus:border-[#292521] focus:outline-none"
                />
              </div>
            </div>

            {/* Right Sticky Summary */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-[#F1EBE3] border border-[#E6DDD1] p-6 sm:p-8 space-y-6">
              <h2 className="font-editorial text-[28px] leading-tight text-[#171614]">
                Order Summary
              </h2>

              {/* White-Glove Delivery Meter */}
              <div className="bg-[#F7F3ED] border border-[#E6DDD1] p-4">
                <p className="text-[12.5px] text-[#292521]">
                  {remainingForFreeShipping === 0 ? (
                    <span>Complimentary white-glove delivery unlocked.</span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="font-medium tabular-nums">
                        {formatPrice(remainingForFreeShipping)}
                      </strong>{' '}
                      for complimentary white-glove placement.
                    </span>
                  )}
                </p>
                <div className="mt-2.5 h-1.5 w-full bg-[#E6DDD1] overflow-hidden">
                  <div
                    className="h-full bg-[#574638] transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Studio Privilege Code */}
              <form onSubmit={handlePromoSubmit} className="space-y-2">
                <label
                  htmlFor="cart-promo-code"
                  className="block text-[11.5px] font-medium tracking-[0.12em] uppercase text-[#574638]"
                >
                  Studio Privilege Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="cart-promo-code"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="ATELIER10"
                    className="flex-1 min-w-0 px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[13px] text-[#171614] uppercase focus:border-[#292521] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 border border-[#292521] text-[#292521] text-[12px] font-medium rounded-[3px] hover:bg-[#292521] hover:text-[#F7F3ED] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <p
                    role="status"
                    className={`text-[12px] flex items-center gap-1.5 ${
                      promoFeedback.type === 'success'
                        ? 'text-[#574638]'
                        : 'text-[#7A3528]'
                    }`}
                  >
                    {promoFeedback.type === 'success' && (
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span>{promoFeedback.text}</span>
                  </p>
                )}
              </form>

              {/* Cost Breakdown */}
              <dl className="space-y-3 pt-4 border-t border-[#D8CFC2] text-[14px]">
                <div className="flex items-center justify-between text-[#4C453E]">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums text-[#171614]">{formatPrice(subtotal)}</dd>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-[#574638]">
                    <dt>Studio Privilege ({promoCode})</dt>
                    <dd className="tabular-nums">−{formatPrice(discountAmount)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#4C453E]">
                  <dt>White-Glove Delivery</dt>
                  <dd className="tabular-nums text-[#171614]">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#D8CFC2] text-[16px] font-medium text-[#171614]">
                  <dt>Estimated Total</dt>
                  <dd className="tabular-nums text-[20px]">{formatPrice(estimatedTotal)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={onNavigateCheckout}
                className="w-full py-3.5 px-6 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
