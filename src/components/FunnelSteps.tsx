import React from 'react';

interface FunnelStepsProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

export const FunnelSteps: React.FC<FunnelStepsProps> = ({ currentStep = 1, onStepChange }) => {
  return (
    <div className="py-6 sm:py-8 text-center">
      {/* 3-Step Pill Bar (Matches Screenshot 1 Top) */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black/25 backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-inner">
        <button
          onClick={() => onStepChange?.(1)}
          className={`px-4 sm:px-5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentStep === 1
              ? 'bg-white text-purple-950 shadow-md font-extrabold'
              : 'text-purple-200/80 hover:text-white'
          }`}
        >
          Step 1
        </button>

        <button
          onClick={() => onStepChange?.(2)}
          className={`px-4 sm:px-5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentStep === 2
              ? 'bg-white text-purple-950 shadow-md font-extrabold'
              : 'text-purple-200/80 hover:text-white'
          }`}
        >
          Step 2
        </button>

        <button
          onClick={() => onStepChange?.(3)}
          className={`px-4 sm:px-5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentStep === 3
              ? 'bg-white text-purple-950 shadow-md font-extrabold'
              : 'text-purple-200/80 hover:text-white'
          }`}
        >
          Step 3
        </button>
      </div>

      {/* Main Yellow Headline (Matches Screenshot 1) */}
      <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider text-[#ffdd00] drop-shadow-md font-heading">
        STEP 1: SELECT YOUR DISCOUNT PACKAGE
      </h2>

      {/* Dotted Accent Line */}
      <div className="mt-2 text-[#ffdd00]/80 tracking-[0.3em] text-xs font-mono select-none">
        ••••••••••••••••••••
      </div>
    </div>
  );
};
