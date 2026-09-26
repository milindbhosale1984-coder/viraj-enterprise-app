import React from 'react';
import { Search, MapPin, X, Sparkles, Navigation, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { PUNE_AREAS, AreaOption } from '../data/puneData';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedArea: string;
  onAreaChange: (area: string) => void;
  language: Language;
  totalResults: number;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedArea,
  onAreaChange,
  language,
  totalResults,
}) => {
  const t = translations[language];

  const quickPicks = language === 'mr'
    ? ['दगडूशेठ गणपती', 'शनिवार वाडा', 'वैशाली एफसी रोड', 'चितळे बाकरवडी', 'रुबी हॉल', 'पुणे आरटीओ', 'सिंहगड', 'डायल ११२']
    : ['Dagdusheth Ganpati', 'Shaniwar Wada', 'Vaishali FC Road', 'Chitale Bakarwadi', 'Ruby Hall', 'Pune RTO', 'Sinhagad Fort', 'Emergency 112'];

  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-stone-50 dark:from-stone-900 dark:via-stone-900/80 dark:to-stone-950 border-b border-orange-100 dark:border-stone-800">
      {/* Decorative Puneri background glow circles */}
      <div
        className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-orange-400/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Cultural Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-orange-100/80 dark:bg-orange-950/60 border border-orange-300/60 dark:border-orange-800 text-orange-800 dark:text-orange-300 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span>विद्येचे माहेरघर · ऐतिहासिक आणि आधुनिक पुण्याचा डिजिटल साथीदार</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 mb-3 font-devanagari-hero">
          <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent">
            {language === 'mr' ? 'पुण्यातील काहीही शोधा...' : 'Search Anything in Pune...'}
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 dark:text-stone-300 mb-8 font-medium">
          {language === 'mr'
            ? 'मंदिरे, ऐतिहासिक वास्तू, नामांकित हॉटेल्स, सुपर-स्पेशालिटी हॉस्पिटल्स, शाळा-कॉलेजेस, सरकारी कचेऱ्या, शोरूम्स व आपत्कालीन सेवा एकाच ठिकाणी!'
            : 'Explore historic temples, iconic eateries, premier hospitals, heritage colleges, PMC offices, brand stores & emergency desks with verified Pune info.'}
        </p>

        {/* Big Search Input Container */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-stone-900 rounded-2xl shadow-xl shadow-orange-950/5 dark:shadow-black/40 border-2 border-orange-500/60 dark:border-orange-500/40 p-2 sm:p-2.5 transition-all focus-within:ring-4 focus-within:ring-orange-500/20 focus-within:border-orange-600">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-orange-600 dark:text-orange-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full py-3 pl-3 pr-9 text-base sm:text-lg bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Area Filter Dropdown */}
            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-stone-200 dark:border-stone-800 pt-2 sm:pt-0 sm:pl-3">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 hidden sm:inline" />
              <select
                value={selectedArea}
                onChange={(e) => onAreaChange(e.target.value)}
                className="w-full sm:w-44 py-2.5 px-3 text-sm font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-none focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                aria-label={t.filterByArea}
              >
                {PUNE_AREAS.map((area: AreaOption) => (
                  <option key={area.en} value={area.en}>
                    {language === 'mr' ? area.mr : area.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1 flex items-center gap-1">
            <Navigation className="w-3 h-3 text-orange-500" />
            {language === 'mr' ? 'पुणेरी शिफारसी:' : 'Popular Spots:'}
          </span>
          {quickPicks.map((pick) => (
            <button
              key={pick}
              onClick={() => onSearchChange(pick)}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 dark:bg-stone-800/80 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-700 transition-colors shadow-2xs"
            >
              {pick}
            </button>
          ))}
        </div>

        {/* Search Privacy & Legal Compliance Note */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            {language === 'mr'
              ? 'फक्त ठिकाणाचे नाव व परिसर शोध • गोपनीयता व सुरक्षिततेसाठी मालकाचा वैयक्तिक शोध वगळला आहे'
              : 'Place Name & Area Search Only • Private individual searching disabled per privacy regulations'}
          </span>
        </div>

        {/* Results Counter Note */}
        <div className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
          {totalResults} {t.resultsFound}
        </div>
      </div>
    </section>
  );
};
