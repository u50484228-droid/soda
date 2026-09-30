import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, ArrowRight } from 'lucide-react';
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

  const handleAcceptCookies = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isRedirecting) return;

    setIsRedirecting(true);

    try {
      tracker.recordClick('Accept Cookies Popup');
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
    /* Semi-transparent backdrop so the entire sales page is 100% visible behind the modal */
    <aside 
      aria-label="Cookie & Privacy Consent Notice"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/45 backdrop-blur-[2px] transition-all animate-fadeIn"
    >
      {/* Centered Cookie Card / Square Popup */}
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-purple-200/90 p-6 sm:p-7 text-slate-800 transition-transform duration-300 scale-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Close "X" button so user can dismiss if desired */}
        <button
          onClick={handleDismiss}
          aria-label="Close cookie notice"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="mb-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Cookie Preferences
          </h3>
        </div>

        {/* Description Body */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          We use essential cookies and secure tracking technologies to ensure your safe browsing, data encryption, and automatic activation of the best official discounts and savings.
        </p>

        {/* Main CTA Button: ACCEPT COOKIES & GO DIRECTLY TO AFFILIATE LINK */}
        <button
          onClick={handleAcceptCookies}
          disabled={isRedirecting}
          className="w-full group bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transform active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/40"
        >
          {isRedirecting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Redirecting...
            </span>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>ACCEPT ALL COOKIES & CONTINUE</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
