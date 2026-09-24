import React from 'react';
import { X, Mail, Phone, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export type SynaptigenPolicyType = 'contact' | 'terms' | 'disclaimer' | 'privacy' | 'shipping' | 'refund' | 'order-support';

interface SynaptigenPolicyModalProps {
  type: SynaptigenPolicyType | null;
  onClose: () => void;
}

export const SynaptigenPolicyModal: React.FC<SynaptigenPolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 my-8 max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'refund' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2 text-teal-800 mb-2">
              <RefreshCw className="w-6 h-6 text-teal-700" />
              <h3 className="text-xl font-bold text-slate-900">180-Day 100% Money-Back Guarantee & Refund Policy</h3>
            </div>
            <p>
              Synaptigen™ provides an unconditional 180-day money-back guarantee. You have a full 6 months from the date of purchase to evaluate the product.
            </p>
            <p className="font-semibold text-slate-900 bg-teal-50 p-3.5 rounded-2xl border border-teal-200">
              Empty-Bottle Policy: Even if you have finished all bottles down to the very last tablet, you may return the containers for a 100% refund of the purchase price.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">How to Request Your Refund:</h4>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>Contact support at <strong className="text-teal-800">support@synaptigen.com</strong> or through BuyGoods.</li>
              <li>Obtain your Return Merchandise Authorization (RMA) number.</li>
              <li>Mail your empty or partially used bottles back to our fulfillment address.</li>
              <li>Your refund is processed immediately upon arrival.</li>
            </ol>
          </div>
        )}

        {type === 'shipping' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2 text-teal-800 mb-2">
              <Truck className="w-6 h-6 text-teal-700" />
              <h3 className="text-xl font-bold text-slate-900">Shipping & Delivery Terms</h3>
            </div>
            <p>
              All orders are picked, packed, and dispatched within 24 business hours from our certified domestic warehouse in Utah.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Domestic USA:</strong> Standard USPS Priority delivery typically arrives in 3 to 5 business days.</li>
              <li><strong>Tracking:</strong> Tracking credentials are automatically generated and emailed to you upon package dispatch.</li>
              <li><strong>Free Shipping:</strong> Both the 3-bottle and 6-bottle packages include complimentary expedited shipping.</li>
            </ul>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2 text-teal-800 mb-2">
              <Mail className="w-6 h-6 text-teal-700" />
              <h3 className="text-xl font-bold text-slate-900">Product Support & Contact</h3>
            </div>
            <p>
              Our US-based support specialists are available Monday through Friday to answer product inquiries, dosage questions, or account requests.
            </p>
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p><strong>Customer Support Email:</strong> support@synaptigen.com</p>
              <p><strong>Phone Support:</strong> 1 (800) 829-4172 (Mon-Fri 9:00 AM – 5:00 PM EST)</p>
              <p><strong>Fulfillment Center:</strong> Synaptigen Health Logistics, 1420 S 4800 W, Salt Lake City, UT 84104</p>
            </div>
          </div>
        )}

        {type === 'order-support' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <h3 className="text-xl font-bold text-slate-900">BuyGoods Order Support</h3>
            <p>
              BuyGoods is the official retailer of Synaptigen. For inquiries regarding billing, transactions, or order lookup, you can access the BuyGoods customer portal directly at <strong>www.buygoods.com/orderlookup</strong> or email <strong>support@buygoods.com</strong>.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <h3 className="text-xl font-bold text-slate-900">Terms of Use</h3>
            <p>
              By accessing and purchasing through this website, you agree to comply with all applicable terms, conditions, and privacy policies. You must be at least 18 years of age to purchase products on this site.
            </p>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <h3 className="text-xl font-bold text-slate-900">FDA & Regulatory Disclaimer</h3>
            <p>
              Statements on this website have not been evaluated by the Food and Drug Administration. Products are not intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.
            </p>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <h3 className="text-xl font-bold text-slate-900">Privacy Policy</h3>
            <p>
              We respect your personal privacy. We never share, sell, or disclose customer email addresses, billing information, or contact data to unauthorized third parties. All transactions are safeguarded with 256-bit encryption.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
