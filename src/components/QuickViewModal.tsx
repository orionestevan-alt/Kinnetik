import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onAddToCart: (product: Product, color: { name: string; hex: string }, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onGoToDetail: (id: string) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isDarkMode,
  onAddToCart,
  isWishlisted,
  onWishlistToggle,
  onGoToDetail,
}: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Settle default selections when product loads/switches
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0] || '');
      setSelectedImage(product.image);
      setQuantity(1);
      setErrorMessage('');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedColor) {
      setErrorMessage('Please select a color option.');
      return;
    }
    if (!selectedSize) {
      setErrorMessage('Please select a size format.');
      return;
    }

    setErrorMessage('');
    setIsAdding(true);

    // Dynamic luxurious click effect with 500ms delay for performance feel
    setTimeout(() => {
      onAddToCart(product, selectedColor, selectedSize, quantity);
      setIsAdding(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm border p-6 sm:p-8 shadow-2xl transition-all duration-300 z-10 ${
          isDarkMode
            ? 'bg-neutral-950 border-neutral-850 text-white shadow-black'
            : 'bg-white border-neutral-100 text-neutral-950 shadow-neutral-300'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full border transition-transform hover:rotate-90 ${
            isDarkMode ? 'border-neutral-800 hover:bg-neutral-900 text-neutral-400' : 'border-neutral-200 hover:bg-neutral-50 text-neutral-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-4">
          {/* Left Column: Image Gallery Frame */}
          <div className="space-y-4">
            <div className={`p-4 rounded-sm flex items-center justify-center aspect-square border ${
              isDarkMode ? 'bg-neutral-900/10 border-neutral-850' : 'bg-neutral-50 border-neutral-100'
            }`}>
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-[320px] object-contain mix-blend-multiply dark:mix-blend-normal transform transition-all duration-300"
              />
            </div>

            {/* Gallery Thumbnail Carousel */}
            {product.gallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-sm border p-1 shrink-0 flex items-center justify-center transition-all ${
                      selectedImage === img
                        ? 'border-red-650 ring-1 ring-red-650 bg-red-500/5'
                        : isDarkMode
                          ? 'border-neutral-800 bg-neutral-950 hover:border-neutral-600'
                          : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Checkout Config */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase font-black text-red-600">
                  {product.subcategory} {product.sport ? `• ${product.sport}` : ''}
                </p>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="opacity-40 font-bold">•</span>
                  <span className="opacity-60 underline underline-offset-2 cursor-pointer font-bold">
                    {product.reviewsCount} verified reviews
                  </span>
                </div>
              </div>

              {/* Pricing section */}
              <div className="flex items-baseline space-x-3 border-y border-neutral-100 dark:border-neutral-900 py-3">
                <span className="text-2xl font-black font-mono">${product.price}</span>
                {product.isSale && product.originalPrice && (
                  <>
                    <span className="text-sm opacity-50 line-through font-mono font-bold">${product.originalPrice}</span>
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 text-[9px] font-mono font-extrabold uppercase rounded-sm">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Color swatches */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold uppercase tracking-wider">Color:</span>
                  <span className="opacity-60 font-semibold">{selectedColor?.name}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border transition-all ${
                        selectedColor?.name === color.name
                          ? 'ring-2 ring-red-650 outline-none scale-105'
                          : 'border-neutral-300 dark:border-neutral-800'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.name === color.name && (
                        <span className={`absolute inset-0 flex items-center justify-center text-[10px] ${
                          color.hex === '#ffffff' ? 'text-black' : 'text-white'
                        }`}>
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes swatches */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold uppercase tracking-wider">Select Size:</span>
                  <button className="text-[10px] underline font-mono font-black uppercase opacity-60 hover:opacity-100">
                    Sizing Formula
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono font-bold border transition-all rounded-sm ${
                        selectedSize === size
                          ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                          : isDarkMode
                            ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-600'
                            : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selectors */}
              <div className="flex items-center space-x-4 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider">QTY</span>
                <div className={`flex items-center border rounded-sm ${isDarkMode ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-50'}`}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 font-bold hover:opacity-60 transition-opacity"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 font-mono font-bold text-sm select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3 py-1.5 font-bold hover:opacity-60 transition-opacity"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="space-y-3 pt-6 border-t border-neutral-100 dark:border-neutral-900 mt-6">
              {errorMessage && (
                <p className="text-xs text-red-500 font-semibold font-mono tracking-wide">{errorMessage}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2.5 transition-all shadow-md ${
                    isAdding
                      ? 'bg-neutral-500 text-white cursor-not-allowed opacity-50'
                      : isDarkMode
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-black text-white hover:bg-neutral-850'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdding ? 'PROCESSING...' : 'ADD TO SPECTRUM BAG'}</span>
                </button>

                <button
                  id="modal-wishlist-toggle-btn"
                  onClick={(e) => onWishlistToggle(product.id, e)}
                  className={`py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2.5 transition-all border ${
                    isWishlisted
                      ? 'border-red-600 bg-red-500/10 text-red-500'
                      : isDarkMode
                        ? 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}</span>
                </button>
              </div>

              {/* View Full Specs link */}
              <button
                id="modal-full-spec-btn"
                onClick={() => {
                  onGoToDetail(product.id);
                  onClose();
                }}
                className={`w-full py-3 text-center text-xs font-mono tracking-wider font-extrabold flex items-center justify-center space-x-1.5 transition-colors border-2 border-dashed ${
                  isDarkMode
                    ? 'border-neutral-800 hover:border-neutral-500 hover:text-white'
                    : 'border-neutral-200 hover:border-black hover:text-neutral-950'
                }`}
              >
                <span>VIEW FULL PERFORMANCE BLUEPRINTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
