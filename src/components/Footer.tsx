import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Twitter, Facebook, Youtube, MapPin, Phone, ShieldCheck, RefreshCw } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  onSubscribe: (email: string) => void;
}

export default function Footer({ isDarkMode, setActiveTab, onSubscribe }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const categories = [
    { name: 'Men Shoes & Apparel', tab: 'Men' },
    { name: 'Women Performance Wear', tab: 'Women' },
    { name: 'Kids Activewear', tab: 'Kids' },
    { name: 'Sports Gear & Collections', tab: 'Sports' },
    { name: 'Hot New Arrivals', tab: 'New Arrivals' },
    { name: 'Mid-Season Sale Outlet', tab: 'Sale' }
  ];

  const resources = [
    { name: 'Order Tracking System', tab: 'tracking' },
    { name: 'Contact Client Relations', tab: 'contact' },
    { name: 'Elite Club Membership', tab: 'profile' },
    { name: 'About KINETIC Lab', tab: 'about' }
  ];

  return (
    <footer
      className={`transition-colors duration-300 border-t ${
        isDarkMode
          ? 'bg-black text-zinc-400 border-zinc-900'
          : 'bg-zinc-50 text-zinc-600 border-zinc-200'
      }`}
    >
      {/* Upper Newsletter Bar */}
      <div className={`border-b ${isDarkMode ? 'border-zinc-900 bg-black' : 'border-zinc-100 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-widest uppercase mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>
              JOIN THE KINETIC COVENANT
            </h2>
            <p className="text-xs sm:text-sm font-medium tracking-wide opacity-80">
              Sign up today to receive premium early arrivals catalogs, 15% off your initial purchase, and member-only athlete registry access.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="email"
              id="footer-newsletter-email"
              placeholder="YOUR EMAIL ROUTE..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full text-xs font-mono tracking-widest pl-4 pr-12 py-4 border font-bold uppercase rounded-none focus:outline-none transition-colors ${
                isDarkMode
                  ? 'bg-zinc-950 border-zinc-800 text-white focus:border-white'
                  : 'bg-zinc-50 border-zinc-250 text-zinc-950 focus:border-black'
              }`}
            />
            <button
              type="submit"
              className={`absolute right-1 px-4 py-3 font-mono text-[10px] sm:text-xs font-black rounded-none transition-all flex items-center space-x-1.5 ${
                isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              <span>{subscribed ? 'CONFIRMED' : 'SUBSCRIBE'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col gap-1 shrink-0">
              <div className={`h-[2px] ${isDarkMode ? 'bg-white' : 'bg-black'} w-6`}></div>
              <div className={`h-[2px] ${isDarkMode ? 'bg-white' : 'bg-black'} w-4`}></div>
              <div className={`h-[2px] ${isDarkMode ? 'bg-white' : 'bg-black'} w-7`}></div>
            </div>
            <span className={`font-sans font-black italic tracking-[0.12em] text-lg uppercase mt-0.5 ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>KINETIC</span>
          </div>
          <p className="text-xs font-medium leading-relaxed tracking-wide">
            Designed for high-impact performance and luxury lifestyle aesthetics. Crafted with continuous 3D carbon fibers, bio-knit meshes under sustainable certifications, and Nitrogen shock distribution models.
          </p>
          <div className="flex space-x-4 pt-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className={`transition-colors p-2 border rounded-none ${
                  isDarkMode
                    ? 'border-zinc-900 bg-zinc-950 hover:border-white hover:text-white'
                    : 'border-zinc-200 bg-white hover:border-black hover:text-zinc-950'
                }`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Categories column */}
        <div>
          <h4 className={`text-xs font-mono font-black tracking-widest uppercase mb-5 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            COLLECTIONS
          </h4>
          <ul className="space-y-3 text-xs font-semibold tracking-wider">
            {categories.map((c, i) => (
              <li key={i}>
                <button
                  id={`footer-cat-${c.tab}-${i}`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveTab(c.tab);
                  }}
                  className={`hover:pl-1.5 transition-all text-left ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources column */}
        <div>
          <h4 className={`text-xs font-mono font-black tracking-widest uppercase mb-5 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            SUPPORT & INFO
          </h4>
          <ul className="space-y-3 text-xs font-semibold tracking-wider">
            {resources.map((r, i) => (
              <li key={i}>
                <button
                  id={`footer-res-${r.tab}-${i}`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveTab(r.tab);
                  }}
                  className={`hover:pl-1.5 transition-all text-left ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}
                >
                  {r.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h4 className={`text-xs font-mono font-black tracking-widest uppercase mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            CLIENT RELATIONS
          </h4>
          <div className="space-y-3 text-xs font-medium tracking-wide">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2.5 shrink-0 opacity-70" />
              <span>742 Ocean Velocity Drive, Suite 100, Manhattan, NY 10001</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2.5 opacity-70" />
              <span>+1 (800) 555-KNT-RUNS (9 AM - 6 PM EST)</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2.5 opacity-70" />
              <span>concierge@kinetic-sportswear.com</span>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-900/10 dark:border-zinc-900">
            <div className={`p-3 rounded-none flex items-center space-x-2.5 border text-[10px] font-mono leading-tight uppercase ${
              isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-200'
            }`}>
              <ShieldCheck className="w-5 h-5 text-zinc-350 shrink-0" />
              <div>
                <p className={`font-black tracking-wider ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>SECURE REPUTED DISTRIBUTOR</p>
                <p className="opacity-60 text-[9px]">PCI-DSS Level 1 Encryption Secured</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright */}
      <div className={`py-6 border-t font-mono text-[10px] tracking-widest uppercase ${
        isDarkMode ? 'border-neutral-90 border-neutral-900 bg-neutral-950 text-neutral-500' : 'border-neutral-200 bg-neutral-100 text-neutral-450'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© 2026 KINETIC ATHLETICS LAB INC. ALL RIGHTS RESERVED.</span>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black dark:hover:text-white transition-colors">PRIVACY CODE</button>
            <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black dark:hover:text-white transition-colors">SALE COVENANTS</button>
            <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black dark:hover:text-white transition-colors">CSR POLICY</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
