import React, { useState } from 'react';
import { INGREDIENTS_DATA } from '../data/supplementData';
import { Leaf, Info, FileText, CheckCircle2 } from 'lucide-react';

interface IngredientsSectionProps {
  onOpenFactsModal: () => void;
}

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({ onOpenFactsModal }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<number>(0);

  return (
    <section id="ingredients" className="py-20 bg-[#12071f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase bg-purple-900/50 border border-purple-700/40 px-3 py-1 rounded-full">
            Transparent Formulation
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Backed By Nature. Proven By Science.
          </h2>
          <p className="mt-3 text-base text-purple-200/80">
            Every milligram inside SodaTide is backed by peer-reviewed clinical research. 
            Zero proprietary blends, zero hidden fillers, zero stimulants.
          </p>
        </div>

        {/* 4 Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS_DATA.map((item, index) => {
            const isSelected = selectedIngredient === index;
            return (
              <div
                key={item.name}
                onClick={() => setSelectedIngredient(index)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-purple-900/40 border-purple-400 shadow-lg shadow-purple-900/50 scale-[1.02]'
                    : 'bg-[#1a0b2e]/60 border-purple-800/30 hover:bg-purple-900/20 hover:border-purple-700/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs font-semibold text-purple-200">
                      {item.amount}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {item.name}
                  </h3>

                  <p className="text-xs text-purple-300 font-medium mt-1 mb-3">
                    {item.role}
                  </p>

                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-purple-800/40 text-[11px] text-purple-300 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.clinicalTakeaway}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Supplement Facts Callout */}
        <div className="mt-12 bg-gradient-to-r from-purple-950/80 via-[#220c3a] to-purple-950/80 rounded-2xl p-6 sm:p-8 border border-purple-700/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-800/40 border border-purple-600/40 flex items-center justify-center text-purple-300 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Full Label Transparency & Supplement Facts</h4>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Manufactured in NSF-registered cGMP facility. 60 vegetarian capsules per bottle. 100% stimulant-free.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFactsModal}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-purple-100 bg-purple-800/60 hover:bg-purple-700/60 border border-purple-500/40 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Inspect Supplement Facts Panel
          </button>
        </div>

      </div>
    </section>
  );
};
