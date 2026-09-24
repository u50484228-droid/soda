import React from 'react';

interface SynaptigenStoryProps {
  onOrderClick: () => void;
}

export const SynaptigenStory: React.FC<SynaptigenStoryProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-white text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Introduction Copy (Matches Screenshot 1 Top) */}
        <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto">
          <p>
            Synaptigen is a cutting-edge brain health formula designed to support memory, focus, and cognitive clarity. 
            It uses a blend of scientifically backed ingredients and works by clearing sugar buildup from neurons, 
            thereby supporting brain cell communication and promoting long-term mental sharpness.
          </p>
          <p>
            With a carefully selected mix of powerful probiotics, prebiotics, and plant-based nutrients, 
            Synaptigen helps nourish and protect the brain cells, supporting good cognitive function and mental health well into old age.
          </p>
        </div>

        {/* Product Inset Module (Matches Screenshot 1 Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-slate-50/80 rounded-3xl p-6 sm:p-12 border border-slate-200/60 shadow-sm">
          
          {/* Left Column: Bottle Presentation on Pedestal */}
          <div className="md:col-span-6 flex justify-center">
            <div className="relative w-full max-w-sm flex items-center justify-center">
              {/* Circular backdrop disc */}
              <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-slate-200/70 -z-0" />
              
              <img
                src="/src/assets/images/synaptigen_hero_bottle_1790284402321.jpg"
                alt="Synaptigen Dietary Supplement Tablets"
                referrerPolicy="no-referrer"
                className="relative z-10 w-64 sm:w-72 h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Column: Key Claim and Order Now */}
          <div className="md:col-span-6 space-y-6 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Inside every tablet of Synaptigen you’ll find:
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              An optimally dosed, proprietary formula of <strong className="text-slate-900 font-bold">powerful ingredients</strong>, 
              carefully mixed to complement each other.
            </p>

            <div className="pt-2">
              <button
                onClick={onOrderClick}
                className="px-9 py-3.5 rounded-full text-base font-bold text-white bg-[#198774] hover:bg-[#137161] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
