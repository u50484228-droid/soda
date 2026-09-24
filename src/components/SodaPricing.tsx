import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { TrustSeals } from './TrustSeals';
import { SODATIDE_BUNDLES, SodaBundlePlan } from '../data/sodatideModelData';

interface SodaPricingProps {
  onSelectBundle?: (bundleId: string) => void;
}

// Payment brand logos matching the photo exactly
const PaymentCardLogos: React.FC<{ isDarkBg?: boolean }> = ({ isDarkBg = false }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      {/* VISA */}
      <div className={`h-6 px-2 rounded flex items-center justify-center border ${
        isDarkBg ? 'bg-[#1a3f8b] border-[#2954a8]' : 'bg-white border-slate-300 shadow-2xs'
      }`}>
        <span className={`font-black italic text-[11px] tracking-tight ${isDarkBg ? 'text-white' : 'text-[#1a1f71]'}`}>
          VISA
        </span>
      </div>

      {/* Mastercard */}
      <div className={`h-6 px-1.5 rounded flex items-center justify-center gap-0.5 border ${
        isDarkBg ? 'bg-[#0f2452] border-[#2954a8]' : 'bg-white border-slate-300 shadow-2xs'
      }`}>
        <div className="flex -space-x-1 items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] opacity-90" />
        </div>
      </div>

      {/* Discover */}
      <div className={`h-6 px-1.5 rounded flex items-center justify-center border ${
        isDarkBg ? 'bg-[#ffffff] border-slate-200' : 'bg-white border-slate-300 shadow-2xs'
      }`}>
        <span className="font-bold text-[9px] tracking-tighter text-slate-900 flex items-center">
          DISC<span className="w-2 h-2 rounded-full bg-[#f26522] inline-block mx-px" />VER
        </span>
      </div>

      {/* Amex */}
      <div className={`h-6 px-1.5 rounded flex items-center justify-center border ${
        isDarkBg ? 'bg-[#006fcf] border-[#1d86e8]' : 'bg-[#006fcf] border-[#006fcf] shadow-2xs'
      }`}>
        <span className="font-black text-[8px] tracking-tighter text-white uppercase">
          AMEX
        </span>
      </div>
    </div>
  );
};

const BUYGOODS_URLS = {
  basic2: 'https://buygoods.com/secure/checkout.html?sessid2=sessid2026092401438432&aff_id=197118&account_id=12726&product_codename=PP_SDT2UNITS_AFF&redirect=aHR0cHM6Ly9pbXByb3ZpbmdvdXJoZWFsdGguY29tL3NkdC1hZmYtYnV5LXVwMS8%3D',
  bestValue6: 'https://buygoods.com/secure/checkout.html?sessid2=sessid2026092401438432&aff_id=197118&account_id=12726&product_codename=PP_SDT6UNITS_AFF&redirect=aHR0cHM6Ly9pbXByb3ZpbmdvdXJoZWFsdGguY29tL3NkdC1hZmYtYnV5LXVwMS1meDI%3D',
  popular3: 'https://buygoods.com/secure/checkout.html?sessid2=sessid2026092401438432&aff_id=197118&account_id=12726&product_codename=PP_SDT3UNITS_AFF&redirect=aHR0cHM6Ly9pbXByb3ZpbmdvdXJoZWFsdGguY29tL3NkdC1hZmYtYnV5LXVwMS8%3D',
};

export const SodaPricing: React.FC<SodaPricingProps> = () => {
  const basic2Url = BUYGOODS_URLS.basic2;
  const bestValue6Url = BUYGOODS_URLS.bestValue6;
  const popular3Url = BUYGOODS_URLS.popular3;

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Claim Your Discounted SodaTide While Stocks Last!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Select your package below and save up to $780 on your order today.
          </p>
        </div>

        {/* 3 Pricing Cards Grid (Exact Match to User Image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto mb-16">
          
          {/* ================= CARD 1: 2 BOTTLES (BASIC OFFER) ================= */}
          <div className="relative rounded-[2rem] border-2 border-[#3b0764] bg-white shadow-xl overflow-hidden flex flex-col justify-between p-4 sm:p-5">
            {/* Top Purple Header Bar */}
            <div className="bg-[#3b0764] text-white font-bold text-center py-2 px-4 rounded-t-2xl -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-5 text-sm sm:text-base tracking-wide">
              Basic Offer
            </div>

            <div className="flex flex-col items-center text-center">
              {/* Title & Supply */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                2 BOTTLES
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5 mb-3">
                60 Day Supply
              </p>

              {/* 2 Bottles Image */}
              <div className="w-full h-48 sm:h-52 flex items-center justify-center my-1">
                <img
                  src="/src/assets/images/sodatide_two_bottles_1790286567961.jpg"
                  alt="SodaTide 2 Bottles"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-1.5 my-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 self-start mt-1">$</span>
                <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter">79</span>
                <div className="flex flex-col text-left text-xs font-bold leading-tight text-slate-900">
                  <span>Per</span>
                  <span>Bottle</span>
                </div>
              </div>

              {/* You Save Badge */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#b45309] my-1">
                <span className="w-4 h-4 rounded-full border border-[#b45309] flex items-center justify-center text-[10px]">✓</span>
                <span>YOU SAVE $200</span>
              </div>

              {/* Dotted separator */}
              <div className="w-full border-b border-dotted border-slate-300 my-2.5" />

              {/* 60 Days Guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-900 mb-3">
                <span className="w-4 h-4 rounded-full border border-slate-900 flex items-center justify-center text-[10px]">✓</span>
                <span>60 DAYS GUARANTEE</span>
              </div>

              {/* BUY NOW Button (Light Grey Gradient) */}
              <a
                href={basic2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wide text-slate-900 bg-gradient-to-b from-[#d6d9de] via-[#cbcfd6] to-[#bdc2ca] hover:from-[#cbcfd6] hover:to-[#b0b5be] active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-300 no-underline"
              >
                <ShoppingCart className="w-4 h-4 fill-slate-900" />
                <span>BUY NOW!</span>
              </a>

              {/* Payment Cards */}
              <div className="my-3">
                <PaymentCardLogos isDarkBg={false} />
              </div>

              {/* Pricing Footer */}
              <div className="text-xs font-bold text-slate-900 space-y-0.5">
                <p>TOTAL: <span className="line-through font-normal text-slate-500">$358</span> <span className="font-extrabold text-sm">$158</span></p>
                <p className="font-black text-xs tracking-tight text-slate-900">+ 9.99 SHIPPING</p>
              </div>
            </div>
          </div>


          {/* ================= CARD 2: 6 BOTTLES (BEST OFFER! - PURPLE HIGHLIGHT) ================= */}
          <div className="relative rounded-[2rem] border-2 border-[#4c1d95] bg-[#33085a] text-white shadow-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-5 md:-translate-y-2 ring-2 ring-purple-300/30">
            {/* Top White Tab */}
            <div className="bg-white text-[#33085a] font-black text-center py-2.5 px-4 rounded-t-2xl -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-5 text-sm sm:text-base tracking-wider uppercase shadow-xs">
              BEST OFFER!
            </div>

            <div className="flex flex-col items-center text-center">
              {/* Title & Supply */}
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                6 BOTTLES
              </h3>
              <p className="text-xs sm:text-sm font-medium text-purple-200 mt-0.5 mb-3">
                180 Day Supply
              </p>

              {/* 6 Bottles Image */}
              <div className="w-full h-48 sm:h-52 flex items-center justify-center my-1">
                <img
                  src="/src/assets/images/sodatide_six_bottles_1790286579151.jpg"
                  alt="SodaTide 6 Bottles Bundle"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-1.5 my-2">
                <span className="text-xl sm:text-2xl font-bold text-white self-start mt-1">$</span>
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">49</span>
                <div className="flex flex-col text-left text-xs font-bold leading-tight text-white">
                  <span>Per</span>
                  <span>Bottle</span>
                </div>
              </div>

              {/* You Save Badge */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#facc15] my-1">
                <span className="w-4 h-4 rounded-full border border-[#facc15] flex items-center justify-center text-[10px]">✓</span>
                <span>YOU SAVE $780</span>
              </div>

              {/* Dotted separator */}
              <div className="w-full border-b border-dotted border-purple-400/40 my-2" />

              {/* Biggest Discount */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-white mb-1">
                <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px]">✓</span>
                <span>BIGGEST DISCOUNT</span>
              </div>

              {/* Dotted separator */}
              <div className="w-full border-b border-dotted border-purple-400/40 my-2" />

              {/* 60 Days Guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-white mb-3">
                <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px]">✓</span>
                <span>60 DAYS GUARANTEE</span>
              </div>

              {/* BUY NOW Button (Vibrant Golden Yellow) */}
              <a
                href={bestValue6Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-black text-sm sm:text-base uppercase tracking-wide text-black bg-gradient-to-b from-[#ffc800] via-[#f59e0b] to-[#e68a00] hover:from-[#ffd014] hover:to-[#f59e0b] active:scale-[0.98] shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all border border-amber-300 no-underline"
              >
                <ShoppingCart className="w-4 h-4 fill-black" />
                <span>BUY NOW!</span>
              </a>

              {/* Payment Cards */}
              <div className="my-3">
                <PaymentCardLogos isDarkBg={true} />
              </div>

              {/* Pricing Footer */}
              <div className="text-xs font-bold text-white space-y-0.5">
                <p>TOTAL: <span className="line-through font-normal text-purple-300">$1074</span> <span className="font-extrabold text-sm">$294</span></p>
                <p className="font-black text-xs tracking-tight text-white">
                  + <span className="text-[#a3e635] font-black">FREE</span> SHIPPING
                </p>
              </div>
            </div>
          </div>


          {/* ================= CARD 3: 3 BOTTLES (MOST POPULAR) ================= */}
          <div className="relative rounded-[2rem] border-2 border-[#3b0764] bg-white shadow-xl overflow-hidden flex flex-col justify-between p-4 sm:p-5">
            {/* Top Purple Header Bar */}
            <div className="bg-[#3b0764] text-white font-bold text-center py-2 px-4 rounded-t-2xl -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-5 text-sm sm:text-base tracking-wide">
              Most Popular
            </div>

            <div className="flex flex-col items-center text-center">
              {/* Title & Supply */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                3 BOTTLES
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5 mb-3">
                90 Day Supply
              </p>

              {/* 3 Bottles Image */}
              <div className="w-full h-48 sm:h-52 flex items-center justify-center my-1">
                <img
                  src="/src/assets/images/sodatide_three_bottles_1790286588191.jpg"
                  alt="SodaTide 3 Bottles"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-1.5 my-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 self-start mt-1">$</span>
                <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter">69</span>
                <div className="flex flex-col text-left text-xs font-bold leading-tight text-slate-900">
                  <span>Per</span>
                  <span>Bottle</span>
                </div>
              </div>

              {/* You Save Badge */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#b45309] my-1">
                <span className="w-4 h-4 rounded-full border border-[#b45309] flex items-center justify-center text-[10px]">✓</span>
                <span>YOU SAVE $330</span>
              </div>

              {/* Dotted separator */}
              <div className="w-full border-b border-dotted border-slate-300 my-2.5" />

              {/* 60 Days Guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-900 mb-3">
                <span className="w-4 h-4 rounded-full border border-slate-900 flex items-center justify-center text-[10px]">✓</span>
                <span>60 DAYS GUARANTEE</span>
              </div>

              {/* BUY NOW Button (Light Grey Gradient) */}
              <a
                href={popular3Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wide text-slate-900 bg-gradient-to-b from-[#d6d9de] via-[#cbcfd6] to-[#bdc2ca] hover:from-[#cbcfd6] hover:to-[#b0b5be] active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-300 no-underline"
              >
                <ShoppingCart className="w-4 h-4 fill-slate-900" />
                <span>BUY NOW!</span>
              </a>

              {/* Payment Cards */}
              <div className="my-3">
                <PaymentCardLogos isDarkBg={false} />
              </div>

              {/* Pricing Footer */}
              <div className="text-xs font-bold text-slate-900 space-y-0.5">
                <p>TOTAL: <span className="line-through font-normal text-slate-500">$537</span> <span className="font-extrabold text-sm">$207</span></p>
                <p className="font-black text-xs tracking-tight text-slate-900">+ FREE SHIPPING</p>
              </div>
            </div>
          </div>

        </div>

        {/* Customer Review Summary */}
        <div className="text-center space-y-5">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-sm text-slate-700 font-bold">
            <span>Our customers say</span>
            <div className="flex text-amber-400">
              {'★★★★★'.split('').map((_, i) => (
                <span key={i} className="text-base">★</span>
              ))}
            </div>
            <span className="uppercase text-xs tracking-wider text-purple-900 font-bold">
              BASED ON 14,820 REVIEWS!
            </span>
          </div>

          {/* Repeated Trust Seals */}
          <div className="pt-2 flex justify-center">
            <TrustSeals />
          </div>
        </div>

      </div>
    </section>
  );
};
