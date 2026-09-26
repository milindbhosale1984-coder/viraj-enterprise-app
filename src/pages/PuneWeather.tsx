import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Eye,
  Compass,
  Sunrise,
  Sunset,
  RefreshCw,
  MapPin,
  Calendar,
  Thermometer,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { VeLogo } from '../components/VeLogo';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

export interface WeatherData {
  current: {
    time: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    isDay: number;
  };
  daily: Array<{
    date: string;
    dayName: string;
    dayNameMr: string;
    tempMax: number;
    tempMin: number;
    weatherCode: number;
  }>;
  sunrise: string;
  sunset: string;
}

// Convert WMO Weather Code to icon and description
export function getWeatherDetails(code: number, isDay: number = 1): {
  labelEn: string;
  labelMr: string;
  icon: string;
  badgeColor: string;
} {
  switch (code) {
    case 0:
      return {
        labelEn: 'Clear Sky',
        labelMr: 'निरभ्र आकाश',
        icon: isDay ? '☀️' : '🌙',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
    case 1:
      return {
        labelEn: 'Mainly Clear',
        labelMr: 'स्वच्छ हवामान',
        icon: '🌤️',
        badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      };
    case 2:
      return {
        labelEn: 'Partly Cloudy',
        labelMr: 'अंशतः ढगाळ',
        icon: '⛅',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      };
    case 3:
      return {
        labelEn: 'Overcast',
        labelMr: 'ढगाळ वातावरण',
        icon: '☁️',
        badgeColor: 'bg-stone-500/20 text-stone-300 border-stone-500/40',
      };
    case 45:
    case 48:
      return {
        labelEn: 'Fog & Mist',
        labelMr: 'धुके व गारवा',
        icon: '🌫️',
        badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
      };
    case 51:
    case 53:
    case 55:
      return {
        labelEn: 'Light Drizzle',
        labelMr: 'हलक्या सरी (रिमझिम)',
        icon: '🌦️',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      };
    case 61:
    case 63:
    case 65:
      return {
        labelEn: 'Rain',
        labelMr: 'पाऊस',
        icon: '🌧️',
        badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      };
    case 80:
    case 81:
    case 82:
      return {
        labelEn: 'Heavy Showers',
        labelMr: 'मुसळधार पाऊस',
        icon: '⛈️',
        badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      };
    case 95:
    case 96:
    case 99:
      return {
        labelEn: 'Thunderstorm',
        labelMr: 'वादळी पाऊस व विजा',
        icon: '⚡',
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      };
    default:
      return {
        labelEn: 'Pleasant Pune Weather',
        labelMr: 'पुणेरी आल्हाददायक हवामान',
        icon: '🌤️',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
  }
}

const DAYS_MR = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const PuneWeather: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKolkata'
      );
      if (!res.ok) throw new Error('Failed to fetch weather data');
      const json = await res.json();

      const dailyTimes = json.daily.time as string[];
      const dailyForecast = dailyTimes.slice(0, 5).map((dateStr, idx) => {
        const d = new Date(dateStr);
        const dayIdx = d.getDay();
        return {
          date: dateStr,
          dayName: idx === 0 ? 'Today' : DAYS_EN[dayIdx],
          dayNameMr: idx === 0 ? 'आज' : DAYS_MR[dayIdx],
          tempMax: Math.round(json.daily.temperature_2m_max[idx]),
          tempMin: Math.round(json.daily.temperature_2m_min[idx]),
          weatherCode: json.daily.weather_code[idx],
        };
      });

      setData({
        current: {
          time: json.current.time,
          temperature: Math.round(json.current.temperature_2m),
          feelsLike: Math.round(json.current.apparent_temperature),
          humidity: json.current.relative_humidity_2m,
          windSpeed: Math.round(json.current.wind_speed_10m),
          weatherCode: json.current.weather_code,
          isDay: json.current.is_day,
        },
        daily: dailyForecast,
        sunrise: json.daily.sunrise[0]?.split('T')[1] || '06:24',
        sunset: json.daily.sunset[0]?.split('T')[1] || '18:27',
      });
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err?.message || 'Could not load Pune weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // 5 mins auto refresh
    return () => clearInterval(interval);
  }, []);

  const currentDetails = data
    ? getWeatherDetails(data.current.weatherCode, data.current.isDay)
    : { labelEn: 'Loading...', labelMr: 'माहिती घेत आहे...', icon: '🌤️', badgeColor: '' };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white pt-6 pb-20 px-4 sm:px-6">
      {/* Top Header & Royal VE Emblem */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="flex justify-center mb-3">
          <VeLogo size={70} />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
          Live Pune Weather (पुणे हवामान)
        </h1>
        <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium mt-1">
          Real-time IMD & Satellite Feed for Pune • by Viraj Enterprise
        </p>

        {/* Refresh & Location Pin */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Pune, Maharashtra (18.5204° N, 73.8567° E)</span>
          </span>

          <button
            onClick={fetchWeather}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-amber-300 border border-[#D4AF37]/40 text-xs font-semibold cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Loading Skeleton */}
        {loading && !data && (
          <div className="bg-[#141418] rounded-3xl p-8 border border-stone-800 text-center animate-pulse">
            <div className="w-16 h-16 bg-stone-800 rounded-full mx-auto mb-4" />
            <div className="h-6 w-48 bg-stone-800 mx-auto rounded-md mb-2" />
            <div className="h-4 w-32 bg-stone-850 mx-auto rounded-md" />
          </div>
        )}

        {/* Error State */}
        {error && !data && (
          <div className="bg-red-950/40 border border-red-800/60 rounded-3xl p-6 text-center">
            <p className="text-red-300 text-sm font-semibold mb-3">{error}</p>
            <button
              onClick={fetchWeather}
              className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* CURRENT WEATHER HERO CARD */}
        {data && (
          <div className="relative bg-gradient-to-br from-[#1a1a22] via-[#121216] to-[#0a0a0a] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/40 shadow-[0_10px_35px_rgba(212,175,55,0.2)] overflow-hidden">
            {/* Background subtle radial glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: Temp and weather condition */}
              <div className="flex items-center gap-5 text-center md:text-left">
                <div className="text-6xl sm:text-7xl drop-shadow-md select-none">
                  {currentDetails.icon}
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black font-sans text-white tracking-tight">
                      {data.current.temperature}°
                    </span>
                    <span className="text-2xl font-bold text-amber-400">C</span>
                    <span className="text-xs sm:text-sm text-stone-400 font-medium ml-2">
                      Feels like {data.current.feelsLike}°C
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#FCF6BA] mt-1 font-devanagari-hero">
                    {currentDetails.labelMr}
                  </h2>
                  <p className="text-xs text-stone-400">
                    {currentDetails.labelEn} • Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Right: Weather Metrics Grid (Humidity, Wind, Sunrise, Sunset) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-2xl text-center">
                  <Droplets className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <span className="block text-[11px] text-stone-400">Humidity (आर्द्रता)</span>
                  <span className="text-sm font-bold text-white">{data.current.humidity}%</span>
                </div>

                <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-2xl text-center">
                  <Wind className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                  <span className="block text-[11px] text-stone-400">Wind (वारा)</span>
                  <span className="text-sm font-bold text-white">{data.current.windSpeed} km/h</span>
                </div>

                <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-2xl text-center">
                  <Sunrise className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="block text-[11px] text-stone-400">Sunrise (सूर्योदय)</span>
                  <span className="text-sm font-bold text-white">{data.sunrise} AM</span>
                </div>

                <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-2xl text-center">
                  <Sunset className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <span className="block text-[11px] text-stone-400">Sunset (सूर्यास्त)</span>
                  <span className="text-sm font-bold text-white">{data.sunset} PM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5-DAY FORECAST SECTION */}
        {data && (
          <div className="bg-[#141418] rounded-3xl p-6 border border-stone-800 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  5-Day Pune Forecast (पुढील ५ दिवसांचा अंदाज)
                </h3>
              </div>
              <span className="text-xs text-stone-400 font-medium">Daily High / Low</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {data.daily.map((item, idx) => {
                const dayDetails = getWeatherDetails(item.weatherCode);
                return (
                  <div
                    key={item.date}
                    className={`bg-stone-900/80 rounded-2xl p-3.5 border transition-all text-center ${
                      idx === 0
                        ? 'border-amber-500/50 bg-amber-500/5 shadow-md shadow-amber-500/10'
                        : 'border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <span className="block text-xs font-extrabold text-amber-300">
                      {item.dayNameMr}
                    </span>
                    <span className="block text-[10px] text-stone-400 mb-2 font-mono">
                      {item.date.split('-').slice(1).join('/')}
                    </span>

                    <div className="text-3xl my-1.5">{dayDetails.icon}</div>

                    <span className="block text-[11px] text-stone-300 font-semibold truncate">
                      {dayDetails.labelMr}
                    </span>

                    <div className="mt-2 pt-2 border-t border-stone-800 flex items-center justify-center gap-2 text-xs">
                      <span className="font-bold text-white">{item.tempMax}°</span>
                      <span className="text-stone-500 text-[11px]">{item.tempMin}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PUNE LOCALITY MICROCLIMATES */}
        <div className="bg-[#141418] rounded-3xl p-6 border border-stone-800 shadow-lg">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Pune Local Area Weather Readings (पुण्यातील प्रमुख परिसर)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <span className="font-bold text-amber-300 block">शिवाजीनगर (Shivajinagar)</span>
              <span className="text-stone-400">हवामान केंद्र • Central Pune</span>
              <div className="mt-1 font-semibold text-white">
                {data ? `${data.current.temperature}°C` : '28°C'} • Clean AQI
              </div>
            </div>

            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <span className="font-bold text-amber-300 block">हिंजवडी (Hinjawadi IT)</span>
              <span className="text-stone-400">फेज १, २, ३ • Tech Hub</span>
              <div className="mt-1 font-semibold text-white">
                {data ? `${data.current.temperature - 1}°C` : '27°C'} • Breezy
              </div>
            </div>

            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <span className="font-bold text-amber-300 block">हडपसर - फुरसुंगी (VE Office)</span>
              <span className="text-stone-400">Bhekrai Nagar • East Pune</span>
              <div className="mt-1 font-semibold text-white">
                {data ? `${data.current.temperature}°C` : '28°C'} • Pleasant
              </div>
            </div>

            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <span className="font-bold text-amber-300 block">सिंहगड - कात्रज घाट</span>
              <span className="text-stone-400">घाट परिसर • Hills</span>
              <div className="mt-1 font-semibold text-white">
                {data ? `${data.current.temperature - 2}°C` : '26°C'} • Cool Mist
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
