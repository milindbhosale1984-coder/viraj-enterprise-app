import React, { useState } from 'react';
import {
  Music,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Newspaper,
  Volume2,
  Calendar,
  Radio,
  Share2,
} from 'lucide-react';
import { Language } from '../data/translations';
import { GANPATI_SONGS, PUNE_NEWS_FEED, GanpatiSong } from '../data/entertainmentData';

interface EntertainmentViewProps {
  language: Language;
}

export const EntertainmentView: React.FC<EntertainmentViewProps> = ({ language }) => {
  const [activeSong, setActiveSong] = useState<GanpatiSong>(GANPATI_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectSong = (song: GanpatiSong) => {
    setActiveSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-700 via-pink-800 to-purple-950 text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-semibold mb-3">
            <Music className="w-3.5 h-3.5 text-pink-200" />
            <span>{language === 'mr' ? 'पुणेरी मनोरंजन व बातम्या' : 'Pune Cultural Entertainment & News'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {language === 'mr' ? 'गणेश उत्सव गीते, आरत्या व ताज्या बातम्या' : 'Ganpati Songs, Aartis & Live Pune RSS'}
          </h1>
          <p className="text-xs sm:text-sm text-pink-100/90 leading-relaxed">
            {language === 'mr'
              ? 'पुण्यातील पारंपरिक गणेशोत्सवाची महाआरती, लोकप्रिय भक्तिगीते आणि सकाळ, लोकसत्ता व मटाच्या ताज्या पुणे बातम्या एकाच ठिकाणी.'
              : 'Listen to iconic Ganpati Aartis and read live breaking news streams from Sakal, Loksatta & Maharashtra Times.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Ganesh Utsav Songs Player (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                ॐ
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100">
                {language === 'mr' ? 'गणपती बाप्पा आरत्या व भक्तिगीते' : 'Ganesh Utsav Songs & Aartis'}
              </h2>
            </div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
              ५ प्रसिद्ध गीते
            </span>
          </div>

          {/* Active Song Player Card / Video Embed */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md overflow-hidden">
            {/* YouTube Embed Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-black">
              {isPlaying ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeSong.youtubeId}?autoplay=1`}
                  title={activeSong.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={activeSong.thumbnail}
                    alt={activeSong.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute w-16 h-16 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Currently Playing Info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 mb-1">
                  {activeSong.singerMr || activeSong.singer}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  {language === 'mr' ? activeSong.titleMr : activeSong.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {activeSong.descriptionMr}
                </p>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${activeSong.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 text-xs font-bold shrink-0 flex items-center gap-1"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Playlist List */}
          <div className="space-y-2.5">
            {GANPATI_SONGS.map((song) => {
              const isSelected = activeSong.id === song.id;

              return (
                <div
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-950 dark:text-orange-100 shadow-xs'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-orange-600 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Volume2 className="w-4 h-4 animate-pulse" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold truncate">
                        {language === 'mr' ? song.titleMr : song.title}
                      </h4>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 truncate block">
                        {song.singerMr} · {song.duration}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-stone-400 shrink-0">
                    {song.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Live News RSS Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100">
                {language === 'mr' ? 'पुणे थेट बातम्या (RSS Feeds)' : 'Pune Breaking News'}
              </h2>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold">
              Live
            </span>
          </div>

          <div className="space-y-3.5">
            {PUNE_NEWS_FEED.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 sm:p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-2xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    {item.sourceLogo}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {item.timeAgo}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                  {language === 'mr' ? item.titleMr : item.title}
                </h3>

                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed mb-3">
                  {language === 'mr' ? item.snippetMr : item.snippet}
                </p>

                <div className="flex items-center justify-between text-xs text-blue-600 font-bold pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span>{language === 'mr' ? 'संपूर्ण बातमी वाचा' : 'Read Full Story'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
