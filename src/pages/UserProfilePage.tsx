import React, { useState } from 'react';
import { User, ClipboardList, Shield, Award, HelpCircle, LogOut, Phone, MapPin, CheckCircle, Truck } from 'lucide-react';
import { Order, UserProfile } from '../types';
import { SAMPLE_USER } from '../data';

interface UserProfileProps {
  isDarkMode: boolean;
  orders: Order[];
  onLogout: () => void;
  setActiveTab: (tab: string) => void;
  setTrackingTargetId: (id: string) => void;
}

export default function UserProfilePage({
  isDarkMode,
  orders,
  onLogout,
  setActiveTab,
  setTrackingTargetId,
}: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfile>(SAMPLE_USER);
  const [profileSavedMsg, setProfileSavedMsg] = useState('');

  const [preferredSize, setPreferredSize] = useState(profile.preferredSize);
  const [phone, setPhone] = useState(profile.phone);
  const [street, setStreet] = useState(profile.address.street);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      phone,
      preferredSize,
      address: { ...prev.address, street },
    }));
    setProfileSavedMsg('SAVED: Profile ledger updated successfully!');
    setTimeout(() => setProfileSavedMsg(''), 4000);
  };

  const handleTrackOrderFromProfile = (id: string) => {
    setTrackingTargetId(id);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="space-y-2 mb-8 border-b pb-6 border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-red-655 text-red-605 text-red-600 uppercase">
            ATHLETE CENTRAL DESK
          </span>
          <h1 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            ELITE MEMBER PROFILE
          </h1>
        </div>

        <button
          id="profile-logout-btn"
          onClick={onLogout}
          className="px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border border-red-650/40 hover:bg-red-500 hover:text-white transition-colors text-red-500 rounded-sm w-fit"
        >
          DISCONNECT SESSION
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form details (7 grid cols) */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-7 space-y-6">
          <div className={`p-6 border rounded-sm ${isDarkMode ? 'bg-neutral-900/10 border-neutral-850' : 'bg-neutral-50/50 border-neutral-150'}`}>
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              <User className="w-4 h-4 mr-2 opacity-70" />
              <span>MEMBER BIO PROFILE LEDGER</span>
            </h3>

            {profileSavedMsg && (
              <p className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono font-bold mb-4 rounded-sm">
                {profileSavedMsg}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1.5 opacity-80">
                <span className="opacity-50 uppercase tracking-widest text-[9px] font-mono block">Registered Name</span>
                <span className="text-sm font-black uppercase tracking-tight block">{profile.name}</span>
              </div>

              <div className="space-y-1.5 opacity-80">
                <span className="opacity-50 uppercase tracking-widest text-[9px] font-mono block">Ingress Email</span>
                <span className="text-sm font-bold block">{profile.email}</span>
              </div>

              <div className="space-y-1.5">
                <label className="opacity-50 uppercase tracking-widest text-[9px] font-mono block">Active Contact Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-955 bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-205 border-neutral-200'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="opacity-50 uppercase tracking-widest text-[9px] font-mono block">Size Matrix Preference</label>
                <select
                  value={preferredSize}
                  onChange={(e) => setPreferredSize(e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-mono font-bold focus:outline-none appearance-none cursor-pointer ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-950'
                  }`}
                >
                  <option value="US 8 / App Small">US 8 / Apparel Small</option>
                  <option value="US 9 / App Medium">US 9 / Apparel Medium</option>
                  <option value="US 10 / App Medium">US 10 / Apparel Medium</option>
                  <option value="US 11 / App Large">US 11 / Apparel Large</option>
                  <option value="US 12 / App XL">US 12 / Apparel XL</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="opacity-50 uppercase tracking-widest text-[9px] font-mono block">Registry Destination Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
                  }`}
                />
              </div>
            </div>

            <button
              id="profile-save-btn"
              type="submit"
              className={`mt-6 px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-colors ${
                isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
              }`}
            >
              SAVE UPDATES
            </button>
          </div>

          {/* Elite level details */}
          <div className={`p-6 border rounded-sm flex items-start space-x-4 ${isDarkMode ? 'bg-neutral-950/40 border-neutral-900' : 'bg-neutral-50 border-neutral-200'}`}>
            <div className="p-3 bg-red-650/10 text-red-500 rounded-sm shrink-0 border border-red-500/20">
              <Award className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-mono font-black uppercase text-red-650 tracking-wider">PLATINUM LEVEL COVENANT MEMBER</p>
              <h4 className="text-xl font-black uppercase tracking-tight mt-1 leading-none text-neutral-950 dark:text-white">ALEX MERCER</h4>
              <p className="text-xs opacity-75 mt-2 leading-relaxed">Member registration verified since December 2024. You qualify for an automatic, priority booking formula on highly restricted limited sneaker releases.</p>
            </div>
          </div>
        </form>

        {/* Right Column: Order List records (5 grid cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 border rounded-sm ${
            isDarkMode ? 'bg-neutral-900/40 border-neutral-850' : 'bg-white border-neutral-150 shadow-sm'
          }`}>
            <h3 className={`text-xs font-mono font-black tracking-widest uppercase mb-5 flex items-center ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              <ClipboardList className="w-4 h-4 mr-2 opacity-70" />
              <span>INVOICES / PROCUREMENT HISTORY ({orders.length})</span>
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-10 opacity-50 font-mono text-xs">
                No purchases currently registered inside this active session.
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 dark:divide-neutral-900 max-h-96 overflow-y-auto">
                {orders.map((track) => (
                  <div key={track.id} id={`profile-order-${track.id}`} className="py-4 space-y-3">
                    <div className="flex justify-between items-baseline text-xs">
                      <div>
                        <span className="font-mono font-bold text-red-500 block">{track.id}</span>
                        <span className="opacity-50 text-[10px] block">{track.date}</span>
                      </div>
                      <span className={`px-2.5 py-1 text-[9px] font-mono uppercase font-black tracking-widest rounded-sm ${
                        track.status === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {track.status}
                      </span>
                    </div>

                    {/* Products summary inline */}
                    <div className="text-[11px] font-semibold opacity-75 space-y-1">
                      {track.items.map((it, i) => (
                        <p key={i} className="truncate">
                          {it.quantity}x {it.productName} ({it.selectedSize})
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1.5">
                      <span className="font-mono font-black">${track.total.toFixed(2)}</span>
                      <button
                        onClick={() => handleTrackOrderFromProfile(track.id)}
                        className="font-mono text-[10px] font-bold text-red-600 uppercase flex items-center space-x-1 hover:underline"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>TRACK SHIPMENT</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
