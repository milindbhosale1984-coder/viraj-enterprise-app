import React, { useState } from 'react';
import {
  Bell,
  X,
  AlertTriangle,
  Car,
  Fuel,
  Newspaper,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../data/translations';
import { PuneLiveNotification } from '../types';
import { AppView } from './Header';

interface LiveNotificationBellProps {
  language: Language;
  notifications: PuneLiveNotification[];
  onMarkAsRead: (id: string) => void;
  onNavigateView: (view: AppView) => void;
}

export const LiveNotificationBell: React.FC<LiveNotificationBellProps> = ({
  language,
  notifications,
  onMarkAsRead,
  onNavigateView,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'traffic':
        return <Car className="w-4 h-4 text-amber-500" />;
      case 'cng':
        return <Fuel className="w-4 h-4 text-emerald-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default:
        return <Newspaper className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        aria-label="Notifications"
        title="Live Pune Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center animate-pulse shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <h4 className="font-extrabold text-sm">
                {language === 'mr' ? 'थेट सूचना व अलर्ट्स' : 'Live Pune Notifications'}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 p-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  onMarkAsRead(notif.id);
                  if (notif.linkView) {
                    onNavigateView(notif.linkView as any);
                    setIsOpen(false);
                  }
                }}
                className={`p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 ${
                  notif.unread
                    ? 'bg-orange-50/70 dark:bg-orange-950/30 hover:bg-orange-100/60'
                    : 'hover:bg-stone-50 dark:hover:bg-stone-800/60 opacity-80'
                }`}
              >
                <div className="mt-0.5 p-2 rounded-xl bg-white dark:bg-stone-800 shadow-xs shrink-0">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h5 className="font-extrabold text-xs text-stone-900 dark:text-stone-100 truncate">
                      {language === 'mr' ? notif.titleMr : notif.title}
                    </h5>
                    <span className="text-[10px] text-stone-400 shrink-0 font-medium">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                    {language === 'mr' ? notif.bodyMr : notif.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
