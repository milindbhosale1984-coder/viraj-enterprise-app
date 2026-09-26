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
  CheckCircle,
} from 'lucide-react';
import { PUNE_EVENTS } from '../data/puneEvents';
import { PuneCalendarEvent } from '../types';
import { Language } from '../data/translations';

interface PuneEventsViewProps {
  language: Language;
}

export const PuneEventsView: React.FC<PuneEventsViewProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelMr: 'सर्व कार्यक्रम', labelEn: 'All Events' },
    { id: 'exhibition', labelMr: 'जत्रा व प्रदर्शन (भीमथडी)', labelEn: 'Bhimthadi & Expos' },
    { id: 'festival', labelMr: 'उत्सव (पुणे गणेशोत्सव)', labelEn: 'Ganesh Festival' },
    { id: 'cultural', labelMr: 'शास्त्रीय संगीत (सवाई गंधर्व)', labelEn: 'Sawai Gandharva Music' },
    { id: 'civic', labelMr: 'मनपा नागरी सभा (PMC Meetings)', labelEn: 'PMC Civic Meetings' },
    { id: 'sports', labelMr: 'क्रीडा (पुणे मॅरेथॉन)', labelEn: 'Pune Marathon' },
  ];

  const filteredEvents = activeCategory === 'all'
    ? PUNE_EVENTS
    : PUNE_EVENTS.filter((e) => e.category === activeCategory);

  const handleAddEventToGoogleCalendar = (event: PuneCalendarEvent) => {
    const title = encodeURIComponent(language === 'mr' ? event.titleMr : event.titleEn);
    const details = encodeURIComponent(
      `${language === 'mr' ? event.descriptionMr : event.descriptionEn}\nTicket: ${event.ticketInfo}\nPowered by Pune AI Agent`
    );
    const location = encodeURIComponent(language === 'mr' ? event.locationMr : event.locationEn);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-fuchsia-800 via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-fuchsia-200 text-xs font-bold mb-3 border border-white/20">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पुणे महोत्सव व गुगल कॅलेंडर' : 'Pune Festivals & Google Calendar'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-devanagari-hero">
            {language === 'mr' ? 'पुण्यातील आगामी उत्सव, जत्रा व कार्यक्रम' : 'Upcoming Pune Festivals, Jatra & Events'}
          </h1>
          <p className="text-xs sm:text-sm text-fuchsia-100 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'भीमथडी जत्रा, मानाचे ५ गणपती विसर्जन, सवाई गंधर्व संगीत महोत्सव, पुणे आंतरराष्ट्रीय चित्रपट महोत्सव (PIFF) आणि मनपा नागरी बैठका.'
              : 'Direct sync with iconic Pune cultural landmarks: Bhimthadi Jatra, Ganesh Visarjan, Sawai Gandharva Classical Festival and PMC public sessions.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-fuchsia-700 text-white shadow-sm ring-1 ring-fuchsia-400'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-100'
            }`}
          >
            {language === 'mr' ? cat.labelMr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filteredEvents.map((event) => (
          <article
            key={event.id}
            className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-fuchsia-400 dark:hover:border-fuchsia-500/60 p-5 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-fuchsia-100 dark:bg-fuchsia-950 text-fuchsia-800 dark:text-fuchsia-300 font-mono">
                  {event.dateStr}
                </span>
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{event.timeStr}</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mb-1.5">
                {language === 'mr' ? event.titleMr : event.titleEn}
              </h3>

              <div className="flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-300 mb-3">
                <MapPin className="w-3.5 h-3.5 text-fuchsia-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{language === 'mr' ? event.locationMr : event.locationEn}</span>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed mb-4">
                {language === 'mr' ? event.descriptionMr : event.descriptionEn}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                {event.ticketInfo}
              </span>

              <button
                onClick={() => handleAddEventToGoogleCalendar(event)}
                className="px-3 py-1.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-700 hover:to-purple-800 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Add to Google Calendar"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'कॅलेंडरमध्ये जोडा' : 'Add to Calendar'}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
