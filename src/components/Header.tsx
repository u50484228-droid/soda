import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, Zap, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenCheckout: (bundleId?: string) => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCheckout, cartCount }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 58, seconds: 43 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Urgency Ticker Bar */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 border-b border-purple-800/40 text-xs py-2 px-4 text-center text-purple-100 flex items-center justify-center gap-2 font-medium">
        <span className="flex items-center gap-1.5 text-amber-300 font-semibold tracking-wide uppercase text-[11px]">
          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
          Special Flash Offer
        </span>
        <span className="text-purple-300">·</span>
        <span>Offer Ends In:</span>
        <span className="font-mono bg-purple-950/80 px-2 py-0.5 rounded text-amber-300 font-bold tracking-wider tabular-nums border border-purple-700/50">
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="hidden sm:inline text-purple-300">·</span>
        <span className="hidden sm:inline text-purple-200">Free Express US Shipping on 3 & 6 Bottle Orders</span>
      </div>

      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#140824]/95 backdrop-blur-md shadow-lg shadow-purple-950/30 border-b border-purple-900/40 py-3'
            : 'bg-[#12071f]/80 backdrop-blur-sm border-b border-purple-900/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-md shadow-purple-600/30">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                SODATIDE<span className="text-purple-400 text-xs align-top">®</span>
              </span>
              <span className="text-[10px] tracking-widest text-purple-300/70 font-semibold uppercase -mt-1">
                Metabolic Science
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-purple-200/80">
            <a href="#benefits" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#ingredients" className="hover:text-white transition-colors">
              Ingredients
            </a>
            <a href="#results" className="hover:text-white transition-colors">
              Timeline
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#references" className="hover:text-white transition-colors">
              Clinical Studies
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenCheckout('bundle-6')}
              className="relative p-2 text-purple-200 hover:text-white transition-colors rounded-lg hover:bg-purple-900/30"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-purple-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="#pricing"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Claim 50% Off
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-purple-200 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#180a2c] border-b border-purple-800/40 px-5 py-4 space-y-3">
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-purple-200 hover:text-white py-1"
            >
              How It Works
            </a>
            <a
              href="#ingredients"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-purple-200 hover:text-white py-1"
            >
              Clinical Ingredients
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-purple-200 hover:text-white py-1"
            >
              Verified Reviews
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-purple-200 hover:text-white py-1"
            >
              Discount Bundles
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-purple-200 hover:text-white py-1"
            >
              Frequently Asked Questions
            </a>
            <div className="pt-2">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 px-4 text-xs font-bold text-purple-950 bg-gradient-to-r from-amber-300 to-amber-400 rounded-lg shadow"
              >
                Claim Discounted SodaTide Now
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
