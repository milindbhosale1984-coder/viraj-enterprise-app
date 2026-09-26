import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  PhoneCall,
  QrCode,
  Cloud,
  DollarSign,
  TrendingUp,
  BarChart3,
  Award,
  ArrowUpRight,
  Shield,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import {
  getAnalyticsStats,
  AnalyticsStats,
  saveAnalyticsStats,
  trackHotelSearch,
  trackWhatsAppClick,
  trackQRGenerated,
} from '../utils/analytics';
import { VIRAJ_ENTERPRISE_INFO, getSocialLinks, saveSocialLinks } from '../utils/constants';

interface AdminProps {
  onBack?: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onBack }) => {
  const [stats, setStats] = useState<AnalyticsStats>(getAnalyticsStats());
  const [admobBannerId, setAdmobBannerId] = useState(() => {
    return localStorage.getItem('ve_admob_banner_id') || 'ca-app-pub-3940256099942544/6300978111';
  });
  const [savedNotice, setSavedNotice] = useState(false);

  const refreshData = () => {
    setStats(getAnalyticsStats());
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 10000); // 10s auto update
    return () => clearInterval(interval);
  }, []);

  const handleSaveAdMob = () => {
    localStorage.setItem('ve_admob_banner_id', admobBannerId);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Calculate estimated legal monetization earnings
  const boostRevenue = Math.round((stats.totalHotelSearches * 0.08) * 499);
  const adRevenue = Math.round((stats.totalVisitors * 0.45));
  const totalRevenuePotential = boostRevenue + adRevenue;

  // Sorted list of popular hotels
  const sortedHotels = Object.entries(stats.popularHotels || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const maxHotelClicks = sortedHotels.length > 0 ? sortedHotels[0][1] : 1;

  // Simulate a test search for admin testing
  const simulateTestEvent = (hotelName: string) => {
    trackHotelSearch(hotelName, 'hotels');
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-stone-200 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div className="flex items-center gap-3.5">
            <VeLogo size={52} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                  Viraj Enterprise • Admin Dashboard
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-widest">
                  Live Analytics
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Owner: <strong className="text-amber-300">{VIRAJ_ENTERPRISE_INFO.owner}</strong> • 
                Bhekrai Nagar, Fursungi, Pune • WhatsApp: {VIRAJ_ENTERPRISE_INFO.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {onBack && (
              <button
                onClick={onBack}
                className="py-2 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-bold text-stone-300 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home Page</span>
              </button>
            )}

            <button
              onClick={refreshData}
              className="py-2 px-3.5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50 text-xs font-bold text-amber-300 cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Stats</span>
            </button>
          </div>
        </div>

        {/* 6 KEY METRICS KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* 1. Total Visitors */}
          <div className="bg-[#141419] p-4 rounded-2xl border border-stone-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Users</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                {stats.totalVisitors.toLocaleString()}
              </span>
              <span className="block text-[10px] text-emerald-400 font-semibold mt-0.5">
                ↑ Active City Traffic
              </span>
            </div>
          </div>

          {/* 2. Hotel Searches */}
          <div className="bg-[#141419] p-4 rounded-2xl border border-amber-500/30 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Hotel Searches</span>
              <Search className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-sans">
                {stats.totalHotelSearches.toLocaleString()}
              </span>
              <span className="block text-[10px] text-amber-400/80 font-semibold mt-0.5">
                Popularity Index
              </span>
            </div>
          </div>

          {/* 3. WhatsApp Clicks */}
          <div className="bg-[#141419] p-4 rounded-2xl border border-emerald-500/30 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">WhatsApp Clicks</span>
              <FaWhatsapp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans">
                {stats.totalWhatsAppClicks.toLocaleString()}
              </span>
              <span className="block text-[10px] text-stone-400 font-semibold mt-0.5">
                Direct to 9021745403
              </span>
            </div>
          </div>

          {/* 4. QR Generated */}
          <div className="bg-[#141419] p-4 rounded-2xl border border-stone-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">QR Codes</span>
              <QrCode className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                {stats.totalQRGenerated.toLocaleString()}
              </span>
              <span className="block text-[10px] text-stone-400 font-semibold mt-0.5">
                UPI & Locations
              </span>
            </div>
          </div>

          {/* 5. Weather Views */}
          <div className="bg-[#141419] p-4 rounded-2xl border border-stone-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Weather Views</span>
              <Cloud className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                {stats.totalWeatherViews.toLocaleString()}
              </span>
              <span className="block text-[10px] text-stone-400 font-semibold mt-0.5">
                Pune Forecast
              </span>
            </div>
          </div>

          {/* 6. Legal Monetization Value */}
          <div className="bg-gradient-to-br from-amber-950/70 to-stone-900 p-4 rounded-2xl border-2 border-[#D4AF37] shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-300 mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider">Est. Value</span>
              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">
                ₹{totalRevenuePotential.toLocaleString()}
              </span>
              <span className="block text-[10px] text-emerald-300 font-semibold mt-0.5">
                AdMob + ₹499 Boosts
              </span>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN SECTION: Popular Hotels Left, AdMob & Controls Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: Which Hotel is Popular Leaderboard */}
          <div className="lg:col-span-7 bg-[#141419] p-5 sm:p-6 rounded-3xl border border-stone-800 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Popular Hotels & Destinations (सर्वाधिक शोधलेली ठिकाणे)
                </h2>
              </div>
              <span className="text-xs text-amber-400/90 font-semibold">
                Ranked by Demand
              </span>
            </div>

            <p className="text-xs text-stone-400">
              This analytics data shows you exactly which hotels in Pune have the most visitor traffic. Contact these hotel owners to offer premium top listing for ₹499!
            </p>

            {/* Leaderboard Bars */}
            <div className="space-y-3.5 pt-1">
              {sortedHotels.map(([name, count], index) => {
                const percentage = Math.round((count / maxHotelClicks) * 100);
                return (
                  <div key={name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          index === 0
                            ? 'bg-amber-400 text-stone-950 shadow-xs'
                            : index === 1
                            ? 'bg-stone-300 text-stone-900'
                            : index === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-stone-800 text-stone-400'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="font-bold text-white text-sm">{name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-amber-300">{count} searches</span>
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(`Namaste, your hotel ${name} has high searches on Pune Super App. Would you like to sponsor the top banner for ₹499? - Viraj Enterprise`);
                            window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
                          }}
                          className="px-2 py-0.5 rounded-md bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[10px] font-bold border border-emerald-700/60 cursor-pointer"
                        >
                          Monetize ₹499
                        </button>
                      </div>
                    </div>

                    <div className="w-full bg-stone-900 rounded-full h-2.5 overflow-hidden border border-stone-800">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Test / Simulation Buttons */}
            <div className="pt-4 border-t border-stone-800">
              <span className="text-[11px] text-stone-400 block mb-2 font-semibold">
                ⚡ Simulate Real-Time Search Event (Admin Test):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => simulateTestEvent('Vaishali FC Road')}
                  className="px-2.5 py-1 rounded-lg text-xs bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700 cursor-pointer"
                >
                  +1 Vaishali
                </button>
                <button
                  onClick={() => simulateTestEvent('Goodluck Cafe')}
                  className="px-2.5 py-1 rounded-lg text-xs bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700 cursor-pointer"
                >
                  +1 Goodluck Cafe
                </button>
                <button
                  onClick={() => simulateTestEvent('Hotel Shreyas')}
                  className="px-2.5 py-1 rounded-lg text-xs bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700 cursor-pointer"
                >
                  +1 Hotel Shreyas
                </button>
                <button
                  onClick={() => simulateTestEvent('Kayani Bakery')}
                  className="px-2.5 py-1 rounded-lg text-xs bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700 cursor-pointer"
                >
                  +1 Kayani Bakery
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: AdMob Setup & Live Events Feed */}
          <div className="lg:col-span-5 space-y-6">
            {/* Google AdMob Placeholder Card */}
            <div className="bg-[#141419] p-5 sm:p-6 rounded-3xl border-2 border-dashed border-[#D4AF37]/50 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Google AdMob Placement
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Ready for Play Store
                </span>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                Home page contains the slot <strong className="text-stone-200">"Ad Space - Pune Hotels"</strong>.
                Enter your approved Google AdMob Banner Ad Unit ID below:
              </p>

              <div>
                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                  AdMob Banner Unit ID:
                </label>
                <input
                  type="text"
                  value={admobBannerId}
                  onChange={(e) => setAdmobBannerId(e.target.value)}
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY"
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-stone-600 focus:outline-hidden"
                />
              </div>

              <button
                onClick={handleSaveAdMob}
                className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 text-xs font-black transition-all cursor-pointer shadow-md"
              >
                {savedNotice ? '✓ Saved Ad Unit ID!' : 'Save AdMob Configuration'}
              </button>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-[#141419] p-5 rounded-3xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Event Stream
                </span>
                <span className="text-[10px] text-emerald-400 font-mono animate-pulse">
                  ● Real-time
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {(stats.recentEvents || []).map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-stone-200 block truncate">
                        {evt.label}
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono">
                        {evt.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono shrink-0">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
