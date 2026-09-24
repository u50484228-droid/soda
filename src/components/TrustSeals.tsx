import React from 'react';
import { Award, Leaf, Building2, Flag, Dna } from 'lucide-react';

export const TrustSeals: React.FC<{ className?: string }> = ({ className = '' }) => {
  const seals = [
    {
      icon: Award,
      title: 'GMP',
      subtitle: 'CERTIFIED PRACTICE',
      sublabel: 'Good Manufacturing'
    },
    {
      icon: Leaf,
      title: '100% NATURAL',
      subtitle: 'INGREDIENTS',
      sublabel: 'Pure Botanical'
    },
    {
      icon: Building2,
      title: 'MADE IN A',
      subtitle: 'FDA REGISTERED FACILITY',
      sublabel: 'Strict Audited'
    },
    {
      icon: Flag,
      title: 'MANUFACTURED IN',
      subtitle: 'USA',
      sublabel: 'Domestic & Imported'
    },
    {
      icon: Dna,
      title: 'NON',
      subtitle: 'GMO',
      sublabel: 'Clean Formula'
    }
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-5 ${className}`}>
      {seals.map((seal, idx) => (
        <div key={idx} className="flex flex-col items-center text-center group cursor-default">
          <div className="w-13 h-13 sm:w-15 sm:h-15 lg:w-16 lg:h-16 rounded-full border-2 border-slate-300 group-hover:border-purple-600 transition-colors p-1 flex flex-col items-center justify-center bg-white shadow-sm">
            <span className="text-[7.5px] xs:text-[8px] sm:text-[9px] font-extrabold text-slate-800 leading-tight uppercase">
              {seal.title}
            </span>
            <span className="text-[6px] xs:text-[6.5px] sm:text-[7.5px] font-bold text-slate-500 uppercase tracking-tighter leading-tight mt-0.5">
              {seal.subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
