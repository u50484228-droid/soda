import React, { useState } from 'react';
import { SODATIDE_CITATIONS, SodaCitation } from '../data/sodatideModelData';
import { ChevronDown, ChevronUp, BookOpen, X } from 'lucide-react';

export const SodaReferences: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<SodaCitation | null>(null);

  const displayedCitations = showAll
    ? SODATIDE_CITATIONS
    : SODATIDE_CITATIONS.slice(0, 8);

  return (
    <section id="references" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Media / Scientific Publication Logos (Matches Photo 5 Top) */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-8 mb-12 border-b border-slate-100 opacity-70 grayscale hover:grayscale-0 transition-all">
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-800 font-sans">
            healthline
          </span>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 font-serif">
            ScienceDirect
          </span>
          <span className="text-xl sm:text-2xl font-black lowercase tracking-tighter text-slate-800 font-serif">
            nature
          </span>
          <div className="flex items-center gap-1 text-slate-800 font-bold text-lg sm:text-xl uppercase tracking-wider">
            <span>frontiers</span>
            <span className="text-[9px] bg-slate-200 px-1 py-0.5 rounded text-slate-600 font-mono">
              SCIENCE NEWS
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Scientific References
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Peer-reviewed research and clinical citations supporting the ingredients in SodaTide™
          </p>
        </div>

        {/* 2-Column Citations List (Matches Photo 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-xs text-slate-600 leading-relaxed">
          {displayedCitations.map((citation) => (
            <div key={citation.id} className="space-y-1">
              <p>
                <strong className="text-slate-900 font-bold">{citation.id}. </strong>
                {citation.authors} ({citation.year}). {citation.title}.{' '}
                <em className="text-slate-700">{citation.journal}</em>.{' '}
                <button
                  onClick={() => setSelectedCitation(citation)}
                  className="text-blue-600 hover:text-blue-800 underline font-semibold ml-1 cursor-pointer"
                >
                  [Source]
                </button>
              </p>
            </div>
          ))}
        </div>

        {/* View All References Toggle Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-300 hover:border-purple-600 text-xs font-bold text-slate-700 hover:text-purple-800 transition-colors cursor-pointer bg-white shadow-sm"
          >
            <span>{showAll ? 'Show Fewer References' : `View All ${SODATIDE_CITATIONS.length} References`}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Citation Detail Modal */}
      {selectedCitation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
            <button
              onClick={() => setSelectedCitation(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wide mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Peer-Reviewed Study #{selectedCitation.id}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
              {selectedCitation.title}
            </h3>

            <p className="text-xs text-slate-500 mb-4">
              <strong>Authors:</strong> {selectedCitation.authors} ({selectedCitation.year})<br />
              <strong>Published in:</strong> {selectedCitation.journal}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1 text-slate-700">
              <strong className="block font-bold text-slate-900">Clinical Finding Summary:</strong>
              <p>{selectedCitation.keyFinding}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCitation(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-sm cursor-pointer"
              >
                Close Citation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
