import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { guarantee60SealImg } from '../assets/images';

interface SodaGuaranteeProps {
  onScrollToPricing: () => void;
}

export const SodaGuarantee: React.FC<SodaGuaranteeProps> = ({ onScrollToPricing }) => {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border-2 border-amber-300/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl text-center relative pt-8 sm:pt-10">
          
          {/* 3D 60-Day Gold Seal */}
          <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 mx-auto mb-4 sm:mb-6">
            <img
              src={guarantee60SealImg}
              alt="60-Day 100% Money Back Guarantee Seal"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </div>

          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
            60-Day 100% Money-Back Guarantee
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-purple-800 uppercase tracking-widest mt-1">
            Try SodaTide For A Full 60 Days Completely Risk-Free
          </p>

          <div className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <p>
              SodaTide® is backed by our full <strong className="text-slate-900">60-Day Empty-Bottle Guarantee</strong>. 
              We want you to experience firsthand how gentle satiety, calm digestion, and sustained daily energy feel without any financial risk.
            </p>
            <p className="bg-purple-50/50 p-3.5 sm:p-4 rounded-2xl border border-purple-100 text-slate-800 text-xs sm:text-sm font-medium">
              Take SodaTide as directed. If you don't feel a marked reduction in mealtime bloating, smaller natural food portions, and steady afternoon energy — or if you are unsatisfied for any reason whatsoever — simply return even your empty bottles for a full 100% refund.
            </p>
          </div>

          {/* Quick Perks */}
          <div className="mt-6 sm:mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              Full 60 Days Protection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              Empty Bottle Coverage
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              Zero Return Hassle
            </span>
          </div>

          <div className="mt-6 sm:mt-8">
            <button
              onClick={onScrollToPricing}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Get Your 180-Day Risk-Free Bottles
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
