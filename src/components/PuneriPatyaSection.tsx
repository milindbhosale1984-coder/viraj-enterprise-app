import React, { useState } from 'react';
import { Quote, Sparkles, MapPin, Copy, Check } from 'lucide-react';
import { PUNERI_PATYA } from '../data/puneData';
import { Language, translations } from '../data/translations';

interface PuneriPatyaSectionProps {
  language: Language;
}

export const PuneriPatyaSection: React.FC<PuneriPatyaSectionProps> = ({ language }) => {
  const t = translations[language];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-emerald-500/10 dark:from-stone-900 dark:via-stone-900/60 dark:to-stone-950 rounded-3xl border border-orange-200/80 dark:border-stone-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-orange-600 text-white shadow-xs">
              <Quote className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
              {t.puneriPatyaTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            {t.puneriPatyaSubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-stone-800 border border-orange-300 dark:border-stone-700 text-xs font-bold text-orange-700 dark:text-orange-400 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>सदाशिव पेठी संस्कृती</span>
        </div>
      </div>

      {/* Grid of Puneri Patya */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PUNERI_PATYA.map((patya) => (
          <div
            key={patya.id}
            className="p-5 rounded-2xl bg-white dark:bg-stone-850 border-2 border-orange-200 dark:border-stone-750 shadow-xs hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between relative group"
          >
            <div>
              {/* Header with Location */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                  {patya.titleMr}
                </span>
                <span className="text-[11px] text-stone-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {patya.location}
                </span>
              </div>

              {/* Puneri Quote */}
              <blockquote className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 leading-snug mb-3 font-devanagari-hero">
                "{patya.quoteMr}"
              </blockquote>

              {/* English Explanation */}
              <p className="text-xs text-stone-500 dark:text-stone-400 italic leading-relaxed">
                Meaning: {patya.meaningEn}
              </p>
            </div>

            {/* Copy Button */}
            <div className="pt-3 mt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
              <button
                onClick={() => handleCopy(patya.id, patya.quoteMr)}
                className="text-xs font-semibold text-stone-500 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 cursor-pointer"
                title="Copy Puneri Patya"
              >
                {copiedId === patya.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">कॉपी झाले!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>कॉपी करा</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
