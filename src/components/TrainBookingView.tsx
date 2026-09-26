import React, { useState } from 'react';
import {
  Train,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Info,
  CreditCard,
  Luggage,
  Users,
} from 'lucide-react';
import { Language } from '../data/translations';

interface TrainBookingViewProps {
  language: Language;
}

interface PuneTrain {
  number: string;
  nameEn: string;
  nameMr: string;
  fromStation: string;
  toStation: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  daysOfRunEn: string;
  daysOfRunMr: string;
  classes: string[];
  seatsAvailable: { classCode: string; status: string; fare: number }[];
  isVandeBharat?: boolean;
  isSpecial?: boolean;
}

const PUNE_POPULAR_DESTINATIONS = [
  { code: 'CSMT', nameEn: 'Mumbai CSMT (छत्रपती शिवाजी महाराज टर्मिनस)', nameMr: 'मुंबई सीएसएमटी' },
  { code: 'NDLS', nameEn: 'New Delhi (नवी दिल्ली)', nameMr: 'नवी दिल्ली' },
  { code: 'SBC', nameEn: 'Bengaluru (बंगळुरू)', nameMr: 'बंगळुरू' },
  { code: 'MAO', nameEn: 'Goa Madgaon (मडगाव गोवा)', nameMr: 'मडगाव गोवा' },
  { code: 'SUR', nameEn: 'Solapur (सोलापूर)', nameMr: 'सोलापूर' },
  { code: 'KOP', nameEn: 'Kolhapur (कोल्हापूर)', nameMr: 'कोल्हापूर' },
  { code: 'NGP', nameEn: 'Nagpur (नागपूर)', nameMr: 'नागपूर' },
  { code: 'ADI', nameEn: 'Ahmedabad (अहमदाबाद)', nameMr: 'अहमदाबाद' },
  { code: 'BSB', nameEn: 'Varanasi (वाराणसी / बनारस)', nameMr: 'वाराणसी' },
];

const PUNE_TRAINS_SCHEDULE: PuneTrain[] = [
  {
    number: '12124',
    nameEn: 'Deccan Queen Express (दख्खनची राणी)',
    nameMr: 'डेक्कन क्वीन एक्सप्रेस',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'CSMT (Mumbai)',
    toCode: 'CSMT',
    departureTime: '07:15 AM',
    arrivalTime: '10:25 AM',
    duration: '3h 10m',
    daysOfRunEn: 'Daily',
    daysOfRunMr: 'दररोज',
    classes: ['CC', '2S', 'EV'],
    seatsAvailable: [
      { classCode: 'CC', status: 'AVL 38', fare: 485 },
      { classCode: '2S', status: 'AVL 114', fare: 115 },
      { classCode: 'EV', status: 'AVL 12', fare: 955 },
    ],
    isSpecial: true,
  },
  {
    number: '22226',
    nameEn: 'Vande Bharat Express (वंदे भारत एक्सप्रेस)',
    nameMr: 'पुणे - मुंबई वंदे भारत एक्सप्रेस',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'CSMT (Mumbai)',
    toCode: 'CSMT',
    departureTime: '03:15 PM',
    arrivalTime: '06:25 PM',
    duration: '3h 10m',
    daysOfRunEn: 'Except Wed',
    daysOfRunMr: 'बुधवार वगळता',
    classes: ['CC', 'EC'],
    seatsAvailable: [
      { classCode: 'CC', status: 'AVL 54', fare: 660 },
      { classCode: 'EC', status: 'AVL 18', fare: 1270 },
    ],
    isVandeBharat: true,
  },
  {
    number: '11010',
    nameEn: 'Sinhagad Express (सिंहगड एक्सप्रेस)',
    nameMr: 'सिंहगड एक्सप्रेस',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'CSMT (Mumbai)',
    toCode: 'CSMT',
    departureTime: '06:05 AM',
    arrivalTime: '09:55 AM',
    duration: '3h 50m',
    daysOfRunEn: 'Daily',
    daysOfRunMr: 'दररोज',
    classes: ['CC', '2S'],
    seatsAvailable: [
      { classCode: 'CC', status: 'AVL 22', fare: 390 },
      { classCode: '2S', status: 'AVL 88', fare: 105 },
    ],
  },
  {
    number: '22225',
    nameEn: 'Pune - Solapur Vande Bharat Express',
    nameMr: 'पुणे - सोलापूर वंदे भारत एक्सप्रेस',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'SUR (Solapur)',
    toCode: 'SUR',
    departureTime: '04:45 PM',
    arrivalTime: '07:55 PM',
    duration: '3h 10m',
    daysOfRunEn: 'Except Wed',
    daysOfRunMr: 'बुधवार वगळता',
    classes: ['CC', 'EC'],
    seatsAvailable: [
      { classCode: 'CC', status: 'AVL 42', fare: 685 },
      { classCode: 'EC', status: 'AVL 14', fare: 1300 },
    ],
    isVandeBharat: true,
  },
  {
    number: '12779',
    nameEn: 'Goa Express (गोवा एक्सप्रेस)',
    nameMr: 'गोवा एक्सप्रेस (पुणे - नवी दिल्ली)',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'NDLS (New Delhi)',
    toCode: 'NDLS',
    departureTime: '04:30 AM',
    arrivalTime: '06:25 AM (+1)',
    duration: '25h 55m',
    daysOfRunEn: 'Daily',
    daysOfRunMr: 'दररोज',
    classes: ['1A', '2A', '3A', 'SL'],
    seatsAvailable: [
      { classCode: '3A', status: 'AVL 19', fare: 1840 },
      { classCode: '2A', status: 'AVL 08', fare: 2650 },
      { classCode: 'SL', status: 'RAC 14', fare: 690 },
    ],
  },
  {
    number: '12263',
    nameEn: 'Pune - Hazrat Nizamuddin AC Duronto Express',
    nameMr: 'पुणे - ह. निजामुद्दीन एसी दुरंतो',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'NDLS (New Delhi)',
    toCode: 'NDLS',
    departureTime: '11:10 AM',
    arrivalTime: '06:55 AM (+1)',
    duration: '19h 45m',
    daysOfRunEn: 'Tue, Fri',
    daysOfRunMr: 'मंगळ, शुक्र',
    classes: ['1A', '2A', '3A'],
    seatsAvailable: [
      { classCode: '3A', status: 'AVL 31', fare: 2180 },
      { classCode: '2A', status: 'AVL 12', fare: 3100 },
      { classCode: '1A', status: 'AVL 04', fare: 4890 },
    ],
    isSpecial: true,
  },
  {
    number: '11301',
    nameEn: 'Udyan Express (उद्यान एक्सप्रेस)',
    nameMr: 'उद्यान एक्सप्रेस (पुणे - बंगळुरू)',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'SBC (Bengaluru)',
    toCode: 'SBC',
    departureTime: '11:45 AM',
    arrivalTime: '08:50 AM (+1)',
    duration: '21h 05m',
    daysOfRunEn: 'Daily',
    daysOfRunMr: 'दररोज',
    classes: ['1A', '2A', '3A', 'SL'],
    seatsAvailable: [
      { classCode: '3A', status: 'AVL 24', fare: 1480 },
      { classCode: 'SL', status: 'GNWL 18', fare: 520 },
      { classCode: '2A', status: 'AVL 06', fare: 2150 },
    ],
  },
  {
    number: '11029',
    nameEn: 'Koyna Express (कोयना एक्सप्रेस)',
    nameMr: 'कोयना एक्सप्रेस (पुणे - कोल्हापूर)',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'KOP (Kolhapur)',
    toCode: 'KOP',
    departureTime: '12:40 PM',
    arrivalTime: '08:45 PM',
    duration: '8h 05m',
    daysOfRunEn: 'Daily',
    daysOfRunMr: 'दररोज',
    classes: ['CC', '2S'],
    seatsAvailable: [
      { classCode: 'CC', status: 'AVL 29', fare: 435 },
      { classCode: '2S', status: 'AVL 92', fare: 130 },
    ],
  },
  {
    number: '12113',
    nameEn: 'Pune - Nagpur Garibrath Express',
    nameMr: 'पुणे - नागपूर गरीब रथ',
    fromStation: 'PUNE (Pune Jn)',
    toStation: 'NGP (Nagpur)',
    toCode: 'NGP',
    departureTime: '05:40 PM',
    arrivalTime: '09:10 AM (+1)',
    duration: '15h 30m',
    daysOfRunEn: 'Mon, Wed, Sat',
    daysOfRunMr: 'सोम, बुध, शनि',
    classes: ['3A'],
    seatsAvailable: [
      { classCode: '3A', status: 'AVL 56', fare: 875 },
    ],
  },
];

export const TrainBookingView: React.FC<TrainBookingViewProps> = ({ language }) => {
  const [origin, setOrigin] = useState('PUNE');
  const [destination, setDestination] = useState('CSMT');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [pnrInput, setPnrInput] = useState('');

  const filteredTrains = PUNE_TRAINS_SCHEDULE.filter((train) => {
    if (destination !== 'ALL' && train.toCode !== destination) {
      return false;
    }
    if (selectedClass !== 'ALL' && !train.classes.includes(selectedClass)) {
      return false;
    }
    return true;
  });

  const handleIrctcRedirect = (trainNo?: string) => {
    // Official IRCTC booking portal
    const irctcUrl = trainNo
      ? `https://www.irctc.co.in/nget/train-search`
      : `https://www.irctc.co.in/nget/train-search`;
    window.open(irctcUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCheckPnr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnrInput || pnrInput.length !== 10) {
      alert(language === 'mr' ? 'कृपया १० अंकांचा वैध PNR नंबर टाका.' : 'Please enter a valid 10-digit PNR number.');
      return;
    }
    window.open(`https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold mb-3 border border-white/20">
            <Train className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पुणे जंक्शन अधिकृत रेल्वे बुकिंग' : 'Pune Jn Official Train Booking'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-devanagari-hero">
            {language === 'mr' ? 'पुणे जंक्शन (PUNE) ते सर्व भारत रेल्वे' : 'Pune Junction (PUNE) Trains & Booking'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-100 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'पुणे ते मुंबई (डेक्कन क्वीन, वंदे भारत), दिल्ली, बंगळुरू, गोवा आणि इतर शहरांसाठी थेट गाड्या, सीट उपलब्धता व थेट IRCTC रिडायरेक्ट.'
              : 'Direct trains from Pune Jn to Mumbai, New Delhi, Bengaluru, Goa & more. Real-time seats & seamless IRCTC booking.'}
          </p>
        </div>

        {/* Decorative Badge */}
        <div className="absolute right-4 bottom-4 hidden md:flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>IRCTC Official Partner Link</span>
        </div>
      </div>

      {/* Train Search Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
        <h2 className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-orange-600" />
          <span>{language === 'mr' ? 'गाड्या शोधा व बुक करा' : 'Search Trains & Book'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'प्रारंभिक स्टेशन (From)' : 'Origin Station'}
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-orange-500"
            >
              <option value="PUNE">PUNE - Pune Junction (पुणे जं.)</option>
              <option value="SVJR">SVJR - Shivajinagar (शिवाजीनगर)</option>
              <option value="HDP">HDP - Hadapsar (हडपसर)</option>
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'गंतव्य स्थान (To)' : 'Destination Station'}
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-orange-500"
            >
              <option value="ALL">{language === 'mr' ? 'सर्व शहरे (All Cities)' : 'All Destinations'}</option>
              {PUNE_POPULAR_DESTINATIONS.map((d) => (
                <option key={d.code} value={d.code}>
                  {language === 'mr' ? `${d.nameMr} (${d.code})` : `${d.nameEn}`}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'प्रवासाची तारीख (Date)' : 'Journey Date'}
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'प्रवर्ग (Class)' : 'Travel Class'}
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-orange-500"
            >
              <option value="ALL">{language === 'mr' ? 'सर्व क्लासेस (All Classes)' : 'All Classes'}</option>
              <option value="CC">AC Chair Car (CC)</option>
              <option value="EC">Exec Chair Car (EC)</option>
              <option value="3A">AC 3 Tier (3A)</option>
              <option value="2A">AC 2 Tier (2A)</option>
              <option value="1A">First AC (1A)</option>
              <option value="SL">Sleeper (SL)</option>
              <option value="2S">Second Sitting (2S)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Trains List */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
            {language === 'mr'
              ? `उपलब्ध गाड्या (${filteredTrains.length})`
              : `Available Trains from Pune (${filteredTrains.length})`}
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            तारीख: {new Date(travelDate).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            <div
              key={train.number}
              className="bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 hover:border-orange-400 dark:hover:border-orange-500/50 rounded-2xl p-5 shadow-xs transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Train Header */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 text-xs font-extrabold bg-stone-900 text-amber-300 rounded-md">
                      #{train.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                      {language === 'mr' ? train.nameMr : train.nameEn}
                    </h3>
                    {train.isVandeBharat && (
                      <span className="px-2 py-0.5 text-[11px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>वंदे भारत</span>
                      </span>
                    )}
                    {train.isSpecial && (
                      <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-md">
                        सुप्रसिद्ध गाडी
                      </span>
                    )}
                  </div>

                  {/* Timing & Stations */}
                  <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-stone-600 dark:text-stone-300 my-2">
                    <div>
                      <span className="text-stone-400 block text-[11px]">सुटण्याची वेळ:</span>
                      <span className="font-extrabold text-stone-900 dark:text-stone-100 text-base">
                        {train.departureTime}
                      </span>
                      <span className="text-[11px] text-stone-500 block">{train.fromStation}</span>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[10px] text-stone-400 font-bold">{train.duration}</span>
                      <div className="w-16 sm:w-24 h-0.5 bg-orange-400 relative my-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600 absolute right-0 -top-0.5"></div>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {language === 'mr' ? train.daysOfRunMr : train.daysOfRunEn}
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[11px]">पोहोचण्याची वेळ:</span>
                      <span className="font-extrabold text-stone-900 dark:text-stone-100 text-base">
                        {train.arrivalTime}
                      </span>
                      <span className="text-[11px] text-stone-500 block">{train.toStation}</span>
                    </div>
                  </div>
                </div>

                {/* Class Availability Boxes */}
                <div className="flex flex-wrap items-center gap-2">
                  {train.seatsAvailable.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 min-w-[85px] text-center"
                    >
                      <div className="text-[11px] font-bold text-stone-500 dark:text-stone-400">{s.classCode}</div>
                      <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 my-0.5">
                        {s.status}
                      </div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">₹{s.fare}</div>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                  <button
                    onClick={() => handleIrctcRedirect(train.number)}
                    className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{language === 'mr' ? 'IRCTC वर बुक करा' : 'Book on IRCTC'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-6">
            <Train className="w-12 h-12 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
              {language === 'mr' ? 'या मार्गासाठी गाड्या सापडल्या नाहीत.' : 'No trains found for selected criteria.'}
            </p>
            <button
              onClick={() => {
                setDestination('ALL');
                setSelectedClass('ALL');
              }}
              className="mt-3 px-4 py-1.5 text-xs font-bold text-orange-600 hover:underline"
            >
              सर्व गाड्या दाखवा (Reset)
            </button>
          </div>
        )}
      </div>

      {/* PNR Status Checker & Station Help Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* PNR Enquiry Box */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs">
          <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{language === 'mr' ? 'थेट PNR स्थिती तपासा' : 'Check Live PNR Status'}</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
            {language === 'mr'
              ? 'तुमचा १० अंकांचा रेल्वे PNR क्रमांक टाका आणि थेट कन्फर्मेशन स्थिती जाणून घ्या.'
              : 'Enter 10-digit Indian Railways PNR to check current coach & seat status.'}
          </p>
          <form onSubmit={handleCheckPnr} className="flex gap-2">
            <input
              type="text"
              maxLength={10}
              placeholder="उदा. 4521890321"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value.replace(/[^0-9]/g, ''))}
              className="flex-1 py-2 px-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
            >
              {language === 'mr' ? 'तपासा' : 'Check'}
            </button>
          </form>
        </div>

        {/* Pune Junction Essential Tips */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-stone-850 dark:to-stone-800 border border-orange-200 dark:border-stone-700 rounded-2xl p-5">
          <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-orange-600" />
            <span>{language === 'mr' ? 'पुणे जंक्शन सुविधा व माहिती' : 'Pune Jn Station Facilities'}</span>
          </h3>
          <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5">
            <li>• <strong>मेट्रो जोडणी:</strong> पुणे रेल्वे स्टेशन थेट पुणे मेट्रो पर्पल लाईनने जोडलेले आहे.</li>
            <li>• <strong>हेल्पलाईन:</strong> रेल्वे चौकशीसाठी <strong>139</strong> डायल करा.</li>
            <li>• <strong>रिटायरिंग रूम:</strong> प्लॅटफॉर्म क्र. १ वर वातानुकूलित विश्रामगृह व क्लॉक रूम उपलब्ध.</li>
            <li>• <strong>पार्किंग:</strong> मुख्य प्रवेशद्वाराजवळ २ व ४ चाकी वाहनांसाठी पे अँड पार्क.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
