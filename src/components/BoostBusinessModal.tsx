import React, { useState } from 'react';
import {
  Rocket,
  X,
  CheckCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Language } from '../data/translations';
import { BOOST_PLANS } from '../data/civicServicesData';
import { BoostPlan } from '../types';

interface BoostBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  defaultPlanId?: string;
  initialBusinessName?: string;
}

export const BoostBusinessModal: React.FC<BoostBusinessModalProps> = ({
  isOpen,
  onClose,
  language,
  defaultPlanId = 'top_search',
  initialBusinessName = '',
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(defaultPlanId);
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [contactName, setContactName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');

  if (!isOpen) return null;

  const currentPlan = BOOST_PLANS.find((p) => p.id === selectedPlanId) || BOOST_PLANS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !mobileNumber.trim()) return;
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    // Save to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('pune_boost_orders') || '[]');
      const order = {
        id: `boost-${Date.now()}`,
        businessName,
        contactName,
        mobileNumber,
        plan: currentPlan.id,
        amount: currentPlan.price,
        date: new Date().toISOString(),
        status: 'Active',
      };
      localStorage.setItem('pune_boost_orders', JSON.stringify([order, ...existing]));
    } catch {}

    setStep('success');
  };

  const upiUrl = `upi://pay?pa=punesuperapp@upi&pn=PunechaSmartMitra&am=${currentPlan.price}&cu=INR&tn=${encodeURIComponent(
    `Boost ${currentPlan.id} for ${businessName}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl">
                {language === 'mr' ? 'व्यवसाय वाढवा (Boost Your Business)' : 'Boost Your Business'}
              </h3>
              <p className="text-xs text-orange-100">
                {language === 'mr'
                  ? 'पुण्यातील लाखो ग्राहकांपर्यंत थेट पोहोच वाढवा'
                  : 'Reach 100,000+ daily Pune app visitors directly'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Plan */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                  {language === 'mr' ? 'प्लॅन निवडा (Select Plan):' : 'Select Boost Plan:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BOOST_PLANS.map((plan) => {
                    const isSelected = plan.id === selectedPlanId;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 ring-2 ring-orange-500/20'
                            : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">
                            {language === 'mr' ? plan.titleMr : plan.title}
                          </span>
                        </div>
                        <span className="text-sm font-black text-orange-600 dark:text-orange-400">
                          {plan.priceLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'mr' ? 'व्यवसायाचे / पंपाचे नाव:' : 'Business / Brand Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="उदा. चितळे मिठाईवाले / टॉरंट सीएनजी / एलआयसी एजन्सी"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'mr' ? 'संपर्क व्यक्ती:' : 'Contact Person:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="नाव"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'mr' ? 'मोबाईल नंबर:' : 'Mobile Number:'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Selected Plan Summary */}
              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                <span className="font-bold text-stone-900 dark:text-stone-100 block">
                  {language === 'mr' ? 'समाविष्ट फायदे:' : 'Key Inclusions:'}
                </span>
                {(language === 'mr' ? currentPlan.featuresMr : currentPlan.features).map((feat, idx) => (
                  <p key={idx} className="text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> {feat}
                  </p>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md transition-colors cursor-pointer"
              >
                {language === 'mr'
                  ? `पुढे चला - ₹${currentPlan.price} भरणा करा`
                  : `Proceed to Pay ₹${currentPlan.price}`}
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="text-center py-2 space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-900/50 inline-block mx-auto">
                {/* Simulated UPI QR */}
                <div className="w-44 h-44 bg-white p-2.5 rounded-xl shadow-md mx-auto flex flex-col items-center justify-center border-2 border-stone-900">
                  <QrCode className="w-32 h-32 text-stone-900" />
                  <span className="text-[10px] font-mono font-bold text-stone-700 mt-1">
                    Scan with GPay / PhonePe / Paytm
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-stone-500 block">
                  {language === 'mr' ? 'भरणा रक्कम:' : 'Payable Amount:'}
                </span>
                <span className="text-3xl font-black text-stone-900 dark:text-stone-100">
                  ₹{currentPlan.price}
                </span>
                <p className="text-xs font-mono text-emerald-600 font-bold mt-1">
                  UPI ID: punesuperapp@upi
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Business: {businessName} ({currentPlan.title})
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={upiUrl}
                  className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>PhonePe / GPay वर उघडा</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  {language === 'mr' ? 'मी पैसे भरले (Done)' : 'Confirm Payment'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                {language === 'mr' ? 'अभिनंदन! बूस्ट सक्रिय झाला आहे' : 'Congratulations! Boost Activated'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto mb-5">
                {language === 'mr'
                  ? `${businessName} साठी ${currentPlan.title} यशस्वीरित्या लागू झाला असून पुढील २४ तासांत तुमचा व्यवसाय पुणे ॲपवर प्राधान्याने दिसेल.`
                  : `${currentPlan.title} is now active for ${businessName}. Your listing will receive top placement on Pune Super App.`}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm"
              >
                {language === 'mr' ? 'पूर्ण झाले (Done)' : 'Close'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
