import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  LineChart,
  ShieldAlert,
  Download,
  BookOpen,
  Award,
  Star,
  ExternalLink,
  CheckCircle2,
  Clock,
  HelpCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { recordWhatsAppClick, saveLeadToSheet } from '../utils/sheet';

interface TradingApp {
  id: string;
  name: string;
  tagline: string;
  rating: string;
  users: string;
  accountFee: string;
  brokerage: string;
  features: string[];
  referralLink: string;
  badge: string;
  badgeColor: string;
  logo: string;
}

const TOP_TRADING_APPS: TradingApp[] = [
  {
    id: 'zerodha',
    name: 'Zerodha Kite',
    tagline: 'भारतातील नंबर १ डिस्काउंट ब्रोकर (No.1 Broker in India)',
    rating: '४.५ ★',
    users: '१.५ कोटी+ (1.5 Cr+)',
    accountFee: '₹० (मोफत / ऑफर लागू)',
    brokerage: 'इक्विटी डिलिव्हरी: ₹० | इंट्राडे: ₹२०',
    features: [
      'नवशिक्यांसाठी सर्वात सोपे आणि विश्वासार्ह ॲप (Best for Beginners)',
      'Varsity द्वारे संपूर्ण शेअर मार्केट मराठीत शिकण्याची सोय',
      'कोणतेही छुपे शुल्क (Zero Hidden Charges) नाही',
      'अल्ट्रा-फास्ट ऑर्डर्स व प्रगत चार्टिंग टूल्स',
    ],
    referralLink: 'https://zerodha.com/?c=MILIND_BHOSALE',
    badge: '★ TOP RECOMMENDATION',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'groww',
    name: 'Groww App',
    tagline: 'म्युच्युअल फंड व शेअर्स एकाच ठिकाणी (Super Easy App)',
    rating: '४.३ ★',
    users: '१ कोटी+ (1 Cr+)',
    accountFee: '₹० मोफत डिमॅट',
    brokerage: '₹२० किंवा ०.०५% प्रति ऑर्डर',
    features: [
      'मराठी व हिंदी भाषेत सोपा इंटरफेस (Easy Marathi Support)',
      'शेअर्स + डायरेक्ट म्युच्युअल फंड + SIP एकाच ॲपमध्ये',
      'आधार आणि पॅन कार्डद्वारे ५ मिनिटांत पेपरलेस अकाउंट',
      'छोट्या गुंतवणुकीपासून सुरुवात (Start from ₹100)',
    ],
    referralLink: 'https://groww.in/referral/milind-bhosale',
    badge: '★ MOST USER FRIENDLY',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    logo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'angelone',
    name: 'Angel One (Angel Broking)',
    tagline: 'फुल सर्व्हिस ब्रोकर • रिसर्च रिपोर्ट व सल्लागार',
    rating: '४.३ ★',
    users: '८० लाख+',
    accountFee: '₹० डिमॅट ओपनिंग',
    brokerage: 'इक्विटी डिलिव्हरी: ₹० | F&O: ₹२०',
    features: [
      'दैनिक शेअर्स शिफारसी व रिसर्च रिपोर्ट्स मराठीत उपलब्ध',
      'ARQ Prime रोबो-अ‍ॅडव्हायझरी स्मार्ट गुंतवणूक प्रणाली',
      'मार्जिन ट्रेडिंग फॅसिलिटी (MTF) ४ पट लीव्हरेज',
      '३० वर्षांचा भारतीय बाजारातील अनुभव व सुरक्षितता',
    ],
    referralLink: 'https://angel-one.onelink.me/Wjgr/milind_bhosale',
    badge: '★ BEST RESEARCH & CALLS',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'upstox',
    name: 'Upstox Pro',
    tagline: 'रतन टाटांची पाठबळ असलेली हाय-स्पीड ट्रेडिंग सिस्टीम',
    rating: '४.४ ★',
    users: '७० लाख+',
    accountFee: '₹० शून्य अकाउंट ओपनिंग',
    brokerage: '₹२० प्रति एक्झिक्युटेड ऑर्डर',
    features: [
      'रतन टाटा (Ratan Tata) व टायगर ग्लोबलची गुंतवणूक',
      'ट्रेडिंगव्ह्यू (TradingView) प्रो चार्ट्स ॲपमध्ये मोफत',
      'ऑप्शन चेन ॲनालिसिस व स्ट्रॅटेजी बिल्डर इन-बिल्ट',
      'हाय-स्पीड सर्वर - कधीही हँग न होणारे ट्रेडिंग ॲप',
    ],
    referralLink: 'https://upstox.com/open-account/?f=MILIND_BHOSALE',
    badge: '★ RATAN TATA BACKED',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '5paisa',
    name: '5Paisa',
    tagline: 'भारतातील सर्वात स्वस्त ब्रोकरेज (फक्त ₹१० ब्रोकरेज)',
    rating: '४.२ ★',
    users: '४० लाख+',
    accountFee: '₹० झिरो चार्ज',
    brokerage: 'फक्त ₹१० प्रति ऑर्डर (Flat Brokerage)',
    features: [
      'फ्लॅट ₹१० ब्रोकरेज - इतर सर्व ॲप्सपेक्षा ५०% स्वस्त!',
      '१-क्लिक पोर्टफोलिओ ॲनालिसिस व ऑटो इन्व्हेस्ट',
      'इन्शुरन्स, लोन आणि गोल्ड गुंतवणूक एकाच ठिकाणी',
      'अ‍ॅक्टिव्ह इंट्राडे ट्रेडर्ससाठी सर्वात फायदेशीर',
    ],
    referralLink: 'https://5paisa.page.link/milind_bhosale',
    badge: '★ LOWEST BROKERAGE ₹10',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80',
  },
];

export const ShareMarket: React.FC = () => {
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);
  const [currentMarketTime, setCurrentMarketTime] = useState<string>('');

  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 6 is Saturday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeVal = hours * 60 + minutes;

      // Monday to Friday (1-5) and 9:15 AM (555 mins) to 3:30 PM (930 mins)
      const isOpen = day >= 1 && day <= 5 && timeVal >= 555 && timeVal <= 930;
      setIsMarketOpen(isOpen);
      setCurrentMarketTime(
        now.toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' })
      );
    };

    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenAccount = (app: TradingApp) => {
    recordWhatsAppClick(`Demat Referral: ${app.name}`);
    saveLeadToSheet({
      name: 'Share Market Lead',
      search: app.name,
      action: `Demat Open Click: ${app.name}`,
      notes: `Target: ${app.name}, Commission ~₹500`,
    });

    const text = encodeURIComponent(
      `Namaste Milind Bhosale (Viraj Enterprise Pune), मला [${app.name}] मध्ये मोफत डिमॅट अकाउंट उघडायचे आहे आणि शेअर मार्केट शिकायचे आहे. कृपया लिंक व मदत पाठवा.`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  const handleFreeClassWhatsApp = () => {
    recordWhatsAppClick('Share Market 3-Day Free Class');
    saveLeadToSheet({
      name: 'Share Market Student',
      search: '3-Day Free Class',
      action: 'Registered for Free Share Market Class WhatsApp 9021745403',
    });
    const text = encodeURIComponent(
      'Namaste Milind Bhosale Sir, मला "Share Market Kasa Shikaycha? - 3 Divas Free Class" जॉईन करायचा आहे. कृपया मला ग्रुपमध्ये ॲड करा.'
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  const handleDownloadBasicsPdf = () => {
    saveLeadToSheet({
      name: 'PDF Download',
      search: 'Share Market Basics Marathi PDF',
      action: 'Downloaded Share Market PDF',
    });
    // Open Zerodha Varsity Marathi educational module
    window.open('https://zerodha.com/varsity/modules/', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>भारतीय शेअर बाजार व डिमॅट खाते माहिती • Viraj Enterprise</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Share Market - Top 5 App Mahiti - Viraj Enterprise
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            झिरोधा, ग्रो, एंजल वन, अपस्टॉक्स व ५पैसा • मोफत डिमॅट खाते व मराठीत शेअर मार्केट शिका
          </p>

          {/* LIVE MARKET STATUS TICKER */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold shadow-md ${
                isMarketOpen
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 animate-pulse'
                  : 'bg-stone-900 border-stone-800 text-stone-400'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isMarketOpen ? 'bg-emerald-400' : 'bg-red-500'
                }`}
              />
              <span>
                {isMarketOpen
                  ? `🔴 LIVE MARKET चालू आहे (वेळ: ९:१५ ते ३:३०) • ${currentMarketTime}`
                  : `मार्केट बंद आहे (सोम-शुक्र ९:१५ ते ३:३० दरम्यान सुरू होते) • ${currentMarketTime}`}
              </span>
            </div>

            {/* Quick Indices Cards */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono">
                NIFTY 50: <strong className="text-emerald-400">२४,४५०.२० ▲ +१४२.३०</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono">
                SENSEX: <strong className="text-emerald-400">८०,२२०.५० ▲ +४१०.८०</strong>
              </span>
            </div>
          </div>
        </div>

        {/* ⚠️ VERY IMPORTANT MANDATORY DISCLAIMER (Red Box) */}
        <div className="rounded-2xl bg-gradient-to-r from-red-950/80 via-stone-900 to-red-950/80 p-4 border-2 border-red-500/60 shadow-lg space-y-1.5 text-center">
          <div className="flex items-center justify-center gap-2 text-red-400 font-black text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>⚠️ वैधानिक इशारा व महत्त्वाची सूचना (Mandatory Disclaimer)</span>
          </div>
          <p className="text-xs text-stone-300 max-w-3xl mx-auto leading-relaxed">
            शेअर मार्केटमधील गुंतवणूक ही बाजारातील जोखमीच्या अधीन असते (Subject to Market Risk).
            आम्ही फक्त शैक्षणिक व माहितीपर मार्गदर्शन करतो, थेट पैसे गुंतवण्याचा कोणताही सल्ला देत नाही.
            कोणतीही गुंतवणूक करण्यापूर्वी स्वतःचा सखोल अभ्यास करा किंवा <strong>SEBI Registered</strong> गुंतवणूक सल्लागाराचा सल्ला घ्या.
          </p>
        </div>

        {/* LIVE TRADINGVIEW CHART EMBED */}
        <div className="rounded-3xl bg-[#141419] border-2 border-[#D4AF37] p-4 sm:p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-black text-white font-serif">
                NSE Nifty 50 - Live Interactive Chart (लाइव्ह चार्ट)
              </h2>
            </div>
            <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
              Powered by TradingView
            </span>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-800 shadow-inner bg-stone-950">
            <iframe
              title="NSE Nifty 50 TradingView"
              src="https://s.tradingview.com/widgetembed/?symbol=NSE%3ANIFTY&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FKolkata&withdateranges=1&showpopupbutton=1"
              style={{ width: '100%', height: '100%', border: 'none' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* TOP 5 TRADING APPS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-xl font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>भारतातील टॉप ५ ट्रेडिंग ॲप्स (Top 5 Best Trading Apps):</span>
            </h2>
            <span className="text-xs text-[#D4AF37] font-semibold hidden sm:inline">
              SEBI Registered Apps
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {TOP_TRADING_APPS.map((app) => (
              <div
                key={app.id}
                className="rounded-3xl bg-[#141419] border-2 border-[#D4AF37] p-5 sm:p-6 shadow-xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition-all flex flex-col md:flex-row justify-between gap-5"
              >
                {/* Left side info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full border ${app.badgeColor}`}
                    >
                      {app.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{app.rating}</span>
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      (युझर्स: {app.users})
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                      {app.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
                      {app.tagline}
                    </p>
                  </div>

                  {/* Pricing Badges */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300">
                      खाते उघडणे: <strong className="text-emerald-400">{app.accountFee}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300">
                      ब्रोकरेज: <strong className="text-amber-400">{app.brokerage}</strong>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="p-3 rounded-2xl bg-stone-950 border border-stone-850 space-y-1">
                    <span className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>वैशिष्ट्ये व फायदे:</span>
                    </span>
                    <ul className="space-y-1 text-stone-300 text-xs list-disc list-inside">
                      {app.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right side CTA Button */}
                <div className="md:w-56 flex flex-col justify-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-stone-800 md:pl-5">
                  <button
                    onClick={() => handleOpenAccount(app)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.35)] cursor-pointer transition-all active:scale-95 border border-yellow-200"
                  >
                    <span>खाते उघडा (Open Account)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleOpenAccount(app)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>WhatsApp मदत ९०२१७४५४०३</span>
                  </button>

                  <span className="text-[10px] text-stone-500 text-center font-mono">
                    ✓ ५ मिनिटांत पेपरलेस सुरू
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📚 SHIKSHAN SECTION (Share Market Kasa Shikaycha? - 3 Divas Free Class) */}
        <div className="rounded-3xl bg-gradient-to-br from-[#1a1408] via-[#141419] to-stone-950 p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl space-y-5">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-[#D4AF37] text-xs font-mono font-bold border border-[#D4AF37]/50 inline-block">
              ★ विरज एंटरप्राइज मोफत प्रशिक्षण
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white font-serif">
              शेअर मार्केट कसे शिकायचे? • ३ दिवस मोफत क्लास (Free Training)
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
              कॅन्डलस्टिक पॅटर्न, सपोर्ट-रेझिस्टन्स, म्युच्युअल फंड व सुरक्षित गुंतवणुकीचे रहस्य मराठीत शिका!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Download Marathi Basics PDF */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Share Market Basics Marathi PDF</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  शेअर बाजारातील मूलभूत संकल्पनांची सोप्या मराठीतील विनामूल्य ई-बुक व गाईड.
                </p>
              </div>

              <button
                onClick={handleDownloadBasicsPdf}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-[#D4AF37] border border-[#D4AF37]/60 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF ई-बुक मोफत मिळवा</span>
              </button>
            </div>

            {/* 3 Days Free Class Registration WhatsApp */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                  <span>३ दिवस मोफत क्लास नावनोंदणी</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  लाइव्ह झूम / व्हॉट्सॲप क्लासमध्ये सहभागी होण्यासाठी मिलिंद भोसले सरांना त्वरित संपर्क करा.
                </p>
              </div>

              <button
                onClick={handleFreeClassWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Free शिकण्यासाठी WhatsApp करा - 9021745403</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Page Footer with Gold Border & Milind Bhosale + AU Bank UPI */}
        <PageFooter pageName="Share Market Top 5 Trading Apps" />
      </div>
    </div>
  );
};
