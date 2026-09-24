import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

interface SynaptigenHeaderProps {
  onOrderClick: () => void;
  cartCount?: number;
}

export const SynaptigenHeader: React.FC<SynaptigenHeaderProps> = ({ onOrderClick, cartCount = 1 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Wordmark (Exact from screenshot 2) */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
            SYNAPTIGEN
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#ingredients" className="hover:text-teal-700 transition-colors">
            Ingredients
          </a>
          <a href="#bonuses" className="hover:text-teal-700 transition-colors">
            FREE Bonuses
          </a>
          <a href="#faq" className="hover:text-teal-700 transition-colors">
            FAQ
          </a>
          <a href="#references" className="hover:text-teal-700 transition-colors">
            References
          </a>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOrderClick}
            className="hidden sm:inline-flex items-center justify-center px-7 py-2.5 rounded-full text-sm font-semibold text-white bg-[#198774] hover:bg-[#137161] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Order Now
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-teal-700 focus:outline-none"
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
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1"
          >
            Ingredients
          </a>
          <a
            href="#bonuses"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1"
          >
            FREE Bonuses
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1"
          >
            Special Discount Offers
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1"
          >
            FAQ
          </a>
          <a
            href="#references"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1"
          >
            Clinical References
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full py-3 rounded-full text-sm font-semibold text-white bg-[#198774] hover:bg-[#137161] shadow cursor-pointer text-center"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
