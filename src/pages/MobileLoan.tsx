import React, { useState } from 'react';
import {
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Percent,
  Clock,
  HelpCircle,
  ArrowRight,
  ShieldX,
  Sparkles,
} from 'lucide-react';
import { FaWhatsapp, FaGooglePlay } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';
import { recordWhatsAppClick } from '../utils/sheet';

interface MobileLoanApp {
  id: string;
  name: string;
  rbiPartner: string;
  limit: string;
  interest: string;
  tenure: string;
  features: string[];
  playStoreRating: string;
  playStoreUrl: string;
  badge: string;
}

const RBI_APPROVED_APPS: MobileLoanApp[] = [
  {
    id: 'kreditbee',
    name: 'KreditBee (क्रेडिटबी)',
    rbiPartner: 'Krazybee Services Private Limited (RBI Registered NBFC)',
    limit: '₹१,००० ते ₹५,००,०००',
    interest: '१.०२% ते २.४९% दरमहा (१६% - २९.९५% वार्षिक)',
    tenure: '३ ते २४ महिने',
    features: [
      '१० मिनिटांत थेट बँक खात्यात ट्रान्सफर',
      '१००% डिजिटल पेपरलेस प्रक्रिया',
      'पॅन कार्ड, आधार कार्ड आणि सॅलरी खाते आवश्यक',
    ],
    playStoreRating: '४.५ ★ (५ कोटी+ डाउनलोड)',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kreditbee.android',
    badge: 'RBI NBFC Verified',
  },
  {
    id: 'navi',
    name: 'Navi (नवी फिनटेक)',
    rbiPartner: 'Navi Finserv Limited (RBI Approved NBFC-ND-SI)',
    limit: '₹१०,००० ते ₹२०,००,०००',
    interest: '९.९% ते २५% वार्षिक (कमी प्रोसेसिंग फी)',
    tenure: '३ ते ७२ महिने (६ वर्षांपर्यंत)',
    features: [
      'शून्य डॉक्युमेंट आणि इन्स्टंट बँक ट्रान्सफर',
      'लवचिक EMI पर्याय व सुलभ परतफेड',
      'सचिन बन्सल (Flipkart संस्थापक) यांची अधिकृत कंपनी',
    ],
    playStoreRating: '४.४ ★ (१ कोटी+ डाउनलोड)',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.naviapp',
    badge: 'Top Rated • Fast Disbursal',
  },
  {
    id: 'paysense',
    name: 'PaySense (पेसेन्स)',
    rbiPartner: 'PayU Finance India Private Limited (RBI Registered)',
    limit: '₹५,००० ते ₹५,००,०००',
    interest: '१.४% ते २.३% दरमहा (१६.८% - २७.६% वार्षिक)',
    tenure: '३ ते ६० महिने',
    features: [
      'क्रेडिट स्कोअर नवीन असलेल्यांसाठीही उपलब्ध',
      'एकदाच केवायसी पूर्ण करा आणि गरज असेल तेव्हा पैसे काढा',
      'त्वरित मंजुरी आणि पारदर्शक फी',
    ],
    playStoreRating: '४.३ ★ (१ कोटी+ डाउनलोड)',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.cowsend.paysense',
    badge: 'PayU Backed • 100% Safe',
  },
  {
    id: 'moneytap',
    name: 'MoneyTap (Freo)',
    rbiPartner: 'RBL Bank & Credit Saison India (RBI Reg. Banks & NBFCs)',
    limit: '₹३,००० ते ₹५,००,००० (Personal Credit Line)',
    interest: '१३% ते २४% वार्षिक (फक्त वापरलेल्या रकमेवरच व्याज)',
    tenure: '२ ते ३६ महिने',
    features: [
      'भारतातील पहिली क्रेडिट लाईन सिस्टीम',
      'मंजूर रकमेपैकी जेवढे वापराल तेवढ्याच रकमेवर व्याज आकारले जाते',
      'क्रेडिट कार्ड सारखी सुविधा मोबाईल ॲपवर',
    ],
    playStoreRating: '४.२ ★ (१ कोटी+ डाउनलोड)',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.myoracle.app',
    badge: 'Credit Line • RBL Bank Partner',
  },
];

export const MobileLoan: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<MobileLoanApp | null>(null);

  const handleInquireWhatsApp = (appName: string = 'Mobile Loan App') => {
    recordWhatsAppClick(`Mobile Loan Inquire: ${appName}`);
    const text = encodeURIComponent(
      `Namaste Milind Bhosale (Viraj Enterprise Pune), I want information about RBI Approved Instant Mobile Loan app: ${appName}. Krupaya guidance dya.`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <Smartphone className="w-3.5 h-3.5" />
            <span>RBI मान्यताप्राप्त अधिकृत मोबाईल ॲप्स • सुरक्षित डिजिटल कर्ज</span>
          </div>

          {/* User Requested Title */}
          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Mobile App Var Loan - Instant
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            KreditBee, Navi, PaySense व MoneyTap — सुरक्षित इन्स्टंट मोबाईल कर्ज माहिती • Viraj Enterprise
          </p>
        </div>

        {/* PROMINENT USER WARNING BOX */}
        <div className="relative rounded-3xl bg-gradient-to-r from-red-950/80 via-[#260e11] to-stone-900 border-2 border-red-500 p-5 sm:p-6 shadow-[0_6px_25px_rgba(239,68,68,0.3)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center text-3xl shrink-0">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                सावधान व सतर्क रहा (Important Warning)
              </span>

              {/* Exact user requested warning wording */}
              <h2 className="text-lg sm:text-xl font-black text-white mt-1 font-devanagari-hero">
                "RBI approved app ch vapar kara, jast interest ghenare app talha"
              </h2>

              <p className="text-xs text-red-200/90 mt-1 leading-relaxed">
                चिनी किंवा अनधिकृत ॲप्सकडून कर्ज घेऊ नका जे ७ दिवसांची मुदत देतात किंवा फोनचे कॉन्टॅक्ट्स हॅक करतात. फक्त खालील RBI अधिकृत NBFC ॲप्सच सुरक्षित आहेत.
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-md block">
              १००% RBI सुरक्षा
            </span>
          </div>
        </div>

        {/* 4 LEGAL RBI APPROVED APPS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>४ अधिकृत व कायदेशीर RBI मान्यताप्राप्त ॲप्स:</span>
            </h3>
            <span className="text-xs text-[#D4AF37] font-semibold">
              Verified Legal Apps
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RBI_APPROVED_APPS.map((app) => (
              <div
                key={app.id}
                className="rounded-3xl bg-[#141419] p-5 sm:p-6 border-2 border-[#D4AF37]/70 shadow-xl hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4"
              >
                {/* App Name & Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white">
                        {app.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 mt-0.5 font-mono">
                        {app.rbiPartner}
                      </p>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                      {app.badge}
                    </span>
                  </div>

                  {/* App Name | Loan Limit | Interest Table */}
                  <div className="mt-4 p-3 rounded-2xl bg-stone-950 border border-stone-850 space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
                      <span className="text-stone-400 font-semibold">Loan Limit (कर्ज मर्यादा):</span>
                      <span className="font-mono font-black text-amber-300 text-sm">{app.limit}</span>
                    </div>

                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
                      <span className="text-stone-400 font-semibold">Interest (व्याजदर):</span>
                      <span className="font-mono font-bold text-emerald-400">{app.interest}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 font-semibold">कालावधी (Tenure):</span>
                      <span className="text-stone-300 font-medium">{app.tenure}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mt-3 space-y-1">
                    {app.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons: "Adhik Mahiti" + Play Store */}
                <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <span className="text-[11px] text-stone-500 font-mono">
                    {app.playStoreRating}
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* User requested button: "Adhik Mahiti" */}
                    <button
                      onClick={() => handleInquireWhatsApp(app.name)}
                      className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      <FaWhatsapp className="w-3.5 h-3.5" />
                      <span>अधिक माहिती (Adhik Mahiti)</span>
                    </button>

                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FaGooglePlay className="w-3 h-3 text-sky-400" />
                      <span>Play Store</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips Checklist */}
        <div className="p-5 rounded-3xl bg-[#141419] border border-stone-800 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>मोबाईल ॲपवरून कर्ज घेताना या ५ गोष्टी लक्षात ठेवा:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-850">
              <strong className="text-amber-400 block mb-1">१. फक्त Google Play Store वरूनच डाउनलोड करा</strong>
              कोणत्याही WhatsApp लिंक किंवा APK फाईल वरून ॲप इन्स्टॉल करू नका.
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-850">
              <strong className="text-amber-400 block mb-1">२. कधीही ॲडव्हान्स पैसे देऊ नका</strong>
              अधिकृत ॲप्स कधीही कर्ज मंजूर करण्यासाठी आधी पैसे मागत नाहीत.
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-850">
              <strong className="text-amber-400 block mb-1">३. Contact / Gallery Permission देऊ नका</strong>
              RBI नियमानुसार कोणत्याही कर्ज देणाऱ्या ॲपला युझरच्या कॉन्टॅक्ट लिस्टचा ॲक्सेस घेण्यास बंदी आहे.
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-850">
              <strong className="text-amber-400 block mb-1">४. परतफेडीचा हप्ता (EMI) वेळेत भरा</strong>
              वेळेवर EMI भरल्याने तुमचा सिबिल स्कोअर ८००+ होतो आणि भविष्यात बँकेकडून कमी व्याजात कर्ज मिळते.
            </div>
          </div>
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Mobile App Var Loan - Instant" />
      </div>
    </div>
  );
};
