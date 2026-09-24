import React, { useState } from 'react';
import { Check, X, ShieldAlert, Sparkles, AlertCircle, HeartHandshake, ArrowRight } from 'lucide-react';
import { sodatideIngredientsImg } from '../assets/images';

interface ProblemSolutionProps {
  onOrderClick: () => void;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'science'>('comparison');

  return (
    <section id="benefits" className="py-20 bg-[#160829] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
            The Biological Root Cause
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Why Do Cravings And Bloating Always Win?
          </h2>
          <p className="mt-4 text-lg text-purple-200/80 font-normal">
            Weight and digestion struggles almost never start with willpower. They start in the gut, 
            driven by hormonal hunger spikes, delayed gut motility, and blood sugar swings.
          </p>
        </div>

        {/* Story & Mechanism Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#1d0a35] border border-purple-800/40 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Left Column: Visual Asset */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg">
              <img
                src={sodatideIngredientsImg}
                alt="Natural herbal ingredients: Ginger root, green tea catechins and konjac fiber"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Synergistic Matrix</p>
                  <p className="text-sm font-semibold text-white">Non-Stimulant, Pure Botanical Bioactives</p>
                </div>
              </div>
            </div>

            {/* Quick Proof Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-900/30 border border-purple-700/30">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-purple-200 font-medium">Non-GMO Formula</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-900/30 border border-purple-700/30">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-purple-200 font-medium">Made In The USA</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-900/30 border border-purple-700/30">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-purple-200 font-medium">GMP Facility Certified</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-900/30 border border-purple-700/30">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-purple-200 font-medium">100% Non-Habit Forming</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Argument */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Meet SodaTide: Metabolic & Digestive Support That Works With Your Gut
              </h3>
              <p className="mt-3 text-purple-200/90 leading-relaxed text-base">
                SodaTide was formulated around a simple idea: weight struggles often start in the gut, not with willpower. 
                <strong className="text-white"> Glucomannan fiber</strong> expands gently in the stomach to promote a natural sense of fullness, 
                while <strong className="text-white">Ginger Root</strong> and <strong className="text-white">Green Tea Extract</strong> support healthy digestion and a steady metabolism, 
                and <strong className="text-white">Chromium Picolinate</strong> helps keep appetite and blood sugar levels in check.
              </p>
            </div>

            <p className="text-purple-200/90 leading-relaxed text-base">
              Because SodaTide works with your digestive system instead of relying on stimulants, the support is steady — 
              <span className="text-amber-300 font-semibold"> no jitters, no heart palpitations, no energy spikes followed by a crash.</span>
            </p>

            <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-700/40">
              <p className="text-sm text-purple-200 italic">
                “Customers describe feeling fuller after normal-sized meals, fewer between-meal cravings, and an easier time sticking to healthier portions without feeling like they're constantly fighting their own hunger.”
              </p>
            </div>

            {/* Direct CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-purple-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-yellow-300 rounded-xl shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
              >
                ORDER NOW & SAVE 50%
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <span className="text-xs text-purple-300 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                Protected by 60-Day Empty Bottle Guarantee
              </span>
            </div>

          </div>

        </div>

        {/* Interactive Comparison Table: Old Way vs SodaTide */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">
              The SodaTide Difference vs. Traditional Approaches
            </h3>
            <p className="text-sm text-purple-300 mt-1">
              Why harsh diet pills fail and how biological gut harmony creates lasting results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/30">
              <div className="flex items-center gap-2 mb-4 text-red-300">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h4 className="font-bold text-lg text-white">Traditional Stimulant Pills & Extreme Diets</h4>
              </div>
              <ul className="space-y-3 text-sm text-purple-200/80">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Heavy synthetic caffeine leads to rapid heartbeats, anxiety, and jitters.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Severe caloric restriction spikes the hunger hormone ghrelin, triggering rebound bingeing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Ignores sluggish digestion, leaving you bloated, heavy, and uncomfortable.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Afternoon crash leaves you exhausted and desperate for sugar.</span>
                </li>
              </ul>
            </div>

            {/* The SodaTide Way */}
            <div className="p-6 rounded-2xl bg-purple-900/40 border border-purple-500/40 shadow-lg shadow-purple-950/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-purple-950 font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-bl-lg">
                Clinical Approach
              </div>
              <div className="flex items-center gap-2 mb-4 text-emerald-300">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h4 className="font-bold text-lg text-white">The SodaTide Bio-Gut Synergy</h4>
              </div>
              <ul className="space-y-3 text-sm text-purple-100">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Stimulant-Free:</strong> Gentle cellular energy without afternoon crashes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Natural Stomach Satiety:</strong> Soluble fiber fills gastric volume so you stay satisfied on 40% less.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Digestive Comfort:</strong> Steamed ginger extract eases gut motility and relieves post-meal bloating.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Glucose Defense:</strong> Bioavailable chromium picolinate calms carb and sugar compulsions.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
