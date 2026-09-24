import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface PricingSectionVibrantProps {
  onSelectBundle: (bundleId: string) => void;
}

export const PricingSectionVibrant: React.FC<PricingSectionVibrantProps> = ({ onSelectBundle }) => {
  return (
    <section id="pricing" className="pb-16 pt-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Pricing Cards Grid (Exact Match to Screenshot 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Card 1: Basic Offer (2 Bottles) */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-900/30 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
            {/* Top Purple Header */}
            <div className="bg-[#38034e] text-white py-2.5 px-4 text-center text-sm font-bold tracking-wide">
              Basic Offer
            </div>

            <div className="p-6 flex-1 flex flex-col items-center text-center text-slate-900">
              <h3 className="text-2xl font-black tracking-tight font-heading">
                2 BOTTLES
              </h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                60 Day Supply
              </p>

              {/* Bottle Image */}
              <div className="w-full h-40 flex items-center justify-center my-2">
                <img
                  src="/src/assets/images/sodatide_pedestal_bottle_1790284706220.jpg"
                  alt="2 Bottles of SodaTide"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center gap-1 my-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-heading">
                  $79
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Per Bottle
                </span>
              </div>

              {/* Badges Stack */}
              <div className="w-full space-y-1 my-3 text-xs font-bold">
                <div className="flex items-center justify-center gap-1.5 text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                  <span>YOU SAVE $200</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                  <span>60 DAYS GUARANTEE</span>
                </div>
              </div>

              {/* Gray Button */}
              <button
                onClick={() => onSelectBundle('basic-2')}
                className="w-full mt-2 py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-slate-300 hover:bg-slate-400 text-slate-950 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>BUY NOW!</span>
              </button>

              {/* Payment Card Logos */}
              <div className="mt-4 flex items-center justify-center gap-2 opacity-80">
                <span className="text-[10px] font-extrabold text-blue-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  VISA
                </span>
                <span className="text-[10px] font-extrabold text-red-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Mastercard
                </span>
                <span className="text-[10px] font-extrabold text-orange-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  DISCOVER
                </span>
                <span className="text-[10px] font-extrabold text-blue-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  AMEX
                </span>
              </div>

              {/* Total & Shipping */}
              <div className="mt-4 pt-3 border-t border-slate-200 w-full text-xs">
                <p className="font-bold text-slate-700">
                  TOTAL: <span className="line-through text-slate-400 font-normal">$358</span>{' '}
                  <strong className="text-slate-950 text-sm">$158</strong>
                </p>
                <p className="text-xs font-black text-slate-900 mt-0.5">
                  + 9.99 SHIPPING
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: BEST OFFER! (6 Bottles - Center Highlighted) */}
          <div className="bg-gradient-to-b from-[#40075a] via-[#35024b] to-[#260037] text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 flex flex-col justify-between transform md:-translate-y-3 ring-4 ring-amber-400/20">
            {/* Top White / Purple Header */}
            <div className="bg-[#240033] border-b border-amber-400/50 text-amber-300 py-2.5 px-4 text-center text-sm font-black tracking-widest uppercase">
              ★ BEST OFFER! ★
            </div>

            <div className="p-6 flex-1 flex flex-col items-center text-center">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-heading text-white">
                6 BOTTLES
              </h3>
              <p className="text-xs text-purple-200 font-semibold uppercase tracking-wider mb-2">
                180 Day Supply
              </p>

              {/* Bottle Image */}
              <div className="w-full h-40 flex items-center justify-center my-2">
                <img
                  src="/src/assets/images/sodatide_bundle_six_1790283218233.jpg"
                  alt="6 Bottles of SodaTide Best Offer"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain filter drop-shadow-xl"
                />
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center gap-1 my-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-heading">
                  $49
                </span>
                <span className="text-xs font-bold text-purple-200">
                  Per Bottle
                </span>
              </div>

              {/* Badges Stack with Yellow Checks */}
              <div className="w-full space-y-1.5 my-3 text-xs font-bold">
                <div className="flex items-center justify-center gap-1.5 text-amber-300">
                  <span className="w-4 h-4 rounded-full bg-[#ffdd00] text-purple-950 flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                  <span>YOU SAVE $780</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-purple-100">
                  <span className="w-4 h-4 rounded-full bg-[#ffdd00] text-purple-950 flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                  <span>BIGGEST DISCOUNT</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-purple-100">
                  <span className="w-4 h-4 rounded-full bg-[#ffdd00] text-purple-950 flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                  <span>60 DAYS GUARANTEE</span>
                </div>
              </div>

              {/* Bright Yellow Luminous Button (Exact from Screenshot 1) */}
              <button
                onClick={() => onSelectBundle('best-value-6')}
                className="w-full mt-2 py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider bg-[#ffdd00] hover:bg-[#ffe533] text-purple-950 shadow-xl shadow-amber-400/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-purple-950" />
                <span>BUY NOW!</span>
              </button>

              {/* Blue Payment Card Logos Bar */}
              <div className="mt-4 flex items-center justify-center gap-2 bg-[#1b0028]/80 py-1.5 px-3 rounded-lg border border-purple-800/60">
                <span className="text-[10px] font-extrabold text-blue-400">
                  VISA
                </span>
                <span className="text-purple-600">·</span>
                <span className="text-[10px] font-extrabold text-red-400">
                  Mastercard
                </span>
                <span className="text-purple-600">·</span>
                <span className="text-[10px] font-extrabold text-orange-400">
                  DISCOVER
                </span>
                <span className="text-purple-600">·</span>
                <span className="text-[10px] font-extrabold text-sky-400">
                  AMEX
                </span>
              </div>

              {/* Total & Free Shipping in Vibrant Yellow */}
              <div className="mt-4 pt-3 border-t border-purple-800/60 w-full text-xs">
                <p className="font-bold text-purple-200">
                  TOTAL: <span className="line-through text-purple-400 font-normal">$1074</span>{' '}
                  <strong className="text-white text-sm font-black">$294</strong>
                </p>
                <p className="text-xs font-black text-[#ffdd00] mt-0.5 uppercase tracking-wider">
                  + FREE SHIPPING
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Most Popular (3 Bottles) */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-900/30 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
            {/* Top Purple Header */}
            <div className="bg-[#38034e] text-white py-2.5 px-4 text-center text-sm font-bold tracking-wide">
              Most Popular
            </div>

            <div className="p-6 flex-1 flex flex-col items-center text-center text-slate-900">
              <h3 className="text-2xl font-black tracking-tight font-heading">
                3 BOTTLES
              </h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                90 Day Supply
              </p>

              {/* Bottle Image */}
              <div className="w-full h-40 flex items-center justify-center my-2">
                <img
                  src="/src/assets/images/sodatide_hero_bottles_1790283206925.jpg"
                  alt="3 Bottles of SodaTide"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center gap-1 my-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-heading">
                  $69
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Per Bottle
                </span>
              </div>

              {/* Badges Stack */}
              <div className="w-full space-y-1 my-3 text-xs font-bold">
                <div className="flex items-center justify-center gap-1.5 text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                  <span>YOU SAVE $330</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center text-[10px] font-black">
                    ✓
                  </span>
                  <span>60 DAYS GUARANTEE</span>
                </div>
              </div>

              {/* Gray Button */}
              <button
                onClick={() => onSelectBundle('popular-3')}
                className="w-full mt-2 py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-slate-300 hover:bg-slate-400 text-slate-950 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>BUY NOW!</span>
              </button>

              {/* Payment Card Logos */}
              <div className="mt-4 flex items-center justify-center gap-2 opacity-80">
                <span className="text-[10px] font-extrabold text-blue-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  VISA
                </span>
                <span className="text-[10px] font-extrabold text-red-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Mastercard
                </span>
                <span className="text-[10px] font-extrabold text-orange-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  DISCOVER
                </span>
                <span className="text-[10px] font-extrabold text-blue-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  AMEX
                </span>
              </div>

              {/* Total & Shipping */}
              <div className="mt-4 pt-3 border-t border-slate-200 w-full text-xs">
                <p className="font-bold text-slate-700">
                  TOTAL: <span className="line-through text-slate-400 font-normal">$537</span>{' '}
                  <strong className="text-slate-950 text-sm">$207</strong>
                </p>
                <p className="text-xs font-black text-slate-900 mt-0.5 uppercase tracking-wider">
                  + FREE SHIPPING
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
