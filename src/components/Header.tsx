import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import type { AppRoute } from '../types';

interface HeaderProps {
  currentPage: AppRoute['page'];
  cartCount: number;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
}

const NAV_ITEMS = [
  { label: 'Collections', type: 'shop' as const },
  { label: 'Spaces', type: 'section' as const, target: '#spaces' },
  { label: 'Furniture', type: 'shop' as const },
  { label: 'Our Story', type: 'section' as const, target: '#our-story' },
  { label: 'Journal', type: 'section' as const, target: '#journal' },
  { label: 'Contact', type: 'section' as const, target: '#footer' },
] as const;

export function Header({
  currentPage,
  cartCount,
  onNavigateHome,
  onNavigateShop,
  onNavigateSection,
  onOpenSearch,
  onOpenCart,
  onOpenConsultation,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (item: (typeof NAV_ITEMS)[number]) => {
    setMobileOpen(false);
    if (item.type === 'shop') {
      onNavigateShop();
    } else {
      onNavigateSection(item.target);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-[76px] bg-[#F7F3ED]/95 backdrop-blur-md border-b border-[#E6DDD1]">
        <div className="max-w-[1380px] mx-auto h-full px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          {/* Brand Zone */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="font-editorial text-[25px] sm:text-[27px] font-medium tracking-[0.02em] text-[#171614] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Atelier Sorel
          </a>

          {/* Primary Navigation */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7 xl:gap-8 text-[12.5px] font-medium tracking-[0.06em] uppercase text-[#292521]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.label === 'Collections' &&
                (currentPage === 'shop' || currentPage === 'product');
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`nav-underline py-1 whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#574638] border-b border-[#574638]'
                      : 'text-[#292521] hover:text-[#574638]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search collections and pieces"
              className="w-10 h-10 sm:w-11 sm:h-11 inline-flex items-center justify-center text-[#292521] hover:text-[#574638] transition-colors duration-150 cursor-pointer"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.6} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative w-10 h-10 sm:w-11 sm:h-11 inline-flex items-center justify-center text-[#292521] hover:text-[#574638] transition-colors duration-150 cursor-pointer"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.6} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#292521] text-[#F7F3ED] text-[10px] font-medium tabular-nums flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#292521] text-[#F7F3ED] text-[12px] font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Consultation
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden w-11 h-11 inline-flex items-center justify-center text-[#292521] hover:text-[#574638] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 bg-[#171614]/45 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm h-full bg-[#F7F3ED] text-[#292521] flex flex-col justify-between p-6 sm:p-8 shadow-2xl border-l border-[#E6DDD1]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E6DDD1]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onNavigateHome();
                  }}
                  className="font-editorial text-2xl font-medium text-[#171614] cursor-pointer"
                >
                  Atelier Sorel
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-11 h-11 inline-flex items-center justify-center text-[#292521] hover:text-[#171614] cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-5" aria-label="Mobile links">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="text-left font-editorial text-[28px] leading-tight text-[#292521] hover:text-[#574638] transition-colors py-1 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E6DDD1] space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 px-6 bg-[#292521] text-[#F7F3ED] text-sm font-medium tracking-[0.04em] rounded-[3px] hover:bg-[#171614] transition-colors cursor-pointer"
              >
                Book a Consultation
              </button>
              <p className="text-xs text-[#625B54] text-center">
                Zurich · Copenhagen · Milan
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
