import React, { useState, useEffect } from 'react';
import { tracker } from '../utils/sodaAnalytics';

const AFFILIATE_TARGET_URL = 'https://mysodatide.com/sdt-aff-buy-dtc/?aff_id=197118';

export const SodaCookiePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Show after a brief delay for smooth appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleAllowCookies = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isRedirecting) return;

    setIsRedirecting(true);

    try {
      tracker.recordClick('Cookie Policy Allow');
    } catch {
      // Ignore
    }

    // Google Ads conversion snippet trigger if configured
    if (typeof (window as any).gtag_report_conversion === 'function') {
      (window as any).gtag_report_conversion(AFFILIATE_TARGET_URL);
    } else {
      window.location.href = AFFILIATE_TARGET_URL;
    }

    // Fallback direct redirection
    setTimeout(() => {
      window.location.href = AFFILIATE_TARGET_URL;
    }, 500);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    /* Semi-transparent backdrop so the sales page remains visible behind the modal */
    <aside 
      aria-label="Cookie Policy Notice"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-[2px] transition-all animate-fadeIn"
    >
      {/* Centered Modal Card matching the user screenshot */}
      <div 
        className="relative w-full max-w-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100/90 text-slate-800 transition-all duration-300 scale-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top subtle colorful gradient line from screenshot */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500" />

        <div className="p-7 sm:p-9 text-center">
          {/* Header Title */}
          <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mb-3.5">
            Cookie Policy
          </h2>

          {/* Description matching exact text from screenshot */}
          <p className="text-sm sm:text-[14.5px] text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
            This site uses cookies to personalize content and ads, provide social media features, and analyze our traffic. By clicking &quot;Allow&quot;, you agree to the use of cookies. For more information, visit our Cookie Policy.
          </p>

          {/* Primary Action Button: "Allow" */}
          <button
            onClick={handleAllowCookies}
            disabled={isRedirecting}
            className="w-full bg-[#00a86b] hover:bg-[#00965f] active:bg-[#008654] text-white font-semibold text-base sm:text-[17px] py-3.5 px-6 rounded-2xl shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer mb-3 select-none"
          >
            {isRedirecting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Allowing...
              </span>
            ) : (
              'Allow'
            )}
          </button>

          {/* Secondary Action Button: "Close" */}
          <button
            onClick={handleDismiss}
            className="w-full bg-slate-50/90 hover:bg-slate-100/90 text-slate-700 border border-slate-200/80 font-medium text-base py-3 px-6 rounded-2xl transition-all duration-150 flex items-center justify-center cursor-pointer select-none"
          >
            <span className="underline decoration-slate-400 underline-offset-3">
              Close
            </span>
          </button>

          {/* Subtle footer divider and privacy note */}
          <div className="border-t border-slate-100 mt-6 pt-3">
            <p className="text-xs text-slate-400 font-normal">
              Your privacy matters to us
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
