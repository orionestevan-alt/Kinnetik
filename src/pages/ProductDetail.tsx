import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, ShoppingBag, Heart, Shield, RefreshCw, Truck, ArrowRight, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductDetailProps {
  productId: string | null;
  onBackToCatalog: () => void;
  isDarkMode: boolean;
  onAddToCart: (product: Product, color: { name: string; hex: string }, size: string, quantity: number) => void;
  wishlist: string[];
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onSelectProduct: (id: string) => void;
}

export default function ProductDetail({
  productId,
  onBackToCatalog,
  isDarkMode,
  onAddToCart,
  wishlist,
  onWishlistToggle,
  onSelectProduct,
}: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeInfoTab, setActiveInfoTab] = useState<'overview' | 'tech' | 'care'>('overview');
  const [successMsg, setSuccessMsg] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (productId) {
      const matched = PRODUCTS.find((p) => p.id === productId);
      if (matched) {
        setProduct(matched);
        setSelectedColor(matched.colors[0]);
        setSelectedSize(matched.sizes[0] || '');
        setSelectedImage(matched.image);
        setQuantity(1);
        setSuccessMsg('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold">Configuration blueprint loaded is empty.</h2>
        <button onClick={onBackToCatalog} className="bg-black text-white px-6 py-3 font-mono text-xs font-bold">
          RETURN TO CATALOG
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;

    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedColor, selectedSize, quantity);
      setIsAdding(false);
      setSuccessMsg(`COMPLETED: Added ${quantity}x ${product.name} to checkout wagon.`);
      setTimeout(() => setSuccessMsg(''), 5000);
    }, 600);
  };

  const isWishlisted = wishlist.includes(product.id);

  // Recommendations: products from same general category
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb navigation */}
      <button
        id="detail-back-button"
        onClick={onBackToCatalog}
        className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase mb-8 hover:text-red-650 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>BACK TO PORT CATALOG</span>
      </button>

      {/* 2. Grid Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Gallery (7 Grid Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`p-8 rounded-none aspect-square border flex items-center justify-center ${
            isDarkMode ? 'bg-zinc-950/20 border-zinc-900' : 'bg-neutral-50/50 border-neutral-100'
          }`}>
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[460px] object-contain mix-blend-multiply dark:mix-blend-normal transition-all"
            />
          </div>

          {/* Thumbnail slides preview */}
          {product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1.5">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-none border p-2 shrink-0 flex items-center justify-center transition-all ${
                    selectedImage === img
                      ? 'border-white ring-1 ring-white'
                      : isDarkMode
                        ? 'border-zinc-800 bg-zinc-950 hover:border-zinc-650'
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Details panel (5 Grid Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase text-white dark:text-white">
                {product.subcategory} {product.sport ? `• ${product.sport}` : ''}
              </span>
              <span className="bg-black text-white dark:bg-white dark:text-black font-black font-mono text-[9px] px-3 py-1.5 uppercase tracking-[0.25em] border border-zinc-900">
                PRO PERFORMANCE UNIT
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              {product.name}
            </h1>

            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1 font-mono font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="opacity-30">|</span>
              <span className="opacity-70 font-semibold">{product.reviewsCount} verified track test reports</span>
            </div>
          </div>

          <div className="border-y border-neutral-150 dark:border-neutral-900 py-4 flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
                ${product.price}
              </span>
              {product.isSale && product.originalPrice && (
                <span className="text-xs font-mono font-semibold tracking-wide opacity-50 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.isSale && (
              <span className="bg-zinc-900 text-white text-[9px] font-mono font-black px-3 py-1.5 uppercase rounded-none border border-zinc-850">
                PROMO REDUCTION ACTIVE
              </span>
            )}
          </div>          {/* Color Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-mono font-black uppercase tracking-widest">Colorway config</span>
              <span className="opacity-60 font-semibold text-xs">{selectedColor?.name}</span>
            </div>
            <div className="flex gap-2">
              {product.colors.map((col, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(col)}
                  className={`w-9 h-9 rounded-none border transition-transform ${
                    selectedColor?.name === col.name ? 'ring-1 ring-zinc-400 scale-105 outline-none' : 'border-zinc-300 dark:border-zinc-950'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Size picker */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-mono font-black uppercase tracking-widest">Size scale</span>
              <span className="opacity-60 font-medium">Sizing maps: Men / Unisex Standard</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-mono font-black border transition-all rounded-none ${
                    selectedSize === size
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                      : isDarkMode
                        ? 'border-zinc-900 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                        : 'border-zinc-200 bg-zinc-50 hover:border-zinc-450 text-zinc-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Controls */}
          <div className="flex items-center space-x-4 pt-2">
            <span className="text-xs font-mono font-black uppercase tracking-widest">Quantity</span>
            <div className={`flex items-center border rounded-none ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-neutral-200 bg-neutral-50'}`}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 font-bold hover:opacity-60"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 font-mono font-bold select-none text-xs">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="px-3.5 py-1.5 font-bold hover:opacity-60"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          {/* CTA checkout boxes */}
          <div className="space-y-3 pt-6 border-t border-zinc-900/40 dark:border-zinc-900">
            {successMsg && (
              <p className="text-xs text-emerald-500 font-bold font-mono py-1 rounded-none flex items-center space-x-1.5 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{successMsg}</span>
              </p>
            )}

            <div className="flex gap-4">
              <button
                id="detail-add-cart-btn"
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 py-4.5 text-xs font-mono font-black tracking-[0.22em] uppercase rounded-none flex items-center justify-center space-x-2.5 transition-all shadow-xl ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-black text-white hover:bg-zinc-850'
                }`}
              >
                <ShoppingBag className="w-4 h-4 font-bold" />
                <span>{isAdding ? 'SPLICING...' : 'ADD TO SPECTRUM BAG'}</span>
              </button>

              <button
                id="detail-wishlist-toggle"
                onClick={(e) => onWishlistToggle(product.id, e)}
                className={`p-4 border rounded-none transition-all focus:outline-none ${
                  isWishlisted
                    ? 'border-white bg-zinc-950 text-white'
                    : isDarkMode
                      ? 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-white'
                      : 'border-zinc-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-950'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tabbed Tech specs details boxes */}
          <div className="space-y-4 pt-6 border-t border-neutral-100 dark:border-neutral-900">
            <div className="flex border-b border-neutral-150 dark:border-neutral-850 text-xs font-mono tracking-widest uppercase">
              {(['overview', 'tech', 'care'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveInfoTab(tab)}
                  className={`pb-2.5 pr-4 relative font-bold hover:text-red-600 transition-colors uppercase ${
                    activeInfoTab === tab ? 'text-red-505 border-b-2 border-red-605 border-red-600' : 'opacity-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-xs leading-relaxed opacity-85 py-1">
              {activeInfoTab === 'overview' && (
                <div className="space-y-3">
                  <p className="font-medium">{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1.5 font-semibold">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeInfoTab === 'tech' && (
                <div className="grid grid-cols-2 gap-3.5 font-semibold tracking-wide">
                  <div className="border-b pb-1">
                    <span className="opacity-50 block text-[9px] font-mono uppercase">Internal chassis</span>
                    <span className="text-[11px]">Carbon-fiber spoon core plate</span>
                  </div>
                  <div className="border-b pb-1">
                    <span className="opacity-50 block text-[9px] font-mono uppercase">Nitrogen compound</span>
                    <span className="text-[11px]">Supercritical Aero-Foam cushioning</span>
                  </div>
                  <div className="border-b pb-1">
                    <span className="opacity-50 block text-[9px] font-mono uppercase">Upper construction</span>
                    <span className="text-[11px]">Organic adaptation bio-mesh loom</span>
                  </div>
                  <div className="border-b pb-1">
                    <span className="opacity-50 block text-[9px] font-mono uppercase">Certified parley</span>
                    <span className="text-[11px]">50% recycled oceanic marine polymers</span>
                  </div>
                </div>
              )}

              {activeInfoTab === 'care' && (
                <div className="space-y-2 font-medium">
                  <p>• Avoid machine washing or heavy spin dry setups to maintain the structural 3D knit elasticity.</p>
                  <p>• Wipe outer dust clean with soft dry clothes. Do not utilize abrasive bleaches on carbon soles.</p>
                  <p>• Stow away inside our complimentary breathable protective storage bag when inactive.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Related Products Recommendations panel */}
      {related.length > 0 && (
        <div className="pt-24 space-y-8">
          <div>
            <p className="text-[9px] font-mono tracking-[0.2em] font-extrabold uppercase opacity-55">UPGRADE PERFORMANCE PACKS</p>
            <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              RELATED DISCOVERIES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod.id)}
                className={`group border rounded-sm p-4 cursor-pointer transition-all hover:scale-[1.01] ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-850 hover:border-neutral-500' : 'bg-white border-neutral-150 hover:border-neutral-300'
                }`}
              >
                <div className="aspect-square flex items-center justify-center p-3 bg-neutral-100 dark:bg-neutral-950/20 rounded-sm overflow-hidden mb-3">
                  <img src={prod.image} alt="" className="h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transform duration-500" />
                </div>
                <h4 className="font-extrabold text-xs uppercase truncate leading-none mb-1">{prod.name}</h4>
                <p className="text-[10px] opacity-60 font-mono">${prod.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
