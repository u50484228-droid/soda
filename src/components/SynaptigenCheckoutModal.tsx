import React, { useState } from 'react';
import { SYNAPTIGEN_BUNDLES, BundlePlan } from '../data/synaptigenData';
import { X, Lock, ShieldCheck, CheckCircle2, CreditCard, Truck, ArrowRight, Gift } from 'lucide-react';

interface SynaptigenCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBundleId?: string;
}

export const SynaptigenCheckoutModal: React.FC<SynaptigenCheckoutModalProps> = ({
  isOpen,
  onClose,
  initialBundleId = 'best-value-6'
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(initialBundleId);
  const [step, setStep] = useState<'checkout' | 'confirmation'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: 'CA',
    zip: '',
    cardNumber: '•••• •••• •••• 5124',
    exp: '09/29',
    cvv: '392'
  });

  if (!isOpen) return null;

  const currentBundle = SYNAPTIGEN_BUNDLES.find(b => b.id === selectedBundleId) || SYNAPTIGEN_BUNDLES[1];
  const shippingFee = currentBundle.freeShipping ? 0 : 9.99;
  const grandTotal = currentBundle.totalPrice + shippingFee;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`SYN-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('confirmation');
    }, 1100);
  };

  const resetAndClose = () => {
    setStep('checkout');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 my-6 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'checkout' ? (
          <div>
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>BuyGoods™ 256-Bit SSL Encrypted Order</span>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Complete Your Synaptigen™ Order
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              All orders backed by our 180-Day 100% Empty Bottle Money-Back Guarantee.
            </p>

            {/* Package Selector */}
            <div className="mb-6 space-y-2">
              <label className="text-xs font-bold text-slate-700">Choose Your Package:</label>
              <div className="grid grid-cols-3 gap-2.5">
                {SYNAPTIGEN_BUNDLES.map((b) => {
                  const isSelected = b.id === selectedBundleId;
                  return (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setSelectedBundleId(b.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-600 ring-2 ring-teal-500/20 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 leading-tight">
                          {b.bottlesLabel}
                        </span>
                        {b.type === 'BEST VALUE!' && (
                          <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                            BEST
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">${b.pricePerBottle}/bottle</p>
                      <p className="text-xs font-black text-teal-800 mt-0.5">${b.totalPrice}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-700">
                <span>{currentBundle.bottlesLabel} ({currentBundle.supplyDays} Day Supply)</span>
                <span className="font-bold text-slate-900">${currentBundle.totalPrice}.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Promotional Savings</span>
                <span className="text-emerald-600 font-bold">-${currentBundle.savings}.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>USPS Priority Express Shipping</span>
                <span className={currentBundle.freeShipping ? 'text-emerald-600 font-bold' : 'text-slate-900'}>
                  {currentBundle.freeShipping ? 'FREE ($0.00)' : '$9.99'}
                </span>
              </div>

              {currentBundle.freeEbooks && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                  <Gift className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3 FREE Digital Brain Health Bonuses Included ($158 Value)!</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                <span>Grand Total:</span>
                <span className="text-lg text-teal-800 font-mono">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor"
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vance"
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    placeholder="1209 Elm Street"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Postal ZIP</label>
                  <input
                    type="text"
                    required
                    placeholder="90210"
                    value={form.zip}
                    onChange={e => setForm({ ...form, zip: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
                  <span>Card Number (Simulated Safe Vault)</span>
                  <span className="text-[10px] text-slate-400">Visa, MC, Amex, Discover</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:outline-none focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={form.exp}
                      onChange={e => setForm({ ...form, exp: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:outline-none focus:border-teal-600 text-center"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-4 py-4 rounded-full font-black text-sm uppercase tracking-wider text-white bg-[#198774] hover:bg-[#137161] shadow-lg transition-transform active:scale-[0.99] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>AUTHORIZING SECURE PAYMENT...</span>
                ) : (
                  <>
                    <span>SUBMIT ORDER — ${grandTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  180-Day Guarantee
                </span>
                <span>·</span>
                <span>Fast 24-Hr Dispatch</span>
                <span>·</span>
                <span>One-Time Charge Only</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                Order Confirmed & Payment Successful
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-3">
                Thank You, {form.firstName || 'Valued Customer'}!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your Synaptigen shipment is being packed at our FDA-registered facility in Utah.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-teal-800">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Selected Package:</span>
                <span className="font-bold text-slate-900">{currentBundle.bottlesLabel} ({currentBundle.supplyDays} Days)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Tracking Delivery:</span>
                <span className="text-emerald-700 font-semibold">USPS Priority (3-5 Days)</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm text-slate-900">
                <span>Total Paid:</span>
                <span className="text-teal-800 font-mono">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {currentBundle.freeEbooks && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-emerald-800 max-w-md mx-auto">
                <p className="font-bold">🎉 Your 3 FREE eBooks are unlocked!</p>
                <p className="text-slate-600 mt-0.5">Download links have been sent directly to {form.email || 'your email'}.</p>
              </div>
            )}

            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-full bg-[#198774] hover:bg-[#137161] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Back To Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
