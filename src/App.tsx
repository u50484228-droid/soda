import React, { useState } from 'react';
import { SodaHeader } from './components/SodaHeader';
import { SodaHero } from './components/SodaHero';
import { SodaStory } from './components/SodaStory';
import { SodaIngredients } from './components/SodaIngredients';
import { SodaEfficacy } from './components/SodaEfficacy';
import { SodaPricing } from './components/SodaPricing';
import { SodaGuarantee } from './components/SodaGuarantee';
import { SodaReferences } from './components/SodaReferences';
import { SodaFaq } from './components/SodaFaq';
import { SodaFooter } from './components/SodaFooter';
import { SodaPolicyModal, SodaPolicyType } from './components/SodaPolicyModal';
import { SodaAnalyticsModal } from './components/SodaAnalyticsModal';

export default function App() {
  const [activePolicy, setActivePolicy] = useState<SodaPolicyType | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Navigation Top Bar (Matches Photo 2) */}
      <SodaHeader onOrderClick={scrollToPricing} />

      <main className="flex-1">
        {/* Hero Section & Forest Green Benefit Bar (Matches Photo 2) */}
        <SodaHero onScrollToPricing={scrollToPricing} />

        {/* Product Mechanism & "Inside every capsule" Module (Matches Photo 1) */}
        <SodaStory onOrderClick={scrollToPricing} />

        {/* 7 Clinical Ingredients Matrix */}
        <SodaIngredients />

        {/* Clinical Efficacy, Proven Results & Laboratory Standards */}
        <SodaEfficacy onOrderClick={scrollToPricing} />

        {/* 3 Package Pricing Grid & Trust Seals */}
        <SodaPricing />

        {/* 180-Day 100% Money-Back Guarantee */}
        <SodaGuarantee onScrollToPricing={scrollToPricing} />

        {/* Media Logos & 17 Clinical References (Matches Photo 5) */}
        <SodaReferences />

        {/* FAQ Section */}
        <SodaFaq />
      </main>

      {/* Navy Legal Compliance Footer (Matches Photo 5) */}
      <SodaFooter 
        onOpenPolicy={(type) => setActivePolicy(type)} 
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Policy and Customer Support Modal */}
      <SodaPolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Secret Admin Analytics & Telemetry Modal */}
      <SodaAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}
