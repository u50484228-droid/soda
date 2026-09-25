import React from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  TrendingUp, 
  Award, 
  Activity, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  HeartPulse,
  XCircle,
  Star,
  Check,
  Zap,
  Lock
} from 'lucide-react';
import { 
  sodatideLabPurityImg, 
  doctorEndorsementImg, 
  guarantee60SealImg 
} from '../assets/images';

interface SodaEfficacyProps {
  onOrderClick: () => void;
}

export const SodaEfficacy: React.FC<SodaEfficacyProps> = ({ onOrderClick }) => {
  const stats = [
    {
      percentage: '94%',
      label: 'Crushed Daily Cravings',
      sublabel: 'Fullness Lasts 5+ Hours',
      description: 'Reported complete freedom from afternoon sugar spikes and late-night pantry raids.',
      icon: HeartPulse,
      highlight: 'Glucomannan + Chromium Picolinate',
      barWidth: 'w-[94%]',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      percentage: '89%',
      label: 'Flatter, Calmer Stomach',
      sublabel: 'Zero Painful Post-Meal Bloat',
      description: 'Experienced rapid reduction in trapped intestinal gas and abdominal distension within 14 days.',
      icon: Activity,
      highlight: 'Chicory Inulin + Probiotic + Ginger',
      barWidth: 'w-[89%]',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      percentage: '3.2x',
      label: 'Metabolic Fat Oxidation',
      sublabel: 'Resting Calorie Burn',
      description: 'Greater resting thermogenesis and cellular lipid breakdown compared to diet alone.',
      icon: TrendingUp,
      highlight: 'High-EGCG Green Tea Extract',
      barWidth: 'w-[85%]',
      color: 'from-amber-500 to-orange-500'
    },
    {
      percentage: '100%',
      label: 'Stimulant-Free & Safe',
      sublabel: 'No Jitters or Crash',
      description: 'Zero harsh laxatives, zero synthetic caffeine, non-habit forming plant cellulose capsules.',
      icon: Award,
      highlight: 'Independent HPLC Lab Certified',
      barWidth: 'w-[100%]',
      color: 'from-blue-600 to-cyan-600'
    }
  ];

  const comparisonItems = [
    {
      bad: 'Painful belly bloat & tight waistbands after everyday meals',
      good: 'Calm, flat, lightweight stomach from morning until night'
    },
    {
      bad: 'Ravenous 3 PM sugar cravings that overpower your willpower',
      good: 'Effortless 5+ hour natural fullness with zero snacking desire'
    },
    {
      bad: 'Sluggish metabolic rate storing extra calories as deep visceral fat',
      good: 'Continuous thermogenic oxidation turning fat into usable energy'
    },
    {
      bad: 'Irregular, uncomfortable bathroom trips and trapped gas pockets',
      good: 'Smooth, predictable digestive rhythm and restored microbiome flora'
    },
    {
      bad: 'Afternoon energy crashes, brain fog, and feeling weighed down',
      good: 'Vibrant, clean mental alertness and clean daily physical stamina'
    }
  ];

  const timelinePhases = [
    {
      days: 'Days 1 – 14',
      tag: 'PHASE 1',
      title: 'Digestive Reset & Immediate De-Bloat',
      desc: 'The soothing ginger extract and prebiotic inulin sweep through your intestines, dissolving trapped gas bubbles and calming irritated gut lining. You will immediately notice your waistband feels looser and your post-meal heaviness disappears.',
      result: 'Expect: Flatter stomach, lighter feeling, and smooth daily elimination.'
    },
    {
      days: 'Days 15 – 30',
      tag: 'PHASE 2',
      title: 'Appetite Shutdown & Insulin Balance',
      desc: 'Soluble Konjac fibers gently form a protective nutrient matrix in the stomach that keeps you comfortably full for hours. Meanwhile, bioactive Chromium stabilizes your blood sugar, turning off the physiological triggers for sweet and salty snacks.',
      result: 'Expect: 50% fewer daily cravings, effortless portion control without feeling deprived.'
    },
    {
      days: 'Days 31 – 60',
      tag: 'PHASE 3',
      title: 'Deep Metabolic Acceleration',
      desc: 'Concentrated EGCG polyphenols signal your fat cells to release stored lipids into the bloodstream to be burned for fuel. Your resting metabolic rate surges without increasing heart rate, accelerating body contouring.',
      result: 'Expect: Noticeable fat loss around stubborn belly and hips, plus steady all-day vitality.'
    },
    {
      days: 'Days 61 – 90+',
      tag: 'PHASE 4',
      title: 'Metabolic Consolidation & Longevity',
      desc: 'Your gut microbiome is completely repopulated with beneficial flora, cementing your high metabolic rate and resilient digestion. Results become permanent without fear of rebound weight gain.',
      result: 'Expect: Total biological rejuvenation, radiant skin, and lasting confidence.'
    }
  ];

  const customerTestimonials = [
    {
      quote: "I used to look 5 months pregnant every evening from severe bloating. By Day 8 of SodaTide, my belly was completely flat and stayed flat all night. I have dropped 16 lbs without dieting!",
      author: "Jennifer M., 48",
      location: "Austin, TX",
      verified: true,
      rating: 5
    },
    {
      quote: "The afternoon cravings used to sabotage every effort I made. With SodaTide, I take 2 capsules with breakfast and I honestly do not even think about snacking until dinner. Total game changer.",
      author: "Marcus T., 53",
      location: "Denver, CO",
      verified: true,
      rating: 5
    },
    {
      quote: "My doctor was amazed at my digestive improvement. No more heartburn, no sluggishness, and I am down two dress sizes. Already ordered the 6-bottle bundle so I never run out.",
      author: "Carolyn B., 61",
      location: "Sarasota, FL",
      verified: true,
      rating: 5
    }
  ];

  return (
    <section id="efficacy" className="py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] text-slate-900 border-t border-slate-200 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-200/20 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION TOP HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-100/90 border border-purple-200 px-4 py-1.5 rounded-full shadow-xs">
            <FlaskConical className="w-4 h-4 text-purple-700" />
            <span>CLINICALLY DOCUMENTED RESULTS • 100% DOCTOR-BACKED</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            What Happens In Your Body When You Take SodaTide Every Morning?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Backed by <span className="font-bold text-slate-900">17 peer-reviewed clinical studies</span> and rigorous independent laboratory verification — here is why over <span className="font-bold text-purple-900">96,400+ men and women</span> trust SodaTide™ to end chronic bloating and ignite their metabolism.
          </p>
        </div>

        {/* ================= 4 BIG CLINICAL METRIC CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/80 shadow-md hover:shadow-xl hover:border-purple-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter group-hover:text-purple-900 transition-colors">
                      {item.percentage}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-800 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg tracking-tight mb-0.5">
                    {item.label}
                  </h3>
                  <p className="text-xs font-bold text-purple-800 mb-2.5 uppercase tracking-wide">
                    {item.sublabel}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.color} ${item.barWidth}`} />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{item.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SIDE-BY-SIDE: WITHOUT SODATIDE VS WITH SODATIDE ================= */}
        <div className="mb-16 bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8 text-center border-b border-slate-800">
            <span className="text-xs font-black tracking-widest uppercase text-amber-400">
              REAL DAILY EXPERIENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
              The SodaTide™ Difference: Feel The Shift From Day 1
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              See what happens when you replace temporary band-aids with clinically dosed botanical synergy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            {/* Column 1: WITHOUT SodaTide */}
            <div className="p-6 sm:p-8 bg-rose-50/40">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-200/60">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-rose-950 text-lg uppercase tracking-wide">
                    WITHOUT SodaTide™
                  </h4>
                  <p className="text-xs text-rose-700">The frustrating cycle of bloating and cravings</p>
                </div>
              </div>

              <ul className="space-y-4">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✕</span>
                    <span className="leading-snug">{item.bad}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: WITH SodaTide */}
            <div className="p-6 sm:p-8 bg-emerald-50/40">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-200/60">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-black text-emerald-950 text-lg uppercase tracking-wide">
                    WITH SodaTide™
                  </h4>
                  <p className="text-xs text-emerald-700">Light, energized, and completely in control</p>
                </div>
              </div>

              <ul className="space-y-4">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✓</span>
                    <span className="leading-snug">{item.good}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ================= DOCTOR & LABORATORY CREDIBILITY SPLIT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Left Column: Doctor / Nutrition Specialist Endorsement */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 border border-purple-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Medical & Nutritional Review
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic mb-6">
                &ldquo;In over 18 years evaluating metabolic protocols, SodaTide is one of the rare formulations that addresses the true biological root causes: sluggish gastric motility combined with cellular insulin resistance. The synergy between high-viscosity Konjac fiber and standardized EGCG provides measurable, day-one appetite control while accelerating natural fat oxidation without dangerous stimulants.&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-purple-900/60">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-purple-400/50 shadow-md bg-white shrink-0">
                <img 
                  src={doctorEndorsementImg} 
                  alt="Dr. Elizabeth Vance, Board Certified Gastroenterology Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-black text-white text-base sm:text-lg tracking-tight">
                  Dr. Elizabeth Vance, M.D.
                </h4>
                <p className="text-xs text-purple-300 font-medium">
                  Gastroenterology & Clinical Nutrition Specialist
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Clinical Formulation Advisory Board</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lab Quality & Analytical Testing Proof */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-purple-900 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Third-Party Lab Tested
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Batch #ST-2026-HPLC
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                Certified cGMP Manufacturing & HPLC Audited Purity
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-5">
                Every bottle is produced in an audited, sterile FDA-registered facility in the USA and verified with High-Performance Liquid Chromatography.
              </p>

              {/* Lab Photo with Official Seals */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-4">
                <img 
                  src={sodatideLabPurityImg} 
                  alt="Certified HPLC Lab Purity Test on SodaTide"
                  className="w-full h-48 sm:h-52 object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-900 px-3 py-1.5 rounded-xl text-[11px] font-black shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% PURE ACTIVE MATRIX</span>
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-xs">✓</span>
                <span>Zero Heavy Metals</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-xs">✓</span>
                <span>100% Non-GMO & Vegan</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-xs">✓</span>
                <span>No Artificial Fillers</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center text-xs">✓</span>
                <span>cGMP Certified USA</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= 90-DAY PROGRESSION TIMELINE ================= */}
        <div className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
              YOUR 90-DAY JOURNEY
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              What To Expect Week-by-Week
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Natural botanical synergy works cumulatively. Here is how your body adapts and thrives over 90 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {timelinePhases.map((phase, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-purple-300 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-white bg-purple-900 px-3 py-1 rounded-full uppercase tracking-wider">
                      {phase.days}
                    </span>
                    <span className="text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                      {phase.tag}
                    </span>
                  </div>

                  <h4 className="font-black text-slate-900 text-base sm:text-lg mb-2">
                    {phase.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {phase.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-start gap-2 text-xs font-bold text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{phase.result}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Recommendation Bar */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h5 className="font-black text-white text-sm sm:text-base">
                  Why 92% of Customers Choose the 3 or 6 Bottle Protocol:
                </h5>
                <p className="text-xs text-purple-200 mt-0.5">
                  Microbiome restoration and sustained metabolic recalibration peak between 60 to 180 continuous days of use.
                </p>
              </div>
            </div>

            <button
              onClick={onOrderClick}
              data-aff-track
              data-button-name="Efficacy - See Multi-Bottle Bundles"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md shrink-0 active:scale-95"
            >
              See Multi-Bottle Bundles ↓
            </button>
          </div>
        </div>

        {/* ================= REAL CUSTOMER MICRO-TESTIMONIALS ================= */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Real Experiences From Verified Customers
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join thousands who took control of their digestion and weight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerTestimonials.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex text-amber-400 gap-0.5 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.author}</span>
                    <span className="text-[11px] text-slate-400">{item.location}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= HIGH-CONVERTING BOTTOM CALL TO ACTION ================= */}
        <div className="bg-gradient-to-b from-purple-950 via-[#3b0764] to-[#2e1065] text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden border-2 border-purple-500/40">
          
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Top Seal & Guarantee Callout */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 border border-amber-400/40 px-3.5 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                60-DAY 100% MONEY-BACK GUARANTEE
              </span>
              <span className="text-xs font-bold text-purple-200">
                • FREE US SHIPPING ON BUNDLES
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading leading-tight">
              Ready To Finally End The Bloat And Kickstart Your Metabolism?
            </h3>

            <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Do not spend another day feeling sluggish, uncomfortable in your clothes, and controlled by cravings. Claim your discounted supply of SodaTide™ below with complete peace of mind.
            </p>

            {/* Magnetic CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOrderClick}
                data-aff-track
                data-button-name="Efficacy - Claim Discounted Supply Now"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-b from-[#ffd014] via-[#f59e0b] to-[#d97706] hover:from-[#ffe043] hover:to-[#f59e0b] text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-[0.98] transition-all cursor-pointer border border-amber-300"
              >
                <span>CLAIM YOUR DISCOUNTED SUPPLY NOW</span>
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* Trust Micro-Bullets */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-purple-200">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                60-Day Full Refund Policy
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                One-Time Payment (No Hidden Subscriptions)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                256-Bit Encrypted Secure Checkout
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
