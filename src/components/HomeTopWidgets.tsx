import React, { useState, useEffect } from 'react';
import {
  Trophy,
  CloudSun,
  Building2,
  Calendar,
  Radio,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { isBankOpenToday } from '../pages/BankInfo';

interface HomeTopWidgetsProps {
  onNavigate: (route: any) => void;
  className?: string;
}

export const HomeTopWidgets: React.FC<HomeTopWidgetsProps> = ({ onNavigate, className = '' }) => {
  const bankStatus = isBankOpenToday();
  const [cachedTemp, setCachedTemp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pune_cached_temp');
      return saved ? Number(saved) : 28;
    } catch {
      return 28;
    }
  });

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m&timezone=Asia%2FKolkata')
      .then((r) => r.json())
      .then((d) => {
        if (d?.current?.temperature_2m) {
          const t = Math.round(d.current.temperature_2m);
          setCachedTemp(t);
        }
      })
      .catch(() => {});
  }, []);

  const widgets = [
    {
      id: 'cricket',
      title: 'Cricket Live Score',
      titleMr: 'IPL २०२६ थेट स्कोअर',
      badge: 'LIVE',
      badgeColor: 'bg-red-600 text-white animate-pulse',
      sub: 'CSK vs MI • 168/5 (17.2 ov)',
      icon: Trophy,
      border: 'border-red-500/60 hover:border-red-400',
      bg: 'from-[#1c0d0f] to-[#12080a]',
      route: 'cricket',
    },
    {
      id: 'weather',
      title: 'Pune Weather',
      titleMr: 'पुणे हवामान',
      badge: `${cachedTemp}°C Live`,
      badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-500/40',
      sub: 'आल्हाददायक • 5-Day Forecast',
      icon: CloudSun,
      border: 'border-sky-500/60 hover:border-sky-400',
      bg: 'from-[#0b141d] to-[#070e14]',
      route: 'weather',
    },
    {
      id: 'bank',
      title: 'Aaj Bank Chalu?',
      titleMr: 'आज बँक चालू आहे का?',
      badge: bankStatus.isOpen ? 'होय (YES)' : 'नाही (NO)',
      badgeColor: bankStatus.isOpen
        ? 'bg-emerald-500 text-stone-950 font-black'
        : 'bg-red-600 text-white font-black',
      sub: bankStatus.isOpen ? '१०:०० AM - ४:०० PM • RBI' : 'साप्ताहिक/RBI सुट्टी',
      icon: Building2,
      border: bankStatus.isOpen
        ? 'border-emerald-500/60 hover:border-emerald-400'
        : 'border-red-500/60 hover:border-red-400',
      bg: bankStatus.isOpen ? 'from-[#0a180f] to-[#06100a]' : 'from-[#1a0a0c] to-[#120708]',
      route: 'bank_info',
    },
    {
      id: 'kalnirnay',
      title: 'Aajcha San (कालनिर्णय)',
      titleMr: 'सण व उत्सव २०२६',
      badge: 'पंचांग',
      badgeColor: 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40',
      sub: 'महाराष्ट्र सण, तिथी व शुभ मुहूर्त',
      icon: Calendar,
      border: 'border-[#D4AF37] hover:border-yellow-300',
      bg: 'from-[#1c1709] to-[#120f06]',
      route: 'kalnirnay',
    },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 ${className}`}>
      {/* Scrollable Horizontal Cards Grid */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {widgets.map((w) => {
          const Icon = w.icon;
          return (
            <div
              key={w.id}
              onClick={() => onNavigate(w.route)}
              className={`min-w-[240px] sm:min-w-[270px] flex-1 rounded-2xl bg-gradient-to-br ${w.bg} border-2 ${w.border} p-3.5 shadow-md hover:shadow-xl transition-all cursor-pointer select-none group snap-start flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-stone-900/90 text-amber-400 border border-stone-800">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-white truncate font-sans">
                    {w.title}
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${w.badgeColor} shrink-0`}>
                  {w.badge}
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 pt-1">
                <div>
                  <p className="text-[11px] text-amber-300 font-bold font-devanagari-hero truncate max-w-[190px]">
                    {w.titleMr}
                  </p>
                  <p className="text-[10px] text-stone-400 truncate max-w-[190px]">
                    {w.sub}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
