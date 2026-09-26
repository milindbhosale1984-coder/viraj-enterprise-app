import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Ticket,
  ExternalLink,
  Plus,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { PUNE_EVENTS } from '../data/puneEvents';
import { PuneCalendarEvent } from '../types';
import { Language, translations } from '../data/translations';

interface PuneCalendarSectionProps {
  language: Language;
}

export const PuneCalendarSection: React.FC<PuneCalendarSectionProps> = ({ language }) => {
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelMr: 'सर्व कार्यक्रम', labelEn: 'All Events' },
    { id: 'exhibition', labelMr: 'जत्रा व प्रदर्शन (भीमथडी)', labelEn: 'Exhibitions (Bhimthadi)' },
    { id: 'festival', labelMr: 'उत्सव व मिरवणूक (गणेशोत्सव)', labelEn: 'Festivals & Visarjan' },
    { id: 'civic', labelMr: 'मनपा नागरी सभा (PMC Meetings)', labelEn: 'PMC Civic Meetings' },
    { id: 'cultural', labelMr: 'सांस्कृतिक व संगीत (सवाई गंधर्व)', labelEn: 'Classical Music' },
    { id: 'sports', labelMr: 'क्रीडा (मॅरेथॉन)', labelEn: 'Sports & Marathon' },
  ];

  const filteredEvents = activeCategory === 'all'
    ? PUNE_EVENTS
    : PUNE_EVENTS.filter((e) => e.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-8 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-emerald-500/5 dark:from-stone-900/90 dark:via-stone-900/50 dark:to-stone-950 rounded-3xl border border-orange-200/80 dark:border-stone-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-xs">
              <CalendarIcon className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
              {language === 'mr' ? 'पुणे इव्हेंट्स कॅलेंडर' : 'Pune Events Calendar'}
            </h2>
            <span className="text-xs px-2.5 py-0.5 font-bold rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
              Google Calendar API
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {language === 'mr'
              ? 'भीमथडी जत्रा, गणेश विसर्जन मिरवणूक, मनपा नागरी सभा व सवाई गंधर्व महोत्सव'
              : 'Live sync with Pune cultural festivals, Bhimthadi Jatra, PMC citizen townhalls & music events.'}
          </p>
        </div>

        {/* Add to Google Calendar Master Action */}
        <a
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pune+Cultural+Events+Schedule&details=Punecha+Smart+Mitra+Events"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-emerald-600 hover:from-orange-700 hover:to-emerald-700 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'mr' ? 'कॅलेंडरमध्ये जोडा' : 'Add to Google Calendar'}</span>
        </a>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-orange-300'
            }`}
          >
            {language === 'mr' ? cat.labelMr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-5 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200/90 dark:border-stone-800 shadow-xs hover:shadow-lg hover:border-orange-400 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Date & Tag */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{evt.dateStr}</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                  {evt.ticketInfo}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                {language === 'mr' ? evt.titleMr : evt.titleEn}
              </h3>

              {/* Location & Time */}
              <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 mb-3 bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{evt.timeStr}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{language === 'mr' ? evt.locationMr : evt.locationEn}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3 mb-4">
                {language === 'mr' ? evt.descriptionMr : evt.descriptionEn}
              </p>
            </div>

            {/* Calendar Link Button */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span className="text-[11px] font-medium text-stone-400">
                Google Calendar Sync
              </span>
              <a
                href={evt.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span>{language === 'mr' ? 'कॅलेंडर सेव्ह' : 'Save Event'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
