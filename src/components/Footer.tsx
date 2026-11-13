import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Facebook, Instagram, Youtube } from 'lucide-react';
import { BRAND } from '../data/catalog';
import type { InfoModalTopic, ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenInfo: (topic: InfoModalTopic) => void;
  onOpenConsultation: () => void;
}

export function Footer({
  onSelectCategory,
  onOpenInfo,
  onOpenConsultation,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerMsg, setFooterMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleFooterNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = footerEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setFooterMsg({ type: 'error', text: 'Enter a valid email.' });
      return;
    }
    setFooterEmail('');
    setFooterMsg({ type: 'success', text: 'Subscribed locally.' });
  };

  const handleExploreClick = (category: ProductCategory) => {
    onSelectCategory(category);
    const el = document.querySelector('#featured-products');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#171614] text-[#F7F3ED] pt-16 sm:pt-20 pb-10">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#F7F3ED]/15">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <a
              href="#top"
              className="font-editorial text-[28px] tracking-[0.02em] text-[#F7F3ED] inline-block mb-4"
            >
              {BRAND.name}
            </a>
            <p className="text-[14px] leading-[1.7] text-[#C9B8A5] max-w-[34ch] mb-6">
              Thoughtfully designed furniture and considered interiors for a more
              meaningful way of living.
            </p>
            <p className="text-[12.5px] text-[#A39483] mb-6">
              {BRAND.showrooms} · {BRAND.email}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenInfo('story');
                }}
                aria-label="Atelier Sorel on Instagram"
                className="w-10 h-10 rounded-full border border-[#F7F3ED]/20 inline-flex items-center justify-center text-[#E6DDD1] hover:bg-[#F7F3ED] hover:text-[#171614] transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
              </a>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenInfo('philosophy');
                }}
                aria-label="Atelier Sorel on Pinterest"
                className="w-10 h-10 rounded-full border border-[#F7F3ED]/20 inline-flex items-center justify-center text-[#E6DDD1] hover:bg-[#F7F3ED] hover:text-[#171614] transition-colors"
              >
                {/* Clean geometric P emblem for Pinterest */}
                <span className="font-editorial text-[15px] italic font-semibold" aria-hidden="true">
                  P
                </span>
              </a>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenInfo('craftsmanship');
                }}
                aria-label="Atelier Sorel on Facebook"
                className="w-10 h-10 rounded-full border border-[#F7F3ED]/20 inline-flex items-center justify-center text-[#E6DDD1] hover:bg-[#F7F3ED] hover:text-[#171614] transition-colors"
              >
                <Facebook className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
              </a>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenInfo('sustainability');
                }}
                aria-label="Atelier Sorel on YouTube"
                className="w-10 h-10 rounded-full border border-[#F7F3ED]/20 inline-flex items-center justify-center text-[#E6DDD1] hover:bg-[#F7F3ED] hover:text-[#171614] transition-colors"
              >
                <Youtube className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C9B8A5] mb-5">
              Explore
            </h3>
            <ul className="space-y-3 text-[13.5px] text-[#E6DDD1]">
              <li>
                <button
                  type="button"
                  onClick={() => handleExploreClick('Living Room')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Living Room
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleExploreClick('Dining')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Dining Room
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleExploreClick('Bedroom')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Bedroom
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleExploreClick('Storage')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Home Office
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleExploreClick('All')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 — About */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C9B8A5] mb-5">
              About
            </h3>
            <ul className="space-y-3 text-[13.5px] text-[#E6DDD1]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('story')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('philosophy')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('craftsmanship')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Craftsmanship
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('sustainability')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#FFFFFF] transition-colors">
                  Journal
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfo('careers')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 — Support & Compact Newsletter */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C9B8A5] mb-5">
                Support
              </h3>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-[13.5px] text-[#E6DDD1]">
                <li>
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenInfo('shipping')}
                    className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                  >
                    Shipping & Delivery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenInfo('returns')}
                    className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                  >
                    Returns
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenInfo('faqs')}
                    className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenInfo('privacy')}
                    className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenInfo('terms')}
                    className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C9B8A5] mb-3">
                Atelier Notes
              </p>
              <form onSubmit={handleFooterNewsletter} noValidate className="flex gap-2">
                <label htmlFor="footer-newsletter" className="sr-only">
                  Footer newsletter email
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  value={footerEmail}
                  onChange={(e) => {
                    setFooterEmail(e.target.value);
                    if (footerMsg) setFooterMsg(null);
                  }}
                  placeholder="Email address"
                  className="flex-1 min-w-0 px-3.5 py-2.5 bg-[#292521] border border-[#F7F3ED]/15 rounded-[3px] text-[13px] text-[#F7F3ED] placeholder:text-[#A39483] focus:border-[#C9B8A5] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Atelier Notes"
                  className="px-4 py-2.5 bg-[#F7F3ED] text-[#171614] rounded-[3px] hover:bg-[#E6DDD1] transition-colors inline-flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
                </button>
              </form>
              {footerMsg && (
                <p
                  role={footerMsg.type === 'error' ? 'alert' : 'status'}
                  className={`mt-2 text-[12px] flex items-center gap-1.5 ${
                    footerMsg.type === 'error' ? 'text-[#E59B8C]' : 'text-[#C9B8A5]'
                  }`}
                >
                  {footerMsg.type === 'success' && (
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  <span>{footerMsg.text}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-[#A39483]">
          <p>&copy; {currentYear} {BRAND.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenInfo('privacy')}
              className="hover:text-[#F7F3ED] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenInfo('terms')}
              className="hover:text-[#F7F3ED] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => onOpenInfo('cookies')}
              className="hover:text-[#F7F3ED] transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
