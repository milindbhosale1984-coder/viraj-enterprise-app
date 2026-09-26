import React, { useState } from 'react';
import {
  Flame,
  Shield,
  FileCheck,
  Car,
  Phone,
  ExternalLink,
  Calendar,
  Sparkles,
  CheckCircle,
  Bell,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Language } from '../data/translations';
import { CIVIC_SERVICES } from '../data/civicServicesData';
import { CivicService, PuneLiveNotification } from '../types';

interface CivicServicesViewProps {
  language: Language;
  onAddNotification: (notif: PuneLiveNotification) => void;
  onOpenBoostModal: (planId?: string) => void;
}

export const CivicServicesView: React.FC<CivicServicesViewProps> = ({
  language,
  onAddNotification,
  onOpenBoostModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'gas' | 'lic' | 'insurance' | 'puc'>('all');

  // Insurance Reminder Form State
  const [vehicleNo, setVehicleNo] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [reminderSaved, setReminderSaved] = useState(false);

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNo.trim() || !expiryDate) return;

    const newNotif: PuneLiveNotification = {
      id: `remind-${Date.now()}`,
      title: 'Vehicle Insurance Renewal Set',
      titleMr: `गाडी ${vehicleNo} विमा नूतनीकरण अलर्ट सेट!`,
      body: `Reminder set for vehicle ${vehicleNo} with expiry on ${expiryDate}.`,
      bodyMr: `वाहन क्रमांक ${vehicleNo} चा विमा ${expiryDate} रोजी संपत असून रिमाइंड अलर्ट यशस्वीरित्या सेट झाला आहे.`,
      time: 'आत्ताच',
      category: 'alert',
      unread: true,
      linkView: 'services',
    };

    onAddNotification(newNotif);
    setReminderSaved(true);
    setTimeout(() => {
      setReminderSaved(false);
      setVehicleNo('');
      setExpiryDate('');
    }, 4000);
  };

  const filteredServices = CIVIC_SERVICES.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-indigo-900 text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-200" />
            <span>{language === 'mr' ? 'नागरिक सेवा केंद्र' : 'Civic & Financial Services Desk'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {language === 'mr' ? 'गॅस बुकिंग, एलआयसी, विमा व पीयूसी' : 'Gas Booking, LIC, Insurance & PUC'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed mb-4">
            {language === 'mr'
              ? 'भारत गॅस, एचपी गॅस, इण्डेन सिलिंडर बुकिंग थेट लिंक्स, एलआयसी विभागीय कार्यालये, वाहन विमा रिमाइंड व शासकीय पीयूसी केंद्रे.'
              : 'Direct official links for LPG cylinders (Bharat, HP, Indane), LIC life insurance offices, vehicle insurance reminders & authorized PUC centers.'}
          </p>

          <button
            onClick={() => onOpenBoostModal('insurance_lead')}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white text-stone-900 font-extrabold text-xs shadow-md hover:bg-stone-100 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>
              {language === 'mr'
                ? 'एलआयसी / विमा एजंट? थेट ग्राहक लीड्स मिळवा (₹५०/लीड)'
                : 'Insurance/LIC Agent? Get verified Pune leads (₹50/lead)'}
            </span>
          </button>
        </div>
      </div>

      {/* Insurance Renewal Reminder Interactive Widget */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-orange-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-850 border border-indigo-200 dark:border-stone-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                {language === 'mr' ? 'वाहन विमा नूतनीकरण अलर्ट सेट करा' : 'Vehicle Insurance Renewal Reminder'}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {language === 'mr'
                  ? 'मुदत संपण्यापूर्वी वेळेत नोटिफिकेशन मिळवा आणि ट्रॅफिक पोलिसांचा दंड टाळा'
                  : 'Get instant live push reminder before your policy expires'}
              </p>
            </div>
          </div>
        </div>

        {reminderSaved ? (
          <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 flex items-center gap-2 text-xs sm:text-sm font-bold animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>
              {language === 'mr'
                ? 'अलर्ट यशस्वीरित्या सेव्ह झाला! नोटिफिकेशन बेलमध्ये नोंद झाली आहे.'
                : 'Insurance reminder saved successfully! Added to your live alerts.'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSaveReminder} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
              placeholder="उदा. MH 12 AB 1234"
              className="p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 uppercase"
            />
            <input
              type="date"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              {language === 'mr' ? 'रिमाइंडर सेट करा (Free)' : 'Set Renewal Reminder'}
            </button>
          </form>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', labelMr: 'सर्व सेवा', labelEn: 'All Services' },
          { id: 'gas', labelMr: 'गॅस बुकिंग (LPG)', labelEn: 'Gas Cylinders' },
          { id: 'lic', labelMr: 'LIC शाखा', labelEn: 'LIC Offices' },
          { id: 'insurance', labelMr: 'विमा सहाय्य कक्ष', labelEn: 'Insurance' },
          { id: 'puc', labelMr: 'पीयूसी केंद्रे', labelEn: 'PUC Centers' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {language === 'mr' ? tab.labelMr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Badge & Provider */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {service.provider}
                </span>
                {service.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-1 leading-snug">
                {language === 'mr' ? service.nameMr : service.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 leading-relaxed">
                {language === 'mr' ? service.descriptionMr : service.description}
              </p>

              {/* Address & Timings */}
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-100 dark:border-stone-800 text-xs mb-4 space-y-1.5">
                <div className="flex items-start gap-1.5 text-stone-600 dark:text-stone-300">
                  <Building className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{language === 'mr' ? service.officeAddressMr : service.officeAddress}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{service.timing}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <a
                href={`tel:${service.helpline.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'हेल्पलाईन' : 'Call'}</span>
              </a>

              <a
                href={service.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>{language === 'mr' ? 'अधिकृत पोर्टल' : 'Official Portal'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
