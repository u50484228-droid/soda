import React, { useState, useEffect } from 'react';
import { BUNDLE_OPTIONS, BundleOption } from '../data/supplementData';
import { ShieldCheck, Truck, Sparkles, Check, ArrowRight, Lock } from 'lucide-react';

interface PricingSectionProps {
  onSelectBundle: (bundleId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectBundle }) => {
  const [minutes, setMinutes] = useState(58);
  const [seconds, setSeconds] = useState(43);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev > 0) return prev - 1;
        setMinutes(m => (m > 0 ? m - 1 : 59));
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-20 bg-[#12071f] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Claim your Discounted <span className="text-amber-300">SodaTide</span> Below
          </h2>
          <p className="mt-2 text-sm text-purple-300">
            Select your package below to lock in the special promotional discount before the flash offer ends.
          </p>

          {/* Large Countdown Timer Box (Exact Match to Screenshot #2 & #4) */}
          <div className="mt-6 inline-flex flex-col items-center">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1e0a38] border border-purple-600/50 shadow-inner flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono">
                  {String(minutes).padStart(2, '0')}
                </div>
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-widest mt-1.5">
                  Minutes
                </span>
              </div>

              <span className="text-3xl font-extrabold text-purple-400 mb-5">:</span>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1e0a38] border border-purple-600/50 shadow-inner flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono">
                  {String(seconds).padStart(2, '0')}
                </div>
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-widest mt-1.5">
                  Seconds
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Free Shipping Banner Card (From Screenshot #2) */}
        <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-purple-900/60 via-[#2f0c52] to-purple-900/60 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              <Truck className="w-3.5 h-3.5" />
              Free Express US Shipping Included
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Every 6 Bottles Order Gets FREE Shipping Too!
            </h3>
            <p className="text-xs text-purple-200">
              *96% Of Customers Order 6 Bottles (Our Doctor-Recommended Option)
            </p>
            <p className="text-xs text-amber-300 font-semibold">
              60-Days Money Back Guarantee · 100% Satisfaction Guaranteed
            </p>
          </div>

          <button
            onClick={() => onSelectBundle('bundle-6')}
            className="shrink-0 px-7 py-3.5 rounded-xl bg-white text-purple-950 hover:bg-slate-100 font-extrabold text-xs tracking-wider uppercase shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            ORDER NOW (SAVE $294)
          </button>
        </div>

        {/* 3 Pricing Cards Grid (From Screenshots #4 & #8) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {BUNDLE_OPTIONS.map((bundle) => {
            const isBestValue = bundle.recommended;
            return (
              <div
                key={bundle.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isBestValue
                    ? 'bg-gradient-to-b from-[#2d0f50] via-[#1c0834] to-[#16072a] border-2 border-amber-400/80 shadow-2xl shadow-purple-900/60 -translate-y-2'
                    : 'bg-[#1a0b2e]/70 border border-purple-800/40 hover:border-purple-600/60 shadow-xl'
                }`}
              >
                {/* Header Header Strip */}
                <div
                  className={`py-4 px-6 text-center ${
                    isBestValue
                      ? 'bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 border-b border-amber-400/40'
                      : 'bg-purple-950/80 border-b border-purple-800/40'
                  }`}
                >
                  {isBestValue && (
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest text-purple-950 bg-gradient-to-r from-amber-300 to-yellow-300 px-3 py-0.5 rounded-full mb-1">
                      Doctor Recommended
                    </span>
                  )}
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {bundle.name}
                  </h3>
                  <p className="text-xs font-semibold text-purple-200">
                    {bundle.tagline}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col items-center text-center">
                  
                  {/* Bottle Package Image */}
                  <div className="w-full h-44 flex items-center justify-center py-2 mb-4">
                    <img
                      src={bundle.image}
                      alt={`${bundle.bottles} bottles of SodaTide`}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter drop-shadow-xl"
                    />
                  </div>

                  {/* Price Big Number */}
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-black text-white tracking-tight">
                      ${bundle.pricePerBottle}
                    </span>
                    <span className="text-xs text-purple-300 font-medium">
                      / Per Bottle
                    </span>
                  </div>

                  {/* Savings Tag */}
                  <div className="my-2">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-extrabold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                      YOU SAVE ${bundle.savings}
                    </span>
                  </div>

                  {/* Buy Now CTA Button */}
                  <button
                    onClick={() => onSelectBundle(bundle.id)}
                    className={`w-full mt-4 py-4 rounded-xl font-black text-sm tracking-wider uppercase shadow-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                      isBestValue
                        ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 text-purple-950 hover:from-amber-200 hover:to-yellow-300 shadow-amber-400/20'
                        : 'bg-purple-700 hover:bg-purple-600 text-white shadow-purple-900/40'
                    }`}
                  >
                    <span>BUY NOW!</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Guarantee Line */}
                  <div className="mt-4 text-center space-y-1 text-xs text-purple-300">
                    <p className="font-semibold text-purple-200">
                      60 Days Money-Back Guarantee
                    </p>
                    <p className="text-slate-400">
                      Total: <span className="line-through text-slate-500">${bundle.originalPrice}</span>{' '}
                      <strong className="text-white font-bold">${bundle.totalPrice}</strong>
                    </p>
                    <p className="text-xs font-bold text-emerald-400">
                      {bundle.freeShipping ? '+ FREE US Shipping' : '+ $9.95 Shipping'}
                    </p>
                  </div>

                  {/* Bonus Perks for bundle */}
                  {bundle.bonuses && (
                    <div className="mt-6 pt-4 border-t border-purple-800/40 w-full text-left space-y-2 text-xs text-purple-200">
                      {bundle.bonuses.map((bonus, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{bonus}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Footer of card */}
                <div className="py-2.5 bg-black/30 border-t border-purple-900/30 text-center text-[11px] text-purple-300/80 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-purple-400" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment and Guarantee Trust Row */}
        <div className="mt-12 text-center text-xs text-purple-300/70 max-w-xl mx-auto space-y-2">
          <p>
            Orders are processed immediately and ship in 24 hours. We accept Visa, Mastercard, American Express, Discover, and PayPal.
          </p>
        </div>

      </div>
    </section>
  );
};
