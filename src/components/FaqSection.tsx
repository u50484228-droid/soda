import React, { useState } from 'react';
import { FAQ_DATA } from '../data/supplementData';
import { ChevronDown, HelpCircle, Search, Mail } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_DATA.filter(
    item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#140824] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase bg-purple-900/50 border border-purple-700/40 px-3 py-1 rounded-full">
            Clear Answers
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-purple-200/80">
            Everything you need to know about SodaTide, daily usage, and our 60-day guarantee.
          </p>

          {/* Quick FAQ Search Bar */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g., medications, shipping, dosage)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e0a38] border border-purple-700/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-purple-800/30 overflow-hidden bg-white text-slate-900 shadow-md transition-all duration-200"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-purple-900 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-purple-300 text-sm">
              No questions found matching "{searchQuery}". Send us an email at{' '}
              <a href="mailto:contact@getSodaTide.com" className="text-amber-300 underline">
                contact@getSodaTide.com
              </a>{' '}
              and we'll respond within 24 hours.
            </div>
          )}
        </div>

        {/* Support Card */}
        <div className="mt-10 text-center text-xs text-purple-300/80">
          <p>
            Have another question not covered here? Reach our domestic support team directly at{' '}
            <a href="mailto:contact@getSodaTide.com" className="text-amber-300 font-semibold underline">
              contact@getSodaTide.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
