import React, { useState } from 'react';
import { SCIENTIFIC_REFERENCES } from '../data/supplementData';
import { BookOpen, Search, ExternalLink, ChevronRight } from 'lucide-react';

export const ScientificReferences: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredStudies = SCIENTIFIC_REFERENCES.filter(study => {
    const matchesCat = activeCategory === 'all' || study.category === activeCategory;
    const matchesSearch = 
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.journal.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const displayedStudies = showAll ? filteredStudies : filteredStudies.slice(0, 8);

  return (
    <section id="references" className="py-16 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5 text-purple-800" />
            Peer-Reviewed Medical Literature
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Scientific References & Clinical Research
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Every primary active mechanism in SodaTide is backed by double-blind, placebo-controlled human trials.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-purple-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Studies ({SCIENTIFIC_REFERENCES.length})
            </button>
            <button
              onClick={() => setActiveCategory('glucomannan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === 'glucomannan'
                  ? 'bg-purple-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Glucomannan
            </button>
            <button
              onClick={() => setActiveCategory('green-tea')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === 'green-tea'
                  ? 'bg-purple-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Green Tea (EGCG)
            </button>
            <button
              onClick={() => setActiveCategory('ginger')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === 'ginger'
                  ? 'bg-purple-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Ginger Extract
            </button>
            <button
              onClick={() => setActiveCategory('chromium')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === 'chromium'
                  ? 'bg-purple-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Chromium
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search studies..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-purple-600"
            />
          </div>
        </div>

        {/* Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedStudies.map((study) => (
            <div
              key={study.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[11px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                    Study #{study.id}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 italic">
                    {study.journal}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {study.title}
                </h4>

                <p className="text-[11px] text-slate-500 mt-1">
                  Authors: {study.authors}
                </p>

                <p className="text-xs text-slate-700 mt-2 bg-white p-2.5 rounded border border-slate-100">
                  <strong className="text-purple-900">Key Finding:</strong> {study.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Toggle */}
        {filteredStudies.length > 8 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-lg border border-purple-800 text-purple-900 hover:bg-purple-50 text-xs font-bold tracking-wide transition-colors cursor-pointer"
            >
              {showAll ? 'Show Fewer Studies' : `View All ${filteredStudies.length} Clinical Citations`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
