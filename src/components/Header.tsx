import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Globe,
  PhoneCall,
  Sparkles,
  Map,
  FileSpreadsheet,
  PlusCircle,
  Train,
  Plane,
  Grid,
  Menu,
  X,
  Car,
  Calendar,
  TrainTrack,
  Users,
  Fuel,
  Flame,
  MessageSquare,
  Music,
  Rocket,
  QrCode,
  Cloud,
  Shield,
  BarChart3,
  Lock,
  Trophy,
  Bot,
  Building2,
  Banknote,
  Smartphone,
  HeartHandshake,
  Calculator,
  Navigation,
  ShoppingBag,
  Newspaper,
} from 'lucide-react';
import { Language, translations } from '../data/translations';
import { LiveNotificationBell } from './LiveNotificationBell';
import { VeLogo } from './VeLogo';
import { WeatherWidget } from './WeatherWidget';
import { PuneLiveNotification } from '../types';

export type AppView =
  | 'places'
  | 'news'
  | 'near_me'
  | 'pune_market'
  | 'loan'
  | 'mobile_loan'
  | 'yojana'
  | 'emi_calculator'
  | 'cricket'
  | 'ai_chat'
  | 'social'
  | 'qr_generator'
  | 'weather'
  | 'kalnirnay'
  | 'bank_info'
  | 'admin'
  | 'privacy'
  | 'metro'
  | 'leaders'
  | 'fuel'
  | 'services'
  | 'pulse'
  | 'entertainment'
  | 'traffic_map'
  | 'trains'
  | 'flights'
  | 'events';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenChat: () => void;
  onOpenSheetSync: () => void;
  onOpenPostAd: () => void;
  onOpenEmergency: () => void;
  activeView: AppView;
  onChangeView: (view: AppView) => void;
  notifications?: PuneLiveNotification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onOpenBoostModal?: (planId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  isDark,
  onToggleDark,
  onOpenChat,
  onOpenSheetSync,
  onOpenPostAd,
  onOpenEmergency,
  activeView,
  onChangeView,
  notifications = [],
  onMarkNotificationAsRead = () => {},
  onOpenBoostModal,
}) => {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'places' as AppView,
      labelEn: 'Directory',
      labelMr: 'सर्व ठिकाणे',
      icon: Grid,
      badge: 'Database',
    },
    {
      id: 'news' as AppView,
      labelEn: 'Pune News',
      labelMr: 'ताज्या बातम्या',
      icon: Newspaper,
      badge: 'LIVE',
    },
    {
      id: 'near_me' as AppView,
      labelEn: 'Near Me',
      labelMr: 'माझ्या जवळ',
      icon: Navigation,
      badge: 'GPS',
    },
    {
      id: 'pune_market' as AppView,
      labelEn: 'Pune Market',
      labelMr: 'बाजारपेठ',
      icon: ShoppingBag,
      badge: 'तुळशीबाग',
    },
    {
      id: 'loan' as AppView,
      labelEn: 'Bank Loan',
      labelMr: 'बँक कर्ज',
      icon: Banknote,
      badge: 'Apply',
    },
    {
      id: 'mobile_loan' as AppView,
      labelEn: 'Mobile Loan',
      labelMr: 'मोबाईल ॲप कर्ज',
      icon: Smartphone,
      badge: 'RBI',
    },
    {
      id: 'yojana' as AppView,
      labelEn: 'Sarkari Yojana',
      labelMr: 'सरकारी योजना',
      icon: HeartHandshake,
      badge: '₹1500',
    },
    {
      id: 'emi_calculator' as AppView,
      labelEn: 'EMI Calculator',
      labelMr: 'EMI कॅल्क्युलेटर',
      icon: Calculator,
      badge: 'Free',
    },
    {
      id: 'cricket' as AppView,
      labelEn: 'Cricket Live',
      labelMr: 'क्रिकेट स्कोअर',
      icon: Trophy,
      badge: 'LIVE',
    },
    {
      id: 'ai_chat' as AppView,
      labelEn: 'AI Chat',
      labelMr: 'AI चॅट',
      icon: Bot,
      badge: 'ChatGPT',
    },
    {
      id: 'qr_generator' as AppView,
      labelEn: 'QR Generator',
      labelMr: 'क्यूआर कोड',
      icon: QrCode,
      badge: 'Free',
    },
    {
      id: 'weather' as AppView,
      labelEn: 'Pune Weather',
      labelMr: 'पुणे हवामान',
      icon: Cloud,
      badge: 'Live',
    },
    {
      id: 'bank_info' as AppView,
      labelEn: 'Bank Holiday',
      labelMr: 'बँक माहिती',
      icon: Building2,
      badge: 'RBI',
    },
    {
      id: 'kalnirnay' as AppView,
      labelEn: 'Kalnirnay',
      labelMr: 'कालनिर्णय सण',
      icon: Calendar,
      badge: '2026',
    },
    {
      id: 'social' as AppView,
      labelEn: 'Social Hub',
      labelMr: 'सोशल हब',
      icon: Users,
      badge: 'Connect',
    },
    {
      id: 'fuel' as AppView,
      labelEn: 'Live CNG/Fuel',
      labelMr: 'सीएनजी / पेट्रोल',
      icon: Fuel,
      badge: 'Live',
    },
    {
      id: 'metro' as AppView,
      labelEn: 'Pune Metro',
      labelMr: 'पुणे मेट्रो',
      icon: TrainTrack,
      badge: 'Purple & Aqua',
    },
    {
      id: 'services' as AppView,
      labelEn: 'Gas & LIC',
      labelMr: 'गॅस व विमा',
      icon: Flame,
      badge: 'Civic',
    },
    {
      id: 'pulse' as AppView,
      labelEn: 'Pune Pulse',
      labelMr: 'पुणे पल्स',
      icon: MessageSquare,
      badge: 'Feed',
    },
    {
      id: 'entertainment' as AppView,
      labelEn: 'Songs & News',
      labelMr: 'मनोरंजन व बातम्या',
      icon: Music,
      badge: 'Aarti',
    },
    {
      id: 'leaders' as AppView,
      labelEn: 'Leaders',
      labelMr: 'लोकप्रतिनिधी',
      icon: Users,
      badge: 'PMC',
    },
    {
      id: 'traffic_map' as AppView,
      labelEn: 'Traffic',
      labelMr: 'ट्रॅफिक',
      icon: Car,
      badge: 'Live',
    },
    {
      id: 'events' as AppView,
      labelEn: 'Events',
      labelMr: 'उत्सव',
      icon: Calendar,
      badge: 'Jatra',
    },
    {
      id: 'admin' as AppView,
      labelEn: 'Admin Panel',
      labelMr: 'ॲडमिन',
      icon: BarChart3,
      badge: 'Stats',
    },
    {
      id: 'privacy' as AppView,
      labelEn: 'Privacy',
      labelMr: 'गोपनीयता',
      icon: Lock,
      badge: 'Safe',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 text-white backdrop-blur-md border-b border-[#D4AF37]/30 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] sm:h-[68px]">
          {/* Logo & Viraj Enterprise Branding */}
          <div
            onClick={() => onChangeView('places')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="relative flex items-center justify-center">
              <VeLogo size={42} className="shrink-0" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-serif">
                  VIRAJ ENTERPRISE
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 rounded shadow-xs uppercase tracking-wider">
                  PUNE
                </span>
              </div>
              <p className="text-[10px] text-amber-300 font-medium truncate max-w-[160px] sm:max-w-none">
                {t.appSubtitle} · <span className="text-stone-400">AI Super App</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-stone-900/90 p-1 rounded-2xl border border-stone-800">
            {navItems.slice(0, 8).map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeView(item.id)}
                  className={`flex items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? item.labelMr : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Live Weather Widget on Top Header */}
            <WeatherWidget
              onClick={() => onChangeView('weather')}
              className="hidden md:inline-flex"
            />

            {/* Quick QR Generator Shortcut button */}
            <button
              onClick={() => onChangeView('qr_generator')}
              className="hidden lg:inline-flex items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-bold bg-stone-850 hover:bg-stone-800 border border-[#D4AF37]/30 text-amber-300 transition-all cursor-pointer"
              title="Generate Instant QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'QR कोड' : 'QR Code'}</span>
            </button>

            {/* Admin Analytics Shortcut */}
            <button
              onClick={() => onChangeView('admin')}
              className="hidden lg:inline-flex items-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-amber-300 transition-all cursor-pointer"
              title="Admin Analytics Dashboard"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'ॲडमिन' : 'Admin'}</span>
            </button>

            {/* Boost Business CTA */}
            {onOpenBoostModal && (
              <button
                onClick={() => onOpenBoostModal('top_search')}
                className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-extrabold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 shadow-xs transition-all cursor-pointer"
                title="Boost Your Business (₹499)"
              >
                <Rocket className="w-3.5 h-3.5 text-stone-950" />
                <span>{language === 'mr' ? 'बूस्ट करा (₹४९९)' : 'Boost (₹499)'}</span>
              </button>
            )}

            {/* Notification Bell */}
            <LiveNotificationBell
              language={language}
              notifications={notifications}
              onMarkAsRead={onMarkNotificationAsRead}
              onNavigateView={onChangeView}
            />

            {/* Emergency SOS Button */}
            <button
              onClick={onOpenEmergency}
              className="inline-flex items-center gap-1 py-1.5 px-2 sm:px-2.5 text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer"
              title="112 / 108 Emergency Dial"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'mr' ? 'आपत्कालीन' : 'SOS'}</span>
              <span className="text-[10px] bg-red-800 px-1 py-0.2 rounded font-mono">112</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 py-1.5 px-2 text-xs font-bold rounded-xl bg-stone-900 text-amber-300 hover:bg-stone-850 transition-colors border border-[#D4AF37]/30 cursor-pointer"
              title="Toggle Marathi / English"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'EN' : 'मराठी'}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2 text-stone-200 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-stone-800 space-y-3 animate-in slide-in-from-top-2 duration-200 bg-stone-950/98 px-2 rounded-b-2xl">
            {/* Mobile Weather banner */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-[#D4AF37]/30">
              <WeatherWidget onClick={() => { onChangeView('weather'); setMobileMenuOpen(false); }} />
              <span className="text-[11px] text-amber-300 font-semibold">Live Pune Updates</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onChangeView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-xs'
                        : 'bg-stone-900 text-stone-200 hover:bg-stone-850'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-amber-400" />
                    <span className="truncate">{language === 'mr' ? item.labelMr : item.labelEn}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800">
              {onOpenBoostModal && (
                <button
                  onClick={() => {
                    onOpenBoostModal('top_search');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-500"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'बूस्ट करा (₹४९९)' : 'Boost (₹499)'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  onOpenPostAd();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-stone-200 bg-stone-900 border border-stone-800 hover:border-amber-400/40"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'जाहिरात (₹४९९)' : 'Post Ad (₹499)'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
