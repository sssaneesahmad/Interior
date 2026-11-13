import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { ArticleModal } from './components/ArticleModal';
import { CartDrawer } from './components/CartDrawer';
import { ConsultationBanner } from './components/ConsultationBanner';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InfoModal } from './components/InfoModal';
import { JournalSection } from './components/JournalSection';
import { NewsletterSection } from './components/NewsletterSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ProductModal } from './components/ProductModal';
import { ProductsSection } from './components/ProductsSection';
import { SearchOverlay } from './components/SearchOverlay';
import { SpacesSection } from './components/SpacesSection';
import { StatsStrip } from './components/StatsStrip';
import { StorySection } from './components/StorySection';
import { Toast } from './components/Toast';
import type {
  CartItem,
  InfoModalTopic,
  JournalArticle,
  Product,
  ProductCategory,
} from './types';

const CART_STORAGE_KEY = 'atelier_sorel_bag_v1';
const WISHLIST_STORAGE_KEY = 'atelier_sorel_wishlist_v1';

export function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [infoTopic, setInfoTopic] = useState<InfoModalTopic>(null);
  const [toast, setToast] = useState<{ message: string; showBagLink: boolean } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 560);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAddToBag = (product: Product, finish?: string) => {
    const chosenFinish = finish || product.finishes[0]?.name || 'Standard Finish';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id && item.finish === chosenFinish,
      );
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, finish: chosenFinish, quantity: 1 }];
    });
    setToast({
      message: `${product.name} added to your bag.`,
      showBagLink: true,
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    finish: string,
    delta: number,
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.finish === finish
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (productId: string, finish: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.finish === finish),
      ),
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      const next = exists
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id];
      setToast({
        message: exists
          ? `${product.name} removed from saved items.`
          : `${product.name} saved to your shortlist.`,
        showBagLink: false,
      });
      return next;
    });
  };

  const scrollToProductsWithCategory = (category: ProductCategory = 'All') => {
    setActiveCategory(category);
    const el = document.querySelector('#featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3ED] text-[#292521]">
      <Header
        cartCount={cartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          onExploreCollections={scrollToProductsWithCategory}
          onOpenPhilosophy={() => setInfoTopic('philosophy')}
        />

        <PhilosophySection onOpenApproach={() => setInfoTopic('philosophy')} />

        <StatsStrip />

        <SpacesSection onSelectSpace={scrollToProductsWithCategory} />

        <StorySection onOpenStory={() => setInfoTopic('story')} />

        <ProductsSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={(product) => handleAddToBag(product)}
        />

        <ConsultationBanner
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <JournalSection onReadArticle={(article) => setSelectedArticle(article)} />

        <NewsletterSection />
      </main>

      <Footer
        onSelectCategory={setActiveCategory}
        onOpenInfo={(topic) => setInfoTopic(topic)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 left-5 z-30 w-11 h-11 rounded-full bg-[#F7F3ED]/95 border border-[#C9B8A5] text-[#292521] shadow-md hover:bg-[#292521] hover:text-[#F7F3ED] transition-colors inline-flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
        </button>
      )}

      {/* Overlays, Drawers & Modals */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectSpace={scrollToProductsWithCategory}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
        onExploreCatalog={() => scrollToProductsWithCategory('All')}
      />

      <ProductModal
        product={selectedProduct}
        isWishlisted={
          selectedProduct ? wishlistIds.includes(selectedProduct.id) : false
        }
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
        onToggleWishlist={handleToggleWishlist}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <InfoModal topic={infoTopic} onClose={() => setInfoTopic(null)} />

      <Toast
        message={toast?.message ?? null}
        onOpenBag={
          toast?.showBagLink
            ? () => {
                setToast(null);
                setIsCartOpen(true);
              }
            : undefined
        }
      />
    </div>
  );
}

export default App;
