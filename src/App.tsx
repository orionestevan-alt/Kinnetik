/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import UserProfilePage from './pages/UserProfilePage';
import OrderTracking from './pages/OrderTracking';
import StaticPages from './pages/StaticPages';
import { CartItem, Product, Order } from './types';
import { PRODUCTS, SAMPLE_ORDERS } from './data';
import { Heart, Search, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home'); // 'home' | 'catalog' | 'Men' | 'Women' | 'Kids' | 'Sports' | 'New Arrivals' | 'Sale' | 'cart' | 'checkout' | 'login' | 'profile' | 'tracking' | 'about' | 'contact' | 'wishlist'
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  // Search query sync state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Dark Mode Style State (Defaulting to True for Ultra-luxurious Black Canvas)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'Alex Mercer',
    email: 'alex.mercer@kinetic.com',
  });

  // Orders log (persisted through action triggers)
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);

  // Checkout promotion discount codes
  const [checkoutDiscountCode, setCheckoutDiscountCode] = useState<string>('');

  // Order tracking active lookups
  const [trackingTargetId, setTrackingTargetId] = useState<string>('KNT-84291');

  // Quick View Overlay States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);

  // Global Toast Info Bar State
  const [toastMessage, setToastMessage] = useState<string>('');

  // Sync Dark Mode state to root HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#0a0a0a'; // Core Black Base
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#ffffff'; // Pristine White Base
    }
  }, [isDarkMode]);

  // Cart Handlers
  const handleAddToCart = (product: Product, color: { name: string; hex: string }, size: string, quantity: number) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += quantity;
        showToast(`INCREMENTED: ${product.name} quantity speed-adjusted inside the wagon.`);
        return nextCart;
      } else {
        showToast(`ACQUIRED: Added ${product.name} to checkout wagon.`);
        return [...prevCart, { product, selectedColor: color, selectedSize: size, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      if (nextCart[index]) {
        nextCart[index].quantity = newQty;
      }
      return nextCart;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => {
      const removedText = prevCart[index]?.product.name || 'item';
      showToast(`REMOVED: Dismissed ${removedText} from wagon.`);
      return prevCart.filter((_, idx) => idx !== index);
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleWishlistToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('WISHLIST: Removed item from track registry.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('WISHLIST: Registered item for track monitors.');
        return [...prev, id];
      }
    });
  };

  // Quick View Handlers
  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Selection trigger to open details page
  const handleSelectProduct = (id: string) => {
    setActiveProductId(id);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Concluding orders trigger
  const handlePlaceOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setTrackingTargetId(order.id);
  };

  // Checkout redirection flow
  const handleCheckoutRedirection = (discountCode: string) => {
    setCheckoutDiscountCode(discountCode);
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Session Handlers
  const handleLoginSuccess = (user: { name: string; email: string }) => {
    setCurrentUser(user);
    showToast(`WELCOME: Session verified for athlete ${user.name}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('DISCONNECTED: Secure session closed.');
    setActiveTab('home');
  };

  // Global toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  // Quick helper to translate categories tabs
  const catalogTabs = ['catalog', 'Men', 'Women', 'Kids', 'Sports', 'New Arrivals', 'Sale'];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-950'}`}>
      
      {/* Dynamic Floating Toast Alert Overlay */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold tracking-widest px-5 py-4 border border-neutral-850 dark:border-neutral-200 shadow-2xl rounded-sm flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-red-600 animate-spin" />
          <span>{toastMessage.toUpperCase()}</span>
        </div>
      )}

      {/* Global Embedded Sticky Navigation Desk */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveProductId(null);
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q.trim() && !catalogTabs.includes(activeTab)) {
            setActiveTab('catalog');
          }
        }}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Sandbox Workspace Canvas */}
      <main className="flex-1">
        {/* Render pages depending on current tab triggers */}
        {activeTab === 'home' && (
          <Home
            isDarkMode={isDarkMode}
            setActiveTab={setActiveTab}
            onSelectProduct={handleSelectProduct}
            onWishlistToggle={handleWishlistToggle}
            onQuickView={handleQuickView}
            wishlist={wishlist}
          />
        )}

        {catalogTabs.includes(activeTab) && (
          <Catalog
            isDarkMode={isDarkMode}
            activeFilterTab={activeTab}
            setActiveFilterTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={handleSelectProduct}
            onWishlistToggle={handleWishlistToggle}
            onQuickView={handleQuickView}
            wishlist={wishlist}
          />
        )}

        {activeTab === 'product-detail' && (
          <ProductDetail
            productId={activeProductId}
            onBackToCatalog={() => setActiveTab('catalog')}
            isDarkMode={isDarkMode}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onWishlistToggle={handleWishlistToggle}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onCheckout={handleCheckoutRedirection}
            isDarkMode={isDarkMode}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'checkout' && (
          <Checkout
            cart={cart}
            discountCode={checkoutDiscountCode}
            isDarkMode={isDarkMode}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Wishlist page view */}
        {activeTab === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase opacity-55">TRACKED INVENTORY</span>
              <h1 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
                MONITORED WISHLIST ({wishlist.length})
              </h1>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-24 border border-dashed rounded-sm border-neutral-200 dark:border-neutral-800 space-y-5">
                <Heart className="w-12 h-12 mx-auto opacity-30" />
                <h2 className="text-lg font-black uppercase">Your active monitors are empty</h2>
                <p className="text-xs opacity-60 max-w-xs mx-auto">Click the heart button on high-contrast sneaker cards to track inventory speeds and sizing releases.</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="bg-black text-white dark:bg-white dark:text-black py-2.5 px-6 font-mono text-xs font-bold tracking-widest uppercase hover:opacity-80 transition-opacity"
                >
                  DISCOVER THE PORT
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.filter((p) => wishlist.includes(p.id)).map((product) => {
                  const isItemInCart = cart.some((item) => item.product.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className={`border rounded-sm p-4 relative flex flex-col justify-between transition-all hover:shadow-lg ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-850' : 'bg-white border-neutral-150'
                      }`}
                    >
                      {/* Close Wishlist Trigger */}
                      <button
                        onClick={(e) => handleWishlistToggle(product.id, e)}
                        className="absolute top-3 right-3 z-10 p-1.5 opacity-60 hover:opacity-100 hover:text-red-500"
                        title="Remove custom tracker"
                      >
                        ✕
                      </button>

                      <div className="cursor-pointer" onClick={() => handleSelectProduct(product.id)}>
                        <div className="aspect-square bg-neutral-100 dark:bg-neutral-950/20 flex items-center justify-center p-4 rounded-sm overflow-hidden mb-3">
                          <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-103 transform duration-300" />
                        </div>
                        <p className="text-[9px] font-mono tracking-widest uppercase opacity-55 mb-1">{product.subcategory}</p>
                        <h4 className="font-extrabold text-xs uppercase truncate leading-snug mb-1">{product.name}</h4>
                        <p className="text-xs font-bold font-mono tracking-tight">${product.price}</p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-neutral-100 dark:border-neutral-850 flex flex-col gap-2">
                        <button
                          onClick={() => handleSelectProduct(product.id)}
                          className={`w-full py-2.5 text-center text-[10px] font-mono tracking-wider font-extrabold rounded-sm border ${
                            isDarkMode ? 'border-neutral-800 bg-neutral-950 text-white hover:bg-neutral-805 hover:bg-neutral-900' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-950'
                          }`}
                        >
                          SELECT SPECIFICATIONS
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Authentication portal route */}
        {activeTab === 'login' && (
          <Auth
            isDarkMode={isDarkMode}
            onLoginSuccess={handleLoginSuccess}
            setActiveTab={setActiveTab}
          />
        )}

        {/* User profile tab */}
        {activeTab === 'profile' && (
          currentUser ? (
            <UserProfilePage
              isDarkMode={isDarkMode}
              orders={orders}
              onLogout={handleLogout}
              setActiveTab={setActiveTab}
              setTrackingTargetId={setTrackingTargetId}
            />
          ) : (
            <Auth
              isDarkMode={isDarkMode}
              onLoginSuccess={handleLoginSuccess}
              setActiveTab={setActiveTab}
            />
          )
        )}

        {/* Order shipment tracks */}
        {activeTab === 'tracking' && (
          <OrderTracking
            isDarkMode={isDarkMode}
            trackingTargetId={trackingTargetId}
            setTrackingTargetId={setTrackingTargetId}
            orders={orders}
          />
        )}

        {/* About Us and Contact columns */}
        {['about', 'contact'].includes(activeTab) && (
          <StaticPages
            viewType={activeTab as 'about' | 'contact'}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Embedded Global Modern Footer details */}
      <Footer
        isDarkMode={isDarkMode}
        setActiveTab={setActiveTab}
        onSubscribe={(email) => showToast(`NEWSLETTER: Verified ${email} subscription inside the registry.`)}
      />

      {/* Modal Quick checkout trigger overlay */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setQuickViewProduct(null);
        }}
        isDarkMode={isDarkMode}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onWishlistToggle={handleWishlistToggle}
        onGoToDetail={handleSelectProduct}
      />
    </div>
  );
}

