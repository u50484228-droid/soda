import React, { useState } from 'react';
import { BUNDLE_OPTIONS, BundleOption } from '../data/supplementData';
import { X, Lock, ShieldCheck, CheckCircle2, CreditCard, Truck, ArrowRight, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBundleId?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialBundleId = 'bundle-6'
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(initialBundleId);
  const [step, setStep] = useState<'checkout' | 'confirmation'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: 'CA',
    zip: '',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '08/29',
    cvv: '821'
  });

  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  const currentBundle = BUNDLE_OPTIONS.find(b => b.id === selectedBundleId) || BUNDLE_OPTIONS[0];
  const shippingCost = currentBundle.freeShipping ? 0 : 9.95;
  const grandTotal = currentBundle.totalPrice + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderNumber(`ST-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('confirmation');
    }, 1200);
  };

  const handleReset = () => {
    setStep('checkout');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#180a2c] text-white border border-purple-600/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-6 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-purple-300 hover:text-white rounded-full hover:bg-purple-900/40 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'checkout' ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Encrypted Secure Checkout</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Complete Your SodaTide® Order
            </h2>
            <p className="text-xs text-purple-300 mb-6">
              Instant priority dispatch · 60-day money back guarantee on all bottles.
            </p>

            {/* Bundle Selector Chips */}
            <div className="mb-6 space-y-2">
              <label className="text-xs font-bold text-purple-200">Select Your Package:</label>
              <div className="grid grid-cols-3 gap-2.5">
                {BUNDLE_OPTIONS.map((b) => {
                  const isSelected = b.id === selectedBundleId;
                  return (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setSelectedBundleId(b.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-900/60 border-amber-400 shadow-md shadow-amber-400/10 ring-1 ring-amber-400'
                          : 'bg-purple-950/40 border-purple-800/40 hover:border-purple-600/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white leading-tight">{b.name}</span>
                        {b.recommended && (
                          <span className="text-[9px] bg-amber-400 text-purple-950 px-1.5 py-0.5 rounded font-black">
                            BEST
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-purple-300 mt-1">${b.pricePerBottle}/bottle</p>
                      <p className="text-xs font-extrabold text-amber-300 mt-0.5">${b.totalPrice}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-purple-950/70 border border-purple-700/40 rounded-2xl p-4 mb-6 text-xs space-y-2">
              <div className="flex justify-between items-center text-purple-200">
                <span>{currentBundle.name} ({currentBundle.bottles} Bottles – {currentBundle.supplyDays} Day Supply)</span>
                <span className="font-bold text-white">${currentBundle.totalPrice}.00</span>
              </div>
              <div className="flex justify-between items-center text-purple-300">
                <span>Instant Promotion Savings</span>
                <span className="text-emerald-400 font-bold">-${currentBundle.savings}.00</span>
              </div>
              <div className="flex justify-between items-center text-purple-300">
                <span>USPS Priority Express Shipping</span>
                <span className={currentBundle.freeShipping ? 'text-emerald-400 font-bold' : 'text-white'}>
                  {currentBundle.freeShipping ? 'FREE ($0.00)' : '$9.95'}
                </span>
              </div>
              <div className="pt-2 border-t border-purple-800/60 flex justify-between items-center text-sm font-black text-white">
                <span>Total Due Today:</span>
                <span className="text-lg text-amber-300 font-mono">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-200 font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diane"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Keller"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-200 font-medium mb-1">Email (For Order Confirmation & Tracking)</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-purple-200 font-medium mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    placeholder="123 Wellness Blvd"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-medium mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    placeholder="80202"
                    value={formData.zip}
                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-purple-200 font-bold flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    Payment Details (Simulated Secure Vault)
                  </label>
                  <span className="text-[10px] text-purple-300">Visa, MC, Amex, Discover</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.expDate}
                      onChange={e => setFormData({ ...formData, expDate: e.target.value })}
                      className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-4 py-4 rounded-xl font-black text-sm uppercase tracking-wider text-purple-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 shadow-xl shadow-amber-400/20 transition-transform active:scale-[0.99] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>AUTHORIZING TRANSACTION...</span>
                ) : (
                  <>
                    <span>COMPLETE ORDER — PAY ${grandTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-purple-300/80 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  60-Day Guarantee
                </span>
                <span>·</span>
                <span>Fast 24-Hr US Dispatch</span>
                <span>·</span>
                <span>No Recurring Charges</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
                Order Successfully Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Thank You, {formData.firstName || 'Customer'}!
              </h3>
              <p className="text-xs text-purple-200 mt-1">
                Your order is currently being prepared at our Salt Lake City cGMP facility.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-purple-950/70 border border-purple-700/50 rounded-2xl p-5 text-left text-xs space-y-3 max-w-md mx-auto">
              <div className="flex justify-between border-b border-purple-800/60 pb-2">
                <span className="text-purple-300">Order Reference:</span>
                <span className="font-mono font-bold text-amber-300">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-purple-800/60 pb-2">
                <span className="text-purple-300">Package:</span>
                <span className="font-semibold text-white">{currentBundle.name} ({currentBundle.bottles} Bottles)</span>
              </div>
              <div className="flex justify-between border-b border-purple-800/60 pb-2">
                <span className="text-purple-300">Tracking Carrier:</span>
                <span className="text-white">USPS Priority (Tracking sent to {formData.email || 'your email'})</span>
              </div>
              <div className="flex justify-between border-b border-purple-800/60 pb-2">
                <span className="text-purple-300">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-300">3 – 5 Business Days</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span>Amount Paid:</span>
                <span className="text-amber-300 font-mono">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 text-[11px] text-amber-200 max-w-md mx-auto">
              <p className="font-semibold">
                🛡️ Remember: You are covered by the 60-Day Empty Bottle Guarantee.
              </p>
              <p className="text-purple-300 mt-0.5">
                Take SodaTide consistently for best results. Support is always available at contact@getSodaTide.com.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
