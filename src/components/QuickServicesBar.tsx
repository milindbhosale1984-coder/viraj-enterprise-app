import React from 'react';
import { ShoppingBag, Truck, Car, ExternalLink, Zap } from 'lucide-react';
import { Language } from '../data/translations';

interface QuickServicesBarProps {
  language: Language;
}

export const QuickServicesBar: React.FC<QuickServicesBarProps> = ({ language }) => {
  const quickServices = [
    {
      id: 'blinkit',
      labelEn: 'Blinkit in 10 Mins',
      labelMr: 'ब्लिंकिट १० मिनिटांत किराणा',
      sub: 'Grocery & Essentials',
      url: 'https://blinkit.com/prn/pune',
      badge: '10 Mins',
      color: 'bg-amber-500 hover:bg-amber-600 text-stone-950',
    },
    {
      id: 'zepto',
      labelEn: 'Zepto Instant Delivery',
      labelMr: 'झेप्टो १० मिनिटे डिलिव्हरी',
      sub: 'Fruits & Veggies',
      url: 'https://www.zeptonow.com/',
      badge: 'Superfast',
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    {
      id: 'porter',
      labelEn: 'Book Porter (Shifting)',
      labelMr: 'पोर्टर - घर व साहित्य शिफ्टिंग',
      sub: 'Mini Truck & 2-Wheeler',
      url: 'https://porter.in/',
      badge: 'Best Rate',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      id: 'ola',
      labelEn: 'Book Ola Cab / Auto',
      labelMr: 'ओला कॅब व ऑटो बुक करा',
      sub: 'City Ride in Pune',
      url: 'https://book.olacabs.com/',
      badge: 'Instant',
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      id: 'uber',
      labelEn: 'Book Uber',
      labelMr: 'उबर कॅब / मोटो बुक करा',
      sub: 'Anywhere in Pune',
      url: 'https://m.uber.com/ul/',
      badge: '24x7',
      color: 'bg-stone-900 hover:bg-black text-white dark:bg-stone-800 dark:hover:bg-stone-700',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 p-3 rounded-2xl border border-orange-200/80 dark:border-stone-800 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-stone-900 dark:text-stone-100">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>
              {language === 'mr' ? 'पुणे सुपर सर्व्हिसेस (१० मिनिटे किराणा, शिफ्टिंग व कॅब)' : 'Instant Pune Services (Grocery, Shifting & Cabs)'}
            </span>
          </div>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium hidden sm:inline">
            Direct Deep Links
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {quickServices.map((svc) => (
            <a
              key={svc.id}
              href={svc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${svc.color}`}
            >
              <span>{language === 'mr' ? svc.labelMr : svc.labelEn}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/20 text-white font-mono">
                {svc.badge}
              </span>
              <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
