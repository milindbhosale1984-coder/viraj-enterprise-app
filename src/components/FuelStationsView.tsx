import React, { useState, useEffect } from 'react';
import {
  Fuel,
  Zap,
  Phone,
  Navigation,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  TrendingUp,
  Award,
  ChevronRight,
  ExternalLink,
  PlusCircle,
} from 'lucide-react';
import { Language } from '../data/translations';
import { PUNE_FUEL_PUMPS } from '../data/fuelData';
import { FuelPump, FuelStatus, FuelQueueLevel, FuelType } from '../types';

interface FuelStationsViewProps {
  language: Language;
  onOpenBoostModal: (planId?: string) => void;
}

export const FuelStationsView: React.FC<FuelStationsViewProps> = ({
  language,
  onOpenBoostModal,
}) => {
  const [activeTab, setActiveTab] = useState<FuelType | 'all'>('cng');
  const [pumps, setPumps] = useState<FuelPump[]>(() => {
    try {
      const saved = localStorage.getItem('pune_fuel_pumps_state');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return PUNE_FUEL_PUMPS;
  });

  const [karmaPoints, setKarmaPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pune_citizen_karma_points');
      if (saved) return parseInt(saved, 10);
    } catch {}
    return 50; // initial bonus points
  });

  const [updatingPump, setUpdatingPump] = useState<FuelPump | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pune_fuel_pumps_state', JSON.stringify(pumps));
      localStorage.setItem('pune_citizen_karma_points', karmaPoints.toString());
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [pumps, karmaPoints]);

  const handleUpdateStatus = (
    pumpId: string,
    status: FuelStatus,
    queueLevel: FuelQueueLevel
  ) => {
    setPumps((prev) =>
      prev.map((pump) => {
        if (pump.id === pumpId) {
          return {
            ...pump,
            status,
            queueLevel,
            lastUpdatedMinsAgo: 1,
            updatedBy: language === 'mr' ? 'तुम्ही स्वतः (नागरिक रिपोर्ट)' : 'You (Citizen Report)',
          };
        }
        return pump;
      })
    );

    // Award +10 points
    setKarmaPoints((prev) => prev + 10);

    const message =
      language === 'mr'
        ? 'धन्यवाद! सीएनजी स्थिती अपडेट झाली आणि तुम्हाला +१० गुण मिळाले! 🏅'
        : 'Thank you! Live CNG status updated and you earned +10 Citizen Karma Points! 🏅';

    setToastMessage(message);
    setUpdatingPump(null);

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const filteredPumps = pumps.filter((p) => {
    if (activeTab === 'all') return true;
    return p.type === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <Award className="w-6 h-6 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-stone-900 text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold mb-3">
              <Fuel className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'mr' ? 'थेट सीएनजी व फ्युएल ट्रॅकर' : 'Live Pune Fuel & CNG Tracker'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {language === 'mr' ? 'पुणे थेट सीएनजी, पेट्रोल व ईव्ही स्टेशन्स' : 'Pune Live CNG, Petrol & EV Stations'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-4">
              {language === 'mr'
                ? 'सीएनजी उपलब्ध आहे का? रांग किती मोठी आहे? नागरिकांचे थेट रिअल-टाइम रिपोर्ट्स तपासा आणि स्वतः रिपोर्ट करून गुण मिळवा!'
                : 'Live crowd-sourced CNG availability, waiting queue levels & EV chargers across Pune. Report live status & earn Citizen Points!'}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-bold text-emerald-300">
                🟢 CNG आहे (Available)
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-bold text-amber-300">
                🟡 मध्यम रांग (Queue 10m)
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-bold text-red-300">
                🔴 संपला आहे (Out of Stock)
              </span>
            </div>
          </div>

          {/* User Citizen Karma Badge & Monetization Banner */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center flex flex-col items-center shrink-0 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-black text-lg mb-1 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[11px] text-emerald-200">{language === 'mr' ? 'तुमचे नागरिक गुण' : 'Your Citizen Points'}</span>
            <span className="text-2xl font-black text-white">{karmaPoints} pts</span>
            <span className="text-[10px] text-amber-200 mt-0.5">प्रत्येक रिपोर्टवर +१० गुण</span>

            <button
              onClick={() => onOpenBoostModal('fuel_top')}
              className="mt-3 w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs shadow-md hover:from-amber-600 hover:to-orange-700 transition-all cursor-pointer"
            >
              {language === 'mr' ? 'पंप मालक? टॉपवर आणा (₹९९९)' : 'Pump Owner? Boost (₹999)'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between gap-3 mb-6 overflow-x-auto pb-2">
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('cng')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'cng'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {language === 'mr' ? '🟢 सीएनजी (Live CNG)' : '🟢 Live CNG'}
          </button>
          <button
            onClick={() => setActiveTab('petrol')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'petrol'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {language === 'mr' ? '⛽ पेट्रोल व डिझेल' : '⛽ Petrol & Diesel'}
          </button>
          <button
            onClick={() => setActiveTab('ev')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'ev'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {language === 'mr' ? '⚡ ईव्ही चार्जिंग (EV)' : '⚡ EV Fast Chargers'}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {language === 'mr' ? 'सर्व स्टेशन्स' : 'All Pumps'}
          </button>
        </div>

        <span className="text-xs font-bold text-stone-500 shrink-0 hidden sm:inline">
          {filteredPumps.length} {language === 'mr' ? 'पंप उपलब्ध' : 'Pumps Listed'}
        </span>
      </div>

      {/* Pumps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPumps.map((pump) => {
          const isCNG = pump.type === 'cng';
          const isAvailable = pump.status === 'available';
          const isQueue = pump.status === 'queue';
          const isOutOfStock = pump.status === 'out_of_stock';

          const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${pump.lat},${pump.lng}`;

          return (
            <div
              key={pump.id}
              className={`p-5 rounded-3xl bg-white dark:bg-stone-900 border transition-all hover:shadow-md flex flex-col justify-between ${
                pump.isSponsored
                  ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/20'
                  : 'border-stone-200 dark:border-stone-800'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {pump.brand}
                    </span>
                    {pump.isSponsored && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  {isCNG && (
                    <div
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black shadow-xs ${
                        isAvailable
                          ? 'bg-emerald-500 text-white'
                          : isQueue
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {isAvailable && <CheckCircle className="w-3.5 h-3.5" />}
                      {isQueue && <AlertTriangle className="w-3.5 h-3.5" />}
                      {isOutOfStock && <XCircle className="w-3.5 h-3.5" />}
                      <span>
                        {isAvailable
                          ? language === 'mr'
                            ? 'CNG उपलब्ध आहे'
                            : 'CNG Available'
                          : isQueue
                          ? language === 'mr'
                            ? 'रांग आहे'
                            : 'Queue / Busy'
                          : language === 'mr'
                          ? 'संपला आहे (Out)'
                          : 'Out of Stock'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug mb-1">
                  {language === 'mr' ? pump.nameMr : pump.name}
                </h3>

                {/* Address */}
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{language === 'mr' ? pump.addressMr : pump.address}</span>
                </p>

                {/* Rate & Live Queue Info */}
                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-100 dark:border-stone-800 text-xs mb-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 dark:text-stone-400">
                      {language === 'mr' ? 'दर / Price:' : 'Rate:'}
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {pump.price}
                    </span>
                  </div>

                  {isCNG && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400">
                        {language === 'mr' ? 'रांगेची स्थिती (Queue):' : 'Waiting Queue:'}
                      </span>
                      <span
                        className={`font-extrabold ${
                          pump.queueLevel === 'kami'
                            ? 'text-emerald-600'
                            : pump.queueLevel === 'madhyam'
                            ? 'text-amber-600'
                            : 'text-red-600'
                        }`}
                      >
                        {pump.queueLevel === 'kami'
                          ? language === 'mr'
                            ? 'कमी (५ मिनिटे)'
                            : 'Short (<5 min)'
                          : pump.queueLevel === 'madhyam'
                          ? language === 'mr'
                            ? 'मध्यम (१०-१५ मिनिटे)'
                            : 'Medium (10-15m)'
                          : language === 'mr'
                          ? 'खूप मोठी रांग (>२५ मिनिटे)'
                          : 'Heavy (>25m)'}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-200/50 dark:border-stone-700/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{pump.lastUpdatedMinsAgo} {language === 'mr' ? 'मिनिटांपूर्वी' : 'mins ago'}</span>
                    </span>
                    <span className="truncate max-w-[130px]">{pump.updatedBy}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
                {/* User Status Update Button (Earns 10 pts) */}
                {isCNG && (
                  <button
                    onClick={() => setUpdatingPump(pump)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs transition-colors border border-emerald-200 dark:border-emerald-800/60 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'mr' ? 'स्थिती अपडेट करा (+१० गुण)' : 'Update Status (+10 pts)'}</span>
                  </button>
                )}

                {/* Call & Navigate */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${pump.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'कॉल करा' : 'Call'}</span>
                  </a>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'नकाशा' : 'Navigate'}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Status Update Modal */}
      {updatingPump && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
              {language === 'mr' ? 'सीएनजी स्थिती कळवा' : 'Report Live CNG Status'}
            </h3>
            <p className="text-xs text-stone-500 mb-4 truncate font-medium">
              {language === 'mr' ? updatingPump.nameMr : updatingPump.name}
            </p>

            <div className="space-y-4">
              {/* Option 1: CNG Available */}
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                <span className="block text-xs font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                  {language === 'mr' ? '१. CNG उपलब्ध आहे (Available):' : '1. CNG is Available:'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(updatingPump.id, 'available', 'kami')}
                    className="p-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                  >
                    {language === 'mr' ? 'कमी रांग' : 'Low Queue'}
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(updatingPump.id, 'queue', 'madhyam')}
                    className="p-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-600"
                  >
                    {language === 'mr' ? 'मध्यम रांग' : 'Med Queue'}
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(updatingPump.id, 'queue', 'khup')}
                    className="p-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700"
                  >
                    {language === 'mr' ? 'मोठी रांग' : 'Heavy Queue'}
                  </button>
                </div>
              </div>

              {/* Option 2: Out of Stock */}
              <button
                onClick={() => handleUpdateStatus(updatingPump.id, 'out_of_stock', 'khup')}
                className="w-full p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-extrabold hover:bg-red-100 flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                <span>{language === 'mr' ? 'सीएनजी संपला आहे (Out of Stock)' : 'CNG Out of Stock'}</span>
              </button>
            </div>

            <button
              onClick={() => setUpdatingPump(null)}
              className="mt-5 w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-600 hover:bg-stone-50"
            >
              {language === 'mr' ? 'रद्द करा' : 'Cancel'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
