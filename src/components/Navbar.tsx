import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, User, Moon, Sun, Truck, ShieldAlert } from 'lucide-react';
import { PRODUCTS } from '../data';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (id: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter recommendations based on search
  const filteredSuggestions = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.sport && p.sport.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const mainNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'Men', label: 'Men' },
    { id: 'Women', label: 'Women' },
    { id: 'Kids', label: 'Kids' },
    { id: 'Sports', label: 'Sports' },
    { id: 'New Arrivals', label: 'New Arrivals' },
    { id: 'Sale', label: 'Sale' },
  ];

  const handleNavItemClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setSearchFocused(false);
  };

  return (
    <>
      {/* Top Banner Accent */}
      <div className="w-full bg-black text-zinc-350 text-center py-2 text-[10px] font-mono tracking-[0.25em] uppercase border-b border-zinc-900 z-50 font-bold">
        COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $150 • SECURE CHECKOUT protocol
      </div>

      <nav
        className={`sticky top-0 z-40 w-full transition-colors duration-300 backdrop-blur-md ${
          isDarkMode
            ? 'bg-black/95 border-b border-zinc-900 text-white'
            : 'bg-white/95 border-b border-zinc-200 text-zinc-950'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              onClick={() => handleNavItemClick('home')}
              className="flex items-center gap-4 cursor-pointer select-none"
            >
              {/* Designer Horizontal Brand Dash Motif from Reference */}
              <div className="flex flex-col gap-1 shrink-0">
                <div className={`h-[2px] transition-colors duration-200 ${isDarkMode ? 'bg-white' : 'bg-black'} w-7`}></div>
                <div className={`h-[2px] transition-colors duration-200 ${isDarkMode ? 'bg-white' : 'bg-black'} w-5`}></div>
                <div className={`h-[2px] transition-colors duration-200 ${isDarkMode ? 'bg-white' : 'bg-black'} w-8`}></div>
              </div>
              <div className="font-sans font-black italic tracking-[0.15em] text-xl uppercase mt-0.5">
                KINETIC
              </div>
            </div>

            {/* Desktop Navigation Link Tabs */}
            <div className="hidden lg:flex space-x-1 xl:space-x-3">
              {mainNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavItemClick(item.id)}
                    className={`relative px-3.5 py-2 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-200 hover:opacity-100 ${
                      isActive
                        ? item.id === 'Sale'
                          ? 'text-red-500 opacity-100 font-black'
                          : 'opacity-100 font-black after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-white dark:after:bg-white light:after:bg-black'
                        : item.id === 'Sale'
                          ? 'text-red-500 opacity-70 hover:opacity-100'
                          : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Actions: Search, Wishlist, Cart, Profile, Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4 xl:space-x-5">
              {/* Search bar inside navbar */}
              <div className="relative">
                <div
                  className={`flex items-center px-4 py-2 transition-all duration-300 w-48 lg:w-56 rounded-none ${
                    isDarkMode
                      ? 'bg-zinc-900 text-white border-none'
                      : 'bg-zinc-100 text-zinc-950 border-none'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 opacity-50 mr-2 shrink-0" />
                  <input
                    type="text"
                    id="nav-search-input"
                    placeholder="SEARCH PROTOCOL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="w-full text-[10px] font-bold tracking-widest focus:outline-none bg-transparent placeholder-zinc-500 uppercase outline-none border-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="opacity-50 hover:opacity-100 p-0.5 shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Instant Search Dropdown Suggestion Overlay */}
                {searchFocused && (
                  <div
                    className={`absolute right-0 mt-2 w-72 shadow-2xl p-4 border text-[11px] z-50 rounded-none ${
                      isDarkMode
                        ? 'bg-zinc-950 border-zinc-800 text-white'
                        : 'bg-white border-zinc-200 text-zinc-950'
                    }`}
                    onMouseLeave={() => setSearchFocused(false)}
                  >
                    <div className="font-mono text-[9px] tracking-widest uppercase opacity-40 mb-3 border-b border-dashed border-zinc-800 pb-1">
                      {searchQuery.trim() ? 'Search Registry Matches' : 'Trending Collections'}
                    </div>

                    {searchQuery.trim() === '' ? (
                      <div className="flex flex-col space-y-2">
                        {['Running', 'Basketball', 'Shoes', 'Apparel', 'Sale'].map((kw) => (
                          <button
                            key={kw}
                            onClick={() => {
                              setSearchQuery(kw);
                              setActiveTab(kw === 'Sale' ? 'Sale' : 'catalog');
                              setSearchFocused(false);
                            }}
                            className="text-left py-1 hover:pl-2 transition-all hover:text-red-500 font-black uppercase tracking-wider text-[10px]"
                          >
                            # {kw}
                          </button>
                        ))}
                      </div>
                    ) : filteredSuggestions.length > 0 ? (
                      <div className="flex flex-col space-y-2.5">
                        {filteredSuggestions.map((product) => (
                          <div
                            key={product.id}
                            id={`search-suggestion-${product.id}`}
                            onClick={() => {
                              onSelectProduct(product.id);
                              setSearchFocused(false);
                              setSearchQuery('');
                            }}
                            className={`flex items-center space-x-2.5 p-1.5 transition-all duration-200 ${
                              isDarkMode ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'
                            }`}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-contain rounded-none border border-zinc-800 bg-black/20"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-black truncate uppercase text-[10px] tracking-wide">{product.name}</p>
                              <p className="opacity-60 text-[9px] font-mono">
                                {product.subcategory} • ${product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            setActiveTab('catalog');
                            setSearchFocused(false);
                          }}
                          className="text-center font-bold text-white bg-red-650 hover:bg-neutral-800 text-[9px] uppercase tracking-widest py-2"
                        >
                          View All Catalog Matches
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-4 opacity-50 font-mono">No matches found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Order Tracking */}
              <button
                id="nav-btn-tracking"
                onClick={() => handleNavItemClick('tracking')}
                className="opacity-70 hover:opacity-100 transition-opacity p-2 relative text-zinc-400 hover:text-white"
                title="Order Tracking"
              >
                <Truck className="w-4 h-4" />
              </button>

              {/* Wishlist */}
              <button
                id="nav-btn-wishlist"
                onClick={() => {
                  setSearchQuery('');
                  handleNavItemClick('wishlist');
                }}
                className="opacity-70 hover:opacity-100 transition-opacity p-2 relative text-zinc-400 hover:text-white"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white text-black font-mono text-[8px] rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                id="nav-btn-cart"
                onClick={() => handleNavItemClick('cart')}
                className="opacity-70 hover:opacity-100 transition-opacity p-2 relative text-zinc-400 hover:text-white"
                title="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white text-black font-mono text-[8px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <button
                id="nav-btn-profile"
                onClick={() => handleNavItemClick('profile')}
                className={`opacity-70 hover:opacity-100 transition-opacity p-2 rounded-none ${
                  activeTab === 'profile' ? 'bg-white text-black opacity-100' : ''
                }`}
                title="User Profile / Elite Club"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Dark Mode Theme toggle */}
              <button
                id="nav-btn-theme"
                onClick={toggleDarkMode}
                className="p-2 opacity-75 hover:opacity-100 transition-opacity text-zinc-400 hover:text-white"
                title={isDarkMode ? 'Light Mode' : 'Luxury Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-800" />}
              </button>
            </div>

            {/* Mobile Actions Overlay on the Right */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-1.5 opacity-80"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
              </button>
              <button
                onClick={() => handleNavItemClick('cart')}
                className="p-1.5 relative opacity-85"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 text-white font-mono text-[80%] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 opacity-90"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Screen Overlay */}
        {mobileMenuOpen && (
          <div
            className={`fixed inset-x-0 top-[88px] h-screen bg-opacity-95 ${
              isDarkMode ? 'bg-neutral-950/98 text-white' : 'bg-white/98 text-neutral-950'
            } border-t lg:hidden z-50 p-6 flex flex-col space-y-4`}
          >
            {/* Mobile Search */}
            <div className="relative mb-2">
              <div
                className={`flex items-center rounded-md px-3 py-2 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                } border`}
              >
                <Search className="w-4 h-4 mr-2 opacity-50" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-[13px] bg-transparent focus:outline-none"
                />
              </div>

              {searchQuery.trim() && (
                <div
                  className={`mt-1 overflow-y-auto max-h-48 border rounded-sm p-2 ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'
                  }`}
                >
                  {filteredSuggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product.id);
                        setMobileMenuOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center space-x-3 py-2 border-b last:border-0 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs truncate">{product.name}</p>
                        <p className="opacity-60 text-[10px]">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Nav links */}
            <div className="flex flex-col space-y-3 font-bold tracking-widest text-sm uppercase">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`text-left py-2 border-b ${
                    isDarkMode ? 'border-neutral-900' : 'border-neutral-100'
                  } ${activeTab === item.id ? 'text-red-600 pl-2 font-black border-red-600' : 'opacity-70'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Utility Quick Navs for Mobile */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800 text-xs tracking-wider uppercase font-medium">
              <button
                onClick={() => handleNavItemClick('tracking')}
                className="flex items-center space-x-2 py-2 opacity-75"
              >
                <Truck className="w-4 h-4" />
                <span>Track Order</span>
              </button>
              <button
                onClick={() => handleNavItemClick('wishlist')}
                className="flex items-center space-x-2 py-2 opacity-75"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
              <button
                onClick={() => handleNavItemClick('profile')}
                className="flex items-center space-x-2 py-2 opacity-75"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => handleNavItemClick('contact')}
                className="flex items-center space-x-2 py-2 opacity-75"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Help / FAQ</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
