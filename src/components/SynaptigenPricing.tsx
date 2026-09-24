import React from 'react';
import { SYNAPTIGEN_BUNDLES, BundlePlan } from '../data/synaptigenData';
import { TrustSeals } from './TrustSeals';
import { ShoppingCart, Check, Truck, Lock, Star } from 'lucide-react';

interface SynaptigenPricingProps {
  onSelectBundle: (bundleId: string) => void;
}

export const SynaptigenPricing: React.FC<SynaptigenPricingProps> = ({ onSelectBundle }) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Forest Green Banner (Matches Screenshot 4 Top) */}
        <div className="bg-[#0f382c] text-white py-4 px-6 rounded-2xl text-center mb-12 shadow-md">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
            Claim Your Discounted Synaptigen While Stocks Last!
          </h2>
        </div>

        {/* 3 Pricing Cards Grid (Exact Match to Screenshot 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto mb-16">
          {SYNAPTIGEN_BUNDLES.map((plan) => {
            const isBestValue = plan.type === 'BEST VALUE!';

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isBestValue
                    ? 'border-2 border-teal-500 shadow-2xl bg-white -translate-y-2 ring-4 ring-teal-50'
                    : 'border border-slate-200 bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Top Header Strip */}
                <div
                  className={`py-3 text-center text-white font-extrabold tracking-wider uppercase text-sm ${
                    isBestValue ? 'bg-[#0f382c]' : 'bg-[#198774]'
                  }`}
                >
                  {plan.type}
                </div>

                {/* Card Main Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col items-center text-center">
                  
                  {/* Bottles Label & Supply */}
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
                    {plan.bottlesLabel}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5 mb-3">
                    {plan.supplyDays} DAY SUPPLY
                  </p>

                  {/* Bottle Visual with Optional Best Value Badge */}
                  <div className="relative w-full h-44 flex items-center justify-center my-2">
                    {isBestValue && (
                      <div className="absolute top-0 right-4 z-10 w-12 h-12 rounded-full bg-red-600 text-white flex flex-col items-center justify-center text-[8px] font-black uppercase shadow-md leading-tight -rotate-12 border-2 border-white">
                        <span>BEST</span>
                        <span>VALUE</span>
                      </div>
                    )}
                    <img
                      src={plan.image}
                      alt={plan.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter drop-shadow-md"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-center gap-1 mt-2 mb-3">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
                      ${plan.pricePerBottle}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      / Bottle
                    </span>
                  </div>

                  {/* Badges Stack (Matches Screenshot 4) */}
                  <div className="w-full space-y-1.5 mb-5 text-xs font-bold">
                    {/* You Save Badge */}
                    <div
                      className={`py-1 px-3 rounded-full flex items-center justify-center gap-1 text-[11px] ${
                        isBestValue
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>YOU SAVE ${plan.savings}!</span>
                    </div>

                    {/* Biggest Discount Badge for 6-bottle */}
                    {isBestValue && (
                      <div className="py-1 px-3 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>BIGGEST DISCOUNT</span>
                      </div>
                    )}

                    {/* 180 Days Guarantee Badge */}
                    <div className="py-1 px-3 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>180 DAYS GUARANTEE</span>
                    </div>

                    {/* Free eBooks Badge */}
                    {plan.freeEbooks && (
                      <div className="py-1 px-3 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>3 FREE EBOOKS!</span>
                      </div>
                    )}
                  </div>

                  {/* BUY NOW Button (Dark Teal) */}
                  <button
                    onClick={() => onSelectBundle(plan.id)}
                    className="w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider text-white bg-[#0f382c] hover:bg-[#154a3a] shadow-lg hover:shadow-xl transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>BUY NOW</span>
                  </button>

                  {/* Shipping Fee */}
                  <div className="mt-3 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5">
                    {plan.freeShipping ? (
                      <>
                        <Truck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Free Shipping</span>
                      </>
                    ) : (
                      <span>+ $9.99 Shipping</span>
                    )}
                  </div>

                  {/* Card Payment Logos Simulation */}
                  <div className="mt-3 flex items-center justify-center gap-2 opacity-80">
                    <span className="text-[10px] font-bold tracking-tight text-blue-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      VISA
                    </span>
                    <span className="text-[10px] font-bold tracking-tight text-sky-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      PayPal
                    </span>
                    <span className="text-[10px] font-bold tracking-tight text-red-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      Mastercard
                    </span>
                    <span className="text-[10px] font-bold tracking-tight text-orange-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      DISCOVER
                    </span>
                    <span className="text-[10px] font-bold tracking-tight text-blue-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      AMEX
                    </span>
                  </div>

                  {/* Total Amount (Matches Screenshot 4) */}
                  <div className="mt-3 pt-3 border-t border-slate-100 w-full text-xs font-bold text-slate-700">
                    TOTAL: <span className="line-through text-slate-400 font-normal">${plan.originalPrice}</span>{' '}
                    <strong className="text-slate-900 font-black text-sm">${plan.totalPrice}</strong>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Review Summary (Matches Screenshot 4) */}
        <div className="text-center space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-sm text-slate-700 font-bold">
            <span>Our customers say</span>
            <div className="flex text-teal-600">
              {'★★★★★'.split('').map((_, i) => (
                <span key={i} className="text-base">★</span>
              ))}
            </div>
            <span className="uppercase text-xs tracking-wider text-slate-600">
              BASED ON 12,643 REVIEWS!
            </span>
          </div>

          {/* Repeated Trust Seals (Matches Screenshot 4 Bottom) */}
          <div className="pt-4 flex justify-center">
            <TrustSeals />
          </div>
        </div>

      </div>
    </section>
  );
};
