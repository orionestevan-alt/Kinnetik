import React, { useState } from 'react';
import { ShieldAlert, CreditCard, Lock, Sparkles, CheckCircle, ArrowRight, Clipboard } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  discountCode: string;
  isDarkMode: boolean;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  setActiveTab: (tab: string) => void;
}

export default function Checkout({
  cart,
  discountCode,
  isDarkMode,
  onClearCart,
  onPlaceOrder,
  setActiveTab,
}: CheckoutProps) {
  // Form State
  const [shippingForm, setShippingForm] = useState({
    fullName: 'Alex Mercer',
    street: '742 Infinite Loop, Velocity District',
    city: 'New York',
    postalCode: '10001',
    phone: '+1 (555) 7943-2009',
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '4111 2222 3333 4444',
    cardExpiry: '12/28',
    cardCvv: '382',
  });

  // Successful Order Result State
  const [orderReceipt, setOrderReceipt] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = discountCode === 'SPEEDRUN25' ? subtotal * 0.25 : 0;
  const shipping = subtotal > 150 ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + estimatedTax;

  const handleInputChange = (field: string, value: string) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleConcludeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrderId = `KNT-${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      const pendingOrderObj: Order = {
        id: generatedOrderId,
        date: new Date().toISOString().split('T')[0],
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor.name,
        })),
        total: total,
        status: 'Processing',
        trackingNumber: `1Z999AA10123${Math.floor(100000 + Math.random() * 900000)}`,
        carrier: 'DHL Express Prestige',
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        }),
        shippingAddress: { ...shippingForm },
      };

      onPlaceOrder(pendingOrderObj);
      setOrderReceipt(pendingOrderObj);
      onClearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  // If order concluded, show premium invoice panel immediately!
  if (orderReceipt) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-emerald-500 uppercase">
            REGISTRY PROCUREMENT CONCLUDED
          </span>
          <h1 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            THANK YOU FOR YOUR PATRONAGE
          </h1>
          <p className="text-xs opacity-70 max-w-md mx-auto">
            Your tracking protocol coordinates are generated. A receipt ledger and updates are dispatched to <span className="font-bold underline">alex.mercer@kinetic.com</span>.
          </p>
        </div>

        {/* Invoice specifications */}
        <div className={`p-6 border rounded-sm text-left font-mono text-xs ${
          isDarkMode ? 'bg-neutral-950 border-neutral-900 text-neutral-300' : 'bg-neutral-50 border-neutral-150 text-neutral-700'
        } space-y-4`}>
          <div className="flex justify-between border-b border-dashed pb-3 border-neutral-800">
            <span>ORDER INVOICE REFERENCE:</span>
            <span className="font-bold text-red-500">{orderReceipt.id}</span>
          </div>
          <div className="flex justify-between">
            <span>DHL TRACKING ID:</span>
            <span className="font-bold underline">{orderReceipt.trackingNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>DELIVERY TIMEPATH EXPECTED:</span>
            <span>{orderReceipt.estimatedDelivery}</span>
          </div>
          <div className="flex justify-between">
            <span>TOTAL DEDUCT VALUE:</span>
            <span className="font-extrabold text-neutral-950 dark:text-white">${orderReceipt.total.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-dashed border-neutral-800 text-[10px] opacity-70">
            <span>DESTINATION ROUTE PROFILE: {orderReceipt.shippingAddress.fullName} — {orderReceipt.shippingAddress.street}, {orderReceipt.shippingAddress.city}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            id="invoice-tracking-btn"
            onClick={() => setActiveTab('tracking')}
            className={`py-3 px-8 text-xs font-mono font-bold tracking-widest uppercase rounded-sm border ${
              isDarkMode ? 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-950'
            }`}
          >
            LAUNCH TRACKING SYSTEM
          </button>
          <button
            id="invoice-catalog-btn"
            onClick={() => setActiveTab('catalog')}
            className={`py-3 px-8 text-xs font-mono font-bold tracking-widest uppercase rounded-sm ${
              isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
            }`}
          >
            RETURN TO ACQUISITIONS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="space-y-2 mb-8">
        <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase opacity-55">PCI SECURE CHECKOUT</span>
        <h1 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
          ACQUISITION CHECKOUT
        </h1>
      </div>

      <form onSubmit={handleConcludeOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column form fields (7 grid cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Coordinates box */}
          <div className={`p-6 border rounded-sm ${isDarkMode ? 'bg-neutral-900/10 border-neutral-850' : 'bg-neutral-50/50 border-neutral-150'}`}>
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase mb-5 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              I. SHIPPING DESTINATION
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="sm:col-span-2 space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px]">Full Recipient Name</label>
                <input
                  type="text"
                  required
                  value={shippingForm.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px]">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingForm.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px]">City / Location</label>
                <input
                  type="text"
                  required
                  value={shippingForm.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px]">ZIP / Postal Code</label>
                <input
                  type="text"
                  required
                  value={shippingForm.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-mono font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px]">Active Contact Phone</label>
                <input
                  type="text"
                  required
                  value={shippingForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-mono font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Payment coordinates box */}
          <div className={`p-6 border rounded-sm ${isDarkMode ? 'bg-neutral-900/10 border-neutral-850' : 'bg-neutral-50/50 border-neutral-150'}`}>
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase mb-5 flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              <span>II. BILLING COGNITION CARDS</span>
              <Lock className="w-4 h-4 text-emerald-500" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="sm:col-span-3 space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px] flex items-center">
                  <CreditCard className="w-3.5 h-3.5 mr-1" /> Credited Card String
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4111 2222 3333 4444"
                  value={paymentForm.cardNumber}
                  onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-mono font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px]">Expiry Stamp</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={paymentForm.cardExpiry}
                  onChange={(e) => handlePaymentChange('cardExpiry', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-mono font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="opacity-70 uppercase tracking-widest text-[10px]">CVV security key</label>
                <input
                  type="text"
                  required
                  placeholder="3 digits"
                  value={paymentForm.cardCvv}
                  onChange={(e) => handlePaymentChange('cardCvv', e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-mono font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right summary inventory check list (5 grid cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 border rounded-sm ${
            isDarkMode ? 'bg-neutral-909 bg-neutral-900/40 border-neutral-850' : 'bg-white border-neutral-150 shadow-sm'
          }`}>
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase mb-5 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              ORDER ACQUISITION REVIEW
            </h3>

            {/* List of checkout items */}
            <div className="divide-y divide-neutral-100 dark:divide-neutral-900 border-b border-neutral-150 dark:border-neutral-900 mb-5 max-h-56 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="py-3 flex items-center space-x-3.5 text-xs font-semibold">
                  <img src={item.product.image} alt="" className="w-10 h-10 object-contain p-1 border rounded bg-neutral-100/50" />
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate uppercase font-black">{item.product.name}</h4>
                    <p className="opacity-50 text-[10px]">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-mono">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Price list values */}
            <div className="space-y-3.5 text-xs font-semibold border-b pb-5 border-neutral-150 dark:border-neutral-900">
              <div className="flex justify-between">
                <span className="opacity-60">Subtotal value</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>

              {discountCode && (
                <div className="flex justify-between text-red-500 font-bold">
                  <span className="flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1" /> Voucher deduction (25%)</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="opacity-60">Compliance Courier Cargo</span>
                <span className="font-mono">{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="opacity-60">Estimated Local Sales Tax</span>
                <span className="font-mono">${estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-5 mb-6">
              <span className="text-xs font-mono font-black uppercase tracking-widest text-neutral-950 dark:text-white">CONSOLIDATED SUM</span>
              <span className="text-2xl font-black font-mono tracking-tight text-red-650">${total.toFixed(2)}</span>
            </div>

            {/* Submit trigger button */}
            <button
              id="conclude-procurement"
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className={`w-full py-4.5 text-xs font-mono font-bold tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 shadow-xl ${
                isSubmitting ? 'bg-neutral-500 text-white cursor-wait opacity-65' : isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
              }`}
            >
              <span>{isSubmitting ? 'SECURE BLOCK TRANSMISSION...' : 'CONCLUDE PROCUREMENT SYSTEM'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
