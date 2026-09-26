import React, { useState } from 'react';
import {
  Calculator,
  Percent,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  PieChart,
  HelpCircle,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';
import { recordWhatsAppClick } from '../utils/sheet';

export const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(2500000); // 25 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // Calculate monthly EMI formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P <= 0 || r <= 0 || n <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  };

  const { emi, totalPayment, totalInterest } = calculateEMI();
  const principalPercentage = Math.round((loanAmount / totalPayment) * 100) || 50;
  const interestPercentage = 100 - principalPercentage;

  const handleApplyWhatsApp = () => {
    recordWhatsAppClick(`EMI Calc Apply: ₹${loanAmount} @ ${interestRate}% for ${tenureYears} yrs`);
    const text = encodeURIComponent(
      `Mala Loan Hava Ahe Sir - Amount: ₹${loanAmount.toLocaleString('en-IN')}, Tenure: ${tenureYears} Years, Monthly EMI: ₹${emi.toLocaleString('en-IN')}. Krupaya bank loan process karun dya. - Milind Bhosale (Viraj Enterprise Pune)`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  const applyPreset = (amount: number, rate: number, years: number) => {
    setLoanAmount(amount);
    setInterestRate(rate);
    setTenureYears(years);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>इन्स्टंट कर्ज हप्ता गणकयंत्र • अचूक बँक EMI कॅल्क्युलेटर २०२६</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Loan EMI Calculator - Milind Bhosale
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            गृहकर्ज, पर्सनल लोन, आणि वाहन कर्जाचा मासिक हप्ता त्वरित तपासा • Viraj Enterprise
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => applyPreset(3000000, 8.4, 20)}
              className="py-1 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-semibold cursor-pointer"
            >
              🏠 Home Loan (₹30L @ 8.4%)
            </button>
            <button
              onClick={() => applyPreset(500000, 10.5, 5)}
              className="py-1 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-semibold cursor-pointer"
            >
              👤 Personal Loan (₹5L @ 10.5%)
            </button>
            <button
              onClick={() => applyPreset(800000, 8.8, 7)}
              className="py-1 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-semibold cursor-pointer"
            >
              🚗 Car Loan (₹8L @ 8.8%)
            </button>
          </div>
        </div>

        {/* CALCULATOR MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLS: Sliders & Inputs */}
          <div className="md:col-span-7 rounded-3xl bg-[#141419] p-5 sm:p-6 border-2 border-[#D4AF37] shadow-xl space-y-6">
            {/* 1. Loan Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-300">
                  कर्जाची रक्कम (Loan Amount):
                </label>
                <span className="font-mono font-black text-amber-300 text-base">
                  ₹{loanAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <input
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />

              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>₹५० हजार</span>
                <span>₹५० लाख</span>
                <span>₹१ कोटी</span>
              </div>
            </div>

            {/* 2. Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-300">
                  व्याजदर (Interest Rate % p.a.):
                </label>
                <span className="font-mono font-black text-emerald-400 text-base">
                  {interestRate}%
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>५%</span>
                <span>१२%</span>
                <span>२५%</span>
              </div>
            </div>

            {/* 3. Tenure in Years */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-300">
                  मुदत (Tenure in Years):
                </label>
                <span className="font-mono font-black text-sky-400 text-base">
                  {tenureYears} वर्षे ({tenureYears * 12} महिने)
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />

              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>१ वर्ष</span>
                <span>१५ वर्षे</span>
                <span>३० वर्षे</span>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Results & Big Action */}
          <div className="md:col-span-5 rounded-3xl bg-gradient-to-b from-[#181822] to-[#121217] p-5 sm:p-6 border-2 border-[#D4AF37] shadow-xl space-y-5">
            {/* Monthly EMI Hero Box */}
            <div className="text-center p-4 rounded-2xl bg-stone-950/80 border border-[#D4AF37]/50">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                मासिक हप्ता (Monthly EMI)
              </span>
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight block">
                ₹{emi.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-stone-400 block mt-1">
                दरमहा भरावा लागणारा हप्ता
              </span>
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-400">मुद्दल रक्कम (Principal):</span>
                <span className="font-mono font-bold text-white">
                  ₹{loanAmount.toLocaleString('en-IN')} ({principalPercentage}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-400">एकूण व्याज (Total Interest):</span>
                <span className="font-mono font-bold text-amber-300">
                  ₹{totalInterest.toLocaleString('en-IN')} ({interestPercentage}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-stone-300 font-bold">एकूण रक्कम (Total Payable):</span>
                <span className="font-mono font-black text-emerald-400 text-sm">
                  ₹{totalPayment.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="space-y-1">
              <div className="w-full bg-stone-800 rounded-full h-3 overflow-hidden flex border border-stone-700">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${principalPercentage}%` }}
                  title={`मुद्दल: ${principalPercentage}%`}
                />
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${interestPercentage}%` }}
                  title={`व्याज: ${interestPercentage}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-400">
                <span className="text-emerald-400 font-semibold">● मुद्दल ({principalPercentage}%)</span>
                <span className="text-amber-400 font-semibold">● व्याज ({interestPercentage}%)</span>
              </div>
            </div>

            {/* Big Apply Button */}
            <button
              onClick={handleApplyWhatsApp}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.35)] cursor-pointer transition-all active:scale-95"
            >
              <FaWhatsapp className="w-5 h-5 text-stone-950" />
              <span>हे कर्ज हवे आहे? (WhatsApp अर्ज)</span>
            </button>
          </div>
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Loan EMI Calculator" />
      </div>
    </div>
  );
};
