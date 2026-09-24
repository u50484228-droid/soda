import React from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin, Truck, RefreshCw } from 'lucide-react';

export type PolicyType = 'terms' | 'privacy' | 'returns' | 'shipping' | 'disclaimer' | 'contact' | 'spam';

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#180a2c] text-white border border-purple-700/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-purple-300 hover:text-white rounded-full hover:bg-purple-900/40 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'returns' && (
          <div className="space-y-4 text-xs sm:text-sm text-purple-100">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <RefreshCw className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">60-Day Money-Back Guarantee & Return Policy</h3>
            </div>
            <p>
              At SodaTide®, your satisfaction is our absolute priority. We provide a full 60-day money-back guarantee from the original date of purchase.
            </p>
            <p className="font-semibold text-white bg-purple-950/80 p-3 rounded-xl border border-purple-700/50">
              Empty Bottle Guarantee: Even if you have consumed all bottles completely, you are eligible for a 100% refund of the product purchase price (excluding original shipping charges where applicable).
            </p>
            <h4 className="font-bold text-white text-base mt-3">How to Initiate a Return:</h4>
            <ol className="list-decimal pl-5 space-y-1.5 text-purple-200">
              <li>Send an email to <strong className="text-amber-300">contact@getSodaTide.com</strong> with your Order ID.</li>
              <li>Our customer success team will immediately issue a Return Merchandise Authorization (RMA) number.</li>
              <li>Mail remaining or empty bottles back to our fulfillment center in Salt Lake City, UT.</li>
              <li>Your refund will be posted back to your original payment method within 3 to 5 business days.</li>
            </ol>
          </div>
        )}

        {type === 'shipping' && (
          <div className="space-y-4 text-xs sm:text-sm text-purple-100">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Truck className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Shipping & Delivery Information</h3>
            </div>
            <p>
              All orders are processed and dispatched within 24 business hours from our temperature-controlled facility in Utah.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-purple-200">
              <li><strong>Domestic US Shipping:</strong> Standard transit time is 3 to 5 business days via USPS Priority or FedEx Home Delivery.</li>
              <li><strong>Tracking:</strong> A tracking link is automatically dispatched to your email as soon as your shipping label is generated.</li>
              <li><strong>Free Shipping Policy:</strong> All 3-bottle and 6-bottle orders receive complimentary domestic US shipping.</li>
            </ul>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4 text-xs sm:text-sm text-purple-100">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Mail className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Contact Customer Care</h3>
            </div>
            <p className="text-purple-200">
              Have questions about your order, tracking, or how to integrate SodaTide into your daily wellness routine? Our US-based support team is here to assist.
            </p>
            <div className="space-y-3 bg-purple-950/80 p-4 rounded-xl border border-purple-700/50">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email: <strong className="text-white">contact@getSodaTide.com</strong> (Mon-Sun, 24/7)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Toll-Free Support: <strong className="text-white">1 (800) 492-7182</strong> (Mon-Fri 9AM-6PM EST)</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Fulfillment Center: SodaTide Health Logistics, 1420 S 4800 W, Salt Lake City, UT 84104</span>
              </div>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-purple-100">
            <h3 className="text-xl font-bold text-white">Terms of Service</h3>
            <p>
              By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use. 
              The content provided on this website is for informational purposes related to health and wellness. 
              You must be at least 18 years of age to purchase products on this platform.
            </p>
            <p>
              All trademarks, service marks, and trade names of SodaTide® used on the site are registered trademarks of SodaTide Research.
            </p>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-purple-100">
            <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
            <p>
              Your personal privacy is of paramount importance. We never sell, rent, or trade your personally identifiable information or payment credentials with third parties.
            </p>
            <p>
              All payment transactions are encrypted using industry-standard 256-bit Secure Socket Layer (SSL) protocols. Information collected is used solely to process and ship your orders and notify you of order status.
            </p>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-4 text-xs sm:text-sm text-purple-100">
            <h3 className="text-xl font-bold text-white">Medical & Regulatory Disclaimer</h3>
            <p>
              The statements made regarding these products have not been evaluated by the Food and Drug Administration. 
              The efficacy of these products has not been confirmed by FDA-approved research. 
              These products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <p>
              All information presented here is not meant as a substitute for or alternative to information from healthcare practitioners. 
              Please consult your healthcare professional about potential interactions or other possible complications before using any product.
            </p>
          </div>
        )}

        {type === 'spam' && (
          <div className="space-y-4 text-xs sm:text-sm text-purple-100">
            <h3 className="text-xl font-bold text-white">Anti-Spam Policy</h3>
            <p>
              SodaTide maintains a strict zero-tolerance policy regarding unsolicited commercial email (spam). 
              We only send emails to customers who have explicitly opted in or purchased products. 
              Every email contains a 1-click unsubscribe mechanism.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-purple-800/40 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
