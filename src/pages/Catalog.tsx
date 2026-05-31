import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, RotateCcw, ChevronDown, Check, Columns, Grid } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';

interface CatalogProps {
  isDarkMode: boolean;
  activeFilterTab: string; // From Navbar (e.g. 'Men', 'Women', 'Kids', 'Sports', 'New Arrivals', 'Sale')
  setActiveFilterTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (id: string) => void;
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onQuickView: (product: Product, e: React.MouseEvent) => void;
  wishlist: string[];
}

export default function Catalog({
  isDarkMode,
  activeFilterTab,
  setActiveFilterTab,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onWishlistToggle,
  onQuickView,
  wishlist,
}: CatalogProps) {
  // Sidebar State
  const [showFilters, setShowFilters] = useState(true);

  // Filter States
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all'); // 'all' | 'under100' | '100to200' | 'over200'
  const [sortBy, setSortBy] = useState<string>('featured'); // 'featured' | 'priceAsc' | 'priceDesc' | 'rating'

  // Constant Filters Data
  const subcategoriesList = ['Shoes', 'Apparel', 'Accessories'];
  const sizesList = ['6', '7', '8', '9', '10', '11', '12', 'S', 'M', 'L', 'XL', 'One Size'];
  const colorsFilterList = [
    { label: 'Black', hex: '#111827' },
    { label: 'White', hex: '#ffffff' },
    { label: 'Grey', hex: '#6b7280' },
    { label: 'Green', hex: '#84cc16' },
    { label: 'Red', hex: '#dc2626' },
    { label: 'Blue', hex: '#1d4ed8' },
    { label: 'Pink', hex: '#ec4899' },
  ];

  // Helper toggle functions
  const handleSubcategoryToggle = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((item) => item !== sub) : [...prev, sub]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((item) => item !== colorName) : [...prev, colorName]
    );
  };

  const handleClearFilters = () => {
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange('all');
    setSortBy('featured');
    setSearchQuery('');
    setActiveFilterTab('catalog'); // Back to full catalog
  };

  // Perform full reactive filtering list
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Top Navbar Categories ('Men' | 'Women' | 'Kids' | 'Sports' | 'New Arrivals' | 'Sale')
    if (activeFilterTab && activeFilterTab !== 'catalog' && activeFilterTab !== 'home') {
      if (activeFilterTab === 'New Arrivals') {
        result = result.filter((p) => p.isNewArrival);
      } else if (activeFilterTab === 'Sale') {
        result = result.filter((p) => p.isSale);
      } else if (['Men', 'Women', 'Kids', 'Sports'].includes(activeFilterTab)) {
        result = result.filter((p) => p.category === activeFilterTab);
      }
    }

    // 2. Search Text Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.sport && p.sport.toLowerCase().includes(q))
      );
    }

    // 3. Subcategories Filter
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    // 4. Sizing Filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((size) => selectedSizes.includes(size)));
    }

    // 5. Colors Filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((col) =>
          selectedColors.some((sc) => col.name.toLowerCase().includes(sc.toLowerCase()))
        )
      );
    }

    // 6. Pricing Bucket Filter
    if (priceRange !== 'all') {
      if (priceRange === 'under100') {
        result = result.filter((p) => p.price <= 100);
      } else if (priceRange === '100to200') {
        result = result.filter((p) => p.price > 100 && p.price <= 200);
      } else if (priceRange === 'over200') {
        result = result.filter((p) => p.price > 200);
      }
    }

    // 7. Sort Mechanics
    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeFilterTab, searchQuery, selectedSubcategories, selectedSizes, selectedColors, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Header & Active Tags Descriptor */}
      <div className="border-b border-neutral-100 dark:border-neutral-900 pb-6 mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-red-650 uppercase">
              {activeFilterTab === 'catalog' ? 'FULL SPECTRUM CATALOG' : `${activeFilterTab} DEPLOYMENTS`}
            </span>
            <h1 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              LAB {activeFilterTab === 'catalog' ? 'PRODUCTS' : activeFilterTab}
            </h1>
          </div>

          {/* Quick Clear Indicator */}
          <div className="flex items-center space-x-2">
            <button
              id="catalog-clear-btn"
              onClick={handleClearFilters}
              className={`px-3 py-2 text-[10px] sm:text-xs font-mono font-black tracking-[0.2em] uppercase border rounded-none flex items-center space-x-2 transition-all ${
                isDarkMode
                  ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white'
                  : 'border-zinc-200 hover:bg-zinc-50 text-zinc-650 hover:text-black'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>CLEAR FILTERS</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 text-[11px] font-black tracking-widest rounded-none border flex items-center space-x-2 ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{showFilters ? 'HIDE FILTERS' : 'FILTERS'}</span>
            </button>
          </div>
        </div>

        {/* Query indicators info bar */}
        {(searchQuery || selectedSubcategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || priceRange !== 'all') && (
          <div className="flex flex-wrap gap-2 pt-2 items-center text-[11px]">
            <span className="opacity-55 font-mono font-black uppercase tracking-widest">Active Filters:</span>
            {searchQuery && (
              <span className="bg-zinc-900 text-white border border-zinc-800 font-bold px-2.5 py-1 rounded-none uppercase tracking-wide">
                Query: "{searchQuery}"
              </span>
            )}
            {selectedSubcategories.map((sc) => (
              <span key={sc} className="bg-zinc-900 text-white border border-zinc-800 font-bold px-2.5 py-1 rounded-none uppercase tracking-wide">
                {sc}
              </span>
            ))}
            {selectedSizes.map((sz) => (
              <span key={sz} className="bg-zinc-900 text-white border border-zinc-800 font-bold px-2.5 py-1 rounded-none uppercase tracking-wide">
                Size: {sz}
              </span>
            ))}
            {selectedColors.map((cl) => (
              <span key={cl} className="bg-zinc-900 text-white border border-zinc-800 font-bold px-2.5 py-1 rounded-none uppercase tracking-wide">
                Color: {cl}
              </span>
            ))}
            {priceRange !== 'all' && (
              <span className="bg-zinc-900 text-white border border-zinc-800 font-bold px-2.5 py-1 rounded-none uppercase tracking-wide">
                Price: {priceRange}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 2. Main Columns Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters panel */}
        {showFilters && (
          <div className={`w-full lg:w-64 shrink-0 space-y-6 pb-6 lg:border-r border-zinc-100 dark:border-zinc-900 lg:pr-6`}>
            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-black tracking-widest uppercase opacity-75">Sort By</label>
              <div className="relative">
                <select
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full py-2.5 px-3 border rounded-none text-xs font-black tracking-wider uppercase focus:outline-none appearance-none cursor-pointer ${
                    isDarkMode ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-white border-zinc-200 text-zinc-950'
                  }`}
                >
                  <option value="featured">🔥 Popular / Best</option>
                  <option value="priceAsc">💲 Price: Low to High</option>
                  <option value="priceDesc">💸 Price: High to Low</option>
                  <option value="rating">🌟 Customer Rating</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-50">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Subcategories (Shoes, Apparel, etc.) */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-black tracking-widest uppercase opacity-75">Sectors</label>
              <div className="flex flex-col space-y-2">
                {subcategoriesList.map((sub) => {
                  const isChecked = selectedSubcategories.includes(sub);
                  return (
                     <button
                      key={sub}
                      id={`filter-sub-${sub}`}
                      onClick={() => handleSubcategoryToggle(sub)}
                      className="flex items-center text-left py-1.5 text-xs hover:pl-1 transition-all"
                    >
                      <span className={`w-3.5 h-3.5 border rounded-none flex items-center justify-center mr-2.5 transition-all ${
                        isChecked
                          ? 'bg-white border-white text-black'
                          : isDarkMode ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-300'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-black" />}
                      </span>
                      <span className={`font-semibold uppercase tracking-wider text-[11px] ${isChecked ? 'text-white font-extrabold' : ''}`}>{sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Level Buckets */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-black tracking-widest uppercase opacity-75">Pricing</label>
              <div className="flex flex-col space-y-1 text-xs">
                {[
                  { value: 'all', label: 'All price models' },
                  { value: 'under100', label: 'Economy Sub-$100' },
                  { value: '100to200', label: '$100 to $200' },
                  { value: 'over200', label: 'Premium Over $200' },
                ].map((bucket) => (
                  <button
                    key={bucket.value}
                    onClick={() => setPriceRange(bucket.value)}
                    className={`flex items-center px-3 py-2 border rounded-none text-left transition-all text-[11px] font-bold uppercase tracking-wider ${
                      priceRange === bucket.value
                        ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-black shadow-md'
                        : isDarkMode
                          ? 'border-zinc-900 hover:bg-zinc-900 text-zinc-400'
                          : 'border-zinc-250 hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    <span>{bucket.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size checklist Grid */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-black tracking-widest uppercase opacity-75">Sizes</label>
              <div className="grid grid-cols-4 gap-1.5">
                {sizesList.map((size) => {
                  const isChecked = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      id={`filter-size-${size}`}
                      onClick={() => handleSizeToggle(size)}
                      className={`py-1.5 text-[10px] font-bold font-mono border rounded-none text-center transition-all ${
                        isChecked
                          ? 'bg-black text-white dark:bg-white dark:text-black border-white font-black'
                          : isDarkMode
                            ? 'border-zinc-900 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                            : 'border-zinc-200 bg-zinc-50 hover:border-zinc-400 text-zinc-700'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color swatches checklist */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-black tracking-widest uppercase opacity-75">Colors</label>
              <div className="flex flex-wrap gap-2">
                {colorsFilterList.map((color) => {
                  const isChecked = selectedColors.includes(color.label);
                  return (
                    <button
                      key={color.label}
                      id={`filter-color-${color.label}`}
                      onClick={() => handleColorToggle(color.label)}
                      className={`relative w-7 h-7 rounded-none border shadow-sm transition-all flex items-center justify-center ${
                        isChecked ? 'ring-2 ring-zinc-500 scale-105' : 'border-zinc-200 dark:border-zinc-900'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.label}
                    >
                      {isChecked && (
                        <span className={`text-[9px] font-bold ${color.label === 'White' ? 'text-black' : 'text-white'}`}>
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Product Catalog Grid */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex items-center justify-between text-xs font-mono tracking-wider opacity-60">
            <span>SHOWING {filteredProducts.length} DEPLOYED CONFIGURATIONS</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isWishlisted={wishlist.includes(prod.id)}
                  onWishlistToggle={onWishlistToggle}
                  onQuickView={onQuickView}
                  onSelect={onSelectProduct}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 rounded-sm border border-dashed border-neutral-200 dark:border-neutral-800 space-y-4">
              <SlidersHorizontal className="w-12 h-12 mx-auto opacity-30" />
              <h2 className="text-lg font-black uppercase">No configurations matched</h2>
              <p className="text-xs opacity-60 max-w-sm mx-auto">Please expand your size or pricing filters, or try another search phrase to see premium options.</p>
              <button
                onClick={handleClearFilters}
                className="bg-black text-white dark:bg-white dark:text-black py-2.5 px-6 font-mono text-xs font-bold tracking-widest uppercase hover:opacity-80 transition-opacity"
              >
                RESET CATALOG PARAMS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
