import React, { useState } from 'react';
import { REVIEWS_DATA, Review } from '../data/supplementData';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, Filter, X } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'bloating' | 'satiety' | 'energy'>('all');
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS_DATA);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    age: '',
    location: '',
    title: '',
    content: '',
    category: 'satiety' as const
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const filteredReviews = filter === 'all' 
    ? reviewsList 
    : reviewsList.filter(r => r.category === filter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      age: Number(newReview.age) || 45,
      location: newReview.location || 'United States',
      stars: 5,
      title: newReview.title || 'Incredible experience with SodaTide',
      content: newReview.content,
      verified: true,
      category: newReview.category,
      duration: 'Verified Customer'
    };

    setReviewsList([created, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsWriteModalOpen(false);
      setNewReview({ name: '', age: '', location: '', title: '', content: '', category: 'satiety' });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-[#160829] via-[#210c38] to-[#17082c] text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Real Customers, Real Life Changing Results
          </h2>
          <p className="mt-3 text-base text-purple-200/80">
            Read unedited stories from verified purchasers who broke free from daily bloating and constant hunger.
          </p>

          {/* Rating Summary Scoreboard */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-purple-950/70 border border-purple-800/40 rounded-2xl px-6 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">4.9</span>
              <div className="flex text-amber-400">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-base">★</span>
                ))}
              </div>
            </div>
            <span className="text-purple-400">·</span>
            <span className="text-xs font-semibold text-purple-200">
              98.4% Customer Recommendation Rate
            </span>
            <span className="text-purple-400">·</span>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 underline underline-offset-4 cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              Write a Review
            </button>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/70 border border-purple-700/40'
            }`}
          >
            All Reviews ({reviewsList.length})
          </button>
          <button
            onClick={() => setFilter('bloating')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'bloating'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/70 border border-purple-700/40'
            }`}
          >
            Bloating & Digestion
          </button>
          <button
            onClick={() => setFilter('satiety')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'satiety'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/70 border border-purple-700/40'
            }`}
          >
            Appetite & Satiety
          </button>
          <button
            onClick={() => setFilter('energy')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'energy'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/70 border border-purple-700/40'
            }`}
          >
            Energy & Metabolism
          </button>
        </div>

        {/* Reviews Cards List (Matches Exact Copy from Screenshot #3) */}
        <div className="space-y-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-200 hover:shadow-purple-900/30 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* User Avatar & Info */}
              <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-2 shrink-0 md:w-44 text-left md:text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-tr from-purple-700 to-indigo-600 border-2 border-purple-200 shadow-md flex items-center justify-center text-white text-xl font-bold">
                  {rev.name.split(' ')[0][0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-tight">
                    {rev.name} – {rev.age} years old
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{rev.location}</p>
                  <div className="mt-1 flex items-center justify-start md:justify-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex text-amber-500">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-base">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {rev.duration}
                  </span>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  {rev.content}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful (28)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a review modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a0b2e] border border-purple-700/50 rounded-2xl max-w-lg w-full p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Share Your SodaTide Experience</h3>
            <p className="text-xs text-purple-300 mb-4">
              Help others understand how SodaTide has supported your digestive and metabolic health.
            </p>

            {submittedMessage ? (
              <div className="p-6 text-center text-emerald-400 space-y-2">
                <CheckCircle className="w-10 h-10 mx-auto" />
                <p className="font-bold">Thank you for your review!</p>
                <p className="text-xs text-purple-200">Your verified testimonial has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-purple-200 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah M."
                      value={newReview.name}
                      onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-purple-950/70 border border-purple-700/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-purple-200 mb-1">Age & Location</label>
                    <input
                      type="text"
                      placeholder="e.g. 48, Seattle WA"
                      value={newReview.location}
                      onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full bg-purple-950/70 border border-purple-700/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-purple-200 mb-1">Primary Benefit Experienced</label>
                  <select
                    value={newReview.category}
                    onChange={e => setNewReview({ ...newReview, category: e.target.value as any })}
                    className="w-full bg-purple-950/70 border border-purple-700/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="satiety">Appetite Control & Satiety</option>
                    <option value="bloating">Digestive Ease & Less Bloating</option>
                    <option value="energy">Sustained Clean Energy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 mb-1">Headline</label>
                  <input
                    type="text"
                    placeholder="Short summary of your results"
                    value={newReview.title}
                    onChange={e => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full bg-purple-950/70 border border-purple-700/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-1">Your Detailed Experience</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How quickly did you notice changes? How does your stomach feel?"
                    value={newReview.content}
                    onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                    className="w-full bg-purple-950/70 border border-purple-700/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
