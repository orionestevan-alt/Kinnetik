import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, User, Mail, ShieldAlert } from 'lucide-react';

interface AuthProps {
  isDarkMode: boolean;
  onLoginSuccess: (user: { name: string; email: string }) => void;
  setActiveTab: (tab: string) => void;
}

export default function Auth({ isDarkMode, onLoginSuccess, setActiveTab }: AuthProps) {
  const [isLoginState, setIsLoginState] = useState(true);
  const [email, setEmail] = useState('alex.mercer@kinetic.com');
  const [password, setPassword] = useState('********');
  const [fullName, setFullName] = useState('Alex Mercer');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(isLoginState ? 'AUTHENTICATING SECURE PROTOCOL...' : 'CREATING ATHLETE PROFILE COVENANT...');

    setTimeout(() => {
      onLoginSuccess({
        name: isLoginState ? fullName : 'Alex Mercer',
        email: email,
      });
      setSuccess('');
      setActiveTab('profile'); // Jump directly to user dashboard
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      {/* Upper header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-red-650 uppercase">
          {isLoginState ? 'KINETIC ELITE SYSTEM LEVEL' : 'XC COVENANT ATHLETE PLATFORM'}
        </span>
        <h1 className={`text-3xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
          {isLoginState ? 'MEMBER INGRESS' : 'CREATE REGISTRY'}
        </h1>
        <p className="text-xs opacity-60">
          {isLoginState
            ? 'Sign in to access your size templates and live order tracking.'
            : 'Join the covenant today to unlock an instant 15% off Speed coupon.'}
        </p>
      </div>

      {success && (
        <p className="p-3 bg-red-650/10 text-red-500 border border-red-650/20 text-xs font-mono font-bold text-center animate-pulse rounded-sm">
          {success}
        </p>
      )}

      {/* Main Form Frame */}
      <form onSubmit={handleSubmit} className={`p-6 sm:p-8 border rounded-sm ${
        isDarkMode ? 'bg-neutral-900/30 border-neutral-850 shadow-black' : 'bg-white border-neutral-150 shadow-sm'
      } space-y-4`}>
        {!isLoginState && (
          <div className="space-y-1.5 text-xs font-semibold">
            <label className="opacity-70 uppercase tracking-widest text-[9px] font-mono">Full Athlete Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
                isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
              }`}
            />
          </div>
        )}

        <div className="space-y-1.5 text-xs font-semibold">
          <label className="opacity-70 uppercase tracking-widest text-[9px] font-mono">Email string address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border rounded-sm text-xs font-bold focus:outline-none ${
              isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
            }`}
          />
        </div>

        <div className="space-y-1.5 text-xs font-semibold">
          <div className="flex justify-between items-baseline">
            <label className="opacity-70 uppercase tracking-widest text-[9px] font-mono">Password encryption token</label>
            {isLoginState && (
              <button type="button" className="text-[10px] underline tracking-tight opacity-40 hover:opacity-150">
                Forgotten Key?
              </button>
            )}
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-sm font-mono text-xs font-bold focus:outline-none ${
              isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-200'
            }`}
          />
        </div>

        {/* Dynamic CTA */}
        <button
          type="submit"
          className={`w-full py-4 text-xs font-mono font-bold tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 shadow-md pt-4 ${
            isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-850'
          }`}
        >
          <span>{isLoginState ? 'AUTHENTICATE PROFILE' : 'ENROLL ATHLETE COVENANT'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Toggle Form type link */}
        <div className="text-center pt-4 border-t border-dotted border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setIsLoginState(!isLoginState)}
            className="opacity-75 hover:opacity-100 hover:text-red-500 hover:underline transition-all"
          >
            {isLoginState ? "Don't have a profile? Create one inside 60s" : 'Already enrolled inside the registry? Lock in'}
          </button>
        </div>
      </form>

      {/* Elite club benefits */}
      <div className={`p-4 border rounded-sm flex items-start space-x-3 text-xs leading-relaxed ${
        isDarkMode ? 'bg-neutral-950/40 border-neutral-900' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <ShieldCheck className="w-5 h-5 text-red-650 shrink-0 mt-0.5 text-red-600" />
        <div>
          <p className="font-bold uppercase tracking-wider text-[10px]">KINETIC MEMBER PERQUISITES</p>
          <p className="opacity-70 mt-1">Acquire priority invitations to regional track testing sessions, complimentary shipping bounds, standard order track logs, and first deployment alerts.</p>
        </div>
      </div>
    </div>
  );
}
