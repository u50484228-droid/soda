import React, { useState } from 'react';
import { SYNAPTIGEN_INGREDIENTS, Ingredient } from '../data/synaptigenData';
import { Info, CheckCircle, X, Sparkles } from 'lucide-react';

export const SynaptigenIngredients: React.FC = () => {
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);

  // Custom visual renderings matching screenshot 3
  const renderVisual = (type: string) => {
    switch (type) {
      case 'probiotic-orange':
        return (
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Orange probiotic chain representation */}
            <div className="flex items-center gap-1 -rotate-12">
              <div className="w-4 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-orange-500/30 animate-pulse" />
              <div className="w-4 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-orange-500/30" />
              <div className="w-4 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-orange-500/30" />
              <div className="w-4 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-orange-500/30" />
            </div>
            <div className="absolute top-2 right-4 w-3.5 h-5 rounded-full bg-orange-400/80 rotate-45" />
            <div className="absolute bottom-2 left-4 w-3.5 h-5 rounded-full bg-amber-400/80 -rotate-45" />
          </div>
        );
      case 'probiotic-blue':
        return (
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Blue probiotic rod clusters */}
            <div className="relative w-16 h-16">
              <div className="absolute top-1 left-2 w-5 h-2 rounded-full bg-blue-300/80 rotate-12 blur-[0.5px]" />
              <div className="absolute top-4 left-6 w-7 h-2.5 rounded-full bg-blue-400 shadow-sm rotate-45" />
              <div className="absolute bottom-3 left-3 w-8 h-2.5 rounded-full bg-indigo-400 shadow-sm -rotate-30" />
              <div className="absolute top-7 left-1 w-6 h-2 rounded-full bg-blue-300 rotate-90" />
              <div className="absolute bottom-1 right-2 w-7 h-2.5 rounded-full bg-blue-500/80 -rotate-12" />
            </div>
          </div>
        );
      case 'probiotic-cyan':
        return (
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Cyan luminous microflora splash */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400/30 via-teal-400/40 to-blue-400/30 blur-md absolute" />
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-cyan-400/40 border border-cyan-300 shadow-lg shadow-cyan-400/40" />
              <div className="absolute w-12 h-6 rounded-full bg-teal-400/50 rotate-45" />
              <div className="absolute w-6 h-12 rounded-full bg-sky-400/50 -rotate-45" />
            </div>
          </div>
        );
      case 'powder':
        return (
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Organic chicory inulin powder mound */}
            <div className="relative w-20 h-14 flex items-end justify-center">
              <div className="w-16 h-10 bg-gradient-to-t from-amber-200 via-amber-100 to-amber-50 rounded-t-full shadow-md border-b-2 border-amber-300" />
              <div className="absolute bottom-0 w-20 h-3 bg-amber-200/70 rounded-full blur-[1px]" />
              <div className="absolute -top-1 w-2 h-2 rounded-full bg-amber-100" />
            </div>
          </div>
        );
      case 'minerals':
        return (
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Mineral molecule crystal lattice */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-slate-300 border border-white shadow-md absolute top-1 left-2" />
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-slate-200 to-white border border-slate-300 shadow-md absolute top-5 left-6 z-10" />
              <div className="w-4 h-4 rounded-full bg-slate-300 border border-white shadow-md absolute bottom-2 left-1" />
              <div className="w-4 h-4 rounded-full bg-slate-300 border border-white shadow-md absolute bottom-2 right-3" />
              <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-white shadow-md absolute top-2 right-2" />
              <svg className="absolute inset-0 w-full h-full text-slate-300 stroke-1" viewBox="0 0 64 64">
                <line x1="16" y1="16" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" />
                <line x1="32" y1="32" x2="16" y2="48" stroke="currentColor" strokeWidth="1.5" />
                <line x1="32" y1="32" x2="48" y2="48" stroke="currentColor" strokeWidth="1.5" />
                <line x1="32" y1="32" x2="48" y2="16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        );
      case 'strawberry':
        return (
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Fresh strawberry visual */}
            <div className="relative text-4xl transform hover:scale-110 transition-transform">
              🍓
            </div>
          </div>
        );
      case 'peppermint':
        return (
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Peppermint leaf sprig */}
            <div className="relative text-4xl transform hover:scale-110 transition-transform">
              🌿
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full">
            Clinically Documented Nutrients
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Powerful Synergistic Ingredients
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Each tablet is formulated with precise ratios of live micro-flora, soluble prebiotics, and neuron-protecting antioxidants.
          </p>
        </div>

        {/* 7 Ingredients Grid (Exact Match to Screenshot 3) */}
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {SYNAPTIGEN_INGREDIENTS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveIngredient(item)}
              className="bg-slate-50/90 hover:bg-white rounded-3xl p-6 border border-slate-200/70 hover:border-teal-400/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            >
              {/* Floating Illustrated Graphic */}
              <div className="mb-4 h-28 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {renderVisual(item.visualType)}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-teal-800 transition-colors">
                {item.name}
              </h3>

              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mt-2">
                {item.category} Strain
              </span>

              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {SYNAPTIGEN_INGREDIENTS.slice(3, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveIngredient(item)}
              className="bg-slate-50/90 hover:bg-white rounded-3xl p-6 border border-slate-200/70 hover:border-teal-400/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="mb-4 h-28 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {renderVisual(item.visualType)}
              </div>

              <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-teal-800 transition-colors">
                {item.name}
              </h3>

              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mt-2">
                {item.category} Matrix
              </span>

              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3: Centered 7th card (Peppermint Extract) */}
        <div className="max-w-md mx-auto">
          {SYNAPTIGEN_INGREDIENTS.slice(6, 7).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveIngredient(item)}
              className="bg-slate-50/90 hover:bg-white rounded-3xl p-6 border border-slate-200/70 hover:border-teal-400/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="mb-4 h-28 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {renderVisual(item.visualType)}
              </div>

              <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-teal-800 transition-colors">
                {item.name}
              </h3>

              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mt-2">
                {item.category} Bioactive
              </span>

              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Ingredient Detail Modal */}
      {activeIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
            <button
              onClick={() => setActiveIngredient(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                {renderVisual(activeIngredient.visualType)}
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                  {activeIngredient.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeIngredient.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {activeIngredient.description}
            </p>

            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-xs space-y-1 text-teal-900">
              <strong className="block font-bold text-teal-950">Primary Biological Role:</strong>
              <p>{activeIngredient.scientificRole}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveIngredient(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#198774] text-white hover:bg-[#137161]"
              >
                Close Info
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
