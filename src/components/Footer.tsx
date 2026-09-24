import React from 'react';
import { PolicyType } from './PolicyModal';

interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer className="bg-[#0b0413] text-slate-400 text-xs border-t border-purple-900/40 py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        
        {/* Navigation Links Mirror (Matches Screenshot #9 exactly) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-purple-200">
          <button
            onClick={() => onOpenPolicy('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
          <span className="text-purple-800">·</span>
          <button
            onClick={() => onOpenPolicy('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms
          </button>
          <span className="text-purple-800">·</span>
          <button
            onClick={() => onOpenPolicy('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <span className="text-purple-800">·</span>
          <button
            onClick={() => onOpenPolicy('returns')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Return Policy
          </button>
          <span className="text-purple-800">·</span>
          <button
            onClick={() => onOpenPolicy('shipping')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Shipping
          </button>
          <span className="text-purple-800">·</span>
          <button
            onClick={() => onOpenPolicy('disclaimer')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Disclaimer
          </button>
          <span className="text-purple-800">·</span>
          <button
            onClick={() => onOpenPolicy('spam')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Report Spam
          </button>
        </div>

        {/* First Medical Consultation Disclaimer (Matches Screenshot #9) */}
        <p className="text-[11px] leading-relaxed text-slate-400/90 text-justify sm:text-center max-w-4xl mx-auto">
          The information we provide is not intended to replace consultation with a qualified medical professional. 
          We encourage you to inform your doctor about any changes you make to your lifestyle and discuss them with him or her. 
          For questions or concerns about any medical conditions you may have, please contact your doctor. The content of the website 
          and the product for sale are based on the author's opinion and are provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;. 
          You should conduct your own research and verify the information with other sources when researching health issues and always 
          review the information carefully with your healthcare professional before using any of the protocols presented on this website 
          and/or the product sold here. Testimonials, case studies, and examples found on this page are results submitted to us by SodaTide 
          users and may not reflect the typical buyer's experience, may not apply to an average person, and are not intended to represent 
          or guarantee that any person will achieve the same or similar results. Some names and personally identifying information on this 
          site have been changed to protect individuals&apos; privacy.
        </p>

        {/* Official FDA Disclaimer (Matches Screenshot #9) */}
        <p className="text-[11px] leading-relaxed text-slate-400/90 text-justify sm:text-center max-w-4xl mx-auto">
          The statements on this website have not been evaluated by the Food and Drug Administration. This product is not intended to 
          diagnose, treat, cure, or prevent any disease. The information provided by this website or this company is not a substitute 
          for a face-to-face consultation with your physician and should not be construed as individual medical advice. The testimonials 
          on this website are individual cases and do not guarantee that you will get the same results. All content, including text, graphics, 
          images, and information, contained on or available through this website is for general information purposes only. You are encouraged 
          to confirm any information obtained from or through this website with other sources and review all information regarding any 
          medical condition or treatment with your physician. <strong className="text-slate-300">NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY SEEKING MEDICAL TREATMENT BECAUSE OF SOMETHING YOU HAVE READ ON OR ACCESSED THROUGH THIS WEBSITE.</strong>
        </p>

        {/* Copyright Notice */}
        <div className="pt-4 border-t border-purple-950/80 text-[11px] text-slate-500">
          © SodaTide Research 2026. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};
