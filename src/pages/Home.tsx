import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Flame, Shield, HelpCircle, Star, Quote, ChevronRight, Mail } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, TESTIMONIALS } from '../data';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  onSelectProduct: (id: string) => void;
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onQuickView: (product: Product, e: React.MouseEvent) => void;
  wishlist: string[];
}

export default function Home({
  isDarkMode,
  setActiveTab,
  onSelectProduct,
  onWishlistToggle,
  onQuickView,
  wishlist,
}: HomeProps) {
  const [heroIndex, setHeroIndex] = useState(0);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hrs: 14, mins: 42, secs: 19 });

  const heroBanners = [
    {
      title: 'AERO-KNITT CARBON V1',
      subtitle: 'THE ULTIMATE MARATHON PROTOCOL',
      description: 'Supercritical Nitrogen foam meets a high-torque continuous carbon fiber lever. Engineered to push forward.',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=80',
      cta: 'ACQUIRE BLUEPRINT',
      productId: 'knt-001'
    },
    {
      title: 'PHANTOM STEALTH RUNNER',
      subtitle: 'FASTEST UNDER THE LIGHTS',
      description: 'Glow details woven directly into a high-visibility continuous weave. Designed for midnight track paces.',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      cta: 'EXPLORE COLLECTION',
      productId: 'knt-002'
    }
  ];

  useEffect(() => {
    // Promo Timer tick
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { hrs: prev.hrs, mins: prev.mins - 1, secs: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section Fullscreen */}
      <div className="relative w-full h-[70vh] sm:h-[85vh] overflow-hidden bg-neutral-950 flex items-center">
        {/* Banner Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanners[heroIndex].image}
            alt="Hero Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45 mix-blend-screen scale-102 transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-2xl space-y-6">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-none w-fit">
                <Flame className="w-4 h-4 text-white fill-white" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-white">
                  {heroBanners[heroIndex].subtitle}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter uppercase leading-tight line-clamp-2">
                {heroBanners[heroIndex].title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-350 font-medium tracking-wide leading-relaxed">
                {heroBanners[heroIndex].description}
              </p>
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => onSelectProduct(heroBanners[heroIndex].productId)}
                className="bg-white text-black text-xs font-mono font-black tracking-[0.2em] px-10 py-5 uppercase rounded-none hover:bg-zinc-200 transition-colors flex items-center space-x-2.5 shadow-2xl"
              >
                <span>{heroBanners[heroIndex].cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => setActiveTab('catalog')}
                className="border border-zinc-700 hover:border-white text-white text-xs font-mono tracking-[0.2em] px-10 py-5 uppercase rounded-none hover:bg-white/10 transition-colors"
              >
                VIEW FULL BLUEPRINTS
              </button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-6 right-6 z-10 flex space-x-2.5">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`w-12 h-1.5 transition-all ${heroIndex === i ? 'bg-red-600' : 'bg-white/30 hover:bg-white/60'}`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Brand Value Props Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 border rounded-none flex items-start space-x-4 ${isDarkMode ? 'border-zinc-900 bg-zinc-950/40 text-white' : 'border-zinc-200 bg-zinc-50/50 text-zinc-950'}`}>
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-white rounded-none">
              <Shield className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h3 className={`text-xs font-mono font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>3D Carbon Stabilization</h3>
              <p className="text-[11px] opacity-70 mt-1 leading-relaxed">Integrated spoon-shaped curved plates reduce pressure spikes and energy leakages.</p>
            </div>
          </div>

          <div className={`p-6 border rounded-none flex items-start space-x-4 ${isDarkMode ? 'border-zinc-900 bg-zinc-950/40 text-white' : 'border-zinc-200 bg-zinc-50/50 text-zinc-950'}`}>
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-white rounded-none">
              <Sparkles className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h3 className={`text-xs font-mono font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>Nitrogen Injection Foam</h3>
              <p className="text-[11px] opacity-70 mt-1 leading-relaxed">Dual density foam compounds return up to 87% of step compression energy back to stride.</p>
            </div>
          </div>

          <div className={`p-6 border rounded-none flex items-start space-x-4 ${isDarkMode ? 'border-zinc-900 bg-zinc-950/40 text-white' : 'border-zinc-200 bg-zinc-50/50 text-zinc-950'}`}>
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-white rounded-none">
              <Flame className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h3 className={`text-xs font-mono font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>Parley Sustainability</h3>
              <p className="text-[11px] opacity-70 mt-1 leading-relaxed">Woven structures composed of up to 50% ocean plastic recycled synthetic yarns.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Featured Categories - Grid layout with beautiful backdrops */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4">
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] font-black uppercase opacity-55">STREET LUXE PERFORMANCES</p>
            <h2 className={`text-3xl font-black tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              SELECT BY DEPLOYMENT
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`font-mono text-[11px] font-black uppercase tracking-[0.2em] flex items-center space-x-2 border-b-2 hover:text-zinc-300 ${
              isDarkMode ? 'border-zinc-800 hover:border-white' : 'border-zinc-200 hover:border-black'
            }`}
          >
            <span>VIEW ALL FORMULAS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'MEN SECTOR',
              image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
              tab: 'Men',
            },
            {
              title: 'WOMEN DIVISION',
              image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
              tab: 'Women',
            },
            {
              title: 'FUTURE KIDS',
              image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80',
              tab: 'Kids',
            },
            {
              title: 'SPORTS BLUEPRINTS',
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
              tab: 'Sports',
            },
          ].map((cat, idx) => (
            <div
              key={idx}
              id={`cat-card-${cat.tab}`}
              onClick={() => setActiveTab(cat.tab)}
              className="group relative h-72 sm:h-80 overflow-hidden cursor-pointer rounded-none border border-zinc-900"
            >
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-white text-base font-black italic tracking-widest uppercase leading-none">{cat.title}</span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-400 mt-2 uppercase flex items-center">
                  <span>DISCOVER</span>
                  <ArrowRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Best Sellers Section (Grid Modern) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <p className="text-[10px] font-mono tracking-[0.2em] font-black uppercase opacity-55">ELITE VERIFIED RELEASES</p>
          <h2 className={`text-3xl font-black tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            KINETIC HEAVYWEIGHTS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
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
      </div>

      {/* 5. Special Promotional Banner (With live Countdown!) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-none overflow-hidden border p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
          isDarkMode ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-950'
        }`}>
          {/* Accent decoration background */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-zinc-800 opacity-10 filter blur-3xl"></div>

          <div className="space-y-6 relative z-10">
            <span className="bg-white text-black text-[9px] font-mono font-black tracking-[0.25em] px-4 py-2 uppercase rounded-none inline-block shadow-sm">
              MID-SEASON FLASH PROTOCOL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight uppercase leading-tight">
              OBTAIN DEALS UP TO 25% OFF
            </h2>
            <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-80 max-w-lg">
              Redeem checkout code <span className="font-bold underline tracking-wider font-mono">SPEEDRUN25</span> to secure deductions across running shoes and luxury performance windbreakers. Hurry—this window expires shortly.
            </p>

            {/* Live interactive countdown timer */}
            <div className="flex gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-none font-mono text-xl sm:text-2xl font-black tracking-tight border ${
                    isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-white border-zinc-300 text-black'
                  }`}>
                    {value.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[9px] font-mono font-black tracking-widest uppercase opacity-55 mt-1.5">{unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-start lg:justify-end shrink-0 relative z-10">
            <button
              id="promo-cta-sale"
              onClick={() => {
                setActiveTab('Sale');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-5 px-10 text-[11px] font-mono font-black tracking-[0.2em] uppercase rounded-none flex items-center justify-center space-x-2.5 transition-colors shadow-2xl ${
                isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-900'
              }`}
            >
              <span>ACCESS THE SALE PORT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. Dynamic Customer TESTIMONIALS */}
      <div className={`py-16 ${isDarkMode ? 'bg-neutral-950/40' : 'bg-neutral-50/40'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-mono tracking-[0.2em] font-black uppercase opacity-55">FIELD REPORTS</p>
            <h2 className={`text-3xl font-black tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              ATHLETE COVENANT VOICES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((col, cIdx) => (
              <div
                key={col.id}
                className={`p-6 rounded-none border flex flex-col justify-between ${
                  isDarkMode ? 'bg-zinc-950/20 border-zinc-900' : 'bg-white border-zinc-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex space-x-1">
                    {Array.from({ length: col.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-3.5 h-3.5 fill-white text-white dark:fill-white dark:text-white light:fill-amber-400 light:text-amber-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <div className="relative font-medium italic text-xs leading-relaxed opacity-90">
                    <Quote className="absolute -top-3.5 -left-3.5 w-6 h-6 rotate-180 opacity-5 text-zinc-500" />
                    <p className="relative z-10 pl-2">"{col.comment}"</p>
                  </div>
                </div>

                {/* Profile Signature Card */}
                <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-900">
                  <img
                    src={col.avatar}
                    alt={col.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                  />
                  <div>
                    <h4 className={`text-xs font-black uppercase ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
                      {col.name}
                    </h4>
                    <p className="text-[10px] opacity-60 font-medium">{col.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
