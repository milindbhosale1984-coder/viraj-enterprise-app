import React, { useState, useEffect } from 'react';
import { CloudSun, ArrowRight } from 'lucide-react';

interface WeatherWidgetProps {
  onClick?: () => void;
  className?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onClick, className = '' }) => {
  const [temp, setTemp] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem('pune_cached_temp');
      if (cached) return Number(cached);
    } catch {}
    return 28;
  });
  const [icon, setIcon] = useState('🌤️');

  useEffect(() => {
    let isMounted = true;
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,weather_code&timezone=Asia%2FKolkata'
    )
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data?.current?.temperature_2m != null) {
          const t = Math.round(data.current.temperature_2m);
          setTemp(t);
          try {
            localStorage.setItem('pune_cached_temp', t.toString());
          } catch {}
          const code = data.current.weather_code;
          if (code === 0) setIcon('☀️');
          else if (code <= 3) setIcon('🌤️');
          else if (code >= 51 && code <= 65) setIcon('🌧️');
          else if (code >= 80) setIcon('⛈️');
          else setIcon('⛅');
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-stone-900/90 dark:bg-stone-900 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-stone-200 hover:text-white shadow-xs transition-all cursor-pointer group text-xs font-semibold ${className}`}
      title="View 5-Day Live Pune Weather Forecast"
    >
      <span className="text-sm">{icon}</span>
      <span className="text-amber-400 font-bold">Pune</span>
      <span>{temp != null ? `${temp}°C` : '28°C'}</span>
      <span className="hidden sm:inline-block text-[10px] text-stone-400 font-normal">
        • Live Forecast
      </span>
      <ArrowRight className="w-3 h-3 text-[#D4AF37] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
    </button>
  );
};
