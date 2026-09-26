import React, { useState } from 'react';
import {
  Plane,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  Search,
  ArrowRight,
  Luggage,
  Sparkles,
  Bus,
  Car,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { Language } from '../data/translations';

interface FlightBookingViewProps {
  language: Language;
}

interface PuneFlight {
  id: string;
  airline: string;
  flightNo: string;
  airlineLogo: string;
  origin: string;
  destCityEn: string;
  destCityMr: string;
  destCode: string;
  departure: string;
  arrival: string;
  duration: string;
  isNonStop: boolean;
  price: number;
  baggage: string;
  seatsLeft: number;
  terminal: string;
  bookingUrl: string;
}

interface LiveTerminalFlight {
  flightNo: string;
  airline: string;
  destination: string;
  time: string;
  terminal: string;
  status: 'On Time' | 'Boarding' | 'Security Open' | 'Delayed' | 'Landed';
  statusColor: string;
}

const POPULAR_FLIGHT_DESTINATIONS = [
  { code: 'DEL', cityEn: 'New Delhi (DEL)', cityMr: 'नवी दिल्ली' },
  { code: 'BLR', cityEn: 'Bengaluru (BLR)', cityMr: 'बंगळुरू' },
  { code: 'HYD', cityEn: 'Hyderabad (HYD)', cityMr: 'हैदराबाद' },
  { code: 'GOI', cityEn: 'Goa Dabolim / Mopa (GOI)', cityMr: 'गोवा' },
  { code: 'CCU', cityEn: 'Kolkata (CCU)', cityMr: 'कोलकाता' },
  { code: 'MAA', cityEn: 'Chennai (MAA)', cityMr: 'चेन्नई' },
  { code: 'BOM', cityEn: 'Mumbai (BOM)', cityMr: 'मुंबई' },
  { code: 'DXB', cityEn: 'Dubai (DXB - International)', cityMr: 'दुबई (आंतरराष्ट्रीय)' },
  { code: 'SIN', cityEn: 'Singapore (SIN)', cityMr: 'सिंगापूर' },
];

const FLIGHTS_SCHEDULE: PuneFlight[] = [
  {
    id: 'fl-1',
    airline: 'IndiGo',
    flightNo: '6E 2134',
    airlineLogo: 'indigo',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'New Delhi',
    destCityMr: 'नवी दिल्ली',
    destCode: 'DEL',
    departure: '06:15 AM',
    arrival: '08:25 AM',
    duration: '2h 10m',
    isNonStop: true,
    price: 3950,
    baggage: '15 kg + 7 kg Cabin',
    seatsLeft: 5,
    terminal: 'T2',
    bookingUrl: 'https://www.goindigo.in/',
  },
  {
    id: 'fl-2',
    airline: 'Air India',
    flightNo: 'AI 852',
    airlineLogo: 'airindia',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'New Delhi',
    destCityMr: 'नवी दिल्ली',
    destCode: 'DEL',
    departure: '08:45 AM',
    arrival: '11:00 AM',
    duration: '2h 15m',
    isNonStop: true,
    price: 4320,
    baggage: '20 kg + 7 kg Cabin (Free Meal)',
    seatsLeft: 8,
    terminal: 'T2',
    bookingUrl: 'https://www.airindia.com/',
  },
  {
    id: 'fl-3',
    airline: 'Akasa Air',
    flightNo: 'QP 1302',
    airlineLogo: 'akasa',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'Bengaluru',
    destCityMr: 'बंगळुरू',
    destCode: 'BLR',
    departure: '07:20 AM',
    arrival: '08:45 AM',
    duration: '1h 25m',
    isNonStop: true,
    price: 3180,
    baggage: '15 kg + 7 kg Cabin',
    seatsLeft: 9,
    terminal: 'T2',
    bookingUrl: 'https://www.akasaair.com/',
  },
  {
    id: 'fl-4',
    airline: 'IndiGo',
    flightNo: '6E 521',
    airlineLogo: 'indigo',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'Bengaluru',
    destCityMr: 'बंगळुरू',
    destCode: 'BLR',
    departure: '02:40 PM',
    arrival: '04:05 PM',
    duration: '1h 25m',
    isNonStop: true,
    price: 3450,
    baggage: '15 kg + 7 kg Cabin',
    seatsLeft: 4,
    terminal: 'T2',
    bookingUrl: 'https://www.goindigo.in/',
  },
  {
    id: 'fl-5',
    airline: 'SpiceJet',
    flightNo: 'SG 1084',
    airlineLogo: 'spicejet',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'Goa',
    destCityMr: 'गोवा',
    destCode: 'GOI',
    departure: '10:30 AM',
    arrival: '11:35 AM',
    duration: '1h 05m',
    isNonStop: true,
    price: 2890,
    baggage: '15 kg + 7 kg Cabin',
    seatsLeft: 12,
    terminal: 'T2',
    bookingUrl: 'https://www.spicejet.com/',
  },
  {
    id: 'fl-6',
    airline: 'IndiGo',
    flightNo: '6E 448',
    airlineLogo: 'indigo',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'Hyderabad',
    destCityMr: 'हैदराबाद',
    destCode: 'HYD',
    departure: '05:10 PM',
    arrival: '06:25 PM',
    duration: '1h 15m',
    isNonStop: true,
    price: 3200,
    baggage: '15 kg + 7 kg Cabin',
    seatsLeft: 6,
    terminal: 'T2',
    bookingUrl: 'https://www.goindigo.in/',
  },
  {
    id: 'fl-7',
    airline: 'Air India Express',
    flightNo: 'IX 298',
    airlineLogo: 'airindia',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'Dubai',
    destCityMr: 'दुबई (आंतरराष्ट्रीय)',
    destCode: 'DXB',
    departure: '08:20 PM',
    arrival: '10:45 PM',
    duration: '3h 55m',
    isNonStop: true,
    price: 13450,
    baggage: '30 kg + 7 kg Cabin',
    seatsLeft: 7,
    terminal: 'T2 (Intl)',
    bookingUrl: 'https://www.airindiaexpress.com/',
  },
  {
    id: 'fl-8',
    airline: 'flydubai',
    flightNo: 'FZ 442',
    airlineLogo: 'flydubai',
    origin: 'PNQ (Pune T2)',
    destCityEn: 'Dubai',
    destCityMr: 'दुबई (आंतरराष्ट्रीय)',
    destCode: 'DXB',
    departure: '02:15 AM',
    arrival: '04:30 AM',
    duration: '3h 45m',
    isNonStop: true,
    price: 14800,
    baggage: '25 kg + 7 kg Cabin',
    seatsLeft: 3,
    terminal: 'T2 (Intl)',
    bookingUrl: 'https://www.flydubai.com/',
  },
];

const LIVE_DEPARTURES: LiveTerminalFlight[] = [
  { flightNo: '6E 2134', airline: 'IndiGo', destination: 'Delhi (DEL)', time: '06:15 AM', terminal: 'T2 Gate 4', status: 'Boarding', statusColor: 'bg-emerald-500' },
  { flightNo: 'QP 1302', airline: 'Akasa Air', destination: 'Bengaluru (BLR)', time: '07:20 AM', terminal: 'T2 Gate 2', status: 'Security Open', statusColor: 'bg-amber-500' },
  { flightNo: 'AI 852', airline: 'Air India', destination: 'Delhi (DEL)', time: '08:45 AM', terminal: 'T2 Gate 6', status: 'On Time', statusColor: 'bg-blue-500' },
  { flightNo: 'SG 1084', airline: 'SpiceJet', destination: 'Goa (GOI)', time: '10:30 AM', terminal: 'T2 Gate 1', status: 'On Time', statusColor: 'bg-blue-500' },
  { flightNo: 'IX 298', airline: 'Air India Exp', destination: 'Dubai (DXB)', time: '08:20 PM', terminal: 'T2 Intl Gate 8', status: 'On Time', statusColor: 'bg-purple-500' },
];

export const FlightBookingView: React.FC<FlightBookingViewProps> = ({ language }) => {
  const [destination, setDestination] = useState('ALL');
  const [flightDate, setFlightDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState('1');

  const filteredFlights = FLIGHTS_SCHEDULE.filter((flight) => {
    if (destination !== 'ALL' && flight.destCode !== destination) {
      return false;
    }
    return true;
  });

  const handleBookingRedirect = (airlineBookingUrl: string) => {
    window.open(airlineBookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAggregatorRedirect = (platform: string) => {
    const urls: Record<string, string> = {
      makemytrip: 'https://www.makemytrip.com/flights/',
      cleartrip: 'https://www.cleartrip.com/flights',
      easemytrip: 'https://www.easemytrip.com/flights.html',
    };
    window.open(urls[platform] || 'https://www.makemytrip.com/flights/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-sky-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sky-200 text-xs font-bold mb-3 border border-white/20">
            <Plane className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पुणे विमानतळ (PNQ) - नवीन टर्मिनल २' : 'Pune Airport (PNQ) - New Terminal 2'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-devanagari-hero">
            {language === 'mr' ? 'पुणे विमान बुकिंग व थेट उड्डाणे' : 'Pune Flights Booking & Live Status'}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'पुणे आंतरराष्ट्रीय विमानतळावरून (लोहेगाव / न्यू टर्मिनल २) दिल्ली, बंगळुरू, गोवा, दुबई आणि इतर शहरांसाठी विमानाचे भाडे, वेळा व थेट एअरलाईन बुकिंग.'
              : 'Direct domestic & international flights from Pune Airport (PNQ Terminal 2). Compare fares and book instantly with official airlines.'}
          </p>
        </div>

        {/* Airport Code Pill */}
        <div className="absolute right-4 bottom-4 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-sky-400/30 text-white">
          <MapPin className="w-4 h-4 text-sky-400" />
          <div className="text-left">
            <div className="text-[10px] text-sky-200 font-bold uppercase">IATA Code</div>
            <div className="text-lg font-black tracking-widest leading-none">PNQ</div>
          </div>
        </div>
      </div>

      {/* Flight Search Controls */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
        <h2 className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-sky-600" />
          <span>{language === 'mr' ? 'पुण्याहून विमाने शोधा' : 'Search Flights from Pune'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'प्रारंभिक विमानतळ (From)' : 'From Airport'}
            </label>
            <div className="py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold flex items-center justify-between">
              <span>PNQ - Pune Terminal 2 (पुणे)</span>
              <span className="text-[10px] bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded font-mono">
                Lohegaon
              </span>
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'गंतव्य शहर (To Destination)' : 'To Destination'}
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
            >
              <option value="ALL">{language === 'mr' ? 'सर्व शहरे (All Destinations)' : 'All Destinations'}</option>
              {POPULAR_FLIGHT_DESTINATIONS.map((d) => (
                <option key={d.code} value={d.code}>
                  {language === 'mr' ? `${d.cityMr} (${d.code})` : d.cityEn}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'प्रवासाची तारीख (Date)' : 'Departure Date'}
            </label>
            <input
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
              {language === 'mr' ? 'प्रवासी संख्या (Travellers)' : 'Passengers'}
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
            >
              <option value="1">1 Adult (Economy)</option>
              <option value="2">2 Adults (Economy)</option>
              <option value="3">3+ Adults (Family)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flight Results */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
            {language === 'mr'
              ? `पुण्याहून उड्डाणे (${filteredFlights.length})`
              : `Flights from Pune (${filteredFlights.length})`}
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            PNQ Terminal 2 Verified Schedules
          </span>
        </div>

        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 hover:border-sky-400 dark:hover:border-sky-500/50 rounded-2xl p-5 shadow-xs transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Airline & Flight Number */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-black text-sm shadow-xs">
                    {flight.airline.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      {flight.airline}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-mono">{flight.flightNo}</span>
                      <span>·</span>
                      <span className="font-medium text-sky-600 dark:text-sky-400">{flight.terminal}</span>
                    </div>
                  </div>
                </div>

                {/* Timing & Route */}
                <div className="flex-1 flex items-center justify-around text-center gap-3">
                  <div>
                    <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                      {flight.departure}
                    </span>
                    <span className="block text-[11px] text-stone-400 font-semibold">PNQ (Pune)</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[11px] text-stone-500 font-medium">{flight.duration}</span>
                    <div className="w-20 sm:w-28 h-0.5 bg-sky-300 dark:bg-sky-800 relative my-1">
                      <Plane className="w-3 h-3 text-sky-600 dark:text-sky-400 absolute right-1/2 -top-1.5 translate-x-1/2 rotate-90" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {flight.isNonStop ? (language === 'mr' ? 'थेट नॉन-स्टॉप' : 'Non-Stop') : '1 Stop'}
                    </span>
                  </div>

                  <div>
                    <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                      {flight.arrival}
                    </span>
                    <span className="block text-[11px] text-stone-400 font-semibold">
                      {flight.destCode} ({language === 'mr' ? flight.destCityMr : flight.destCityEn})
                    </span>
                  </div>
                </div>

                {/* Baggage & Price */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100 dark:border-stone-800 min-w-[140px]">
                  <div className="text-left sm:text-right">
                    <span className="text-xl font-black text-stone-900 dark:text-stone-100">
                      ₹{flight.price.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-stone-400">प्रति व्यक्ती (Per Adult)</span>
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-stone-400" />
                    <span>{flight.baggage}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => handleBookingRedirect(flight.bookingUrl)}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-extrabold bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{language === 'mr' ? 'तिकीट बुक करा' : 'Book Flight'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-6">
            <Plane className="w-12 h-12 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
              {language === 'mr' ? 'या तारखेसाठी उड्डाणे सापडली नाहीत.' : 'No flights found for this destination.'}
            </p>
            <button
              onClick={() => setDestination('ALL')}
              className="mt-3 px-4 py-1.5 text-xs font-bold text-sky-600 hover:underline"
            >
              सर्व उड्डाणे दाखवा (Reset)
            </button>
          </div>
        )}
      </div>

      {/* Live Terminal Departures Board & Airport Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Board */}
        <div className="lg:col-span-2 bg-stone-950 text-white rounded-2xl p-5 border border-stone-800 shadow-md">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h3 className="text-sm font-extrabold text-white tracking-wide uppercase">
                {language === 'mr' ? 'थेट टर्मिनल २ उड्डाण स्थिती (Live Status)' : 'PNQ Terminal 2 Live Board'}
              </h3>
            </div>
            <span className="text-[11px] text-stone-400 font-mono">Live Sync</span>
          </div>

          <div className="divide-y divide-stone-800/80">
            {LIVE_DEPARTURES.map((dep, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-amber-300 font-bold">{dep.time}</span>
                  <div>
                    <div className="font-bold text-white">{dep.destination}</div>
                    <div className="text-[10px] text-stone-400">{dep.airline} · {dep.flightNo}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-stone-400 font-medium text-[11px] hidden sm:inline">{dep.terminal}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${dep.statusColor}`}>
                    {dep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Airport Guide & Transport */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>{language === 'mr' ? 'टर्मिनल २ मार्गदर्शक व टॅक्सी' : 'Terminal 2 Guide & Cabs'}</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900">
                <div className="font-bold text-sky-900 dark:text-sky-300 mb-0.5">DigiYatra Fast Entry</div>
                <p className="text-[11px] text-sky-800 dark:text-sky-400">
                  गेट क्र. १ व २ वर बायोमेट्रिक फेशियल स्कॅनने १ मिनिटात विमानतळात प्रवेश.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 mb-0.5 flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5" />
                  <span>PMPML AC Airport Shuttle</span>
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                  विमानतळ ते हिंजवडी आयटी पार्क, स्वारगेट आणि कोथरूडसाठी दर ३० मिनिटांनी वातानुकूलित बस.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <div className="font-bold text-amber-900 dark:text-amber-300 mb-0.5 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  <span>Prepaid Ola / Uber Pickup Bay</span>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-400">
                  मल्टी-लेव्हल कार पार्किंग (MLCP) च्या पहिल्या मजल्यावर स्वतंत्र टॅक्सी पिकअप झोन.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
            विमानतळ २४ तास हेल्पलाईन: <strong>020-26683232</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
