import { useEffect, useState, type FormEvent } from 'react';
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, finish: string, delta: number) => void;
  onRemoveItem: (productId: string, finish: string) => void;
  onClearCart: () => void;
  onExploreCatalog: () => void;
}

const WHITE_GLOVE_THRESHOLD = 2500;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreCatalog,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'reservation' | 'confirmed'>('bag');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [formError, setFormError] = useState('');
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen && step === 'confirmed') {
      setStep('bag');
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const progressPct = Math.min(100, Math.round((subtotal / WHITE_GLOVE_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, WHITE_GLOVE_THRESHOLD - subtotal);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  const handleConfirmReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!clientName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!clientCity.trim()) {
      setFormError('Please enter your delivery city.');
      return;
    }

    const generatedRef = `AS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedRef);
    setFormError('');
    onClearCart();
    setStep('confirmed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        className="absolute inset-0 bg-[#171614]/50 backdrop-blur-xs"
        onClick={onClose}
      />

      <aside className="relative z-10 w-full max-w-[460px] h-full bg-[#F7F3ED] text-[#292521] flex flex-col shadow-2xl border-l border-[#E6DDD1]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6DDD1] flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-[26px] leading-none text-[#171614]">
              {step === 'confirmed'
                ? 'Reservation Summary'
                : step === 'reservation'
                ? 'Client Delivery Details'
                : 'Shopping Bag'}
            </h2>
            {step === 'bag' && (
              <p className="text-[12px] text-[#625B54] mt-1 tabular-nums">
                {totalCount} {totalCount === 1 ? 'piece' : 'pieces'} selected
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-11 h-11 inline-flex items-center justify-center text-[#292521] hover:text-[#171614] cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 'confirmed' ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#E6DDD1] flex items-center justify-center text-[#574638]">
                <Check className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#574638]">
                  REFERENCE {orderRef}
                </p>
                <h3 className="font-editorial text-[30px] text-[#171614] mt-1">
                  Selection Reserved Locally
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#4C453E] mt-3 max-w-sm mx-auto">
                  Thank you, {clientName}. Your piece selection for{' '}
                  <span className="font-medium text-[#171614]">{clientCity}</span>{' '}
                  has been recorded in this session. Note: connect a live payment
                  or order backend to dispatch formal studio invoices to{' '}
                  <span className="font-medium text-[#171614]">{clientEmail}</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('bag');
                  onClose();
                }}
                className="px-6 py-3 bg-[#292521] text-[#F7F3ED] text-[12.5px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#E6DDD1] flex items-center justify-center text-[#574638] mb-5">
                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-[28px] text-[#171614] mb-2">
                Your bag is currently empty
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#625B54] max-w-[30ch] mb-6">
                Explore our signature walnut tables, linen sofas, and architectural lighting.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreCatalog();
                }}
                className="px-6 py-3 bg-[#292521] text-[#F7F3ED] text-[12.5px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : step === 'reservation' ? (
            <form id="reservation-form" onSubmit={handleConfirmReservation} noValidate className="space-y-4">
              <p className="text-[13.5px] leading-[1.6] text-[#4C453E] bg-[#F1EBE3] border border-[#E6DDD1] p-4">
                Enter your contact details to create a local reservation summary
                for white-glove delivery coordination.
              </p>

              <div>
                <label htmlFor="cart-client-name" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                  Full Name *
                </label>
                <input
                  id="cart-client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Clara Lindqvist"
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cart-client-email" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                  Email Address *
                </label>
                <input
                  id="cart-client-email"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cart-client-city" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                  Delivery City & Country *
                </label>
                <input
                  id="cart-client-city"
                  type="text"
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  placeholder="Zurich, Switzerland"
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                />
              </div>

              {formError && (
                <p role="alert" className="text-[12.5px] text-[#7A3528]">
                  {formError}
                </p>
              )}
            </form>
          ) : (
            <div className="space-y-6">
              {/* Complimentary White-Glove Delivery Progress */}
              <div className="bg-[#F1EBE3] border border-[#E6DDD1] p-4">
                <p className="text-[12.5px] text-[#292521]">
                  {remainingForFreeShipping === 0 ? (
                    <span>Complimentary white-glove delivery unlocked.</span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="font-medium tabular-nums">
                        {formatPrice(remainingForFreeShipping)}
                      </strong>{' '}
                      for complimentary white-glove delivery.
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

              {/* Line Items */}
              <ul className="divide-y divide-[#E6DDD1]">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.finish}`}
                    className="py-5 first:pt-0 flex gap-4"
                  >
                    <div className="w-24 h-20 shrink-0 bg-[#E6DDD1] overflow-hidden">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-editorial text-[20px] leading-tight text-[#171614]">
                            {item.product.name}
                          </h3>
                          <p className="text-[12px] text-[#625B54] mt-0.5">
                            {item.finish}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.finish)}
                          aria-label={`Remove ${item.product.name} from bag`}
                          className="p-1 text-[#625B54] hover:text-[#171614] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-[#C9B8A5] bg-[#F1EBE3] rounded-[3px]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.finish, -1)
                            }
                            aria-label={`Decrease quantity of ${item.product.name}`}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#292521] hover:bg-[#E6DDD1] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="px-2.5 text-[12.5px] font-medium tabular-nums text-[#171614]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.finish, 1)
                            }
                            aria-label={`Increase quantity of ${item.product.name}`}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#292521] hover:bg-[#E6DDD1] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <span className="text-[14px] font-medium text-[#171614] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-[#E6DDD1] bg-[#F1EBE3] space-y-4">
            <div className="flex items-center justify-between text-[15px]">
              <span className="text-[#4C453E]">Subtotal</span>
              <span className="font-medium text-[#171614] tabular-nums text-[17px]">
                {formatPrice(subtotal)}
              </span>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('reservation')}
                className="w-full py-3.5 px-6 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
              >
                Proceed to Reservation
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="px-4 py-3.5 border border-[#C9B8A5] text-[#292521] text-[13px] font-medium rounded-[3px] hover:bg-[#E6DDD1] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="reservation-form"
                  className="flex-1 py-3.5 px-6 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
