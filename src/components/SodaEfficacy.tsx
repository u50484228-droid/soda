import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  TrendingUp, 
  Award, 
  Activity, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  FileCheck2,
  Sparkles,
  HeartPulse
} from 'lucide-react';
import { sodatideLabPurityImg } from '../assets/images';

interface SodaEfficacyProps {
  onOrderClick: () => void;
}

export const SodaEfficacy: React.FC<SodaEfficacyProps> = ({ onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'lab'>('timeline');

  const stats = [
    {
      percentage: '94%',
      label: 'Prolonged Satiety',
      description: 'Reported feeling comfortably full for up to 5 hours and experienced a dramatic reduction in evening cravings.',
      icon: HeartPulse,
      highlight: 'Glucomannan + Chromium'
    },
    {
      percentage: '89%',
      label: 'Reduced Bloating & Gas',
      description: 'Noticed lighter, smoother digestion, less post-meal distension, and dependable gut comfort within 14 days.',
      icon: Activity,
      highlight: 'Inulin + Probiotic + Ginger'
    },
    {
      percentage: '3.2x',
      label: 'Metabolic Efficiency',
      description: 'Greater rate of resting thermogenic activation and cellular fat oxidation compared to diet changes alone.',
      icon: TrendingUp,
      highlight: 'Standardized Green Tea EGCG'
    },
    {
      percentage: '98.7%',
      label: 'Purity & Bioavailability',
      description: 'Clean bioavailable matrix free of heavy metals, artificial fillers, gluten, or harsh synthetic laxatives.',
      icon: Award,
      highlight: 'Independent HPLC Verified'
    }
  ];

  const timelineSteps = [
    {
      period: 'Days 1 - 14',
      phase: 'Phase 1: Digestive Reset & De-bloat',
      summary: 'Immediate relief from heavy fullness, abdominal puffiness, and post-meal sluggishness.',
      points: [
        'Prebiotic inulin and Lactobacillus gently colonize the gut lining, breaking down trapped gas pockets.',
        'Steamed ginger root extract calms gastric tissues and accelerates comfortable digestion.',
        'Visible flatter stomach sensation and refreshed, predictable daily digestive rhythm.'
      ],
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      period: 'Days 15 - 30',
      phase: 'Phase 2: Appetite & Blood Sugar Balance',
      summary: 'Elimination of uncontrollable snacking impulses and late-afternoon sugar spikes.',
      points: [
        'Gentle micro-expanding Konjac glucomannan creates natural, comfortable gastric satiety.',
        'Chromium picolinate optimizes cellular insulin sensitivity, shutting down cravings at the source.',
        'Effortless daily caloric moderation without willpower battles or jittery stimulants.'
      ],
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      period: 'Days 31 - 60',
      phase: 'Phase 3: Deep Metabolic Activation',
      summary: 'Converting stubborn fat reserves into clean, all-day cellular vitality.',
      points: [
        'Targeted EGCG polyphenols ignite mitochondrial heat production without increasing heart rate.',
        'Body shifts toward utilizing deep visceral fat deposits as a preferred everyday fuel source.',
        'Noticeable rise in clean physical stamina, mental clarity, and shrinking waistline measurements.'
      ],
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      period: 'Days 61 - 90+',
      phase: 'Phase 4: Metabolic Consolidation & Longevity',
      summary: 'Strengthened microbiome shield, autonomous metabolic balance, and lasting results.',
      points: [
        'Sustained systemic equilibrium between the gut microbiota and the gut-brain axis.',
        'Stabilization of body composition without rebound effects or cycle dependency.',
        'Resilient digestion, strengthened immune defense, and a revitalized biological rhythm.'
      ],
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
  ];

  const qualityStandards = [
    {
      title: 'Third-Party Independent Lab Audits',
      desc: 'Every single batch of SodaTide undergoes rigorous High-Performance Liquid Chromatography (HPLC) testing by accredited laboratories to verify active potency and screen out contaminants.'
    },
    {
      title: 'Certified cGMP Manufacturing',
      desc: 'Formulated in FDA-registered, cGMP-certified sterile facilities in the USA that adhere strictly to current Good Manufacturing Practices for safety and consistency.'
    },
    {
      title: '100% Clean, Pure & Vegan Formula',
      desc: 'Non-GMO, soy-free, gluten-free, and dairy-free. Encapsulated in gastro-resistant pure plant cellulose (Veg Caps) designed for smooth release without stomach irritation.'
    },
    {
      title: 'Clinically Backed Therapeutic Dosages',
      desc: 'Unlike commercial blends with micro-dosed "fairy dusting," SodaTide contains full therapeutic milligram potencies matching randomized double-blind clinical trials.'
    }
  ];

  return (
    <section id="efficacy" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-t border-slate-200 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-950 bg-purple-100/80 border border-purple-200 px-3.5 py-1 rounded-full shadow-xs">
            <FlaskConical className="w-3.5 h-3.5 text-purple-700" />
            Clinically Proven Efficacy & Lab-Tested Purity
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Scientific Proof:<br className="hidden sm:inline" /> How SodaTide Works in the Human Body
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Peer-reviewed clinical trials on SodaTide&apos;s botanical bioactives demonstrate significant results in appetite moderation, cellular fat oxidation, and deep digestive relief.
          </p>
        </div>

        {/* 4 Big Efficacy Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-black text-purple-900 tracking-tight">
                    {item.percentage}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5 tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-purple-700">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Tabs Switcher: Timeline vs Lab Verification */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/70 shadow-inner">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>90-Day Results Timeline</span>
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'lab'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Lab Standards & Certificates</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Timeline of Results */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                The SodaTide™ Transformation Journey
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Progressive, cumulative botanical action: experience week-by-week biological benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timelineSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl p-6 border border-slate-200/90 bg-slate-50/70 flex flex-col justify-between hover:border-purple-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${step.badgeBg}`}>
                        {step.period}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      {step.phase}
                    </h4>
                    <p className="text-xs font-medium text-purple-900 mb-4">
                      {step.summary}
                    </p>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {step.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Callout in Timeline */}
            <div className="mt-8 p-4 rounded-xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-purple-900 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-purple-950">
                    Why is the 3 to 6-bottle protocol strongly recommended?
                  </p>
                  <p className="text-[11px] sm:text-xs text-purple-800/80">
                    Deep microbial replenishment and cellular metabolic recalibration achieve optimal efficacy between 60 and 180 continuous days.
                  </p>
                </div>
              </div>

              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-5 py-2.5 bg-purple-900 hover:bg-purple-800 text-white text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm shrink-0"
              >
                View Discounted Bundles
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Lab Purity & Clinical Standards */}
        {activeTab === 'lab' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Certified Lab Photo with Badge */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
                  <img
                    src={sodatideLabPurityImg}
                    alt="SodaTide certified third-party laboratory purity analysis"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                  {/* Floating Lab Verification Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-900 px-3 py-1.5 rounded-xl text-[11px] font-black shadow-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>HPLC AUDITED CERTIFICATE</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 text-center">
                  Independently tested for active bio-potency, thermal stability, and zero pesticide residues.
                </p>
              </div>

              {/* Right Column: 4 Clinical Proof Pillars */}
              <div className="lg:col-span-7 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Analytical Rigor & Uncompromised Safety
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Our standard is simple: verify that every bottle contains exactly what is declared on the label, with zero contamination.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {qualityStandards.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-purple-200 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-6">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
                  <span className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">✓ Heavy Metal Tested</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">✓ 100% Soy & Gluten Free</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">✓ Plant-Based Veg Caps</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">✓ Non-Habit Forming</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Global CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-900 via-[#4c1d95] to-purple-900 hover:from-purple-800 hover:to-purple-800 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Try SodaTide™ Today with 60-Day Money-Back Guarantee</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-500 mt-2">
            100% unconditional refund policy if you are not fully satisfied with your results.
          </p>
        </div>

      </div>
    </section>
  );
};
