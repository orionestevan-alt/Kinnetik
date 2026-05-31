import React, { useState } from 'react';
import { Heart, Eye, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onQuickView: (product: Product, e: React.MouseEvent) => void;
  onSelect: (id: string) => void;
  isDarkMode: boolean;
  key?: string | number;
}

export default function ProductCard({
  product,
  isWishlisted,
  onWishlistToggle,
  onQuickView,
  onSelect,
  isDarkMode,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // We can cycle image if there's a gallery
  const displayedImage = isHovered && product.gallery.length > 1
    ? product.gallery[1]
    : product.image;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product.id)}
      className={`group relative flex flex-col justify-between cursor-pointer border rounded-none transition-all duration-300 overflow-hidden ${
        isDarkMode
          ? 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/75'
          : 'bg-white border-zinc-200 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-100'
      }`}
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1 text-[8px] font-mono tracking-[0.2em] font-black uppercase">
        {product.isBestSeller && (
          <span className="bg-white text-black dark:bg-white dark:text-black px-2.5 py-1 tracking-[0.15em] border border-zinc-905 text-[8px] font-black leading-none shadow-sm">
            BEST SELLER
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-red-600 text-white px-2.5 py-1 tracking-[0.15em] text-[8px] font-black leading-none shadow-sm">
            NEW ARRIVAL
          </span>
        )}
        {product.isSale && (
          <span className="bg-zinc-805 bg-zinc-900 text-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-800 px-2.5 py-1 tracking-[0.15em] text-[8px] font-black leading-none shadow-sm">
            PROMO OUTLET
          </span>
        )}
      </div>

      {/* Heart Toggler trigger */}
      <button
        id={`wish-btn-${product.id}`}
        onClick={(e) => onWishlistToggle(product.id, e)}
        className={`absolute top-3 right-3 z-10 p-2 rounded-none border transition-all duration-300 backdrop-blur-md ${
          isWishlisted
            ? 'bg-white border-white text-black'
            : isDarkMode
              ? 'bg-black/50 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
              : 'bg-white/80 border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100'
        }`}
        title="Add to Wishlist"
      >
        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-black' : ''}`} />
      </button>

      {/* Picture Frame */}
      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900/10">
        <img
          src={displayedImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Quick Actions overlay */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center space-x-2 px-4 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0">
          <button
            id={`quick-btn-${product.id}`}
            onClick={(e) => onQuickView(product, e)}
            className={`px-4 py-2 text-[9px] font-mono tracking-[0.2em] font-black rounded-none flex items-center space-x-1.5 shadow-md border ${
              isDarkMode
                ? 'bg-white text-black border-transparent hover:bg-zinc-200'
                : 'bg-black text-white border-transparent hover:bg-zinc-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>

      {/* Info Panel description */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>{product.subcategory} {product.sport ? `• ${product.sport}` : ''}</span>
            <div className="flex items-center space-x-1 font-mono">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[9px]">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className={`text-[13px] font-black tracking-tight leading-tight uppercase line-clamp-1 group-hover:text-zinc-400 transition-colors ${
            isDarkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            {product.name}
          </h3>
        </div>

        {/* Colors and pricing */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-900">
          {/* Colors */}
          <div className="flex space-x-1.5">
            {product.colors.map((col, cIdx) => (
              <span
                key={cIdx}
                className="w-2.5 h-2.5 rounded-none border border-zinc-300 dark:border-zinc-800 shadow-sm"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
          </div>

          {/* Pricing */}
          <div className="text-right">
            {product.isSale && product.originalPrice ? (
              <div className="flex items-center space-x-1.5 justify-end">
                <span className="text-[10px] opacity-40 line-through font-mono font-bold">
                  ${product.originalPrice}
                </span>
                <span className="text-xs font-black text-red-500 font-mono tracking-wider">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-xs font-black font-mono tracking-wider dark:text-white text-zinc-950">
                ${product.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
