import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Sparkles, ArrowDown, Leaf, Flame, Activity, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToPricing: () => void;
  onOpenFactsModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToPricing, onOpenFactsModal }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28 bg-gradient-to-b from-[#140824] via-[#220c3a] to-[#160829]">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Product Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto group">
              {/* Luminous aura behind bottles */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-amber-500/15 rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-500 -z-10" />
              
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black/60 p-4 shadow-2xl shadow-purple-950/80">
                <img
                  src="/src/assets/images/sodatide_hero_bottles_1790283206925.jpg"
                  alt="SodaTide Advanced Metabolic and Digestive Support Bottles"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-xl transform hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Floating Trust Pill on Bottle */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#160728]/90 backdrop-blur-md border border-purple-400/30 rounded-xl p-3 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-tight">60-Day Empty Bottle</p>
                      <p className="text-[11px] text-purple-300">100% Money-Back Guarantee</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/30 px-2 py-1 rounded">
                    Risk-Free
                  </span>
                </div>
              </div>

              {/* Verified rating summary under bottle */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-purple-200/90">
                <div className="flex text-amber-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <span className="font-semibold text-white">4.9 / 5.0</span>
                <span>·</span>
                <span className="text-purple-300">Based on 4,820+ verified customer reviews</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Sales Copy & Value Props */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Clinical Ingredient Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/60 border border-purple-600/40 text-purple-200">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                Glucomannan Fiber
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/60 border border-purple-600/40 text-purple-200">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Green Tea Extract (EGCG)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/60 border border-purple-600/40 text-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                Steamed Ginger Root
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-900/60 border border-purple-600/40 text-purple-200">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                Chromium Picolinate
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Support Your Digestion.{' '}
              <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-amber-200 bg-clip-text text-transparent">
                Control Your Appetite.
              </span>{' '}
              Reclaim Your Energy.
            </h1>

            {/* Subheadline Copy from screenshot */}
            <p className="text-base sm:text-lg text-purple-200/90 leading-relaxed max-w-2xl font-normal">
              SodaTide blends <strong className="text-white font-semibold">Glucomannan</strong>,{' '}
              <strong className="text-white font-semibold">Green Tea Extract</strong>,{' '}
              <strong className="text-white font-semibold">Ginger Root</strong> and{' '}
              <strong className="text-white font-semibold">Chromium Picolinate</strong> to support healthy digestion, 
              help you feel fuller longer, and turn stored fat into usable energy.
            </p>

            {/* High-Intent CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onScrollToPricing}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-purple-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 rounded-xl shadow-xl shadow-amber-400/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>CLAIM YOUR DISCOUNTED SODATIDE</span>
                <ArrowDown className="w-5 h-5 ml-2 text-purple-950 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenFactsModal}
                className="inline-flex items-center justify-center px-5 py-4 text-sm font-semibold text-purple-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/50 rounded-xl transition-colors cursor-pointer"
              >
                View Supplement Facts & Dosage
              </button>
            </div>

            {/* Certifications and Trust Badges (From Screenshot) */}
            <div className="pt-6 border-t border-purple-800/40">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/30">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mb-1">
                    ✓
                  </span>
                  <span className="text-[11px] font-semibold text-white leading-tight">cGMP Certified</span>
                  <span className="text-[9px] text-purple-300">Strict Standards</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/30">
                  <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold mb-1">
                    USA
                  </span>
                  <span className="text-[11px] font-semibold text-white leading-tight">FDA Registered</span>
                  <span className="text-[9px] text-purple-300">US Inspection</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/30">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold mb-1">
                    100%
                  </span>
                  <span className="text-[11px] font-semibold text-white leading-tight">Natural Actives</span>
                  <span className="text-[9px] text-purple-300">No Synthetics</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/30">
                  <span className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold mb-1">
                    ★
                  </span>
                  <span className="text-[11px] font-semibold text-white leading-tight">Made In USA</span>
                  <span className="text-[9px] text-purple-300">Premium Origin</span>
                </div>

                <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/30">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold mb-1">
                    🌱
                  </span>
                  <span className="text-[11px] font-semibold text-white leading-tight">Non-GMO</span>
                  <span className="text-[9px] text-purple-300">Stimulant-Free</span>
                </div>
              </div>

              <p className="mt-3 text-center sm:text-left text-xs text-purple-300/70">
                Manufactured in the USA using premium domestic and international sources in an audited cGMP facility.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
