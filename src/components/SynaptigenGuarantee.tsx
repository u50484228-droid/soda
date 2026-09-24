import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface SynaptigenGuaranteeProps {
  onScrollToPricing: () => void;
}

export const SynaptigenGuarantee: React.FC<SynaptigenGuaranteeProps> = ({ onScrollToPricing }) => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border-2 border-amber-300/80 rounded-3xl p-8 sm:p-12 shadow-xl text-center relative overflow-hidden">
          
          {/* 3D 180-Day Gold Seal */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto -mt-16 sm:-mt-20 mb-6">
            <img
              src="/src/assets/images/guarantee_180_seal_1790284431963.jpg"
              alt="180-Day 100% Money Back Guarantee Seal"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
            180-Day 100% Money-Back Guarantee
          </h2>
          <p className="text-sm sm:text-base font-semibold text-teal-800 uppercase tracking-widest mt-1">
            Try Synaptigen For A Full 6 Months Completely Risk-Free
          </p>

          <div className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              We are so confident in the clinically verified neuro-protective power of Synaptigen that we back every order with our industry-leading <strong className="text-slate-900">180-Day Empty-Bottle Guarantee</strong>.
            </p>
            <p className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium">
              Take Synaptigen as directed. If you don't feel a noticeable boost in memory recall, mental alertness, and cognitive clarity — or if you change your mind for any reason at all — simply return even the empty bottles for a full 100% refund of your purchase price.
            </p>
          </div>

          {/* Quick Perks */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Full 180 Days Protection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Empty Bottle Coverage
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Zero Hassle RMA Process
            </span>
          </div>

          <div className="mt-8">
            <button
              onClick={onScrollToPricing}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-[#198774] hover:bg-[#137161] shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Order Synaptigen 100% Risk-Free Today
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
