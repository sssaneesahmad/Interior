import { useCallback, useEffect, useState } from 'react';
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
import { PRODUCTS } from './data/catalog';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShopPage } from './pages/ShopPage';
import type {
  AppRoute,
  CartItem,
  InfoModalTopic,
  JournalArticle,
  Product,
  ProductCategory,
  SpaceSlug,
} from './types';

const CART_STORAGE_KEY = 'atelier_sorel_bag_v1';
const WISHLIST_STORAGE_KEY = 'atelier_sorel_wishlist_v1';

const VALID_CATEGORIES: ProductCategory[] = [
  'All',
  'Living Room',
  'Dining',
  'Seating',
  'Bedroom',
  'Storage',
  'Lighting',
];

function parseRouteFromLocation(): AppRoute {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(window.location.search);

  if (path === '/') {
    return { page: 'home' };
  }
  if (path === '/shop') {
    const rawCat = params.get('category') as ProductCategory | null;
    const rawSpace = params.get('space') as SpaceSlug | 'all' | null;
    const category =
      rawCat && VALID_CATEGORIES.includes(rawCat) ? rawCat : 'All';
    const space = rawSpace || 'all';
    return { page: 'shop', category, space };
  }
  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '');
    return { page: 'product', slug };
  }
  if (path === '/cart') {
    return { page: 'cart' };
  }
  if (path === '/checkout') {
    return { page: 'checkout' };
  }
  return { page: 'not-found' };
}

export function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseRouteFromLocation());
  const [homeCategory, setHomeCategory] = useState<ProductCategory>('All');

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

  const [promoCode, setPromoCode] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [infoTopic, setInfoTopic] = useState<InfoModalTopic>(null);
  const [toast, setToast] = useState<{ message: string; showBagLink: boolean } | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigate = useCallback((nextPath: string, nextRoute: AppRoute) => {
    if (window.location.pathname + window.location.search !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateHome = useCallback(() => {
    navigate('/', { page: 'home' });
  }, [navigate]);

  const navigateShop = useCallback(
    (category: ProductCategory = 'All', space: SpaceSlug | 'all' = 'all') => {
      const searchParams = new URLSearchParams();
      if (category !== 'All') searchParams.set('category', category);
      if (space !== 'all') searchParams.set('space', space);
      const query = searchParams.toString();
      const url = query ? `/shop?${query}` : '/shop';
      navigate(url, { page: 'shop', category, space });
    },
    [navigate],
  );

  const navigateProduct = useCallback(
    (slug: string) => {
      navigate(`/product/${slug}`, { page: 'product', slug });
    },
    [navigate],
  );

  const navigateCart = useCallback(() => {
    navigate('/cart', { page: 'cart' });
  }, [navigate]);

  const navigateCheckout = useCallback(() => {
    navigate('/checkout', { page: 'checkout' });
  }, [navigate]);

  const navigateSection = useCallback(
    (sectionId: string) => {
      if (route.page !== 'home') {
        window.history.pushState(null, '', '/');
        setRoute({ page: 'home' });
        window.setTimeout(() => {
          document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [route.page],
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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

  const handleAddToBag = (
    product: Product,
    finish?: string,
    quantityToAdd = 1,
  ) => {
    const chosenFinish = finish || product.finishes[0]?.name || 'Standard Finish';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id && item.finish === chosenFinish,
      );
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }
      return [...prev, { product, finish: chosenFinish, quantity: quantityToAdd }];
    });
    setToast({
      message: `${product.name} added to your bag.`,
      showBagLink: true,
    });
  };

  const handleBuyNow = (
    product: Product,
    finish: string,
    quantityToAdd: number,
  ) => {
    handleAddToBag(product, finish, quantityToAdd);
    setToast(null);
    navigateCheckout();
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

  const activeSingleProduct =
    route.page === 'product'
      ? PRODUCTS.find((p) => p.slug === route.slug)
      : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3ED] text-[#292521]">
      <Header
        currentPage={route.page}
        cartCount={cartCount}
        onNavigateHome={navigateHome}
        onNavigateShop={() => navigateShop('All')}
        onNavigateSection={navigateSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <main className="flex-1">
        {route.page === 'home' && (
          <>
            <HeroSection
              onExploreCollections={(cat) => navigateShop(cat || 'All')}
              onOpenPhilosophy={() => setInfoTopic('philosophy')}
            />

            <PhilosophySection onOpenApproach={() => setInfoTopic('philosophy')} />

            <StatsStrip />

            <SpacesSection
              onSelectSpace={(cat) => navigateShop(cat)}
            />

            <StorySection onOpenStory={() => setInfoTopic('story')} />

            <ProductsSection
              activeCategory={homeCategory}
              onSelectCategory={setHomeCategory}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onOpenProduct={(product) => setQuickViewProduct(product)}
              onNavigateProduct={navigateProduct}
              onNavigateShop={(cat) => navigateShop(cat || 'All')}
              onQuickAdd={(product) => handleAddToBag(product)}
            />

            <ConsultationBanner
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />

            <JournalSection
              onReadArticle={(article) => setSelectedArticle(article)}
            />

            <NewsletterSection />
          </>
        )}

        {route.page === 'shop' && (
          <ShopPage
            key={`${route.category}-${route.space}`}
            initialCategory={route.category || 'All'}
            initialSpace={route.space || 'all'}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickAdd={(product) => handleAddToBag(product)}
            onNavigateHome={navigateHome}
            onNavigateProduct={navigateProduct}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        )}

        {route.page === 'product' &&
          (activeSingleProduct ? (
            <ProductDetailPage
              product={activeSingleProduct}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToBag={handleAddToBag}
              onBuyNow={handleBuyNow}
              onNavigateHome={navigateHome}
              onNavigateShop={(cat) => navigateShop(cat || 'All')}
              onNavigateProduct={navigateProduct}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
          ) : (
            <NotFoundPage
              onNavigateHome={navigateHome}
              onNavigateShop={() => navigateShop('All')}
            />
          ))}

        {route.page === 'cart' && (
          <CartPage
            items={cart}
            promoCode={promoCode}
            orderNote={orderNote}
            onApplyPromoCode={setPromoCode}
            onUpdateOrderNote={setOrderNote}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateHome={navigateHome}
            onNavigateShop={() => navigateShop('All')}
            onNavigateProduct={navigateProduct}
            onNavigateCheckout={navigateCheckout}
          />
        )}

        {route.page === 'checkout' && (
          <CheckoutPage
            items={cart}
            promoCode={promoCode}
            orderNote={orderNote}
            onClearCart={() => {
              setCart([]);
              setPromoCode('');
            }}
            onNavigateHome={navigateHome}
            onNavigateShop={() => navigateShop('All')}
            onNavigateCart={navigateCart}
          />
        )}

        {route.page === 'not-found' && (
          <NotFoundPage
            onNavigateHome={navigateHome}
            onNavigateShop={() => navigateShop('All')}
          />
        )}
      </main>

      <Footer
        onNavigateHome={navigateHome}
        onNavigateShop={(cat) => navigateShop(cat)}
        onNavigateJournal={() => navigateSection('#journal')}
        onOpenInfo={(topic) => setInfoTopic(topic)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-20 md:bottom-5 left-5 z-30 w-11 h-11 rounded-full bg-[#F7F3ED]/95 border border-[#C9B8A5] text-[#292521] shadow-md hover:bg-[#292521] hover:text-[#F7F3ED] transition-colors inline-flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
        </button>
      )}

      {/* Overlays, Drawers & Modals */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={navigateProduct}
        onSelectSpace={(cat) => navigateShop(cat)}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onViewAllShop={() => navigateShop('All')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onExploreCatalog={() => navigateShop('All')}
        onNavigateCart={navigateCart}
        onNavigateCheckout={navigateCheckout}
        onNavigateProduct={navigateProduct}
      />

      <ProductModal
        product={quickViewProduct}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onClose={() => setQuickViewProduct(null)}
        onAddToBag={(product, finish) => handleAddToBag(product, finish)}
        onToggleWishlist={handleToggleWishlist}
        onNavigateProduct={navigateProduct}
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
