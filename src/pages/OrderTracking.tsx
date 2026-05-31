import React, { useState, useEffect } from 'react';
import { Truck, Search, MapPin, CheckCircle, Clock, Package, HelpCircle, ShieldAlert } from 'lucide-react';
import { Order } from '../types';
import { SAMPLE_ORDERS } from '../data';

interface OrderTrackingProps {
  isDarkMode: boolean;
  trackingTargetId: string;
  setTrackingTargetId: (id: string) => void;
  orders: Order[];
}

export default function OrderTracking({
  isDarkMode,
  trackingTargetId,
  setTrackingTargetId,
  orders,
}: OrderTrackingProps) {
  const [typedId, setTypedId] = useState(trackingTargetId || 'KNT-84291');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Fallback database integrating mock values
  const ALL_ORDERS = [...orders, ...SAMPLE_ORDERS];

  useEffect(() => {
    if (trackingTargetId) {
      setTypedId(trackingTargetId);
      const matched = ALL_ORDERS.find((o) => o.id.toLowerCase() === trackingTargetId.toLowerCase());
      if (matched) {
        setActiveOrder(matched);
        setErrorMsg('');
      } else {
        setActiveOrder(null);
        setErrorMsg('Error: ID reference not found inside active registers.');
      }
    } else {
      // Default to first sample order if nothing selected
      const matched = ALL_ORDERS.find((o) => o.id === 'KNT-84291');
      if (matched) {
        setActiveOrder(matched);
      }
    }
  }, [trackingTargetId, orders]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedId.trim()) return;

    setTrackingTargetId(typedId.trim());
  };

  const steps = [
    { label: 'Procurement Verified', description: 'Order coordinates registered', infoKey: 'Processing' },
    { label: 'Supercritical Assembly', description: 'Sensors and carbon plates configured', infoKey: 'Processing' },
    { label: 'Carrier Dispatch', description: 'Courier package scanned in transit', infoKey: 'Shipped' },
    { label: 'Destination Arrived', description: 'Signature secured on delivery', infoKey: 'Delivered' }
  ];

  // Map order state to active stepper index
  const getStepIndex = (status: string) => {
    if (status === 'Pending') return 0;
    if (status === 'Processing') return 1;
    if (status === 'Shipped') return 2;
    if (status === 'Delivered') return 3;
    return 1;
  };

  const activeIndex = activeOrder ? getStepIndex(activeOrder.status) : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Search Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-red-650 uppercase">
          KINETIC TELEMETRY SYSTEM
        </span>
        <h1 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
          ORDER TRACKING PORT
        </h1>
        <p className="text-xs opacity-65">Enter your KNT reference code below to query real-time transport logs.</p>
      </div>

      {/* Lookup Bar Input */}
      <form onSubmit={handleLookup} className="relative max-w-md mx-auto flex items-center">
        <input
          type="text"
          id="tracking-query-input"
          placeholder="e.g. KNT-84291"
          value={typedId}
          onChange={(e) => setTypedId(e.target.value)}
          className={`w-full py-4 pl-4 pr-16 border rounded-sm text-xs font-mono font-bold tracking-widest uppercase focus:outline-none focus:border-red-650 ${
            isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
          }`}
        />
        <button
          type="submit"
          className={`absolute right-1 px-4.5 py-3 font-mono text-[10px] font-bold rounded-sm flex items-center space-x-1.5 ${
            isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>QUERY</span>
        </button>
      </form>

      {errorMsg && (
        <p className="text-xs font-mono font-bold text-center text-red-500 max-w-sm mx-auto">{errorMsg}</p>
      )}

      {activeOrder ? (
        <div className={`border rounded-sm p-6 sm:p-8 space-y-8 ${
          isDarkMode ? 'bg-neutral-900/30 border-neutral-850' : 'bg-white border-neutral-150 shadow-sm'
        }`}>
          {/* Summary Details Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-semibold tracking-wide border-b pb-6 border-neutral-150 dark:border-neutral-900">
            <div>
              <span className="opacity-50 text-[9px] font-mono uppercase block">Order Reference</span>
              <span className="font-mono text-red-600 block">{activeOrder.id}</span>
            </div>
            <div>
              <span className="opacity-50 text-[9px] font-mono uppercase block">Log Dispatch Status</span>
              <span className="block">{activeOrder.status}</span>
            </div>
            <div>
              <span className="opacity-50 text-[9px] font-mono uppercase block">FedEx Carrier Ref</span>
              <span className="font-mono block truncate">{activeOrder.trackingNumber}</span>
            </div>
            <div>
              <span className="opacity-50 text-[9px] font-mono uppercase block">Estimated Delivery</span>
              <span className="block">{activeOrder.estimatedDelivery}</span>
            </div>
          </div>

          {/* Stepper Steps UI */}
          <div className="relative pt-6 max-w-2xl mx-auto">
            {/* Visual connecting line */}
            <div className="absolute left-[16px] sm:left-1/2 top-10 bottom-6 w-0.5 bg-neutral-200 dark:bg-neutral-900 sm:-translate-x-1/2 z-0" />

            <div className="space-y-8 relative z-10 text-xs sm:text-sm font-semibold">
              {steps.map((step, idx) => {
                const isFinished = idx <= activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-6 group"
                  >
                    {/* Left node label */}
                    <div className="flex items-center space-x-4 sm:flex-1 sm:justify-end sm:text-right">
                      <span className={`order-2 sm:order-1 transition-colors ${
                        isFinished ? 'text-red-600 font-extrabold' : 'opacity-40'
                      }`}>
                        {step.label}
                      </span>

                      {/* Bullet circle */}
                      <span className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border-2 transition-all shrink-0 order-1 sm:order-2 ${
                        isFinished
                          ? 'bg-black text-white dark:bg-white dark:text-black border-transparent scale-102 font-bold ring-1 ring-red-650'
                          : isDarkMode
                            ? 'border-neutral-800 bg-neutral-950 text-neutral-450'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-450'
                      }`}>
                        {isFinished ? '✓' : idx + 1}
                      </span>
                    </div>

                    {/* Right description */}
                    <div className="pl-12 sm:pl-0 sm:flex-1 opacity-70 text-xs font-medium leading-relaxed">
                      {step.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed package list check */}
          <div className="pt-6 border-t border-neutral-150 dark:border-neutral-900">
            <h4 className="text-[10px] font-mono font-black tracking-widest uppercase opacity-75 mb-4">IN SHIPMENT CARGO</h4>
            <div className="space-y-2 text-xs">
              {activeOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between font-semibold">
                  <span className="opacity-80 uppercase leading-none">{item.quantity}x {item.productName} ({item.selectedSize})</span>
                  <span className="font-mono text-neutral-500">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 opacity-50 font-mono text-xs">
          Please input a tracking code value above to query our system telemetry.
        </div>
      )}
    </div>
  );
}
