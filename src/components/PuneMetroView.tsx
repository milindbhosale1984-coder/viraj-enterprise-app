import React, { useState } from 'react';
import {
  Train,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
  MapPin,
  QrCode,
  ShieldCheck,
  Search,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Bus,
  Compass,
} from 'lucide-react';
import { Language } from '../data/translations';
import {
  PUNE_PURPLE_LINE_STATIONS,
  PUNE_AQUA_LINE_STATIONS,
  ALL_METRO_STATIONS,
  calculatePuneMetroFare,
} from '../data/puneMetroData';
import { MetroStation } from '../types';

interface PuneMetroViewProps {
  language: Language;
}

export const PuneMetroView: React.FC<PuneMetroViewProps> = ({ language }) => {
  const [selectedLine, setSelectedLine] = useState<'all' | 'purple' | 'aqua'>('all');
  const [sourceStation, setSourceStation] = useState('pur-1'); // PCMC
  const [destStation, setDestStation] = useState('pur-14'); // Swargate
  const [stationSearch, setStationSearch] = useState('');
  const [selectedStation, setSelectedStation] = useState<MetroStation | null>(null);

  const fareResult = calculatePuneMetroFare(sourceStation, destStation);

  const sourceObj = ALL_METRO_STATIONS.find((s) => s.id === sourceStation);
  const destObj = ALL_METRO_STATIONS.find((s) => s.id === destStation);

  const filteredStations = ALL_METRO_STATIONS.filter((s) => {
    if (selectedLine === 'purple' && s.line !== 'purple' && s.line !== 'interchange') return false;
    if (selectedLine === 'aqua' && s.line !== 'aqua' && s.line !== 'interchange') return false;
    if (!stationSearch) return true;
    const q = stationSearch.toLowerCase();
    return (
      s.nameEn.toLowerCase().includes(q) ||
      s.nameMr.includes(q) ||
      s.stationCode.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-sky-950 text-white p-6 sm:p-10 mb-8 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-semibold mb-3">
            <Train className="w-3.5 h-3.5 text-purple-300" />
            <span>{language === 'mr' ? 'महा मेट्रो - पुणे मेट्रो अधिकृत मार्गदर्शक' : 'Maha Metro - Pune Metro Official Guide'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {language === 'mr' ? 'पुणे मेट्रो: जांभळी व ॲक्वा मार्गिका' : 'Pune Metro: Purple & Aqua Corridor'}
          </h1>
          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed mb-6">
            {language === 'mr'
              ? 'PCMC ते स्वारगेट (जांभळी मार्गिका) व वनाज ते रामवाडी (ॲक्वा मार्गिका). संपूर्ण पुणे शहरात वेगवान, प्रदूषणमुक्त व सुरक्षित प्रवास!'
              : 'Direct connectivity across PCMC, Shivajinagar, Swargate, Kothrud, Deccan, Pune Station, Yerwada & Ramwadi with underground and elevated lines.'}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-purple-200 block">{language === 'mr' ? 'कार्यान्वयन वेळ' : 'Timings'}</span>
              <span className="text-sm sm:text-base font-extrabold text-white">06:00 AM - 10:00 PM</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-purple-200 block">{language === 'mr' ? 'गाड्यांची वारंवारता' : 'Frequency'}</span>
              <span className="text-sm sm:text-base font-extrabold text-amber-300">7 ते 10 मिनिटे</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-purple-200 block">{language === 'mr' ? 'किमान/कमाल भाडे' : 'Fare Range'}</span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-300">₹१० ते ₹३५</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-purple-200 block">{language === 'mr' ? 'इंटरचेंज स्थानक' : 'Interchange'}</span>
              <span className="text-sm sm:text-base font-extrabold text-sky-300">जिल्हा सत्र न्यायालय</span>
            </div>
          </div>
        </div>

        {/* WhatsApp QR & Booking Card */}
        <div className="mt-6 sm:mt-0 sm:absolute sm:top-8 sm:right-8 bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center flex flex-col items-center">
          <div className="bg-white p-2 rounded-xl mb-2 shadow-md">
            <QrCode className="w-16 h-16 text-stone-900" />
          </div>
          <span className="text-xs font-bold text-white mb-1">
            {language === 'mr' ? 'व्हॉट्सॲप ई-तिकीट' : 'WhatsApp QR Ticket'}
          </span>
          <span className="text-[10px] text-purple-200 mb-2">9420101990 वर 'Hi' पाठवा</span>
          <a
            href="https://wa.me/919420101990?text=Hi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>{language === 'mr' ? 'तिकीट बुक करा' : 'Book on WhatsApp'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Interactive Fare & Route Calculator */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100">
            {language === 'mr' ? 'मेट्रो भाडे व वेळ कॅल्क्युलेटर' : 'Metro Fare & Travel Time Calculator'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Source Station */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1.5">
              {language === 'mr' ? 'प्रारंभ स्थानक (From Station):' : 'Origin Station:'}
            </label>
            <select
              value={sourceStation}
              onChange={(e) => setSourceStation(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-semibold text-sm text-stone-900 dark:text-stone-100 cursor-pointer focus:ring-2 focus:ring-purple-500"
            >
              <optgroup label="Purple Line (PCMC - Swargate)">
                {PUNE_PURPLE_LINE_STATIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'mr' ? s.nameMr : s.nameEn} ({s.stationCode})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Aqua Line (Vanaz - Ramwadi)">
                {PUNE_AQUA_LINE_STATIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'mr' ? s.nameMr : s.nameEn} ({s.stationCode})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Destination Station */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1.5">
              {language === 'mr' ? 'गंतव्य स्थानक (To Station):' : 'Destination Station:'}
            </label>
            <select
              value={destStation}
              onChange={(e) => setDestStation(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-semibold text-sm text-stone-900 dark:text-stone-100 cursor-pointer focus:ring-2 focus:ring-purple-500"
            >
              <optgroup label="Purple Line (PCMC - Swargate)">
                {PUNE_PURPLE_LINE_STATIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'mr' ? s.nameMr : s.nameEn} ({s.stationCode})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Aqua Line (Vanaz - Ramwadi)">
                {PUNE_AQUA_LINE_STATIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'mr' ? s.nameMr : s.nameEn} ({s.stationCode})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-purple-950/40 dark:via-stone-800 dark:to-indigo-950/40 p-4 rounded-2xl border border-purple-200 dark:border-purple-900/50 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                {language === 'mr' ? 'अधिकृत भाडे:' : 'Ticket Fare:'}
              </span>
              <span className="text-2xl font-black text-purple-700 dark:text-purple-300">
                ₹{fareResult.fare}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 mb-2">
              <span>{language === 'mr' ? 'स्थानके:' : 'Stations:'} {fareResult.stationsCount}</span>
              <span>~{fareResult.durationMins} min</span>
            </div>
            {fareResult.requiresInterchange && (
              <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 p-1.5 rounded-lg text-center">
                {language === 'mr'
                  ? '🔄 जिल्हा सत्र न्यायालय येथे लाईन बदला'
                  : '🔄 Change line at District Court'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Line Switcher & Station Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => setSelectedLine('all')}
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedLine === 'all'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {language === 'mr' ? 'सर्व मार्गिका (३० स्थानके)' : 'All Lines (30 Stations)'}
          </button>
          <button
            onClick={() => setSelectedLine('purple')}
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedLine === 'purple'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/40'
            }`}
          >
            {language === 'mr' ? 'जांभळी (PCMC - स्वारगेट)' : 'Purple (PCMC - Swargate)'}
          </button>
          <button
            onClick={() => setSelectedLine('aqua')}
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedLine === 'aqua'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-950/40'
            }`}
          >
            {language === 'mr' ? 'ॲक्वा (वनाज - रामवाडी)' : 'Aqua (Vanaz - Ramwadi)'}
          </button>
        </div>

        {/* Station Search Filter */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={stationSearch}
            onChange={(e) => setStationSearch(e.target.value)}
            placeholder={language === 'mr' ? 'मेट्रो स्थानक शोधा...' : 'Search metro station...'}
            className="w-full py-2 pl-9 pr-3 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-medium"
          />
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStations.map((station) => {
          const isPurple = station.line === 'purple';
          const isInterchange = station.line === 'interchange';

          return (
            <div
              key={station.id}
              className={`p-5 rounded-3xl bg-white dark:bg-stone-900 border transition-all hover:shadow-md ${
                isInterchange
                  ? 'border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/20'
                  : isPurple
                  ? 'border-purple-200 dark:border-purple-900/60 hover:border-purple-400'
                  : 'border-sky-200 dark:border-sky-900/60 hover:border-sky-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                      isInterchange
                        ? 'bg-gradient-to-r from-purple-600 to-sky-600'
                        : isPurple
                        ? 'bg-purple-600'
                        : 'bg-sky-600'
                    }`}
                  >
                    {station.stationNumber}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                      {language === 'mr' ? station.nameMr : station.nameEn}
                    </h3>
                    <span className="text-[11px] font-mono text-stone-500">
                      CODE: {station.stationCode}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    station.type === 'Underground'
                      ? 'bg-stone-800 text-white'
                      : station.type === 'Interchange'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {station.type}
                </span>
              </div>

              {/* Timings */}
              <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400 mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{station.firstTrain} - {station.lastTrain}</span>
                </span>
              </div>

              {/* Feeder Bus */}
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 text-xs mb-3 flex items-start gap-2">
                <Bus className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-stone-600 dark:text-stone-300 line-clamp-2">
                  {language === 'mr' ? station.feederBusMr : station.feederBus}
                </span>
              </div>

              {/* Nearby Landmarks */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(language === 'mr' ? station.nearbyLandmarksMr : station.nearbyLandmarks).map(
                  (mark, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                    >
                      {mark}
                    </span>
                  )
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${station.nameEn} Metro Station Pune`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 hover:bg-orange-200 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'मॅप दिशा' : 'Map Direction'}</span>
                </a>

                <a
                  href="https://wa.me/919420101990?text=Hi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'तिकीट' : 'QR Ticket'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
