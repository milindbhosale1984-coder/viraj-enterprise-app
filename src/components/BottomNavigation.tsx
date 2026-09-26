import React from 'react';
import {
  Home,
  Trophy,
  Bot,
  QrCode,
  Building2,
  Users,
  Sparkles,
  Calendar,
  CloudSun,
} from 'lucide-react';
import { FaWhatsapp, FaNewspaper } from 'react-icons/fa';
import { AppView } from './Header';

interface BottomNavigationProps {
  activeView: AppView;
  onChangeView: (view: AppView) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeView,
  onChangeView,
}) => {
  const navItems = [
    {
      id: 'places' as AppView,
      label: 'Home',
      labelMr: 'मुख्य',
      icon: Home,
    },
    {
      id: 'news' as AppView,
      label: 'News',
      labelMr: 'बातम्या',
      icon: FaNewspaper,
      live: true,
    },
    {
      id: 'cricket' as AppView,
      label: 'Cricket',
      labelMr: 'क्रिकेट',
      icon: Trophy,
    },
    {
      id: 'ai_chat' as AppView,
      label: 'AI Chat',
      labelMr: 'AI चॅट',
      icon: Bot,
      highlight: true,
    },
    {
      id: 'bank_info' as AppView,
      label: 'Bank Info',
      labelMr: 'बँक माहिती',
      icon: Building2,
    },
    {
      id: 'social' as AppView,
      label: 'Social',
      labelMr: 'सोशल',
      icon: Users,
    },
  ];

  return (
    <nav
      id="bottom-app-navigation-bar"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d10]/95 backdrop-blur-lg border-t-2 border-[#D4AF37] shadow-[0_-8px_25px_rgba(0,0,0,0.7)] pb-safe"
    >
      <div className="max-w-2xl mx-auto px-2 sm:px-4 flex items-center justify-around h-16 sm:h-18">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer group ${
                isActive
                  ? 'text-[#D4AF37] font-black scale-105'
                  : 'text-stone-400 hover:text-stone-200 hover:scale-100'
              }`}
            >
              {/* Active Golden Glow Underline */}
              {isActive && (
                <span className="absolute -top-1.5 w-8 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
              )}

              {/* Icon Container */}
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 drop-shadow-[0_2px_8px_rgba(212,175,55,0.6)]' : 'group-hover:scale-105'
                  }`}
                />

                {/* Live pulsing dot for Cricket */}
                {item.live && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-stone-900 animate-ping" />
                )}
                {item.live && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-stone-900" />
                )}

                {/* Special AI spark badge */}
                {item.highlight && !isActive && (
                  <span className="absolute -top-1.5 -right-2 text-[8px] px-1 py-0.2 rounded-full bg-amber-400 text-stone-950 font-black">
                    AI
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight ${
                isActive ? 'text-[#D4AF37] font-black' : 'font-semibold'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
