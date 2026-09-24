import React from 'react';
import { Calendar, Smile, BatteryCharging, CheckCheck } from 'lucide-react';

export const ResultsTimeline: React.FC = () => {
  const milestones = [
    {
      period: 'Days 1 – 7',
      title: 'Digestive Ease & Reduced Bloating',
      description: 'Steamed ginger and soluble fibers begin soothing gastrointestinal transit. Users notice less post-lunch puffiness, lighter stomach feeling, and calmer digestion.',
      icon: Smile,
      highlight: 'Noticeable after-meal lightness'
    },
    {
      period: 'Days 8 – 21',
      title: 'Natural Satiety & Smaller Portions',
      description: 'Hydrophilic glucomannan gently expands upon water intake, prompting natural leptin signaling. You find yourself comfortably satisfied leaving 30-40% on your plate.',
      icon: Calendar,
      highlight: 'Reduced mindless snacking'
    },
    {
      period: 'Days 22 – 45',
      title: 'Steady Energy & Craving Defense',
      description: 'Chromium picolinate and green tea catechins steady daytime glucose spikes. No more 3:00 PM vending machine urges or extreme dinner hunger.',
      icon: BatteryCharging,
      highlight: 'No jittery stimulant crashes'
    },
    {
      period: 'Days 60 – 90+',
      title: 'Body Composition & Clothing Fit',
      description: 'Sustained caloric equilibrium and microbiome remodeling become visible. Pants fit comfortably on tighter belt notches, backed by total digestive rhythm.',
      icon: CheckCheck,
      highlight: 'Sustainable metabolic reset'
    }
  ];

  return (
    <section id="results" className="py-20 bg-[#150727] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
            Clinical Roadmap
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What To Expect On Your SodaTide Journey
          </h2>
          <p className="mt-3 text-base text-purple-200/80">
            Real physiological change happens progressively as your gut microbiome and hunger hormones rebalance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.period}
                className="relative rounded-2xl bg-gradient-to-b from-purple-900/30 to-[#1d0a35] border border-purple-800/40 p-6 flex flex-col justify-between hover:border-purple-600/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded">
                      {item.period}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-800/50 border border-purple-600/30 flex items-center justify-center text-purple-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-800/40">
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
