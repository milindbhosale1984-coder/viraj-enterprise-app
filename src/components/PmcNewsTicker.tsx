import React, { useState } from 'react';
import { Radio, AlertCircle, X, ChevronRight } from 'lucide-react';
import { PMC_NEWS } from '../data/puneData';
import { Language, translations } from '../data/translations';
import { PmcNewsItem } from '../types';

interface PmcNewsTickerProps {
  language: Language;
}

export const PmcNewsTicker: React.FC<PmcNewsTickerProps> = ({ language }) => {
  const t = translations[language];
  const [selectedNews, setSelectedNews] = useState<PmcNewsItem | null>(null);

  return (
    <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 text-white text-xs sm:text-sm py-2 px-3 sm:px-6 relative overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Live Badge */}
        <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-md shrink-0 border border-white/20 select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <Radio className="w-3.5 h-3.5 text-white animate-pulse hidden xs:inline" />
          <span className="font-bold tracking-wide uppercase text-[10px] sm:text-xs text-white">
            {t.newsTickerBadge}
          </span>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-hidden relative w-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-white/95">
            {PMC_NEWS.concat(PMC_NEWS).map((news, idx) => (
              <button
                key={`${news.id}-${idx}`}
                onClick={() => setSelectedNews(news)}
                className="inline-flex items-center gap-2 hover:underline focus:outline-hidden transition-opacity hover:opacity-90 cursor-pointer text-left"
              >
                {news.urgent && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                    Alert
                  </span>
                )}
                <span className="font-medium">
                  {language === 'mr' ? news.titleMr : news.titleEn}
                </span>
                <span className="text-amber-200 text-[11px] font-light">
                  ({language === 'mr' ? news.timeMr : news.timeEn})
                </span>
                <span className="text-white/40" aria-hidden="true">✦</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Detail Popup Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-stone-900 border border-orange-200 dark:border-stone-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1.5 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded">
                पुणे मनपा (PMC) अधिकृत
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {language === 'mr' ? selectedNews.timeMr : selectedNews.timeEn}
              </span>
            </div>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">
              {language === 'mr' ? selectedNews.titleMr : selectedNews.titleEn}
            </h3>

            <p className="text-sm text-stone-600 dark:text-stone-300 mb-5 leading-relaxed">
              {language === 'mr'
                ? 'पुणे महानगरपालिका (PMC) नागरिकांच्या सुलभतेसाठी विविध डिजिटल सेवा, स्मार्ट बस मार्ग आणि सवलती सुरू करत आहे. अधिक माहितीसाठी pmc.gov.in ला भेट द्या किंवा टोल-फ्री क्रमांक १८०० १०३० २२२ वर संपर्क साधा.'
                : 'Pune Municipal Corporation (PMC) continues citizen convenience initiatives including green transit, digitized tax portals, and infrastructure upgrades. For direct queries, visit pmc.gov.in or call 1800 1030 222.'}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 text-sm font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                {language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
              <a
                href="https://pmc.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <span>{language === 'mr' ? 'अधिकृत पोर्टल' : 'Official Portal'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
