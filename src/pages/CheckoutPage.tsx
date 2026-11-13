import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, Lock, ShieldCheck, Truck } from 'lucide-react';
import { WHITE_GLOVE_THRESHOLD } from '../data/catalog';
import type { CartItem } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface CheckoutPageProps {
  items: CartItem[];
  promoCode: string;
  orderNote: string;
  onClearCart: () => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateCart: () => void;
}

type DeliveryOption = 'white-glove' | 'standard' | 'showroom';
type PaymentOption = 'card' | 'invoice';

interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingSummary: string;
  deliveryLabel: string;
  paymentLabel: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
}

export function CheckoutPage({
  items,
  promoCode,
  orderNote,
  onClearCart,
  onNavigateHome,
  onNavigateShop,
  onNavigateCart,
}: CheckoutPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Switzerland');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryOption>('white-glove');
  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>('card');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [sameBilling, setSameBilling] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedReceipt, setConfirmedReceipt] = useState<OrderReceipt | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const discountRate = promoCode.toUpperCase() === 'ATELIER10' ? 0.1 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const discountedSubtotal = subtotal - discountAmount;

  const shippingFee =
    deliveryMethod === 'showroom'
      ? 0
      : discountedSubtotal >= WHITE_GLOVE_THRESHOLD
      ? 0
      : deliveryMethod === 'white-glove'
      ? 180
      : 95;

  const grandTotal = discountedSubtotal + shippingFee;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  const formatCardNumberInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = 'Full name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Valid email address is required.';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      next.phone = 'Valid phone number is required.';
    }
    if (deliveryMethod !== 'showroom') {
      if (!street.trim()) next.street = 'Street address is required.';
      if (!city.trim()) next.city = 'City is required.';
      if (!postalCode.trim()) next.postalCode = 'Postal code is required.';
    }
    if (paymentMethod === 'card') {
      if (!cardHolder.trim()) next.cardHolder = 'Cardholder name is required.';
      if (cardNumber.replace(/\D/g, '').length < 15) {
        next.cardNumber = 'Enter a 15–16 digit card number.';
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        next.cardExpiry = 'Enter MM/YY.';
      }
      if (cardCvc.replace(/\D/g, '').length < 3) {
        next.cardCvc = 'Enter 3–4 digit CVC.';
      }
    }
    return next;
  };

  const handleSubmitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const deliveryLabel =
      deliveryMethod === 'white-glove'
        ? 'White-Glove In-Room Placement'
        : deliveryMethod === 'standard'
        ? 'Standard Threshold Freight'
        : 'Private Showroom Collection (Zurich / Copenhagen)';

    const paymentLabel =
      paymentMethod === 'card'
        ? `Card ending in ${cardNumber.replace(/\D/g, '').slice(-4)}`
        : 'Studio Bank Wire / Pro-Forma Invoice';

    const shippingSummary =
      deliveryMethod === 'showroom'
        ? 'Showroom Collection — Zurich Studio'
        : `${street}${apartment ? `, ${apartment}` : ''}, ${city}${region ? `, ${region}` : ''} ${postalCode}, ${country}`;

    const receipt: OrderReceipt = {
      orderNumber: `AS-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: fullName.trim(),
      customerEmail: email.trim(),
      shippingSummary,
      deliveryLabel,
      paymentLabel,
      items: [...items],
      subtotal,
      discount: discountAmount,
      shippingFee,
      total: grandTotal,
    };

    setErrors({});
    setConfirmedReceipt(receipt);
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmedReceipt) {
    return (
      <div className="bg-[#F7F3ED] py-14 sm:py-20 min-h-[75vh]">
        <div className="max-w-[820px] mx-auto px-5 sm:px-8">
          <div className="bg-[#F1EBE3] border border-[#E6DDD1] p-7 sm:p-12">
            <div className="w-12 h-12 rounded-full bg-[#292521] text-[#F7F3ED] flex items-center justify-center mb-6">
              <Check className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
            </div>

            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638]">
              ORDER {confirmedReceipt.orderNumber} CONFIRMED — PREPARING STUDIO DISPATCH
            </p>
            <h1 className="font-editorial text-[36px] sm:text-[46px] leading-[1.08] text-[#171614] mt-2">
              Thank You, {confirmedReceipt.customerName}.
            </h1>
            <p className="text-[15px] leading-[1.68] text-[#4C453E] mt-3 max-w-xl">
              Your order summary has been created in this client session.
              Connect a live payment and fulfillment gateway to automatically
              charge and email formal dispatch schedules to{' '}
              <span className="font-medium text-[#171614]">
                {confirmedReceipt.customerEmail}
              </span>
              .
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#D8CFC2] text-[13.5px]">
              <div>
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#625B54] mb-1.5">
                  Delivery Destination
                </p>
                <p className="text-[#171614] leading-relaxed">
                  {confirmedReceipt.shippingSummary}
                </p>
                <p className="text-[#574638] mt-1">{confirmedReceipt.deliveryLabel}</p>
              </div>

              <div>
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#625B54] mb-1.5">
                  Payment Method
                </p>
                <p className="text-[#171614]">{confirmedReceipt.paymentLabel}</p>
                {orderNote && (
                  <p className="text-[#625B54] mt-1">Note: {orderNote}</p>
                )}
              </div>
            </div>

            {/* Itemized Receipt */}
            <div className="mt-8 pt-6 border-t border-[#D8CFC2]">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#625B54] mb-4">
                Piece Breakdown
              </p>
              <ul className="divide-y divide-[#D8CFC2]">
                {confirmedReceipt.items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.finish}`}
                    className="py-3.5 flex items-center justify-between gap-4 text-[14px]"
                  >
                    <div>
                      <span className="font-editorial text-[20px] text-[#171614]">
                        {item.product.name}
                      </span>
                      <span className="block text-[12px] text-[#625B54]">
                        {item.finish} · Qty {item.quantity}
                      </span>
                    </div>
                    <span className="font-medium tabular-nums text-[#171614]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 pt-4 border-t border-[#D8CFC2] space-y-2 text-[14px]">
                <div className="flex justify-between text-[#4C453E]">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(confirmedReceipt.subtotal)}</dd>
                </div>
                {confirmedReceipt.discount > 0 && (
                  <div className="flex justify-between text-[#574638]">
                    <dt>Studio Privilege</dt>
                    <dd className="tabular-nums">−{formatPrice(confirmedReceipt.discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-[#4C453E]">
                  <dt>Delivery</dt>
                  <dd className="tabular-nums">
                    {confirmedReceipt.shippingFee === 0
                      ? 'Complimentary'
                      : formatPrice(confirmedReceipt.shippingFee)}
                  </dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D8CFC2] text-[17px] font-medium text-[#171614]">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatPrice(confirmedReceipt.total)}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onNavigateShop}
                className="px-6 py-3.5 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
              >
                Continue Exploring Shop
              </button>
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-6 py-3.5 border border-[#C9B8A5] text-[#292521] text-[13px] font-medium rounded-[3px] hover:bg-[#E6DDD1] transition-colors cursor-pointer"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#F7F3ED] py-24 text-center px-5 min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="font-editorial text-[36px] text-[#171614] mb-3">
          Your shopping bag is empty
        </h1>
        <p className="text-[14.5px] text-[#625B54] max-w-md mb-7">
          Select furniture or lighting from our catalog before proceeding to
          checkout.
        </p>
        <button
          type="button"
          onClick={onNavigateShop}
          className="px-7 py-3.5 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium rounded-[3px] hover:bg-[#171614] cursor-pointer"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F3ED] py-12 sm:py-16">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#625B54] mb-4 flex items-center gap-2">
          <button type="button" onClick={onNavigateHome} className="hover:text-[#171614] cursor-pointer">
            Home
          </button>
          <span aria-hidden="true">/</span>
          <button type="button" onClick={onNavigateCart} className="hover:text-[#171614] cursor-pointer">
            Shopping Bag
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#171614] font-medium">Checkout</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E6DDD1]">
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#574638] mb-2">
              STUDIO CHECKOUT
            </p>
            <h1 className="font-editorial text-[38px] sm:text-[48px] leading-[1.08] font-normal text-[#171614]">
              Delivery &amp; Order Details
            </h1>
          </div>

          <button
            type="button"
            onClick={onNavigateCart}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#574638] hover:text-[#171614] cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Return to Bag</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmitOrder}
          noValidate
          className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Left Form Sections */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Contact */}
            <section aria-labelledby="checkout-contact">
              <h2 id="checkout-contact" className="font-editorial text-[28px] text-[#171614] mb-5">
                01. Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="chk-name" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Clara Lindqvist"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                  />
                  {errors.fullName && <p className="text-[12px] text-[#7A3528] mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="chk-email" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                  />
                  {errors.email && <p className="text-[12px] text-[#7A3528] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="chk-phone" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+41 44 580 29 10"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                  />
                  {errors.phone && <p className="text-[12px] text-[#7A3528] mt-1">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* 2. Delivery Method */}
            <section aria-labelledby="checkout-delivery" className="pt-8 border-t border-[#E6DDD1]">
              <h2 id="checkout-delivery" className="font-editorial text-[28px] text-[#171614] mb-5">
                02. Delivery Preference
              </h2>
              <div className="space-y-3">
                {[
                  {
                    id: 'white-glove' as DeliveryOption,
                    title: 'White-Glove In-Room Placement',
                    desc: 'Two-person team delivers to your room of choice, assembles furniture, and removes all packaging.',
                    fee: discountedSubtotal >= WHITE_GLOVE_THRESHOLD ? 'Complimentary' : '$180',
                  },
                  {
                    id: 'standard' as DeliveryOption,
                    title: 'Standard Threshold Freight',
                    desc: 'Scheduled curb or covered threshold freight delivery with signature.',
                    fee: discountedSubtotal >= WHITE_GLOVE_THRESHOLD ? 'Complimentary' : '$95',
                  },
                  {
                    id: 'showroom' as DeliveryOption,
                    title: 'Private Showroom Collection',
                    desc: 'Collect directly from our Zurich or Copenhagen flagship atelier.',
                    fee: 'Complimentary',
                  },
                ].map((opt) => {
                  const active = deliveryMethod === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start justify-between gap-4 p-4 border rounded-[3px] cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#F1EBE3] border-[#292521]'
                          : 'bg-[#FFFFFF] border-[#D8CFC2] hover:border-[#A39483]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          checked={active}
                          onChange={() => setDeliveryMethod(opt.id)}
                          className="mt-1 accent-[#292521] cursor-pointer"
                        />
                        <div>
                          <span className="block text-[14px] font-medium text-[#171614]">
                            {opt.title}
                          </span>
                          <span className="block text-[13px] text-[#625B54] mt-0.5">
                            {opt.desc}
                          </span>
                        </div>
                      </div>
                      <span className="text-[13.5px] font-medium text-[#171614] tabular-nums shrink-0">
                        {opt.fee}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* 3. Shipping Address */}
            {deliveryMethod !== 'showroom' && (
              <section aria-labelledby="checkout-address" className="pt-8 border-t border-[#E6DDD1]">
                <h2 id="checkout-address" className="font-editorial text-[28px] text-[#171614] mb-5">
                  03. Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="chk-street" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      Street Address *
                    </label>
                    <input
                      id="chk-street"
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Talstrasse 82"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                    />
                    {errors.street && <p className="text-[12px] text-[#7A3528] mt-1">{errors.street}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="chk-apt" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      Apartment, Suite, or Floor (Optional)
                    </label>
                    <input
                      id="chk-apt"
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Floor 3, Residence B"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="chk-city" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      City *
                    </label>
                    <input
                      id="chk-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Zurich"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                    />
                    {errors.city && <p className="text-[12px] text-[#7A3528] mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="chk-region" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      State / Canton / Region
                    </label>
                    <input
                      id="chk-region"
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="ZH"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="chk-postal" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      Postal Code *
                    </label>
                    <input
                      id="chk-postal"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="8001"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] tabular-nums focus:border-[#292521] focus:outline-none"
                    />
                    {errors.postalCode && <p className="text-[12px] text-[#7A3528] mt-1">{errors.postalCode}</p>}
                  </div>

                  <div>
                    <label htmlFor="chk-country" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      Country
                    </label>
                    <select
                      id="chk-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                    >
                      <option value="Switzerland">Switzerland</option>
                      <option value="Denmark">Denmark</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {/* 4. Payment */}
            <section aria-labelledby="checkout-payment" className="pt-8 border-t border-[#E6DDD1]">
              <div className="flex items-center justify-between mb-5">
                <h2 id="checkout-payment" className="font-editorial text-[28px] text-[#171614]">
                  {deliveryMethod === 'showroom' ? '03.' : '04.'} Payment Method
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-[#625B54]">
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Client Storefront Preview</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 text-left border rounded-[3px] transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#F1EBE3] border-[#292521] text-[#171614] font-medium'
                      : 'bg-[#FFFFFF] border-[#D8CFC2] text-[#4C453E]'
                  }`}
                >
                  <span className="block text-[13.5px]">Credit or Debit Card</span>
                  <span className="block text-[12px] text-[#625B54] font-normal mt-0.5">
                    Visa, Mastercard, Amex
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('invoice')}
                  className={`p-3.5 text-left border rounded-[3px] transition-colors cursor-pointer ${
                    paymentMethod === 'invoice'
                      ? 'bg-[#F1EBE3] border-[#292521] text-[#171614] font-medium'
                      : 'bg-[#FFFFFF] border-[#D8CFC2] text-[#4C453E]'
                  }`}
                >
                  <span className="block text-[13.5px]">Studio Wire / Invoice</span>
                  <span className="block text-[12px] text-[#625B54] font-normal mt-0.5">
                    Ideal for Trade &amp; Bespoke Orders
                  </span>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="bg-[#F1EBE3] border border-[#E6DDD1] p-5 space-y-4">
                  <div>
                    <label htmlFor="chk-card-holder" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      Name on Card *
                    </label>
                    <input
                      id="chk-card-holder"
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Clara Lindqvist"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] focus:border-[#292521] focus:outline-none"
                    />
                    {errors.cardHolder && <p className="text-[12px] text-[#7A3528] mt-1">{errors.cardHolder}</p>}
                  </div>

                  <div>
                    <label htmlFor="chk-card-number" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                      Card Number *
                    </label>
                    <input
                      id="chk-card-number"
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumberInput(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] tabular-nums focus:border-[#292521] focus:outline-none"
                    />
                    {errors.cardNumber && <p className="text-[12px] text-[#7A3528] mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="chk-card-exp" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                        Expiration (MM/YY) *
                      </label>
                      <input
                        id="chk-card-exp"
                        type="text"
                        inputMode="numeric"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiryInput(e.target.value))}
                        placeholder="08/29"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] tabular-nums focus:border-[#292521] focus:outline-none"
                      />
                      {errors.cardExpiry && <p className="text-[12px] text-[#7A3528] mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="chk-card-cvc" className="block text-[12px] font-medium text-[#292521] mb-1.5">
                        Security Code *
                      </label>
                      <input
                        id="chk-card-cvc"
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        placeholder="842"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#C9B8A5] rounded-[3px] text-[14px] text-[#171614] tabular-nums focus:border-[#292521] focus:outline-none"
                      />
                      {errors.cardCvc && <p className="text-[12px] text-[#7A3528] mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 text-[13px] text-[#4C453E] pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameBilling}
                      onChange={(e) => setSameBilling(e.target.checked)}
                      className="accent-[#292521] cursor-pointer"
                    />
                    <span>Billing address matches delivery address</span>
                  </label>
                </div>
              ) : (
                <div className="bg-[#F1EBE3] border border-[#E6DDD1] p-5 text-[13.5px] leading-[1.65] text-[#4C453E]">
                  Selecting Studio Wire / Pro-Forma Invoice creates an immediate
                  order reference so our Zurich and Copenhagen advisors can
                  issue formal IBAN / SWIFT settlement instructions.
                </div>
              )}

              <p className="text-[12px] text-[#625B54] mt-3">
                Note: This storefront preview validates fields locally and generates
                an order confirmation receipt without processing a live card charge.
              </p>
            </section>
          </div>

          {/* Right Sticky Order Summary */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-[#F1EBE3] border border-[#E6DDD1] p-6 sm:p-8 space-y-6">
            <h2 className="font-editorial text-[28px] leading-tight text-[#171614]">
              Order Summary
            </h2>

            <ul className="divide-y divide-[#D8CFC2]">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.finish}`}
                  className="py-4 first:pt-0 flex items-center gap-4"
                >
                  <div className="w-20 h-16 bg-[#E6DDD1] overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-editorial text-[20px] leading-tight text-[#171614] truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[12px] text-[#625B54] mt-0.5">
                      {item.finish} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-[14.5px] font-medium text-[#171614] tabular-nums shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="space-y-2.5 pt-4 border-t border-[#D8CFC2] text-[14px]">
              <div className="flex justify-between text-[#4C453E]">
                <dt>Subtotal</dt>
                <dd className="tabular-nums text-[#171614]">{formatPrice(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#574638]">
                  <dt>Studio Privilege ({promoCode})</dt>
                  <dd className="tabular-nums">−{formatPrice(discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-[#4C453E]">
                <dt>Delivery</dt>
                <dd className="tabular-nums text-[#171614]">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#D8CFC2] text-[16px] font-medium text-[#171614]">
                <dt>Total</dt>
                <dd className="tabular-nums text-[22px]">{formatPrice(grandTotal)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#292521] text-[#F7F3ED] text-[13px] font-medium tracking-[0.05em] uppercase rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
            >
              Complete Order — {formatPrice(grandTotal)}
            </button>

            <div className="pt-3 space-y-2 text-[12px] text-[#625B54]">
              <p className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#574638] shrink-0" aria-hidden="true" />
                <span>Scheduled white-glove appointment prior to dispatch</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#574638] shrink-0" aria-hidden="true" />
                <span>30-day home trial &amp; 10-year joinery guarantee</span>
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
