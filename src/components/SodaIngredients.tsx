import React from 'react';
import { SODATIDE_INGREDIENTS } from '../data/sodatideModelData';
import { Sparkles } from 'lucide-react';

export const SodaIngredients: React.FC = () => {
  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-purple-900 bg-purple-50 border border-purple-200 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            100% Real Natural Nutrients
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Powerful Synergistic Ingredients
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Each capsule of SodaTide combines standardized botanical extracts, prebiotic fibers, and clinical trace minerals photographed in their natural purity.
          </p>
        </div>

        {/* 7 Ingredients Grid (Static, non-clickable) */}
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {SODATIDE_INGREDIENTS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/90 rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col items-center text-center select-none"
            >
              {/* Real Ingredient Photo */}
              <div className="mb-4 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {item.name}
              </h3>

              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100/80 px-2.5 py-0.5 rounded-full mt-2">
                {item.category}
              </span>

              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {SODATIDE_INGREDIENTS.slice(3, 6).map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/90 rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col items-center text-center select-none"
            >
              {/* Real Ingredient Photo */}
              <div className="mb-4 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {item.name}
              </h3>

              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100/80 px-2.5 py-0.5 rounded-full mt-2">
                {item.category}
              </span>

              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3: Centered 7th card (Peppermint) */}
        <div className="max-w-md mx-auto">
          {SODATIDE_INGREDIENTS.slice(6, 7).map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/90 rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col items-center text-center select-none"
            >
              {/* Real Ingredient Photo */}
              <div className="mb-4 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {item.name}
              </h3>

              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100/80 px-2.5 py-0.5 rounded-full mt-2">
                {item.category}
              </span>

              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
