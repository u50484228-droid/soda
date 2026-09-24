import React from 'react';
import { TrustSeals } from './TrustSeals';
import { Check } from 'lucide-react';

interface SynaptigenHeroProps {
  onScrollToPricing: () => void;
}

export const SynaptigenHero: React.FC<SynaptigenHeroProps> = ({ onScrollToPricing }) => {
  return (
    <section className="bg-white pt-6 sm:pt-12 pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column Hero Grid (Matches Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 sm:pb-16">
          
          {/* Left Column: Headline and Trust Seals */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 leading-[1.2] tracking-tight font-heading">
              A Breakthrough Natural Solution That Supports A Healthy Memory Well Into Old Age
            </h1>

            {/* Trust Seals Row */}
            <div className="pt-2">
              <TrustSeals />
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                onClick={onScrollToPricing}
                className="px-8 py-3.5 rounded-full text-base font-bold text-white bg-[#198774] hover:bg-[#137161] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Claim Your Discounted Bottles
              </button>
            </div>
          </div>

          {/* Right Column: Product Presentation Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-slate-100/80 rounded-3xl p-4 sm:p-6 shadow-inner border border-slate-200/70">
              
              {/* Badge: New Formula */}
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                <span>⭐</span>
                <span>New Formula</span>
              </div>

              {/* Product Bottle on Pedestal with Monstera Leaves */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2 shadow-sm">
                <img
                  src="/src/assets/images/synaptigen_hero_bottle_1790284402321.jpg"
                  alt="Synaptigen Natural Brain Health Formula Bottle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Forest Green Benefit Banner (Matches Screenshot 2 Bottom) */}
      <div className="bg-[#0f382c] text-white py-5 sm:py-6 border-y border-[#0c2e24]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-4 sm:gap-8 text-center">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                HEALTHY BRAIN SUPPORT
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                CLEAR MIND AID
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                SUSTAINED MENTAL AGILITY
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
