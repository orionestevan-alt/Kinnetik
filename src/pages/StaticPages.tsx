import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ChevronDown, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { FAQS } from '../data';

interface StaticPagesProps {
  viewType: 'about' | 'contact';
  isDarkMode: boolean;
}

export default function StaticPages({ viewType, isDarkMode }: StaticPagesProps) {
  // Contact Us state
  const [contactName, setContactName] = useState('Alex Mercer');
  const [contactEmail, setContactEmail] = useState('alex.mercer@kinetic.com');
  const [contactMsg, setContactMsg] = useState('Seeking consultation regarding custom athletic sizing formula.');
  const [msgSent, setMsgSent] = useState(false);

  // FAQ accordion tracking
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgSent(true);
    setContactMsg('');
    setTimeout(() => {
      setMsgSent(false);
    }, 4500);
  };

  if (viewType === 'about') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-16 space-y-16">
        {/* About Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-red-655 text-red-600 uppercase">
            KINETIC ARCHITECTURE LABS
          </span>
          <h1 className={`text-4xl sm:text-5xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            THE CHROMATIC PLEDGE
          </h1>
          <p className="text-xs sm:text-sm opacity-70 max-w-2xl mx-auto text-neutral-450 leading-relaxed font-semibold">
            Designing supercritical energy feedback composites for high-velocity athletes. Fusing track speed mechanics with elite streetwear aesthetics.
          </p>
        </div>

        {/* Cinematic Manifesto block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              LABS FOR HIGH SPEED SPORTS FOOTWEAR STRUCTURES
            </h2>
            <p className="text-xs font-medium leading-relaxed opacity-85">
              Kinetic was established inside Munich and Manhattan laboratories in 2024 to disrupt the elite marathon segment. By coupling Nitrogen-infused foam compounds with spoon-shaped carbon propulsion plates, we engineered shoes that do not merely cushion—they leverage.
            </p>
            <p className="text-xs font-medium leading-relaxed opacity-85">
              Every compound, knit loom, and heel counter undergoes rigorous track test programs conducted inside micro-climate altitude labs. Today, Kinetic equips pro racers and lifestyle collectors globally, maintaining absolute carbon offsets.
            </p>
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden border">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
              alt="Propulsion Shoe Research"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-red-600/10 mix-blend-color"></div>
          </div>
        </div>

        {/* Technical standards list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`p-6 border rounded-sm ${isDarkMode ? 'bg-neutral-900/10 border-neutral-850' : 'bg-neutral-50/50 border-neutral-150'}`}>
            <span className="font-mono text-3xl font-black text-red-650 block">87%</span>
            <span className={`text-xs block font-mono font-black uppercase py-1 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              ENERGY RETURN FEEDBACK
            </span>
            <p className="text-xs opacity-75 mt-1.5 leading-relaxed">Recorded inside independent track test registries utilizing our elite Nitrogen-infused Aero-Foam cushioning matrix.</p>
          </div>

          <div className={`p-6 border rounded-sm ${isDarkMode ? 'bg-neutral-900/10 border-neutral-850' : 'bg-neutral-50/50 border-neutral-150'}`}>
            <span className="font-mono text-3xl font-black text-red-650 block">Parley-50</span>
            <span className={`text-xs block font-mono font-black uppercase py-1 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              OCEAN KNIT MATRIX
            </span>
            <p className="text-xs opacity-75 mt-1.5 leading-relaxed">Half of all synthetic weave yarn is composed of recycled ocean-bound marine plastic polymers collected with Parley.</p>
          </div>

          <div className={`p-6 border rounded-sm ${isDarkMode ? 'bg-neutral-900/10 border-neutral-850' : 'bg-neutral-50/50 border-neutral-150'}`}>
            <span className="font-mono text-3xl font-black text-red-650 block">COMP-3D</span>
            <span className={`text-xs block font-mono font-black uppercase py-1 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              CARBON FIBER CHASSIS
            </span>
            <p className="text-xs opacity-75 mt-1.5 leading-relaxed">Proprietary spoon curve structure stabilizing pressure transition between heels and anterior toes.</p>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise view is 'contact'
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-16 space-y-16">
      {/* Contact Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-red-605 text-red-600 uppercase">
          CLIENT CONCIERGE RELATIONS
        </span>
        <h1 className={`text-4xl sm:text-5xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
          CONTACT & HELPDESK
        </h1>
        <p className="text-xs sm:text-sm opacity-70 max-w-2xl mx-auto text-neutral-450 leading-relaxed font-semibold">
          Connect with our client relations desk regarding size calibrations, pro registration credits, and shipment logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column Contact Form (7 Grid Columns) */}
        <form onSubmit={handleContactSubmit} className="lg:col-span-7 space-y-6">
          <div className={`p-6 border rounded-sm ${isDarkMode ? 'bg-neutral-900/15 border-neutral-850' : 'bg-neutral-50/50 border-neutral-150'}`}>
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase mb-5 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              DISPATCH CLIENT TICKET
            </h3>

            {msgSent && (
              <p className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono font-bold mb-4 rounded-sm flex items-center space-x-1.5 animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>COMPLIMENTED: Ticket sent successfully! A concierge will reply shortly.</span>
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="opacity-70 uppercase tracking-widest text-[9px] font-mono">Athlete Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="opacity-70 uppercase tracking-widest text-[9px] font-mono">Mail address</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
                  }`}
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="opacity-70 uppercase tracking-widest text-[9px] font-mono">Feedback message body</label>
                <textarea
                  required
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none resize-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
                  }`}
                />
              </div>
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              className={`mt-6 px-6 py-3.5 text-xs font-mono font-bold tracking-widest uppercase rounded-sm flex items-center space-x-2 transition-colors ${
                isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
              }`}
            >
              <span>SEND COVENANT DISPATCH</span>
            </button>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="space-y-4">
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              FAQ / PROTOCOLS DATABASE
            </h3>

            <div className="divide-y divide-neutral-100 dark:divide-neutral-900 border rounded-sm overflow-hidden border-neutral-150 dark:border-neutral-850">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} id={`faq-accordion-${index}`} className={isDarkMode ? 'bg-neutral-955 bg-neutral-900/10' : 'bg-white'}>
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-xs sm:text-xs font-extrabold uppercase tracking-wide text-left flex justify-between items-center outline-none border-0"
                    >
                      <span className={isDarkMode ? 'text-white' : 'text-neutral-950'}>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform opacity-60 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4.5 text-xs leading-relaxed opacity-80 font-medium border-t border-dashed border-neutral-100 dark:border-neutral-900 pt-2.5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        {/* Right Column Coordinates map & contacts (5 Grid Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 border rounded-sm ${
            isDarkMode ? 'bg-neutral-900/40 border-neutral-850' : 'bg-white border-neutral-152 border-neutral-150'
          } space-y-6`}>
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              LOCATION COORDINATES
            </h3>

            {/* Premium, clean visual stylized map mockup block */}
            <div className="relative aspect-video rounded-sm overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center p-4">
              {/* Retro stylized coordinate grid */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

              {/* Dynamic location vector ring */}
              <div className="relative z-10 flex flex-col items-center space-y-2 text-center text-white">
                <MapPin className="w-8 h-8 text-red-650 animate-bounce text-red-650" />
                <span className="text-[11px] font-mono tracking-widest uppercase font-black">Velocity Room 100</span>
                <p className="text-[9px] font-mono opacity-60">Latitude: 40.7128° N, Longitude: 74.0060° W</p>
                <p className="text-[8px] font-mono opacity-50 uppercase tracking-widest bg-red-600/20 px-2 py-0.5 rounded-sm">Kinetic HQ NY</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold tracking-wide">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-60" />
                <span>742 Ocean Velocity Drive, Suite 100, Manhattan, NY 10001</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 shrink-0 opacity-60" />
                <span>+1 (800) 555-KNT-RUNS (9 AM - 6 PM EST)</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 shrink-0 opacity-60" />
                <span>concierge@kinetic-sportswear.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
