import React from 'react';
import { Mail, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { guaranteeGoldSealImg } from '../assets/images';

interface GuaranteeSectionProps {
  onScrollToPricing: () => void;
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="py-20 bg-[#160829] relative overflow-hidden text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glow behind badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="bg-gradient-to-b from-[#250d3d] via-[#1a092d] to-[#140624] border border-amber-400/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative">
          
          {/* Gold Seal Image */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto -mt-16 sm:-mt-20 mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
            <img
              src={guaranteeGoldSealImg}
              alt="100% Satisfaction 60-Day Money Back Guarantee Seal"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-2xl relative z-10"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            100% Satisfaction Guaranteed<br />
            <span className="text-amber-300">60-Days Money Back Guarantee</span>
          </h2>

          <div className="mt-6 text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-2xl mx-auto space-y-4 font-normal">
            <p>
              SodaTide® is backed by a 100% money back guarantee for a full 60 days from your purchase. 
              If you are not completely satisfied with the product, its results, or your experience, 
              just let us know by sending an email to <a href="mailto:contact@getSodaTide.com" className="text-amber-300 font-bold underline">contact@getSodaTide.com</a>.
            </p>
            <p className="bg-purple-950/60 border border-purple-700/40 p-4 rounded-xl text-purple-100 font-medium">
              That's right — just return all the products, including the <strong className="text-amber-300">empty bottles</strong>, 
              anytime within 60 days of your purchase to be eligible for a full refund.
            </p>
            <p className="text-xs text-purple-300">
              That is the trust and confidence we put into SodaTide®: we guarantee your results with our own money.
            </p>
          </div>

          {/* Quick Guarantee Highlights */}
          <div className="mt-8 pt-6 border-t border-purple-800/40 flex flex-wrap items-center justify-center gap-6 text-xs text-purple-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Full 60 Days Trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Empty Bottle Coverage
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Zero Return Hassle
            </span>
          </div>

          <div className="mt-6">
            <button
              onClick={onScrollToPricing}
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs tracking-wider uppercase transition-transform active:scale-95 cursor-pointer shadow-lg shadow-amber-400/20"
            >
              TRY SODATIDE 100% RISK-FREE
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
