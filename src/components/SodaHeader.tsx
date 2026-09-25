import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SodaHeaderProps {
  onOrderClick: () => void;
}

export const SodaHeader: React.FC<SodaHeaderProps> = ({ onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center gap-1.5">
          <span className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-heading">
            SODATIDE<span className="text-purple-600 text-xs sm:text-sm align-top">®</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-700">
          <a href="#ingredients" className="hover:text-purple-700 transition-colors">
            Ingredients
          </a>
          <a href="#pricing" className="hover:text-purple-700 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-purple-700 transition-colors">
            FAQ
          </a>
          <a href="#references" className="hover:text-purple-700 transition-colors">
            References
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOrderClick}
            data-aff-track
            data-button-name="Header - Order Now"
            className="hidden sm:inline-flex items-center justify-center px-6 lg:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-md shadow-purple-600/20 hover:shadow-lg hover:shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Order Now
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-purple-700 focus:outline-none rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          <a
            href="#ingredients"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-purple-700 py-1"
          >
            Ingredients
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-purple-700 py-1"
          >
            Special Discount Offers
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-purple-700 py-1"
          >
            FAQ
          </a>
          <a
            href="#references"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-purple-700 py-1"
          >
            Clinical References
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow cursor-pointer text-center"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
