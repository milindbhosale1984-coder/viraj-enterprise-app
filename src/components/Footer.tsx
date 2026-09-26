import React from 'react';
import { Phone, Shield, Sparkles, Heart, Mail, MapPin, QrCode, Cloud } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { CategoryId } from '../types';
import { VeLogo } from './VeLogo';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface FooterProps {
  language: Language;
  onSelectCategory: (id: CategoryId | 'all') => void;
  onNavigateView?: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectCategory, onNavigateView }) => {
  const t = translations[language];

  return (
    <footer className="bg-[#0a0a0c] text-stone-300 border-t border-[#D4AF37]/30 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand & Culture Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <VeLogo size={48} />
              <div>
                <span className="font-extrabold text-xl text-white font-serif tracking-tight">
                  VIRAJ ENTERPRISE PUNE
                </span>
                <p className="text-xs text-amber-400 font-semibold">
                  {t.appSubtitle} · पुणे तिथे काय उणे!
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              {t.footerTagline} छत्रपती शिवाजी महाराज, श्रीमंत बाजीराव पेशवे, लोकमान्य टिळक, आणि महात्मा जोतीराव व सावित्रीबाई फुले यांच्या पदस्पर्शाने पावन झालेली ऐतिहासिक नगरी.
            </p>

            {/* Viraj Enterprise Office & Contact Card */}
            <div className="bg-stone-900/90 p-3.5 rounded-2xl border border-stone-800 space-y-2 text-xs text-stone-300 max-w-md">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{VIRAJ_ENTERPRISE_INFO.address}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-stone-400">
                <a href={`tel:${VIRAJ_ENTERPRISE_INFO.phone}`} className="hover:text-amber-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call: {VIRAJ_ENTERPRISE_INFO.phone}</span>
                </a>
                <a href={`mailto:${VIRAJ_ENTERPRISE_INFO.email}`} className="hover:text-amber-400 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>{VIRAJ_ENTERPRISE_INFO.email}</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-stone-900 p-2.5 rounded-xl border border-stone-800 w-fit">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>{t.verifiedData} • Verified by Viraj Enterprise</span>
            </div>
          </div>

          {/* Quick Helplines */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              {language === 'mr' ? 'आपत्कालीन हेल्पलाईन' : 'Emergency Directory'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between p-1.5 rounded bg-stone-900">
                <span className="text-stone-300">पोलीस (Police):</span>
                <a href="tel:112" className="font-bold text-rose-400 hover:underline">112</a>
              </li>
              <li className="flex items-center justify-between p-1.5 rounded bg-stone-900">
                <span className="text-stone-300">मोफत ॲम्ब्युलन्स:</span>
                <a href="tel:108" className="font-bold text-emerald-400 hover:underline">108</a>
              </li>
              <li className="flex items-center justify-between p-1.5 rounded bg-stone-900">
                <span className="text-stone-300">पुणे मनपा (PMC):</span>
                <a href="tel:18001030222" className="font-bold text-amber-400 hover:underline">1800 1030 222</a>
              </li>
              <li className="flex items-center justify-between p-1.5 rounded bg-stone-900">
                <span className="text-stone-300">अग्निशामक दल:</span>
                <a href="tel:101" className="font-bold text-rose-400 hover:underline">101</a>
              </li>
            </ul>
          </div>

          {/* Categories & Smart Tools Shortcuts */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              {t.quickLinks} & Tools
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => onSelectCategory('mandir')}
                className="text-left text-stone-400 hover:text-orange-400 py-1 transition-colors cursor-pointer"
              >
                मंदिरे व किल्ले
              </button>
              <button
                onClick={() => onSelectCategory('hotels')}
                className="text-left text-stone-400 hover:text-orange-400 py-1 transition-colors cursor-pointer"
              >
                हॉटेल्स व मिसळ
              </button>
              <button
                onClick={() => onSelectCategory('hospitals')}
                className="text-left text-stone-400 hover:text-orange-400 py-1 transition-colors cursor-pointer"
              >
                रुग्णालये
              </button>
              <button
                onClick={() => onSelectCategory('shops')}
                className="text-left text-stone-400 hover:text-orange-400 py-1 transition-colors cursor-pointer"
              >
                बाकरवडी व दुकाने
              </button>
              <button
                onClick={() => onSelectCategory('emergency')}
                className="text-left text-rose-400 hover:text-rose-300 py-1 font-semibold transition-colors cursor-pointer"
              >
                आपत्कालीन सेवा
              </button>
              <a
                href="/qr-generator"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('qr_generator');
                  }
                }}
                className="text-left text-amber-400 hover:text-amber-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Generator</span>
              </a>
              <a
                href="/weather"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('weather');
                  }
                }}
                className="text-left text-sky-400 hover:text-sky-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>Pune Weather</span>
              </a>
              <a
                href="/near-me"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('near_me' as any);
                  }
                }}
                className="text-left text-amber-400 hover:text-amber-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>📍 माझ्या जवळ (Near Me GPS)</span>
              </a>
              <a
                href="/pune-market"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('pune_market' as any);
                  }
                }}
                className="text-left text-pink-400 hover:text-pink-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>🛍️ पुणे बाजारपेठ (तुळशीबाग)</span>
              </a>
              <a
                href="/loan"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('loan' as any);
                  }
                }}
                className="text-left text-amber-300 hover:text-amber-200 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>💰 बँक कर्ज माहिती (Loan)</span>
              </a>
              <a
                href="/mobile-loan"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('mobile_loan' as any);
                  }
                }}
                className="text-left text-emerald-400 hover:text-emerald-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>📱 मोबाईल ॲप कर्ज (Instant)</span>
              </a>
              <a
                href="/yojana"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('yojana' as any);
                  }
                }}
                className="text-left text-pink-400 hover:text-pink-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>🚩 सरकारी योजना (लाडकी बहीण)</span>
              </a>
              <a
                href="/privacy"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('privacy');
                  }
                }}
                className="text-left text-emerald-400 hover:text-emerald-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>🛡️ गोपनीयता धोरण (Privacy)</span>
              </a>
              <a
                href="/admin"
                onClick={(e) => {
                  if (onNavigateView) {
                    e.preventDefault();
                    onNavigateView('admin');
                  }
                }}
                className="text-left text-amber-400 hover:text-amber-300 py-1 font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>📊 ॲडमिन (Admin Panel)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Owner Details & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p className="text-center sm:text-left">
            Developed & Managed by <strong className="text-amber-400">Viraj Enterprise</strong> | Owner: <strong className="text-stone-200">Milind Bhosale</strong> | Bhekrai Nagar, Fursungi, Haveli, Pune - 412308
          </p>
          <div className="flex items-center gap-1 text-stone-400 shrink-0">
            <span>Made for Pune with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
