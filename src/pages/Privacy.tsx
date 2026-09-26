import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { VeLogo } from '../components/VeLogo';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface PrivacyProps {
  onBack?: () => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-stone-200 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-5">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-amber-400 border border-stone-700 text-xs font-bold cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>मागे जा (Back to Home)</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <VeLogo size={36} />
            <span className="text-xs font-black tracking-widest text-[#D4AF37] uppercase">
              VIRAJ ENTERPRISE
            </span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 text-amber-400 mb-2">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            गोपनीयता धोरण (Privacy Policy)
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-medium">
            पुणे एआय एजंट • पुणेकरांचा स्मार्ट डिजिटल मित्र • Viraj Enterprise
          </p>
        </div>

        {/* Highlight Guarantee Box */}
        <div className="bg-gradient-to-r from-emerald-950/60 to-stone-900 border-2 border-emerald-500/50 p-6 rounded-3xl shadow-xl flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-emerald-300 font-devanagari-hero">
              "आम्ही तुमचा वैयक्तिक डेटा विकत नाही, फक्त ॲप सुधारण्यासाठी वापरतो."
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 leading-relaxed">
              "We do not sell your personal data. Any non-personal data collected is strictly used to improve your experience and show popular Pune destinations."
            </p>
          </div>
        </div>

        {/* Policy Points in Marathi & English */}
        <div className="bg-[#141418] p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>१. डेटा सुरक्षा आणि विक्री नाही (No Selling of User Data)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-7">
              विरज एंटरप्राइज (Viraj Enterprise) कोणत्याही वापरकर्त्याचा फोन नंबर, नाव, स्थान किंवा वैयक्तिक माहिती कोणत्याही तृतीय पक्षाला (Third Party) विकत नाही आणि विकणार नाही. आमचे धोरण १००% पारदर्शक आणि कायदेशीर नियमांनुसार आहे.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-stone-800">
            <h3 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>२. आम्ही कोणती माहिती गोळा करतो? (Analytics & Usage Data)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-7">
              ॲपमध्ये कोणते हॉटेल्स, मंदिरे, किंवा पर्यटन स्थळे सर्वाधिक शोधली जातात (उदा. वैशाली, गुडलक कॅफे, दगडूशेठ गणपती), किती लोकांनी क्यूआर कोड जनरेट केला, आणि पुणे हवामान किती वेळा पाहिले गेले, याबद्दलची अनामिक आकडेवारी (Anonymous Aggregated Metrics) ॲपच्या सुधारणेसाठी आणि योग्य माहिती पुरवण्यासाठी Firebase Analytics द्वारे विश्लेषित केली जाते.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-stone-800">
            <h3 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>३. सुरक्षित पेमेंट व यूपीआय (Secure Payments)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-7">
              जाहिरात बूस्ट (₹४९९) किंवा हॉटेल बुकिंगसाठी सर्व पेमेंट थेट अधिकृत पेमेंट गेटवे (Razorpay / UPI) द्वारे पूर्णपणे एनक्रिप्टेड पद्धतीने सुरक्षित होतात. आम्ही तुमचे बँक पासवर्ड किंवा UPI पिन कधीही साठवत नाही.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-stone-800">
            <h3 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>४. जाहिराती व प्रायोजकत्व (AdMob & Sponsorship Policy)</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-7">
              पुण्यातील स्थानिक हॉटेल्स, दुकाने, आणि सेवांना व्यवसाय वाढवण्यासाठी Google AdMob किंवा थेट प्रायोजित बॅनर उपलब्ध केले जातात. या जाहिराती Google Play Store नियमावली आणि कायदेशीर अटींचे तंतोतंत पालन करतात.
            </p>
          </div>
        </div>

        {/* Contact and Owner Verification Card */}
        <div className="bg-stone-900/90 p-6 rounded-3xl border border-[#D4AF37]/30 space-y-4">
          <div className="flex items-center gap-3">
            <VeLogo size={42} />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                VIRAJ ENTERPRISE • डेटा गोपनीयता संपर्क
              </h3>
              <p className="text-xs text-amber-400">
                मालक: मिलिंद भोसले (Milind Bhosale)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-950 border border-stone-800">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">भेकराई नगर, फुरसुंगी, हवेली, पुणे - ४१२३०८</span>
            </div>
            <a
              href="tel:9021745403"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>फोन: ९०२१७४५४०३</span>
            </a>
            <a
              href="mailto:milindbhosale1984@gmail.com"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="truncate">milindbhosale1984@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
