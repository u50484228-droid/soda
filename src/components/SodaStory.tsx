import React, { useState } from 'react';
import { sodatideBotanicalTableImg, sodatideWomanMorningImg } from '../assets/images';

interface SodaStoryProps {
  onOrderClick: () => void;
}

export const SodaStory: React.FC<SodaStoryProps> = ({ onOrderClick }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<'botanical' | 'lifestyle'>('botanical');

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Introduction Copy (Matches Photo 1 Top) */}
        <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto">
          <p>
            SodaTide is a cutting-edge metabolic & digestive health formula designed to support healthy gut transit, 
            curb intense appetite, and promote sustained daily energy. It uses a blend of scientifically backed ingredients 
            and works by clearing sluggish digestive stagnation and optimizing gut-hormone signaling, 
            thereby supporting natural satiety and turning stored fat into usable energy.
          </p>
          <p>
            With a carefully selected mix of powerful fibers, polyphenols, and plant-based nutrients, 
            SodaTide helps nourish and protect the gut microbiome, supporting good metabolic function and digestive vitality well into old age.
          </p>
        </div>

        {/* Product Inset Module (Matches Photo 1 Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center bg-slate-50/90 rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200/70 shadow-sm">
          
          {/* Left Column: Authentic Product & Natural Ingredients Photo */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl shadow-md border border-slate-200/80 bg-white">
              <img
                src={selectedPhoto === 'botanical' ? sodatideBotanicalTableImg : sodatideWomanMorningImg}
                alt={selectedPhoto === 'botanical' ? 'SodaTide formula with fresh ginger, mint, green tea and pure capsules' : 'SodaTide daily healthy morning routine'}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-2xl hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Subtle Photo Variant Switcher */}
            <div className="flex items-center gap-2 mt-3.5 bg-slate-200/70 p-1 rounded-full text-xs font-semibold text-slate-600">
              <button
                onClick={() => setSelectedPhoto('botanical')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedPhoto === 'botanical'
                    ? 'bg-white text-purple-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                🌿 Formula & Ingredients
              </button>
              <button
                onClick={() => setSelectedPhoto('lifestyle')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedPhoto === 'lifestyle'
                    ? 'bg-white text-purple-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                ☀️ Morning Routine
              </button>
            </div>
          </div>

          {/* Right Column: Key Claim and Order Now */}
          <div className="md:col-span-6 space-y-5 sm:space-y-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Inside every capsule of SodaTide you’ll find:
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              An optimally dosed, proprietary formula of <strong className="text-purple-950 font-bold">powerful ingredients</strong>, 
              carefully mixed to complement each other.
            </p>

            <div className="pt-2">
              <button
                onClick={onOrderClick}
                data-aff-track
                data-button-name="Story - Order Now"
                className="w-full sm:w-auto px-8 sm:px-9 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                Order Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
