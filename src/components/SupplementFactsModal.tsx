import React from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

interface SupplementFactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBundle: () => void;
}

export const SupplementFactsModal: React.FC<SupplementFactsModalProps> = ({
  isOpen,
  onClose,
  onSelectBundle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="border-b-4 border-black pb-2 mb-3 text-left">
          <h3 className="text-3xl font-black tracking-tighter uppercase font-sans">
            Supplement Facts
          </h3>
          <p className="text-xs font-semibold text-slate-700">
            Serving Size: 2 Vegetarian Capsules · Servings Per Container: 30
          </p>
        </div>

        {/* Amount per serving header */}
        <div className="flex justify-between font-bold text-xs border-b border-black pb-1 mb-2">
          <span>Amount Per Serving</span>
          <span>% Daily Value*</span>
        </div>

        {/* Line Items */}
        <div className="space-y-2 text-xs divide-y divide-slate-200">
          <div className="flex justify-between items-center pt-1.5 font-medium">
            <div>
              <strong className="text-slate-900">Chromium</strong> (as Chromium Picolinate)
            </div>
            <div className="flex gap-4 font-mono font-bold">
              <span>200 mcg</span>
              <span className="w-10 text-right">571%</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1.5 font-medium">
            <div>
              <strong className="text-slate-900">Glucomannan</strong> (Amorphophallus konjac root)
            </div>
            <div className="flex gap-4 font-mono font-bold">
              <span>1,000 mg</span>
              <span className="w-10 text-right">†</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1.5 font-medium">
            <div>
              <strong className="text-slate-900">Green Tea Extract</strong> (Camellia sinensis leaf)<br />
              <span className="text-[11px] text-slate-500 font-normal">Standardized to 50% EGCG & 98% Polyphenols</span>
            </div>
            <div className="flex gap-4 font-mono font-bold">
              <span>350 mg</span>
              <span className="w-10 text-right">†</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1.5 font-medium">
            <div>
              <strong className="text-slate-900">Steamed Ginger Root Extract</strong> (Zingiber officinale)<br />
              <span className="text-[11px] text-slate-500 font-normal">Standardized to 5% Gingerols & Shogaols</span>
            </div>
            <div className="flex gap-4 font-mono font-bold">
              <span>200 mg</span>
              <span className="w-10 text-right">†</span>
            </div>
          </div>
        </div>

        {/* Daily value footnote */}
        <div className="border-t-4 border-black pt-2 mt-3 text-[10px] text-slate-600 leading-tight">
          <p>* Percent Daily Values are based on a 2,000 calorie diet.</p>
          <p>† Daily Value (DV) not established.</p>
        </div>

        {/* Other Ingredients */}
        <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 space-y-2 text-left">
          <p>
            <strong>Other Ingredients:</strong> Hypromellose (Vegetarian Capsule), Organic Rice Flour, Bamboo Silica.
          </p>
          <p>
            <strong>Free of:</strong> GMOs, Dairy, Gluten, Soy, Peanuts, Artificial Sweeteners, Synthetic Fillers, and Preservatives.
          </p>
          <p>
            <strong>Suggested Use:</strong> As a dietary supplement, take two (2) capsules once or twice daily with 8 oz of water 20-30 minutes prior to a main meal.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onSelectBundle();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Claim 50% Discount Bundle
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
