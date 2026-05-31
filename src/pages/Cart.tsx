import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (discountCode: string) => void; // Pass discount code up
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
}

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isDarkMode,
  setActiveTab,
}: CartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.25 : 0;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SPEEDRUN25') {
      setDiscountApplied(true);
      setDiscountError('');
    } else {
      setDiscountError('Invalid promo code. Try "SPEEDRUN25"');
      setDiscountApplied(false);
    }
  };

  const handleProceedToCheckout = () => {
    onCheckout(discountApplied ? 'SPEEDRUN25' : '');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto text-neutral-450">
          <ShoppingBag className="w-10 h-10 opacity-40" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black uppercase">Your active bag is empty</h2>
          <p className="text-xs opacity-60 max-w-sm mx-auto">Explore high-torque shoe designs and luxury sports apparel and complete your track profile setup.</p>
        </div>
        <button
          onClick={() => setActiveTab('catalog')}
          className="bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-bold tracking-widest uppercase px-8 py-3.5 hover:opacity-85"
        >
          DISCOVER GEARS
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="space-y-2 mb-8">
        <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase opacity-55">READY FOR SHIPMENT</span>
        <h1 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
          SPECTRUM WAGON ({cart.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left list (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              id={`cart-item-${item.product.id}-${index}`}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-sm ${
                isDarkMode ? 'bg-neutral-905 bg-neutral-900/30 border-neutral-850' : 'bg-white border-neutral-150'
              }`}
            >
              {/* Product Info Frame */}
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 dark:bg-neutral-950/20 rounded-sm overflow-hidden flex items-center justify-center p-2 shrink-0 border">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-xs sm:text-sm font-black uppercase truncate leading-snug ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
                    {item.product.name}
                  </h3>
                  <p className="text-[10px] font-mono opacity-50 uppercase mt-0.5">
                    Sector: {item.product.category} • Size: {item.selectedSize}
                  </p>
                  {/* Color marker */}
                  <div className="flex items-center space-x-1.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full border border-neutral-300 pointer-events-none" style={{ backgroundColor: item.selectedColor.hex }} />
                    <span className="text-[9px] font-mono opacity-60 uppercase">{item.selectedColor.name}</span>
                  </div>
                </div>
              </div>

              {/* Adjustments Actions panel */}
              <div className="flex sm:flex-row items-center justify-between w-full sm:w-auto pt-4 sm:pt-0 sm:space-x-8">
                {/* Quantity adjustments */}
                <div className={`flex items-center border rounded-sm text-xs ${isDarkMode ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'}`}>
                  <button
                    onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                    className="px-2.5 py-1 font-bold hover:opacity-60"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold select-none">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(index, Math.min(10, item.quantity + 1))}
                    className="px-2.5 py-1 font-bold hover:opacity-60"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal item price */}
                <span className="text-sm font-black font-mono tracking-tight shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>

                {/* Delete button */}
                <button
                  id={`del-cart-${item.product.id}-${index}`}
                  onClick={() => onRemoveItem(index)}
                  className="p-2 border rounded-sm text-neutral-450 hover:text-red-500 hover:border-red-650/40 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Sizing & Security benefits advice */}
          <div className={`p-4 border rounded-sm flex items-center space-x-3 text-xs leading-normal ${
            isDarkMode ? 'bg-neutral-900/10 border-neutral-900' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
            <p className="opacity-80">
              <span className="font-bold">KINETIC SECURITY GUARANTEE:</span> High-fidelity server-side PCI-DSS banking encryption keys protect order processing. Returns are complete and free within 30 days.
            </p>
          </div>
        </div>

        {/* Right Summary panel (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 border rounded-sm ${
            isDarkMode ? 'bg-neutral-900/40 border-neutral-850' : 'bg-white border-neutral-150 shadow-sm'
          }`}>
            <h3 className={`text-sm font-mono font-black tracking-widest uppercase mb-5 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              BILLING INVENTORY
            </h3>

            <div className="space-y-3.5 text-xs font-semibold tracking-wider border-b border-neutral-150 dark:border-neutral-900 pb-5">
              <div className="flex justify-between">
                <span className="opacity-60">Products subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-red-500 font-bold">
                  <span className="flex items-center"><Tag className="w-3.5 h-3.5 mr-1" /> Coupon Deduction (25%)</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="opacity-60">FedEx Cargo Courier</span>
                <span className="font-mono">{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="opacity-60">Estimated Local Sales Tax</span>
                <span className="font-mono">${estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            {/* Total Balance */}
            <div className="flex justify-between items-baseline pt-5 mb-6">
              <span className="text-xs font-mono font-black uppercase tracking-widest">Total cost</span>
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-red-650">${total.toFixed(2)}</span>
            </div>

            {/* Coupon codes redemption */}
            <form onSubmit={handleApplyPromo} className="space-y-2 mb-6">
              <label className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-55 block">VOUCHER SECURE PATH</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="cart-coupon-input"
                  placeholder="e.g. SPEEDRUN25"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`w-full py-2.5 pl-3 pr-16 border text-xs font-mono font-bold rounded-sm focus:outline-none uppercase ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
                <button
                  type="submit"
                  className={`absolute right-1 px-3.5 py-1.5 font-mono text-[10px] font-bold rounded-sm ${
                    isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
                  }`}
                >
                  REDEEM
                </button>
              </div>
              {discountApplied && (
                <p className="text-[10px] text-emerald-500 font-bold font-mono tracking-wide flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  <span>SPEEDRUN25 coupon activated successfully!</span>
                </p>
              )}
              {discountError && (
                <p className="text-[10px] text-red-500 font-bold font-mono tracking-wide">{discountError}</p>
              )}
            </form>

            {/* Go To Checkout trigger */}
            <button
              id="cart-checkout-btn"
              onClick={handleProceedToCheckout}
              className={`w-full py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 shadow-lg transition-colors ${
                isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
              }`}
            >
              <span>PROCEED TO SECURE REGISTRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
