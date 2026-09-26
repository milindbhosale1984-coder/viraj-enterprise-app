import React from 'react';
import {
  Hotel,
  Utensils,
  Landmark,
  Building,
  Car,
  HeartPulse,
  PhoneCall,
  Train,
  Plane,
  Sparkles,
  Calendar,
  PlusCircle,
  FileSpreadsheet,
  GraduationCap,
  BookOpen,
  Building2,
  Compass,
  ShoppingBag,
  Briefcase,
  Users,
  TrainTrack,
  Fuel,
  Flame,
  MessageSquare,
  Music,
  Rocket,
  QrCode,
  Cloud,
  Trophy,
  Bot,
  Banknote,
  Smartphone,
  HeartHandshake,
  Calculator,
  Navigation,
  Newspaper,
} from 'lucide-react';
import { Language } from '../data/translations';
import { AppView } from './Header';
import { CategoryId } from '../types';

interface PhonePeHomeGridProps {
  language: Language;
  onSelectCategory: (cat: CategoryId | 'all') => void;
  onChangeView: (view: AppView) => void;
  onOpenPostAd: () => void;
  onOpenSheetSync: () => void;
  onOpenEmergency: () => void;
  onOpenBoostModal?: (planId?: string) => void;
}

export const PhonePeHomeGrid: React.FC<PhonePeHomeGridProps> = ({
  language,
  onSelectCategory,
  onChangeView,
  onOpenPostAd,
  onOpenSheetSync,
  onOpenEmergency,
  onOpenBoostModal,
}) => {
  const superServices = [
    {
      id: 'near_me',
      titleEn: 'Near Me',
      titleMr: 'माझ्या जवळ',
      subEn: 'Bank, Hospital, Hotel',
      subMr: 'जवळची सर्व ठिकाणे GPS',
      icon: Navigation,
      bg: 'from-amber-500 via-yellow-500 to-amber-600',
      shadow: 'shadow-amber-500/25',
      badge: 'Live GPS',
      onClick: () => onChangeView('near_me'),
    },
    {
      id: 'pune_market',
      titleEn: 'Pune Market',
      titleMr: 'पुणे बाजारपेठ',
      subEn: 'Tulshibaug & Laxmi Rd',
      subMr: 'तुळशीबाग, मंडई, एफसी',
      icon: ShoppingBag,
      bg: 'from-pink-600 via-rose-600 to-amber-700',
      shadow: 'shadow-pink-500/25',
      badge: 'Shopping',
      onClick: () => onChangeView('pune_market'),
    },
    {
      id: 'cricket',
      titleEn: 'Cricket Live',
      titleMr: 'क्रिकेट स्कोअर',
      subEn: 'IPL 2026 Live Scores',
      subMr: 'थेट धावसंख्या व निकाल',
      icon: Trophy,
      bg: 'from-red-600 via-rose-600 to-amber-700',
      shadow: 'shadow-red-500/25',
      badge: 'LIVE 30s',
      onClick: () => onChangeView('cricket'),
    },
    {
      id: 'ai_chat',
      titleEn: 'Pune AI Chat',
      titleMr: 'पुणे AI चॅट',
      subEn: 'ChatGPT Assistant',
      subMr: 'सर्व माहिती बोला व विचारा',
      icon: Bot,
      bg: 'from-amber-500 via-yellow-500 to-amber-600',
      shadow: 'shadow-amber-500/25',
      badge: 'Milind AI',
      onClick: () => onChangeView('ai_chat'),
    },
    {
      id: 'loan',
      titleEn: 'Bank Loan',
      titleMr: 'बँक कर्ज',
      subEn: 'Home, Personal, Mudra',
      subMr: 'सर्व बँक कर्ज मार्गदर्शन',
      icon: Banknote,
      bg: 'from-amber-600 via-yellow-600 to-amber-700',
      shadow: 'shadow-amber-500/25',
      badge: 'Apply Now',
      onClick: () => onChangeView('loan'),
    },
    {
      id: 'mobile_loan',
      titleEn: 'Mobile App Loan',
      titleMr: 'मोबाईल ॲप कर्ज',
      subEn: 'Instant RBI Apps',
      subMr: 'सुरक्षित इन्स्टंट कर्ज',
      icon: Smartphone,
      bg: 'from-emerald-600 via-teal-600 to-green-700',
      shadow: 'shadow-emerald-500/25',
      badge: 'RBI Verified',
      onClick: () => onChangeView('mobile_loan'),
    },
    {
      id: 'yojana',
      titleEn: 'Sarkari Yojana',
      titleMr: 'सरकारी योजना',
      subEn: 'Ladki Bahin & PMAY',
      subMr: 'लाडकी बहीण व PM किसान',
      icon: HeartHandshake,
      bg: 'from-rose-600 via-pink-600 to-amber-700',
      shadow: 'shadow-rose-500/25',
      badge: '₹1500/महिना',
      onClick: () => onChangeView('yojana'),
    },
    {
      id: 'emi_calculator',
      titleEn: 'EMI Calculator',
      titleMr: 'EMI कॅल्क्युलेटर',
      subEn: 'Calculate Monthly EMI',
      subMr: 'अचूक मासिक हप्ता तपासा',
      icon: Calculator,
      bg: 'from-indigo-600 via-purple-600 to-blue-700',
      shadow: 'shadow-indigo-500/25',
      badge: 'Instant Tool',
      onClick: () => onChangeView('emi_calculator'),
    },
    {
      id: 'bank_info',
      titleEn: 'Bank Holiday',
      titleMr: 'बँक माहिती',
      subEn: 'Aaj Bank Chalu?',
      subMr: 'RBI सुट्ट्या व वेळापत्रक',
      icon: Building2,
      bg: 'from-emerald-700 via-teal-700 to-emerald-800',
      shadow: 'shadow-emerald-500/25',
      badge: 'RBI 2026',
      onClick: () => onChangeView('bank_info'),
    },
    {
      id: 'kalnirnay',
      titleEn: 'Kalnirnay',
      titleMr: 'कालनिर्णय सण',
      subEn: '2026 San & Tithi',
      subMr: 'सण, उत्सव व सुट्ट्या',
      icon: Calendar,
      bg: 'from-amber-600 to-yellow-700',
      shadow: 'shadow-amber-500/25',
      badge: 'पंचांग',
      onClick: () => onChangeView('kalnirnay'),
    },
    {
      id: 'social',
      titleEn: 'Social Hub',
      titleMr: 'सोशल हब',
      subEn: 'WhatsApp, Insta, FB',
      subMr: 'मिलिंद भोसले संपर्क',
      icon: Users,
      bg: 'from-sky-600 via-blue-600 to-indigo-700',
      shadow: 'shadow-blue-500/25',
      badge: '9021745403',
      onClick: () => onChangeView('social'),
    },
    {
      id: 'qr_generator',
      titleEn: 'QR Generator',
      titleMr: 'क्यूआर जनरेटर',
      subEn: 'UPI, Location, Phone',
      subMr: 'पेमेंट व लोकेशन QR',
      icon: QrCode,
      bg: 'from-amber-600 via-yellow-600 to-amber-700',
      shadow: 'shadow-amber-500/25',
      badge: 'Free Instant',
      onClick: () => onChangeView('qr_generator'),
    },
    {
      id: 'weather',
      titleEn: 'Pune Weather',
      titleMr: 'पुणे हवामान',
      subEn: 'Live Temp & 5-Day',
      subMr: 'थेट तापमान व अंदाज',
      icon: Cloud,
      bg: 'from-sky-600 via-cyan-600 to-blue-700',
      shadow: 'shadow-sky-500/25',
      badge: 'Live 28°C',
      onClick: () => onChangeView('weather'),
    },
    {
      id: 'fuel',
      titleEn: 'Live CNG / Fuel',
      titleMr: 'थेट सीएनजी / पेट्रोल',
      subEn: 'Queue & Availability',
      subMr: 'रांग व साठा ट्रॅकर',
      icon: Fuel,
      bg: 'from-emerald-600 via-teal-600 to-green-700',
      shadow: 'shadow-emerald-500/25',
      badge: 'Live Status',
      onClick: () => onChangeView('fuel'),
    },
    {
      id: 'metro',
      titleEn: 'Pune Metro',
      titleMr: 'पुणे मेट्रो',
      subEn: 'Purple & Aqua Lines',
      subMr: 'PCMC ते स्वारगेट',
      icon: TrainTrack,
      bg: 'from-purple-600 to-violet-800',
      shadow: 'shadow-purple-500/25',
      badge: 'QR Ticket',
      onClick: () => onChangeView('metro'),
    },
    {
      id: 'services',
      titleEn: 'Gas & Insurance',
      titleMr: 'गॅस व विमा सेवा',
      subEn: 'Bharat/HP/Indane, LIC',
      subMr: 'सिलिंडर व विमा रिमाइंडर',
      icon: Flame,
      bg: 'from-amber-600 via-orange-600 to-rose-600',
      shadow: 'shadow-orange-500/25',
      badge: 'Civic',
      onClick: () => onChangeView('services'),
    },
    {
      id: 'pulse',
      titleEn: 'Pune Pulse',
      titleMr: 'पुणे पल्स (फीड)',
      subEn: 'City News & Jams',
      subMr: 'थेट नागरी बातम्या',
      icon: MessageSquare,
      bg: 'from-sky-600 to-blue-700',
      shadow: 'shadow-blue-500/25',
      badge: 'Live Feed',
      onClick: () => onChangeView('pulse'),
    },
    {
      id: 'entertainment',
      titleEn: 'Songs & News',
      titleMr: 'मनोरंजन व बातम्या',
      subEn: 'Ganpati Aartis & RSS',
      subMr: 'बाप्पाची गाणी व सकाळ',
      icon: Music,
      bg: 'from-rose-600 via-pink-600 to-purple-700',
      shadow: 'shadow-pink-500/25',
      badge: 'Aarti',
      onClick: () => onChangeView('entertainment'),
    },
    {
      id: 'hotels',
      titleEn: 'Hotels',
      titleMr: 'हॉटेल्स',
      subEn: 'Stay & Dine',
      subMr: 'बुकिंग ₹२९९',
      icon: Hotel,
      bg: 'from-amber-500 to-orange-600',
      shadow: 'shadow-orange-500/25',
      badge: '₹299',
      onClick: () => {
        onChangeView('places');
        onSelectCategory('hotels');
      },
    },
    {
      id: 'mandirs',
      titleEn: 'Mandirs',
      titleMr: 'मंदिरे (२००+)',
      subEn: 'Dagdusheth & Heritage',
      subMr: 'दगडूशेठ व आळंदी',
      icon: Landmark,
      bg: 'from-orange-500 to-red-600',
      shadow: 'shadow-red-500/25',
      badge: '200+',
      onClick: () => {
        onChangeView('places');
        onSelectCategory('mandir');
      },
    },
    {
      id: 'leaders',
      titleEn: 'Pune Leaders',
      titleMr: 'लोकप्रतिनिधी',
      subEn: 'MLAs, MPs, PMC',
      subMr: 'आमदार व खासदार',
      icon: Users,
      bg: 'from-emerald-700 to-teal-800',
      shadow: 'shadow-teal-500/25',
      badge: 'Official',
      onClick: () => onChangeView('leaders'),
    },
    {
      id: 'traffic',
      titleEn: 'Live Traffic',
      titleMr: 'थेट ट्रॅफिक',
      subEn: 'Map & Jam Alerts',
      subMr: 'गुगल ट्रॅफिक लेयर',
      icon: Car,
      bg: 'from-teal-600 to-emerald-700',
      shadow: 'shadow-teal-500/25',
      badge: 'Jam Report',
      onClick: () => onChangeView('traffic_map'),
    },
    {
      id: 'trains',
      titleEn: 'Train Booking',
      titleMr: 'रेल्वे बुकिंग',
      subEn: 'Pune Jn to India',
      subMr: 'IRCTC तिकीट',
      icon: Train,
      bg: 'from-purple-600 to-indigo-700',
      shadow: 'shadow-purple-500/25',
      badge: 'IRCTC',
      onClick: () => onChangeView('trains'),
    },
    {
      id: 'flights',
      titleEn: 'Flight Booking',
      titleMr: 'विमान बुकिंग',
      subEn: 'PNQ Terminal 2',
      subMr: 'पुणे विमानतळ',
      icon: Plane,
      bg: 'from-sky-600 to-blue-700',
      shadow: 'shadow-sky-500/25',
      badge: 'PNQ',
      onClick: () => onChangeView('flights'),
    },
    {
      id: 'hospitals',
      titleEn: 'Hospitals',
      titleMr: 'रुग्णालये',
      subEn: 'Ruby & Deenanath',
      subMr: '२४ तास इमर्जन्सी',
      icon: HeartPulse,
      bg: 'from-red-600 to-rose-700',
      shadow: 'shadow-red-500/25',
      badge: '24/7 Trauma',
      onClick: () => {
        onChangeView('places');
        onSelectCategory('hospitals');
      },
    },
    {
      id: 'emergency',
      titleEn: 'Emergency',
      titleMr: 'तातडीची मदत',
      subEn: '112 / 108 Dial',
      subMr: 'पोलीस व ॲम्ब्युलन्स',
      icon: PhoneCall,
      bg: 'from-rose-600 to-pink-700',
      shadow: 'shadow-pink-500/25',
      badge: 'SOS',
      onClick: onOpenEmergency,
    },
    {
      id: 'marketing',
      titleEn: 'Bazaars & Shops',
      titleMr: 'खरेदी बाजार',
      subEn: 'Laxmi Rd, FC, MG',
      subMr: 'लक्ष्मी रोड व कॅम्प',
      icon: ShoppingBag,
      bg: 'from-pink-600 to-rose-700',
      shadow: 'shadow-pink-500/25',
      badge: 'Shopping',
      onClick: () => {
        onChangeView('places');
        onSelectCategory('marketing');
      },
    },
    {
      id: 'businesses',
      titleEn: 'Pune Brands',
      titleMr: 'पुणेरी ब्रँड्स',
      subEn: 'Chitale, Kirloskar',
      subMr: 'चितळे व उद्योग',
      icon: Briefcase,
      bg: 'from-amber-700 to-orange-800',
      shadow: 'shadow-orange-600/25',
      badge: 'Brands',
      onClick: () => {
        onChangeView('places');
        onSelectCategory('businesses');
      },
    },
    {
      id: 'it_parks',
      titleEn: 'IT & Offices',
      titleMr: 'आयटी व खाजगी',
      subEn: 'Hinjawadi, Kharadi',
      subMr: 'इन्फोटेक पार्क',
      icon: Building,
      bg: 'from-indigo-600 to-violet-700',
      shadow: 'shadow-indigo-500/25',
      badge: 'Tech Parks',
      onClick: () => {
        onChangeView('places');
        onSelectCategory('private_offices');
      },
    },
    {
      id: 'food',
      titleEn: 'Food & Misal',
      titleMr: 'खाद्यसंस्कृती',
      subEn: 'Vaishali & Misal',
      subMr: 'अस्सल पुणेरी चव',
      icon: Utensils,
      bg: 'from-orange-500 to-rose-600',
      shadow: 'shadow-rose-500/25',
      badge: 'Popular',
      onClick: () => {
        onChangeView('places');
        onSelectCategory('restaurants');
      },
    },
    {
      id: 'events',
      titleEn: 'Pune Events',
      titleMr: 'पुणे उत्सव',
      subEn: 'Festivals & Jatra',
      subMr: 'गणेशोत्सव व जत्रा',
      icon: Calendar,
      bg: 'from-fuchsia-600 to-purple-700',
      shadow: 'shadow-fuchsia-500/25',
      badge: 'Events',
      onClick: () => onChangeView('events'),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Super App Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
            पु
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
              {language === 'mr' ? 'पुणे सुपर ॲप - सर्व सेवा' : 'Pune Super Services Grid'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {language === 'mr'
                ? 'थेट सीएनजी, मेट्रो, गॅस बुकिंग, पुणे पल्स, आरत्या व सर्व सेवा'
                : 'Live CNG Tracker, Pune Metro, Gas Booking, Pune Pulse & Civic Desks'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenBoostModal && (
            <button
              onClick={() => onOpenBoostModal('top_search')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white text-xs font-bold shadow-xs hover:from-amber-600 hover:to-rose-700 transition-all cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'व्यवसाय वाढवा (₹४९९)' : 'Boost (₹499)'}</span>
            </button>
          )}

          <button
            onClick={onOpenPostAd}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'जाहिरात द्या' : 'Post Ad'}</span>
          </button>
        </div>
      </div>

      {/* Modern PhonePe Style Responsive Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
        {superServices.map((service) => {
          const Icon = service.icon;

          return (
            <button
              key={service.id}
              onClick={service.onClick}
              className="group relative flex flex-col items-center justify-between p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-orange-400 dark:hover:border-orange-500/60 shadow-2xs hover:shadow-md transition-all duration-200 text-center select-none cursor-pointer"
            >
              {/* Badge if present */}
              {service.badge && (
                <span className="absolute -top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-orange-600 text-white shadow-xs">
                  {service.badge}
                </span>
              )}

              {/* Colorful Gradient Icon Box */}
              <div
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br ${service.bg} flex items-center justify-center text-white mb-2 shadow-sm ${service.shadow} group-hover:scale-108 transition-transform duration-200`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Title & Subtitle */}
              <div className="w-full">
                <span className="block text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                  {language === 'mr' ? service.titleMr : service.titleEn}
                </span>
                <span className="block text-[10px] text-stone-500 dark:text-stone-400 truncate font-medium">
                  {language === 'mr' ? service.subMr : service.subEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
