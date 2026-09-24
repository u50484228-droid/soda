import React from 'react';

interface SodaFooterProps {
  onOpenPolicy: (type: 'contact' | 'terms' | 'disclaimer' | 'privacy' | 'shipping' | 'refund' | 'order-support') => void;
}

export const SodaFooter: React.FC<SodaFooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer className="bg-[#0f071a] text-slate-300 text-xs py-16 border-t border-purple-950/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        
        {/* Navigation Links (Matches Photo 5) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-200">
          <button
            onClick={() => onOpenPolicy('contact')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Contact
          </button>
          <span className="text-slate-700">|</span>
          <a
            href="#references"
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            References
          </a>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => onOpenPolicy('terms')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Terms Of Use
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => onOpenPolicy('disclaimer')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Disclaimer
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => onOpenPolicy('privacy')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => onOpenPolicy('shipping')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Shipping Policy
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => onOpenPolicy('refund')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Refund Policy
          </button>
        </div>

        {/* Vendor and BuyGoods Support Notice (Matches Photo 5) */}
        <div className="space-y-1.5 text-slate-400 text-xs">
          <p>
            For Product Support, please contact the vendor{' '}
            <button
              onClick={() => onOpenPolicy('contact')}
              className="text-purple-400 hover:text-purple-300 underline font-medium cursor-pointer"
            >
              here
            </button>
            .
          </p>
          <p>
            For Order Support, please contact BuyGoods{' '}
            <button
              onClick={() => onOpenPolicy('order-support')}
              className="text-purple-400 hover:text-purple-300 underline font-medium cursor-pointer"
            >
              here
            </button>
            .
          </p>
        </div>

        {/* FDA Statement (Matches Photo 5) */}
        <p className="text-[11px] leading-relaxed text-slate-400 max-w-4xl mx-auto">
          Statements on this website have not been evaluated by the Food and Drug Administration. 
          Products are not intended to diagnose, treat, cure or prevent any disease. 
          If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.
        </p>

        {/* Retailer Disclosure (Matches Photo 5) */}
        <p className="text-[11px] leading-relaxed text-slate-400 max-w-4xl mx-auto">
          BuyGoods is the retailer of products on this site. BuyGoods® is a registered trademark of BuyGoods Inc., 
          a Delaware corporation located at 1209 Orange Street, Wilmington DE 19801, USA and used by permission. 
          BuyGoods&apos; role as retailer does not constitute an endorsement, approval or review of these products 
          or any claim, statement or opinion used in promotion of these products.
        </p>

        {/* Google Advertising Disclosure (Matches Photo 5) */}
        <p className="text-[11px] text-slate-400">
          This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.
        </p>

        {/* Copyright (Matches Photo 5) */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
          Copyright © 2026 SodaTide. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};
