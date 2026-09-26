import React, { useState } from 'react';
import {
  Banknote,
  Home,
  User,
  Coins,
  Briefcase,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink,
  Percent,
  Calendar,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';
import { recordWhatsAppClick } from '../utils/sheet';

interface LoanCategory {
  id: string;
  titleMr: string;
  titleEn: string;
  icon: any;
  interestRate: string;
  banks: Array<{
    bankName: string;
    interest: string;
    processingFee: string;
    tenure: string;
    document: string[];
    eligibility: string;
  }>;
}

const LOAN_CATEGORIES: LoanCategory[] = [
  {
    id: 'home-loan',
    titleMr: '१. गृहकर्ज (Home Loan)',
    titleEn: 'Home Loan',
    icon: Home,
    interestRate: '८.३५% ते ९.१५%',
    banks: [
      {
        bankName: 'State Bank of India (SBI)',
        interest: '८.४०% पासून (Regular Home Loan)',
        processingFee: '०.३५% (किंवा सवलतीच्या काळात शून्य)',
        tenure: '३० वर्षांपर्यंत',
        document: [
          'आधार कार्ड व पॅन कार्ड (Aadhaar & PAN)',
          'गेल्या ६ महिन्यांचे बँक स्टेटमेंट',
          '३ महिन्यांची सॅलरी स्लिप किंवा २ वर्षांचे ITR',
          'घर/फ्लॅटचे खरेदीखत, ७/१२ किंवा इंडेक्स २',
        ],
        eligibility: 'वय २१ ते ६५ वर्षे • किमान मासिक उत्पन्न ₹२५,००० • सिबिल स्कोर ७५०+',
      },
      {
        bankName: 'HDFC Bank',
        interest: '८.५०% - ९.२०%',
        processingFee: '०.५०% (कमाल ₹३,०००)',
        tenure: '३० वर्षांपर्यंत',
        document: [
          'केवायसी कागदपत्रे (KYC Documents)',
          'मागील ६ महिन्यांचे पगाराचे खाते स्टेटमेंट',
          'फॉर्म १६ (Form 16)',
          'बिल्डर अग्रीमेंट व मान्यताप्राप्त प्लॅन',
        ],
        eligibility: 'नोकरदार किंवा व्यावसायिक • सिबिल ७५०+ • किमान उत्पन्न ₹३०,०००',
      },
      {
        bankName: 'Bank of Maharashtra',
        interest: '८.३५% पासून (Maha Super Home Loan)',
        processingFee: 'शून्य प्रोसेसिंग फी (विशिष्ट ऑफर काळात)',
        tenure: '३० वर्षांपर्यंत',
        document: [
          'ओळखपत्र व पत्त्याचा पुरावा',
          'उत्पन्नाचा दाखला / सॅलरी स्लिप',
          'बांधकाम किंवा खरेदीचे अधिकृत दस्तऐवज',
        ],
        eligibility: 'पुणे जिल्ह्यातील सर्व नागरिक • सरकारी व खाजगी कर्मचारी • सिबिल ७००+',
      },
    ],
  },
  {
    id: 'personal-loan',
    titleMr: '२. वैयक्तिक कर्ज (Personal Loan)',
    titleEn: 'Personal Loan',
    icon: User,
    interestRate: '१०.२५% ते १४.५०%',
    banks: [
      {
        bankName: 'Bank of Maharashtra (Maha Personal Loan)',
        interest: '१०.२५% ते १२.५०%',
        processingFee: '१% + GST',
        tenure: '७ वर्षांपर्यंत (८४ महिने)',
        document: [
          'पॅन कार्ड, आधार कार्ड',
          '३ महिन्यांची पगार पावती (Salary Slip)',
          'मागील ६ महिन्यांचे सॅलरी बँक खाते स्टेटमेंट',
          'कंपनीचे ओळखपत्र (Employee ID)',
        ],
        eligibility: 'किमान मासिक पगार ₹२०,००० • सरकारी किंवा नामांकित खाजगी कंपनीतील नोकरी • सिबिल ७००+',
      },
      {
        bankName: 'State Bank of India (SBI Xpress Credit)',
        interest: '१०.५०% - १३.७५%',
        processingFee: '०.५०%',
        tenure: '६ वर्षांपर्यंत',
        document: [
          'सॅलरी स्लिप्स व बँक पासबुक',
          'फॉर्म १६ / २ वर्षांचे आयटीआर',
          'केवायसी (आधार, पॅन)',
        ],
        eligibility: 'SBI मध्ये पगार खाते असलेल्या ग्राहकांसाठी त्वरित मंजुरी.',
      },
    ],
  },
  {
    id: 'gold-loan',
    titleMr: '३. सुवर्ण कर्ज (Gold Loan)',
    titleEn: 'Gold Loan',
    icon: Coins,
    interestRate: '८.७५% ते ११.५०%',
    banks: [
      {
        bankName: 'Bank of Maharashtra & SBI Gold Loan',
        interest: '८.७५% ते ९.९०%',
        processingFee: 'किमान ₹५००',
        tenure: '१२ ते ३६ महिने (बुलेट रिपेमेंट उपलब्ध)',
        document: [
          'फक्त आधार कार्ड व पॅन कार्ड',
          '२ पासपोर्ट साईज फोटो',
          'दागिन्यांची मालकी सिद्ध करणारे बिल (ऐच्छिक)',
        ],
        eligibility: '१८ वर्षे पूर्ण असलेले सर्व नागरिक • दागिन्यांचे मूल्यांकन करून सोन्याच्या मूल्याच्या ७५% रक्कम तत्काळ मिळते.',
      },
      {
        bankName: 'Muthoot / Manappuram Gold Loan',
        interest: '९.९०% - १५.००%',
        processingFee: 'शून्य ते ₹२५०',
        tenure: '६ ते १२ महिने',
        document: ['केवायसी (आधार/पॅन/ड्रायव्हिंग लायसन्स)'],
        eligibility: 'सिबिल स्कोअरची आवश्यकता नाही • २० मिनिटांत रोख किंवा बँक खात्यात पैसे.',
      },
    ],
  },
  {
    id: 'mudra-loan',
    titleMr: '४. प्रधानमंत्री मुद्रा कर्ज (PMMY Mudra Loan)',
    titleEn: 'Pradhan Mantri Mudra Loan',
    icon: Briefcase,
    interestRate: '८.५०% ते १२.००% (विनातारण कर्ज)',
    banks: [
      {
        bankName: 'सर्व राष्ट्रीयीकृत बँका (SBI, BoM, PNB, Canara)',
        interest: '८.५०% - १०.५०%',
        processingFee: 'शिशू कर्जासाठी शून्य, इतर कर्जांसाठी नाममात्र',
        tenure: '५ वर्षांपर्यंत',
        document: [
          'उद्योग आधार / Udyam Registration',
          'दुकान / व्यवसायाचा पत्ता आणि शॉप ॲक्ट लायसन्स',
          'मागील ६ महिन्यांचे चालू बँक खाते स्टेटमेंट',
          'प्रकल्प अहवाल (Project Report for Kishor & Tarun)',
        ],
        eligibility: 'लहान व्यावसायिक, दुकानदार, फळ-भाजी विक्रेते, टेलरिंग, फूड स्टॉल व कारागीर • शिशु (₹५० हजारपर्यंत), किशोर (₹५ लाखपर्यंत), तरुण (₹१० लाखपर्यंत).',
      },
    ],
  },
];

export const LoanInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleApplyWhatsApp = (loanType: string = 'Home Loan/Personal Loan') => {
    recordWhatsAppClick(`Loan Inquire: ${loanType}`);
    const text = encodeURIComponent(
      `Mala Loan Hava Ahe Sir - ${loanType}. Krupaya bank mahiti aani document margadarshan dya. - Milind Bhosale (Viraj Enterprise Pune)`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  const filteredCategories =
    activeTab === 'all'
      ? LOAN_CATEGORIES
      : LOAN_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold">
            <Banknote className="w-3.5 h-3.5" />
            <span>पुणे बँक कर्ज मार्गदर्शक २०२६ • अधिकृत व्याजदर व पात्रता</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Bank Loan Mahiti - Milind Bhosale
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-2xl mx-auto">
            गृहकर्ज, वैयक्तिक कर्ज, सुवर्ण कर्ज व मुद्रा कर्ज माहिती • विरज एंटरप्राइज पुणे
          </p>

          {/* 1 BIG GOLD BUTTON AT TOP */}
          <div className="pt-3 flex justify-center">
            <button
              onClick={() => handleApplyWhatsApp('Home Loan/Personal Loan/Mudra Loan')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-stone-950 text-base sm:text-lg font-black tracking-wide shadow-[0_6px_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-95 border-2 border-yellow-200"
            >
              <FaWhatsapp className="w-6 h-6 text-stone-950" />
              <span>LOAN HAVA AHE KA? - Apply</span>
            </button>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="pt-2">
            <p className="text-[11px] sm:text-xs text-stone-400 italic flex items-center justify-center gap-1.5 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>"आम्ही फक्त माहिती देतो, कर्ज बँक देते." (Amhi fakt mahiti deto, loan bank dete)</span>
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white'
            }`}
          >
            सर्व कर्जे (All Loans)
          </button>
          <button
            onClick={() => setActiveTab('home-loan')}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'home-loan'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white'
            }`}
          >
            🏠 Home Loan (8.40%+)
          </button>
          <button
            onClick={() => setActiveTab('personal-loan')}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'personal-loan'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white'
            }`}
          >
            👤 Personal Loan
          </button>
          <button
            onClick={() => setActiveTab('gold-loan')}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gold-loan'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white'
            }`}
          >
            🪙 Gold Loan
          </button>
          <button
            onClick={() => setActiveTab('mudra-loan')}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mudra-loan'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white'
            }`}
          >
            💼 Mudra Loan (PMMY)
          </button>
        </div>

        {/* LOAN CARDS ACCORDING TO USER REQUIREMENTS */}
        <div className="space-y-6">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="rounded-3xl bg-[#141419] p-5 sm:p-6 border-2 border-[#D4AF37] shadow-xl space-y-4"
              >
                {/* Category Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-amber-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white font-serif">
                        {cat.titleMr}
                      </h2>
                      <span className="text-xs text-amber-400 font-semibold">
                        {cat.titleEn}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                      व्याजदर: {cat.interestRate}
                    </span>
                  </div>
                </div>

                {/* Banks List inside Category */}
                <div className="grid grid-cols-1 gap-4">
                  {cat.banks.map((b, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-stone-950 p-4 border border-stone-800 hover:border-amber-400/50 transition-all space-y-3"
                    >
                      {/* Bank Name & Interest Table Style */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-extrabold text-white">
                          🏦 Bank Name: <span className="text-amber-300">{b.bankName}</span>
                        </h3>
                        <span className="text-xs font-bold text-emerald-400">
                          Interest: {b.interest}
                        </span>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        {/* Documents */}
                        <div className="p-3 rounded-xl bg-stone-900 border border-stone-850 space-y-1.5">
                          <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                            <FileText className="w-3.5 h-3.5" />
                            <span>आवश्यक कागदपत्रे (Required Documents):</span>
                          </span>
                          <ul className="space-y-1 text-stone-300 text-[11px] list-disc list-inside">
                            {b.document.map((doc, dIdx) => (
                              <li key={dIdx}>{doc}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Eligibility & Details */}
                        <div className="p-3 rounded-xl bg-stone-900 border border-stone-850 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs mb-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>पात्रता (Eligibility):</span>
                            </span>
                            <p className="text-stone-300 text-[11px] leading-relaxed">
                              {b.eligibility}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex justify-between">
                            <span>कालावधी: {b.tenure}</span>
                            <span>प्रोसेसिंग: {b.processingFee}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bank Card Action Button */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] text-stone-500 font-mono">
                          ★ RBI मान्यताप्राप्त राष्ट्रीयकृत बँक
                        </span>

                        <button
                          onClick={() => handleApplyWhatsApp(`${cat.titleEn} - ${b.bankName}`)}
                          className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                        >
                          <FaWhatsapp className="w-3.5 h-3.5" />
                          <span>Apply on WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-[#D4AF37]/40 text-xs text-stone-300 space-y-1 text-center">
          <strong className="text-amber-300">महत्त्वाची सूचना व डिस्क्लेमर:</strong>
          <p className="text-[11px] text-stone-400">
            विरज एंटरप्राइज (Viraj Enterprise) थेट कर्ज वाटप करत नाही. ही माहिती नागरिकांच्या जनजागृतीसाठी उपलब्ध केली आहे. प्रत्यक्ष व्याजदर व मंजुरी ही बँकेचे नियम, सिबिल स्कोअर आणि दस्तऐवजांच्या तपासणीवर अवलंबून असते. कोणत्याही अनधिकृत व्यक्तीला कर्जासाठी ॲडव्हान्स फी देऊ नका.
          </p>
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Bank Loan Mahiti" />
      </div>
    </div>
  );
};
