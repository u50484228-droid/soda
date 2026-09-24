import React from 'react';
import { BONUS_EBOOKS } from '../data/synaptigenData';
import { Gift, CheckCircle2, Download, Sparkles, ArrowRight } from 'lucide-react';

interface SynaptigenBonusesProps {
  onOrderClick: () => void;
}

export const SynaptigenBonuses: React.FC<SynaptigenBonusesProps> = ({ onOrderClick }) => {
  return (
    <section id="bonuses" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-4 h-4 text-emerald-600" />
            Limited Time Offer Free Gifts
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Order 6 Bottles Today & Receive 3 FREE Digital Bonuses
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Gain instant digital access ($158.00 retail value) to accelerate your cognitive results from day one.
          </p>
        </div>

        {/* Highlight Banner with 3D eBook Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl mb-12">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="/src/assets/images/synaptigen_bonus_ebooks_1790284421753.jpg"
                alt="3 Free Cognitive Health eBooks"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain rounded-2xl drop-shadow-2xl"
              />
              <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                100% FREE ($158 Value)
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Comprehensive Cognitive Mastery at Zero Additional Cost
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              When you choose the 6-Bottle Best Value package, you unlock our physician-formulated digital library immediately after checkout. 
              Read them on your tablet, smartphone, or computer to maximize neuro-protective cellular recovery.
            </p>

            <div className="space-y-4">
              {BONUS_EBOOKS.map((ebook) => (
                <div
                  key={ebook.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                      Bonus #{ebook.number}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 line-through">
                      ${ebook.originalPrice}.00
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {ebook.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {ebook.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-[#198774] hover:bg-[#137161] shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Claim Your 6 Bottles + 3 FREE Bonuses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
