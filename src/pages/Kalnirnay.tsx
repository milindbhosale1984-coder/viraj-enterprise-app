import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Sparkles,
  Sun,
  Flame,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Heart,
  Share2,
} from 'lucide-react';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface Festival {
  id: string;
  nameMr: string;
  nameEn: string;
  date: string; // YYYY-MM-DD
  month: number; // 0 to 11
  day: number;
  tithi: string;
  importance: 'high' | 'medium';
  icon: string;
  descriptionMr: string;
  descriptionEn: string;
  holiday: boolean;
}

const MAHARASHTRA_FESTIVALS_2026: Festival[] = [
  {
    id: 'f-1',
    nameMr: 'मकर संक्रांत',
    nameEn: 'Makar Sankranti',
    date: '2026-01-14',
    month: 0,
    day: 14,
    tithi: 'पौष कृष्ण एकादशी / मकर संक्रमण',
    importance: 'high',
    icon: '🪁',
    descriptionMr: 'तिळगूळ घ्या आणि गोड गोड बोला! सूर्य मकर राशीत प्रवेश करतो. महाराष्ट्रात पतंग उडवणे आणि सुवासिनींचा हळदीकुंकू कार्यक्रम होतो.',
    descriptionEn: 'Harvest festival marking solar transition into Capricorn. Exchanging tilgul and kite flying.',
    holiday: true,
  },
  {
    id: 'f-2',
    nameMr: 'प्रजासत्ताक दिन',
    nameEn: 'Republic Day',
    date: '2026-01-26',
    month: 0,
    day: 26,
    tithi: 'माघ शुक्ल अष्टमी',
    importance: 'high',
    icon: '🇮🇳',
    descriptionMr: 'भारताचा ७७ वा प्रजासत्ताक दिन. सर्व शासकीय कार्यालये, बँका आणि शाळांना सार्वजनिक सुट्टी असते.',
    descriptionEn: 'National holiday commemorating the Constitution of India.',
    holiday: true,
  },
  {
    id: 'f-3',
    nameMr: 'छत्रपती शिवाजी महाराज जयंती',
    nameEn: 'Chhatrapati Shivaji Maharaj Jayanti',
    date: '2026-02-19',
    month: 1,
    day: 19,
    tithi: 'फाल्गुन कृष्ण तृतीया / शिवजयंती',
    importance: 'high',
    icon: '🚩',
    descriptionMr: 'हिंदवी स्वराज्याचे संस्थापक छत्रपती शिवाजी महाराज यांची जयंती! पुणे, शिवनेरी किल्ला आणि शनिवार वाड्यावर भव्य मिरवणुका.',
    descriptionEn: 'Birth anniversary of Chhatrapati Shivaji Maharaj celebrated across Maharashtra with grand rallies.',
    holiday: true,
  },
  {
    id: 'f-4',
    nameMr: 'महाशिवरात्री',
    nameEn: 'Maha Shivratri',
    date: '2026-02-16',
    month: 1,
    day: 16,
    tithi: 'माघ कृष्ण चतुर्दशी',
    importance: 'high',
    icon: '🔱',
    descriptionMr: 'हर हर महादेव! पुण्यातील त्रिशुंड गणपती, पाताळेश्वर लेणी आणि भीमाशंकर ज्योतिर्लिंग येथे भाविकांची प्रचंड गर्दी होते.',
    descriptionEn: 'Auspicious night of Lord Shiva with fasting, prayers and temple visits at Bhimashankar.',
    holiday: true,
  },
  {
    id: 'f-5',
    nameMr: 'धुलिवंदन व होळी',
    nameEn: 'Holi & Dhulivandan',
    date: '2026-03-04',
    month: 2,
    day: 4,
    tithi: 'फाल्गुन पौर्णिमा',
    importance: 'high',
    icon: '🎨',
    descriptionMr: 'रंगांचा सण! पुरणपोळीचा नैवेद्य आणि होळी दहन. पुण्यातील पेठांमध्ये व एफसी रोडवर जल्लोषात रंगपंचमी साजरी होते.',
    descriptionEn: 'Festival of colors and spring harvest celebrated with puranpoli.',
    holiday: true,
  },
  {
    id: 'f-6',
    nameMr: 'गुढीपाडवा (मराठी नववर्ष)',
    nameEn: 'Gudi Padwa (Marathi New Year)',
    date: '2026-03-20',
    month: 2,
    day: 20,
    tithi: 'चैत्र शुक्ल प्रतिपदा',
    importance: 'high',
    icon: '🌺',
    descriptionMr: 'महाराष्ट्राचे नववर्ष! दारी विजयाची गुढी, श्रीखंड-पुरीचा बेत आणि पुण्यातील लक्ष्मी रोडवर पारंपरिक शोभायात्रा व ढोल-ताशा पथके!',
    descriptionEn: 'The traditional Marathi New Year with gudi hoisting and grand cultural processions.',
    holiday: true,
  },
  {
    id: 'f-7',
    nameMr: 'डॉ. बाबासाहेब आंबेडकर जयंती',
    nameEn: 'Dr. B.R. Ambedkar Jayanti',
    date: '2026-04-14',
    month: 3,
    day: 14,
    tithi: 'वैशाख कृष्ण द्वादशी',
    importance: 'high',
    icon: '⚖️',
    descriptionMr: 'भारतीय संविधानाचे शिल्पकार भारतरत्न डॉ. बाबासाहेब आंबेडकर यांची जयंती! पुण्यातील जिल्हाधिकारी कार्यालय व कॅम्प येथे निळा झंझावात व अभिवादन.',
    descriptionEn: 'Birth anniversary of Dr. B.R. Ambedkar, chief architect of the Indian Constitution (Bank & Public Holiday).',
    holiday: true,
  },
  {
    id: 'f-8',
    nameMr: 'महाराष्ट्र दिन व कामगार दिन',
    nameEn: 'Maharashtra Day & Labour Day',
    date: '2026-05-01',
    month: 4,
    day: 1,
    tithi: 'वैशाख पौर्णिमा',
    importance: 'high',
    icon: '🦁',
    descriptionMr: '१ मे १९६० रोजी संयुक्त महाराष्ट्र राज्याची स्थापना झाली. पुण्यातील पोलीस परेड ग्राउंडवर संचलन आणि सार्वजनिक सुट्टी.',
    descriptionEn: 'Commemorating the formation of the state of Maharashtra in 1960.',
    holiday: true,
  },
  {
    id: 'f-9',
    nameMr: 'बुद्ध पौर्णिमा',
    nameEn: 'Buddha Purnima',
    date: '2026-05-31',
    month: 4,
    day: 31,
    tithi: 'वैशाख पौर्णिमा',
    importance: 'high',
    icon: '☸️',
    descriptionMr: 'तथागत भगवान गौतम बुद्ध जयंती. सत्य, अहिंसा आणि शांततेचा संदेश देणारा पवित्र दिवस.',
    descriptionEn: 'Celebration of the birth and enlightenment of Lord Buddha.',
    holiday: true,
  },
  {
    id: 'f-10',
    nameMr: 'आषाढी एकादशी (पंढरपूर वारी आगमन)',
    nameEn: 'Ashadhi Ekadashi (Pandharpur Wari)',
    date: '2026-07-25',
    month: 6,
    day: 25,
    tithi: 'आषाढ शुक्ल एकादशी',
    importance: 'high',
    icon: '📿',
    descriptionMr: 'माउली माउली! संत ज्ञानेश्वर व संत तुकाराम महाराजांच्या पालख्यांचे पुण्यात भव्य स्वागत. संपूर्ण पुणे शहर भक्तीरसात न्हाऊन निघते.',
    descriptionEn: 'The sacred Ashadhi Ekadashi pilgrimage when palakhis pass through Pune with millions of warkaris.',
    holiday: true,
  },
  {
    id: 'f-11',
    nameMr: 'स्वातंत्र्य दिन',
    nameEn: 'Independence Day',
    date: '2026-08-15',
    month: 7,
    day: 15,
    tithi: 'श्रावण शुक्ल तृतीया',
    importance: 'high',
    icon: '🇮🇳',
    descriptionMr: 'भारताचा ८० वा स्वातंत्र्य दिन. ध्वजारोहण आणि देशभक्तीपर कार्यक्रम.',
    descriptionEn: 'National celebration of Indian Independence.',
    holiday: true,
  },
  {
    id: 'f-12',
    nameMr: 'श्री गणेश चतुर्थी (बाप्पाचे आगमन!)',
    nameEn: 'Ganesh Chaturthi (Pune Bappa Aagman)',
    date: '2026-09-14',
    month: 8,
    day: 14,
    tithi: 'भाद्रपद शुक्ल चतुर्थी',
    importance: 'high',
    icon: '🐘',
    descriptionMr: 'गणपती बाप्पा मोरया! मानाचे ५ गणपती आणि श्रीमंत दगडूशेठ हलवाई गणपती बाप्पाचे भव्य आगमन. पुण्यात १० दिवस महामहोत्सव!',
    descriptionEn: 'The biggest festival of Pune! Arrival of Lord Ganesha with Manache 5 Ganpati and Dagdusheth.',
    holiday: true,
  },
  {
    id: 'f-13',
    nameMr: 'अनंत चतुर्दशी (पुणे विसर्जन मिरवणूक)',
    nameEn: 'Anant Chaturdashi (Pune Ganpati Visarjan)',
    date: '2026-09-24',
    month: 8,
    day: 24,
    tithi: 'भाद्रपद शुक्ल चतुर्दशी',
    importance: 'high',
    icon: '🥁',
    descriptionMr: 'पुढच्या वर्षी लवकर या! ऐतिहासिक लक्ष्मी रोड व कुमठेकर रोडवरून मानाच्या गणपतींची २४ तास चालणारी जगप्रसिद्ध ढोल-ताशा विसर्जन मिरवणूक!',
    descriptionEn: 'World-famous 24-hour Pune Ganpati immersion procession along Laxmi Road with Dhol Tasha.',
    holiday: true,
  },
  {
    id: 'f-14',
    nameMr: 'विजयादशमी - दसरा',
    nameEn: 'Dussehra / Vijayadashami',
    date: '2026-10-20',
    month: 9,
    day: 20,
    tithi: 'आश्विन शुक्ल दशमी',
    importance: 'high',
    icon: '🏹',
    descriptionMr: 'आपट्याची पाने (सोने) वाटणे, शस्त्रपूजा, आणि सीमोल्लंघन. वाईटावर चांगल्याचा विजय!',
    descriptionEn: 'Celebrating triumph of good over evil. Exchanging golden Bauhinia leaves.',
    holiday: true,
  },
  {
    id: 'f-15',
    nameMr: 'दिवाळी - लक्ष्मीपूजन',
    nameEn: 'Diwali - Lakshmi Pujan',
    date: '2026-11-08',
    month: 10,
    day: 8,
    tithi: 'आश्विन अमावास्या',
    importance: 'high',
    icon: '🪔',
    descriptionMr: 'दीपावली महालक्ष्मी पूजन! घराघरांमध्ये दिव्यांची रोषणाई, रांगोळी, फराळ आणि फटाक्यांची आतषबाजी.',
    descriptionEn: 'The festival of lights and wealth prayers with diyas, faral sweets, and crackers.',
    holiday: true,
  },
];

const MONTH_NAMES_MR = [
  'जानेवारी (Jan)', 'फेब्रुवारी (Feb)', 'मार्च (Mar)', 'एप्रिल (Apr)',
  'मे (May)', 'जून (Jun)', 'जुलै (Jul)', 'ऑगस्ट (Aug)',
  'सप्टेंबर (Sep)', 'ऑक्टोबर (Oct)', 'नोव्हेंबर (Nov)', 'डिसेंबर (Dec)'
];

export const Kalnirnay: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  // Find festivals in selected month
  const monthFestivals = MAHARASHTRA_FESTIVALS_2026.filter((f) => f.month === selectedMonth);

  // Today's San
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySan = MAHARASHTRA_FESTIVALS_2026.find((f) => f.date === todayStr);

  // Upcoming 7 days festivals
  const nowMs = Date.now();
  const upcoming7Days = MAHARASHTRA_FESTIVALS_2026.filter((f) => {
    const fMs = new Date(f.date).getTime();
    return fMs >= nowMs - 86400000 && fMs <= nowMs + 7 * 86400000;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-4 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>महाराष्ट्र कालनिर्णय २०२६ • सण, वार व सुट्ट्यांची दिनदर्शिका</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            पुणे कालनिर्णय - सण व उत्सव २०२६
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium">
            गुढीपाडवा, आंबेडकर जयंती १४ एप्रिल, पंढरपूर वारी, गणेशोत्सव व दिवाळी • Viraj Enterprise
          </p>
        </div>

        {/* TODAY'S SAN HERO CARD (आजचा सण) */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1c1608] via-[#241c09] to-[#120f06] border-2 border-[#D4AF37] p-5 sm:p-6 shadow-[0_8px_30px_rgba(212,175,55,0.25)] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-4xl shadow-md shrink-0">
              {todaySan ? todaySan.icon : '🚩'}
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                आजचा सण व वार (Today's Festival)
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-serif">
                {todaySan ? todaySan.nameMr : 'आज कोणताही मोठा सण नाही • शुभ दिन!'}
              </h2>

              <p className="text-xs text-stone-300 mt-1 max-w-xl">
                {todaySan
                  ? todaySan.descriptionMr
                  : 'आजचे नक्षत्र व तिथी अत्यंत शुभ आहे. आगामी सणांसाठी खालील महिना निवडून संपूर्ण वर्षभराचे सण पहा.'}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <span className="text-xs font-mono font-bold text-amber-300 block">
              {new Date().toLocaleDateString('mr-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold block mt-1">
              ✓ श्री स्वामी समर्थ प्रसन्न
            </span>
          </div>
        </div>

        {/* UPCOMING 7 DAYS FESTIVALS */}
        {upcoming7Days.length > 0 && (
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-amber-500/40 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>पुढील ७ दिवसांचे सण व उत्सव (Upcoming 7 Days)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {upcoming7Days.map((f) => (
                <div key={f.id} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-3">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{f.nameMr} ({f.date})</h4>
                    <p className="text-[10px] text-stone-400 truncate max-w-xs">{f.tithi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MONTH SELECTOR BAR */}
        <div className="flex items-center justify-between bg-stone-900/90 p-2 rounded-2xl border border-stone-800 overflow-x-auto gap-2">
          <button
            onClick={() => setSelectedMonth((m) => (m > 0 ? m - 1 : 11))}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1 overflow-x-auto py-1">
            {MONTH_NAMES_MR.map((name, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMonth(idx)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedMonth === idx
                    ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSelectedMonth((m) => (m < 11 ? m + 1 : 0))}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* FESTIVALS LIST FOR SELECTED MONTH */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{MONTH_NAMES_MR[selectedMonth]} मधील प्रमुख सण व सुट्ट्या:</span>
            </h3>
            <span className="text-xs text-[#D4AF37] font-semibold">
              {monthFestivals.length} सण नोंदवले आहेत
            </span>
          </div>

          {monthFestivals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthFestivals.map((fest) => (
                <div
                  key={fest.id}
                  className="rounded-3xl bg-[#141419] p-5 border-2 border-[#D4AF37]/60 shadow-lg flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-2xl bg-stone-900 border border-stone-800">
                        {fest.icon}
                      </span>
                      <div>
                        <h4 className="text-base font-black text-white font-serif">
                          {fest.nameMr}
                        </h4>
                        <span className="text-xs text-amber-400 font-medium">
                          {fest.nameEn}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold text-xs border border-amber-400/30">
                        {fest.date.split('-').reverse().join('/')}
                      </span>
                      {fest.holiday && (
                        <span className="block text-[9px] text-red-400 font-bold uppercase mt-1">
                          सार्वजनिक सुट्टी (Holiday)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-850 text-xs">
                    <span className="text-amber-400 font-bold block mb-0.5">
                      पंचांग तिथी: {fest.tithi}
                    </span>
                    <p className="text-stone-300 leading-relaxed text-[11px]">
                      {fest.descriptionMr}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-stone-500">
                      ★ कालनिर्णय २०२६ अधिकृत
                    </span>

                    <button
                      onClick={() => {
                        const text = encodeURIComponent(`सण शुभेच्छा: ${fest.nameMr} (${fest.date}) - ${fest.descriptionMr} via Viraj Enterprise Pune`);
                        window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
                      }}
                      className="px-3 py-1 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-400 text-xs font-bold border border-[#25D366]/40 cursor-pointer"
                    >
                      Share on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-stone-900/60 rounded-3xl border border-stone-800 p-6">
              <CalendarIcon className="w-10 h-10 text-stone-600 mx-auto mb-2" />
              <p className="text-sm text-stone-400">
                या महिन्यात कोणताही मोठा सार्वजनिक सण नाही. नियमित शासकीय कार्यालयीन वेळ सुरू राहील.
              </p>
            </div>
          )}
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Pune Kalnirnay 2026 Festival Calendar" />
      </div>
    </div>
  );
};
