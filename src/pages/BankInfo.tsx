import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  Clock,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface BankBranch {
  id: string;
  name: string;
  nameMr: string;
  area: 'Pune City' | 'Pimpri' | 'Hadapsar' | 'Kothrud';
  branch: string;
  ifsc: string;
  phone: string;
  timing: string;
  lunchBreak: string;
  address: string;
  isHeadOffice?: boolean;
}

const PUNE_BANKS: BankBranch[] = [
  {
    id: 'b-1',
    name: 'Bank of Maharashtra (Head Office)',
    nameMr: 'बँक ऑफ महाराष्ट्र (मुख्य कार्यालय)',
    area: 'Pune City',
    branch: 'Lokmangal, Shivajinagar',
    ifsc: 'MAHB0000001',
    phone: '02025532728',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Lokmangal, 1501, Shivajinagar, Pune - 411005',
    isHeadOffice: true,
  },
  {
    id: 'b-2',
    name: 'State Bank of India (SBI Main)',
    nameMr: 'स्टेट बँक ऑफ इंडिया (मुख्य शाखा)',
    area: 'Pune City',
    branch: 'Pune Main Branch, Camp',
    ifsc: 'SBIN0000454',
    phone: '02026131411',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Collector Office Road, Camp, Pune - 411001',
  },
  {
    id: 'b-3',
    name: 'Bank of Maharashtra (Hadapsar)',
    nameMr: 'बँक ऑफ महाराष्ट्र (हडपसर शाखा)',
    area: 'Hadapsar',
    branch: 'Gadital, Hadapsar',
    ifsc: 'MAHB0000142',
    phone: '02026991122',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Pune-Solapur Road, Near Gadital, Hadapsar, Pune - 411028',
  },
  {
    id: 'b-4',
    name: 'HDFC Bank (Hadapsar / Magarpatta)',
    nameMr: 'एचडीएफसी बँक (हडपसर)',
    area: 'Hadapsar',
    branch: 'Magarpatta City & Bhekrai Road',
    ifsc: 'HDFC0000240',
    phone: '02061606161',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Destination Centre, Magarpatta, Hadapsar, Pune - 411028',
  },
  {
    id: 'b-5',
    name: 'State Bank of India (Pimpri Chinchwad)',
    nameMr: 'स्टेट बँक ऑफ इंडिया (पिंपरी)',
    area: 'Pimpri',
    branch: 'Pimpri Main Branch',
    ifsc: 'SBIN0000575',
    phone: '02027425111',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Mumbai-Pune Highway, Pimpri, Pune - 411018',
  },
  {
    id: 'b-6',
    name: 'ICICI Bank (Pimpri Colony)',
    nameMr: 'आयसीआयसीआय बँक (पिंपरी)',
    area: 'Pimpri',
    branch: 'Finolex Chowk, Pimpri',
    ifsc: 'ICIC0000039',
    phone: '02027471200',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Old Mumbai-Pune Road, Pimpri, Pune - 411018',
  },
  {
    id: 'b-7',
    name: 'Cosmos Co-operative Bank (Kothrud)',
    nameMr: 'कॉसमॉस बँक (कोथरूड)',
    area: 'Kothrud',
    branch: 'Paud Road, Kothrud',
    ifsc: 'COSB0000012',
    phone: '02025381881',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Near Vanaz Corner, Paud Road, Kothrud, Pune - 411038',
  },
  {
    id: 'b-8',
    name: 'Bank of Baroda (Shivajinagar)',
    nameMr: 'बँक ऑफ बडोदा (शिवाजीनगर)',
    area: 'Pune City',
    branch: 'FC Road, Shivajinagar',
    ifsc: 'BARB0SHIVAJ',
    phone: '02025534120',
    timing: '10:00 AM - 4:00 PM',
    lunchBreak: '2:00 PM - 2:30 PM',
    address: 'Fergusson College Road, Shivajinagar, Pune - 411004',
  },
];

// RBI 2026 Maharashtra Bank Holidays List
const RBI_HOLIDAYS_2026 = [
  { date: '2026-01-26', name: 'Republic Day (प्रजासत्ताक दिन)' },
  { date: '2026-02-19', name: 'Chhatrapati Shivaji Maharaj Jayanti (शिवजयंती)' },
  { date: '2026-03-04', name: 'Holi (धुलिवंदन)' },
  { date: '2026-03-20', name: 'Gudi Padwa (गुढीपाडवा)' },
  { date: '2026-04-14', name: 'Dr. B.R. Ambedkar Jayanti (डॉ. बाबासाहेब आंबेडकर जयंती - बँक बंद)' },
  { date: '2026-05-01', name: 'Maharashtra Day (महाराष्ट्र दिन)' },
  { date: '2026-05-31', name: 'Buddha Purnima (बुद्ध पौर्णिमा)' },
  { date: '2026-08-15', name: 'Independence Day (स्वातंत्र्य दिन)' },
  { date: '2026-09-14', name: 'Ganesh Chaturthi (श्री गणेश चतुर्थी)' },
  { date: '2026-10-02', name: 'Mahatma Gandhi Jayanti (गांधी जयंती)' },
  { date: '2026-10-20', name: 'Dussehra (दसरा)' },
  { date: '2026-11-08', name: 'Diwali - Lakshmi Pujan (दिवाळी)' },
  { date: '2026-11-10', name: 'Diwali - Bhaubeej (भाऊबीज)' },
];

// Check if bank is open today
export function isBankOpenToday(): {
  isOpen: boolean;
  reason: string;
  reasonMr: string;
} {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  const dateNum = now.getDate();

  // Sunday
  if (day === 0) {
    return {
      isOpen: false,
      reason: 'Sunday (Weekly Holiday)',
      reasonMr: 'आज रविवार असल्यामुळे सर्व बँकांना साप्ताहिक सुट्टी आहे.',
    };
  }

  // 2nd and 4th Saturday
  if (day === 6) {
    const weekNum = Math.ceil(dateNum / 7);
    if (weekNum === 2 || weekNum === 4) {
      return {
        isOpen: false,
        reason: `RBI ${weekNum === 2 ? '2nd' : '4th'} Saturday Bank Holiday`,
        reasonMr: `आज RBI नियमानुसार ${weekNum === 2 ? 'दुसरा' : 'चौथा'} शनिवार असल्यामुळे बँका बंद आहेत.`,
      };
    }
  }

  // Check RBI Holidays
  const todayStr = now.toISOString().split('T')[0];
  const holiday = RBI_HOLIDAYS_2026.find((h) => h.date === todayStr);
  if (holiday) {
    return {
      isOpen: false,
      reason: `RBI Official Holiday: ${holiday.name}`,
      reasonMr: `आज ${holiday.name} असल्यामुळे सर्व बँका बंद आहेत.`,
    };
  }

  return {
    isOpen: true,
    reason: 'Normal Banking Working Day (10:00 AM - 4:00 PM)',
    reasonMr: 'आज नियमित कामाचा दिवस आहे. बँका सकाळी १०:०० ते दुपारी ४:०० पर्यंत सुरू राहतील.',
  };
}

export const BankInfo: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const bankStatus = isBankOpenToday();

  const filteredBanks = PUNE_BANKS.filter((b) => {
    if (selectedArea !== 'All' && b.area !== selectedArea) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.nameMr.includes(q) ||
      b.branch.toLowerCase().includes(q) ||
      b.ifsc.toLowerCase().includes(q)
    );
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
            <Building2 className="w-3.5 h-3.5" />
            <span>पुणे बँक मार्गदर्शक • RBI २०२६ अधिकृत सुट्ट्या, शाखा व वेळापत्रक</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Bank Holiday + Location + Timetable
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium">
            State Bank, Bank of Maharashtra, HDFC, ICICI, Cosmos Bank Directory • Powered by Viraj Enterprise
          </p>
        </div>

        {/* SECTION A: "AAJ BANK CHALU AHE KA?" BIG BADGE */}
        <div
          className={`relative rounded-3xl p-6 border-3 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 transition-all ${
            bankStatus.isOpen
              ? 'bg-gradient-to-r from-emerald-950/80 via-[#0d1c12] to-stone-900 border-emerald-500 shadow-emerald-500/20'
              : 'bg-gradient-to-r from-red-950/80 via-[#210c0e] to-stone-900 border-red-500 shadow-red-500/20'
          }`}
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl shrink-0 ${
                bankStatus.isOpen
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}
            >
              {bankStatus.isOpen ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-300">
                आजची बँक स्थिती (Today's Status):
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5 font-devanagari-hero">
                आज बँक चालू आहे का?
              </h2>

              <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium leading-relaxed">
                {bankStatus.reasonMr}
              </p>
            </div>
          </div>

          {/* Big Decision Badge YES / NO */}
          <div className="text-center shrink-0">
            <div
              className={`py-3 px-8 rounded-2xl text-2xl sm:text-3xl font-black uppercase tracking-wider shadow-lg ${
                bankStatus.isOpen
                  ? 'bg-emerald-500 text-stone-950 shadow-emerald-500/40'
                  : 'bg-red-600 text-white shadow-red-600/40'
              }`}
            >
              {bankStatus.isOpen ? 'होय (YES)' : 'नाही (NO)'}
            </div>
            <span className="block text-[11px] text-stone-400 font-mono mt-1.5">
              वेळ: सकाळी १०:०० ते दु. ४:००
            </span>
          </div>
        </div>

        {/* SECTION B: BANK LOCATION - GOOGLE MAPS EMBEDDED IFRAME */}
        <div className="rounded-3xl bg-[#141419] p-5 border-2 border-[#D4AF37]/50 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Banks Near Pune - Google Maps Live Locator
              </h3>
            </div>
            <span className="text-xs text-amber-400 font-semibold hidden sm:inline">
              SBI, Bank of Maharashtra, HDFC
            </span>
          </div>

          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-800 shadow-inner">
            <iframe
              title="Banks near Pune Maharashtra"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=banks+near+Pune+Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>

        {/* SECTION C: CONTACT + TIMETABLE DIRECTORY */}
        <div className="rounded-3xl bg-[#141419] p-5 sm:p-6 border-2 border-[#D4AF37] shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white font-serif">
                Pune Banks Contact & Timetable Directory
              </h3>
              <p className="text-xs text-stone-400">
                Official working hours (10:00 AM - 4:00 PM), Lunch break (2:00 PM - 2:30 PM) & IFSC
              </p>
            </div>

            {/* Area Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Pune City', 'Hadapsar', 'Pimpri', 'Kothrud'].map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`py-1 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedArea === area
                      ? 'bg-[#D4AF37] text-stone-950 font-black shadow-xs'
                      : 'bg-stone-900 text-stone-400 hover:text-white'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Bank Name, Branch, or IFSC code..."
              className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-stone-500 absolute right-3.5 top-3" />
          </div>

          {/* Bank Cards / Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="rounded-2xl bg-stone-950 p-4 border border-stone-800 hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-white">
                        {bank.name}
                      </h4>
                      <p className="text-xs text-amber-400 font-semibold font-devanagari-hero">
                        {bank.nameMr}
                      </p>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900 text-stone-300 border border-stone-800 shrink-0">
                      {bank.area}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 mt-2 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{bank.address}</span>
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-850 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">IFSC Code:</span>
                    <span className="font-mono font-bold text-amber-300 select-all">{bank.ifsc}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Working Time:</span>
                    <span className="text-emerald-400 font-semibold">{bank.timing}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Lunch Break:</span>
                    <span className="text-amber-400 font-semibold">{bank.lunchBreak}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`tel:${bank.phone}`}
                    className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल करा ({bank.phone})</span>
                  </a>

                  <button
                    onClick={() => {
                      const text = encodeURIComponent(`Bank Info: ${bank.name} (${bank.branch}), IFSC: ${bank.ifsc}, Phone: ${bank.phone} via Viraj Enterprise Pune`);
                      window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
                    }}
                    className="py-1.5 px-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-800 cursor-pointer"
                  >
                    WhatsApp Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION D: UPCOMING RBI 2026 HOLIDAYS TABLE */}
        <div className="rounded-3xl bg-[#141419] p-5 border border-stone-800 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>RBI Official Maharashtra Bank Holidays List 2026</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {RBI_HOLIDAYS_2026.map((h, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-200 block">{h.name}</span>
                  <span className="text-[10px] text-red-400 font-bold uppercase">बँक बंद (Bank Closed)</span>
                </div>
                <span className="font-mono text-amber-400 font-bold shrink-0">{h.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Pune Bank Holiday & Timetable Guide" />
      </div>
    </div>
  );
};
