import React from 'react';
import {
  Hotel,
  Utensils,
  Landmark,
  Hospital,
  GraduationCap,
  BookOpen,
  Building2,
  Building,
  ShoppingBag,
  Car,
  ShieldAlert,
  LayoutGrid,
  TrainTrack,
  Compass,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { PUNE_CATEGORIES } from '../data/puneData';
import { CategoryId } from '../types';
import { Language, translations } from '../data/translations';

interface CategoryCardsProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  language: Language;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Hotel,
  Utensils,
  Landmark,
  Hospital,
  GraduationCap,
  BookOpen,
  Building2,
  Building,
  ShoppingBag,
  Car,
  ShieldAlert,
  TrainTrack,
  Compass,
  Briefcase,
};

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  selectedCategory,
  onSelectCategory,
  language,
}) => {
  const t = translations[language];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Section Header with All filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-devanagari-hero">
              {language === 'mr' ? 'पुणे डेटाबेस किंग - सर्व प्रमुख वर्गवारी' : 'Pune Database King - Categories'}
            </h2>
            <span className="text-xs px-2.5 py-0.5 font-bold rounded-md bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>{PUNE_CATEGORIES.length} {language === 'mr' ? 'कॅटेगरीज' : 'Categories'}</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            {language === 'mr'
              ? 'हॉटेल्स, २००+ मंदिरे, शाळा, महाविद्यालये, हॉस्पिटल्स, सरकारी कार्यालये, आयटी पार्क्स व बाजारपेठा'
              : 'Hotels, 200+ Temples, Schools, Colleges, Hospitals, Govt Offices, IT Hubs & Bazaars'}
          </p>
        </div>

        {/* View All Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-orange-600 to-emerald-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>{t.allCategories}</span>
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
        {PUNE_CATEGORIES.map((cat) => {
          const IconComp = ICON_MAP[cat.iconName] || Landmark;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer relative overflow-hidden text-left border ${
                isSelected
                  ? 'bg-gradient-to-b from-orange-50 to-white dark:from-stone-800 dark:to-stone-850 border-orange-500 dark:border-orange-400 shadow-md shadow-orange-500/15 ring-2 ring-orange-500/20'
                  : 'bg-white dark:bg-stone-850 border-stone-200/80 dark:border-stone-800 hover:border-orange-300 dark:hover:border-stone-700 hover:shadow-xs'
              }`}
            >
              {/* Category Icon */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 ${
                  isSelected
                    ? 'bg-gradient-to-br from-orange-500 to-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-orange-600 dark:text-orange-400 group-hover:bg-orange-50 dark:group-hover:bg-orange-950/40'
                }`}
              >
                <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Category Name */}
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1 mb-1">
                {language === 'mr' ? cat.nameMr : cat.nameEn}
              </h3>

              {/* Description preview */}
              <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 leading-snug">
                {language === 'mr' ? cat.descriptionMr : cat.descriptionEn}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};
