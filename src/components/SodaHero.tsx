import React from 'react';
import { TrustSeals } from './TrustSeals';
import { Check } from 'lucide-react';
import { sodatidePedestalBottleImg } from '../assets/images';

interface SodaHeroProps {
  onScrollToPricing: () => void;
}

export const SodaHero: React.FC<SodaHeroProps> = ({ onScrollToPricing }) => {
  return (
    <section className="bg-white pt-4 xs:pt-6 sm:pt-10 md:pt-12 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Main 2-column Hero Grid - Fully responsive on all viewports */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-14 items-center pb-10 sm:pb-14 lg:pb-16">
          
          {/* Left Column: Headline and Trust Seals */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left order-1">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-slate-900 leading-[1.2] sm:leading-[1.18] tracking-tight font-heading">
              A Breakthrough Natural Solution That Supports Healthy Digestion & Appetite Control Well Into Old Age
            </h1>

            {/* Trust Seals Row */}
            <div className="pt-1 sm:pt-2">
              <TrustSeals />
            </div>

            {/* Quick Action Button */}
            <div className="pt-1 sm:pt-2 flex justify-center lg:justify-start">
              <button
                onClick={onScrollToPricing}
                data-aff-track
                data-button-name="Hero - Claim Discounted Bottles"
                className="w-full xs:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                Claim Your Discounted Bottles
              </button>
            </div>
          </div>

          {/* Right Column: Product Presentation (No Frame, Fully Blended, Extra Large & Responsive) */}
          <div className="lg:col-span-6 flex justify-center items-center relative order-2 w-full">
            <div className="relative w-full max-w-[300px] xs:max-w-[350px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex items-center justify-center">
              
              {/* Soft Ambient Radial Light - Gives rich glowing depth without hard boundaries */}
              <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-purple-300/40 via-purple-100/30 to-indigo-100/25 blur-3xl -z-10 pointer-events-none" />

              {/* Badge: New Formula Floating Chip */}
              <div className="absolute top-2 right-2 xs:top-3 xs:right-4 sm:top-4 sm:right-6 z-20 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-purple-200 text-purple-900 text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md">
                <span>⭐</span>
                <span>New Formula</span>
              </div>

              {/* Product Bottle - Seamlessly feathered edges with zero rectangular frame */}
              <img
                src={sodatidePedestalBottleImg}
                alt="SodaTide Metabolic and Digestive Support Bottle"
                referrerPolicy="no-referrer"
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 65%, rgba(0, 0, 0, 0.8) 78%, transparent 94%)',
                  maskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 65%, rgba(0, 0, 0, 0.8) 78%, transparent 94%)',
                }}
                className="w-full h-auto max-h-[360px] xs:max-h-[420px] sm:max-h-[500px] md:max-h-[560px] lg:max-h-[640px] xl:max-h-[720px] object-contain transform hover:scale-105 transition-transform duration-500"
              />

            </div>
          </div>

        </div>

      </div>

      {/* Royal Purple Benefit Banner (Harmonized with Product & Fully Responsive) */}
      <div className="bg-gradient-to-r from-[#240a4a] via-[#351068] to-[#240a4a] text-white py-4 sm:py-5 lg:py-6 border-y border-purple-900/60 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 items-center text-center">
            
            <div className="flex items-center justify-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-purple-300/40 bg-purple-500/20 flex items-center justify-center text-purple-200 shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-100">
                HEALTHY DIGESTIVE SUPPORT
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-purple-300/40 bg-purple-500/20 flex items-center justify-center text-purple-200 shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-100">
                APPETITE & CRAVING CONTROL
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-purple-300/40 bg-purple-500/20 flex items-center justify-center text-purple-200 shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-100">
                SUSTAINED METABOLIC ENERGY
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
