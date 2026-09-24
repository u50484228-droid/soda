import React, { useState } from 'react';
import { SYNAPTIGEN_FAQS } from '../data/synaptigenData';
import { ChevronDown } from 'lucide-react';

export const SynaptigenFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full">
            Answers To Common Questions
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Have questions about Synaptigen? Here are transparent answers to help you decide.
          </p>
        </div>

        <div className="space-y-4">
          {SYNAPTIGEN_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-teal-800 text-sm sm:text-base cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
