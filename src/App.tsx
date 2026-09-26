/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header, AppView } from './components/Header';
import { PmcNewsTicker } from './components/PmcNewsTicker';
import { HeroSearch } from './components/HeroSearch';
import { PhonePeHomeGrid } from './components/PhonePeHomeGrid';
import { QuickServicesBar } from './components/QuickServicesBar';
import { AdBannerSlider } from './components/AdBannerSlider';
import { CategoryCards } from './components/CategoryCards';
import { PlaceCard } from './components/PlaceCard';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { TrainBookingView } from './components/TrainBookingView';
import { FlightBookingView } from './components/FlightBookingView';
import { LiveTrafficMapView } from './components/LiveTrafficMapView';
import { PuneEventsView } from './components/PuneEventsView';
import { PuneMetroView } from './components/PuneMetroView';
import { PuneLeadersView } from './components/PuneLeadersView';
import { FuelStationsView } from './components/FuelStationsView';
import { CivicServicesView } from './components/CivicServicesView';
import { PunePulseFeedView } from './components/PunePulseFeedView';
import { EntertainmentView } from './components/EntertainmentView';
import { BoostBusinessModal } from './components/BoostBusinessModal';
import { ReportWrongInfoModal } from './components/ReportWrongInfoModal';
import { GoogleSheetSyncModal } from './components/GoogleSheetSyncModal';
import { PuneCalendarSection } from './components/PuneCalendarSection';
import { RazorpayPaymentModal } from './components/RazorpayPaymentModal';
import { EmergencyModal } from './components/EmergencyModal';
import { PuneriPatyaSection } from './components/PuneriPatyaSection';
import { FloatingVoiceAgent } from './components/FloatingVoiceAgent';
import { Footer } from './components/Footer';
import { FollowUs } from './components/FollowUs';
import { WeatherWidget } from './components/WeatherWidget';
import { AdMobBanner } from './components/AdMobBanner';
import { HomeTopWidgets } from './components/HomeTopWidgets';
import { BottomNavigation } from './components/BottomNavigation';
import { QRGenerator } from './pages/QRGenerator';
import { PuneWeather } from './pages/PuneWeather';
import { Admin } from './pages/Admin';
import { Privacy } from './pages/Privacy';
import { Cricket } from './pages/Cricket';
import { AIChat } from './pages/AIChat';
import { SocialHub } from './pages/SocialHub';
import { Kalnirnay } from './pages/Kalnirnay';
import { BankInfo } from './pages/BankInfo';
import { LoanInfo } from './pages/LoanInfo';
import { MobileLoan } from './pages/MobileLoan';
import { GovtYojana } from './pages/GovtYojana';
import { EMICalculator } from './pages/EMICalculator';
import { NearMe } from './pages/NearMe';
import { PuneLocalMarket } from './pages/PuneLocalMarket';
import { PuneNews } from './pages/PuneNews';
import { NewsTickerMarquee } from './components/NewsTickerMarquee';
import { trackVisitor, trackHotelSearch } from './utils/analytics';
import {
  ALL_PUNE_PLACES,
  PUNE_CATEGORIES,
} from './data/puneData';
import { INITIAL_NOTIFICATIONS } from './data/punePulseData';
import { CategoryId, PlaceItem, PlaceReview, PuneLiveNotification } from './types';
import { Language, translations } from './data/translations';
import {
  SearchX,
  RotateCcw,
  Grid,
  FileSpreadsheet,
  PlusCircle,
  Car,
  Train,
  Plane,
  Calendar,
  Sparkles,
  PhoneCall,
  TrainTrack,
  Users,
  Fuel,
  Flame,
  MessageSquare,
  Music,
  Rocket,
} from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pune_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Language state: defaults to Marathi
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pune_lang') as Language;
      if (saved === 'mr' || saved === 'en') return saved;
    }
    return 'mr';
  });

  // Main navigation view with URL pathname support
  const [activeView, setActiveView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/news') return 'news';
      if (path === '/near-me') return 'near_me';
      if (path === '/pune-market') return 'pune_market';
      if (path === '/loan') return 'loan';
      if (path === '/mobile-loan') return 'mobile_loan';
      if (path === '/yojana') return 'yojana';
      if (path === '/emi-calculator') return 'emi_calculator';
      if (path === '/cricket') return 'cricket';
      if (path === '/ai-chat') return 'ai_chat';
      if (path === '/social') return 'social';
      if (path === '/qr' || path === '/qr-generator') return 'qr_generator';
      if (path === '/weather') return 'weather';
      if (path === '/kalnirnay') return 'kalnirnay';
      if (path === '/bank-info') return 'bank_info';
      if (path === '/admin') return 'admin';
      if (path === '/privacy') return 'privacy';
    }
    return 'places';
  });

  // Track initial visitor for monetization analytics & mock morning 8am push notification
  useEffect(() => {
    trackVisitor();
    try {
      const dateKey = 've_push_news_' + new Date().toISOString().split('T')[0];
      if (!localStorage.getItem(dateKey)) {
        localStorage.setItem(
          dateKey,
          JSON.stringify({
            title: 'Roj Sakali 8am Batmya Update',
            titleMr: 'रोज सकाळी ८:०० वाजता पुणे व महाराष्ट्र ताज्या बातम्या',
            time: '08:00 AM',
            status: 'Delivered',
          })
        );
      }
    } catch {}
  }, []);

  // Listen to popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/news') {
        setActiveView('news');
      } else if (path === '/near-me') {
        setActiveView('near_me');
      } else if (path === '/pune-market') {
        setActiveView('pune_market');
      } else if (path === '/loan') {
        setActiveView('loan');
      } else if (path === '/mobile-loan') {
        setActiveView('mobile_loan');
      } else if (path === '/yojana') {
        setActiveView('yojana');
      } else if (path === '/emi-calculator') {
        setActiveView('emi_calculator');
      } else if (path === '/cricket') {
        setActiveView('cricket');
      } else if (path === '/ai-chat') {
        setActiveView('ai_chat');
      } else if (path === '/social') {
        setActiveView('social');
      } else if (path === '/qr' || path === '/qr-generator') {
        setActiveView('qr_generator');
      } else if (path === '/weather') {
        setActiveView('weather');
      } else if (path === '/kalnirnay') {
        setActiveView('kalnirnay');
      } else if (path === '/bank-info') {
        setActiveView('bank_info');
      } else if (path === '/admin') {
        setActiveView('admin');
      } else if (path === '/privacy') {
        setActiveView('privacy');
      } else {
        setActiveView('places');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateView = (view: AppView) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      if (view === 'news') {
        window.history.pushState({}, '', '/news');
      } else if (view === 'near_me') {
        window.history.pushState({}, '', '/near-me');
      } else if (view === 'pune_market') {
        window.history.pushState({}, '', '/pune-market');
      } else if (view === 'loan') {
        window.history.pushState({}, '', '/loan');
      } else if (view === 'mobile_loan') {
        window.history.pushState({}, '', '/mobile-loan');
      } else if (view === 'yojana') {
        window.history.pushState({}, '', '/yojana');
      } else if (view === 'emi_calculator') {
        window.history.pushState({}, '', '/emi-calculator');
      } else if (view === 'cricket') {
        window.history.pushState({}, '', '/cricket');
      } else if (view === 'ai_chat') {
        window.history.pushState({}, '', '/ai-chat');
      } else if (view === 'social') {
        window.history.pushState({}, '', '/social');
      } else if (view === 'qr_generator') {
        window.history.pushState({}, '', '/qr');
      } else if (view === 'weather') {
        window.history.pushState({}, '', '/weather');
      } else if (view === 'kalnirnay') {
        window.history.pushState({}, '', '/kalnirnay');
      } else if (view === 'bank_info') {
        window.history.pushState({}, '', '/bank-info');
      } else if (view === 'admin') {
        window.history.pushState({}, '', '/admin');
      } else if (view === 'privacy') {
        window.history.pushState({}, '', '/privacy');
      } else if (view === 'places') {
        window.history.pushState({}, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Places data state (supports added reviews & Google Sheet imports)
  const [places, setPlaces] = useState<PlaceItem[]>(ALL_PUNE_PLACES);
  const [customSheetPlaces, setCustomSheetPlaces] = useState<PlaceItem[]>([]);

  // Search & Filter state (Owner search removed per legal and privacy rules; Place name & area only)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedArea, setSelectedArea] = useState('All Areas');

  // Track hotel and destination searches with debounce
  useEffect(() => {
    if (searchQuery.trim().length >= 3) {
      const timer = setTimeout(() => {
        trackHotelSearch(searchQuery.trim(), selectedCategory);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, selectedCategory]);

  // Live notifications state
  const [notifications, setNotifications] = useState<PuneLiveNotification[]>(() => {
    try {
      const saved = localStorage.getItem('pune_live_notifications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_NOTIFICATIONS;
  });

  // Modals state
  const [activeModalPlace, setActiveModalPlace] = useState<PlaceItem | null>(null);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingPlace, setReportingPlace] = useState<PlaceItem | null>(null);
  const [paymentType, setPaymentType] = useState<'ad_booking' | 'place_booking'>('ad_booking');
  const [bookingPlace, setBookingPlace] = useState<PlaceItem | null>(null);

  // Boost Business Modal State
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [boostPlanDefault, setBoostPlanDefault] = useState<string>('top_search');
  const [boostBusinessName, setBoostBusinessName] = useState<string>('');

  // Sync Dark mode to document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pune_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pune_theme', 'light');
    }
  }, [isDark]);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('pune_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  // Sync Notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pune_live_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleAddNotification = (notif: PuneLiveNotification) => {
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleOpenBoostModal = (planId = 'top_search', busName = '') => {
    setBoostPlanDefault(planId);
    setBoostBusinessName(busName);
    setIsBoostModalOpen(true);
  };

  // Add review handler
  const handleAddReview = (placeId: string, review: PlaceReview) => {
    setPlaces((prev) =>
      prev.map((p) => {
        if (p.id === placeId) {
          const updatedReviews = [review, ...p.reviews];
          const newRating =
            (p.rating * p.reviewsCount + review.rating) / (p.reviewsCount + 1);
          const updatedPlace = {
            ...p,
            reviews: updatedReviews,
            reviewsCount: p.reviewsCount + 1,
            rating: Number(newRating.toFixed(1)),
          };
          if (activeModalPlace?.id === placeId) {
            setActiveModalPlace(updatedPlace);
          }
          return updatedPlace;
        }
        return p;
      })
    );
  };

  // Google Sheet Sync Handler
  const handleImportSheetPlaces = (newPlaces: PlaceItem[]) => {
    setCustomSheetPlaces(newPlaces);
    setPlaces((prev) => {
      const nonSheet = prev.filter((p) => !p.id.startsWith('sheet-'));
      return [...newPlaces, ...nonSheet];
    });
  };

  // Open Book Now modal
  const handleBookNow = (place: PlaceItem) => {
    setBookingPlace(place);
    setPaymentType('place_booking');
    setIsPaymentModalOpen(true);
  };

  // Open Post Ad modal
  const handleOpenPostAd = () => {
    setBookingPlace(null);
    setPaymentType('ad_booking');
    setIsPaymentModalOpen(true);
  };

  // Open Report Wrong Info modal
  const handleOpenReportWrongInfo = (place: PlaceItem) => {
    setReportingPlace(place);
    setIsReportModalOpen(true);
  };

  // Filtered places calculation: STRICTLY by place name, area, address, tags (NO owner search!)
  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return places.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'tourist') {
          if (item.categoryId !== 'tourist' && item.categoryId !== 'mandir') return false;
        } else if (selectedCategory === 'restaurants') {
          if (item.categoryId !== 'restaurants' && item.categoryId !== 'hotels') return false;
        } else if (selectedCategory === 'private_offices') {
          if (item.categoryId !== 'private_offices' && item.categoryId !== 'it_parks') return false;
        } else if (item.categoryId !== selectedCategory) {
          return false;
        }
      }

      // Area filter
      if (selectedArea !== 'All Areas' && selectedArea !== 'सर्व परिसर') {
        if (item.area !== selectedArea && item.areaMr !== selectedArea) {
          return false;
        }
      }

      // Query filter: Place name, locality, address ONLY (no owner search per legal requirements)
      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.nameMr.includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.addressMr.includes(q) ||
        item.area.toLowerCase().includes(q) ||
        item.areaMr.includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.taglineMr.includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q)) ||
        item.highlightsMr.some((h) => h.includes(q))
      );
    });
  }, [places, searchQuery, selectedCategory, selectedArea]);

  const t = translations[language];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedArea('All Areas');
  };

  const currentCategoryMeta = PUNE_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* Live PMC News Ticker */}
      <PmcNewsTicker language={language} />

      {/* Header with Navigation Menu & Live Notification Bell */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        isDark={isDark}
        onToggleDark={toggleDark}
        onOpenChat={() => setIsVoiceAgentOpen(true)}
        onOpenSheetSync={() => setIsSheetModalOpen(true)}
        onOpenPostAd={handleOpenPostAd}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        activeView={activeView}
        onChangeView={handleNavigateView}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onOpenBoostModal={handleOpenBoostModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* VIEW: Daily News Update - Aajchya Thalak Batmya */}
        {activeView === 'news' && (
          <PuneNews />
        )}

        {/* VIEW: Near Me - GPS Facility */}
        {activeView === 'near_me' && (
          <NearMe />
        )}

        {/* VIEW: Pune Local Market - Bajarpeth */}
        {activeView === 'pune_market' && (
          <PuneLocalMarket />
        )}

        {/* VIEW: Bank Loan Mahiti */}
        {activeView === 'loan' && (
          <LoanInfo />
        )}

        {/* VIEW: Mobile App Var Loan - Instant */}
        {activeView === 'mobile_loan' && (
          <MobileLoan />
        )}

        {/* VIEW: Sarkari Yojana - Maharashtra & Kendra */}
        {activeView === 'yojana' && (
          <GovtYojana />
        )}

        {/* VIEW: Loan EMI Calculator */}
        {activeView === 'emi_calculator' && (
          <EMICalculator />
        )}

        {/* VIEW: Cricket Live Score - IPL 2026 */}
        {activeView === 'cricket' && (
          <Cricket />
        )}

        {/* VIEW: ChatGPT Connected AI Chat */}
        {activeView === 'ai_chat' && (
          <AIChat />
        )}

        {/* VIEW: Social Connect Hub */}
        {activeView === 'social' && (
          <SocialHub />
        )}

        {/* VIEW: Kalnirnay 2026 Festival Calendar */}
        {activeView === 'kalnirnay' && (
          <Kalnirnay />
        )}

        {/* VIEW: Bank Holiday, Location & Timetable */}
        {activeView === 'bank_info' && (
          <BankInfo />
        )}

        {/* VIEW: Admin Analytics & Monetization Dashboard */}
        {activeView === 'admin' && (
          <Admin onBack={() => handleNavigateView('places')} />
        )}

        {/* VIEW: Privacy Policy in Marathi */}
        {activeView === 'privacy' && (
          <Privacy onBack={() => handleNavigateView('places')} />
        )}

        {/* VIEW: QR Code Generator */}
        {activeView === 'qr_generator' && (
          <QRGenerator />
        )}

        {/* VIEW: Live Pune Weather */}
        {activeView === 'weather' && (
          <PuneWeather />
        )}

        {/* VIEW: Live CNG / Petrol / EV Tracker */}
        {activeView === 'fuel' && (
          <FuelStationsView
            language={language}
            onOpenBoostModal={handleOpenBoostModal}
          />
        )}

        {/* VIEW: Civic Services (Gas, LIC, Insurance, PUC) */}
        {activeView === 'services' && (
          <CivicServicesView
            language={language}
            onAddNotification={handleAddNotification}
            onOpenBoostModal={handleOpenBoostModal}
          />
        )}

        {/* VIEW: Pune Pulse (Live Twitter-style feed) */}
        {activeView === 'pulse' && (
          <PunePulseFeedView language={language} />
        )}

        {/* VIEW: Entertainment (Ganpati Songs & Live News RSS) */}
        {activeView === 'entertainment' && (
          <EntertainmentView language={language} />
        )}

        {/* VIEW: Pune Metro (Purple & Aqua line stations, Fare & time calculator, WhatsApp ticket) */}
        {activeView === 'metro' && (
          <PuneMetroView language={language} />
        )}

        {/* VIEW: Pune Leaders (Amdar, Khasdar, Nagarsevak Directory with official office addresses) */}
        {activeView === 'leaders' && (
          <PuneLeadersView
            language={language}
            onReportWrongInfo={(item) => handleOpenReportWrongInfo(item as any)}
          />
        )}

        {/* VIEW: Train Booking */}
        {activeView === 'trains' && (
          <TrainBookingView language={language} />
        )}

        {/* VIEW: Flight Booking */}
        {activeView === 'flights' && (
          <FlightBookingView language={language} />
        )}

        {/* VIEW: Live Traffic Map with Jam Report */}
        {activeView === 'traffic_map' && (
          <LiveTrafficMapView language={language} />
        )}

        {/* VIEW: Pune Events & Festivals */}
        {activeView === 'events' && (
          <PuneEventsView language={language} />
        )}

        {/* VIEW: Directory Homepage (PhonePe Grid, Super Services, Search, Ads Slider, Category Cards, Place Cards) */}
        {activeView === 'places' && (
          <>
            {/* Live TV-Style Auto-Scrolling News Ticker Marquee */}
            <NewsTickerMarquee onNavigateNews={() => handleNavigateView('news')} />

            {/* Top 4 Horizontal Scrollable Super App Cards (Cricket, Weather, Bank Info, Kalnirnay) */}
            <HomeTopWidgets onNavigate={handleNavigateView} />

            {/* Hero with Big Search */}
            <HeroSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedArea={selectedArea}
              onAreaChange={setSelectedArea}
              language={language}
              totalResults={filteredPlaces.length}
            />

            {/* PhonePe-Style Super App Icon Grid */}
            <PhonePeHomeGrid
              language={language}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                const el = document.getElementById('places-section-header');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onChangeView={handleNavigateView}
              onOpenPostAd={handleOpenPostAd}
              onOpenSheetSync={() => setIsSheetModalOpen(true)}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              onOpenBoostModal={handleOpenBoostModal}
            />

            {/* Super Services Deep Links Bar (Blinkit 10 mins, Porter, Ola, Uber) */}
            <QuickServicesBar language={language} />

            {/* Google AdMob Placeholder: "Ad Space - Pune Hotels" */}
            <AdMobBanner slotTitle="Ad Space - Pune Hotels" />

            {/* Advertising Banner Slider on Homepage */}
            <AdBannerSlider
              language={language}
              onOpenPostAd={handleOpenPostAd}
            />

            {/* Category Cards */}
            <CategoryCards
              selectedCategory={selectedCategory}
              onSelectCategory={(id) => setSelectedCategory(id)}
              language={language}
            />

            {/* Places List Section */}
            <section id="places-section-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
                    {selectedCategory === 'all'
                      ? language === 'mr'
                        ? `सर्व ${filteredPlaces.length} पुणेरी ठिकाणे (Directory)`
                        : `All ${filteredPlaces.length} Pune Destinations`
                      : selectedCategory === 'it_parks' || selectedCategory === 'private_offices'
                      ? language === 'mr'
                        ? 'पुण्यातील प्रमुख आयटी पार्क्स व कॉर्पोरेट कार्यालये'
                        : 'Major Pune IT Parks & Corporate Offices'
                      : selectedCategory === 'tourist'
                      ? language === 'mr'
                        ? 'पुण्यातील मंदिरे व ऐतिहासिक पर्यटन स्थळे'
                        : 'Pune Temples & Historic Forts'
                      : selectedCategory === 'restaurants'
                      ? language === 'mr'
                        ? 'अस्सल पुणेरी खवय्येगिरी व उपाहारगृहे'
                        : 'Authentic Pune Restaurants & Food Addas'
                      : language === 'mr'
                      ? currentCategoryMeta?.nameMr
                      : currentCategoryMeta?.nameEn}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                    {language === 'mr'
                      ? 'अधिकृत फोन, गुगल मॅप दिशा, शेअर, Book Ola/Uber आणि दुरुस्ती नोंदणी'
                      : 'Verified official contact, Google Maps, Share, Book Ola/Uber & Report Wrong Info'}
                  </p>
                </div>

                {/* Quick status count */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    {filteredPlaces.length} {t.resultsFound}
                  </span>
                  {(searchQuery || selectedCategory !== 'all' || selectedArea !== 'All Areas') && (
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline px-2 py-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.resetFilters}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Places Grid */}
              {filteredPlaces.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      language={language}
                      onViewDetails={(item) => setActiveModalPlace(item)}
                      onBookNow={handleBookNow}
                      onReportWrongInfo={handleOpenReportWrongInfo}
                      onBoostBusiness={(item) => handleOpenBoostModal('top_search', item.name)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 p-8 max-w-xl mx-auto my-8">
                  <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-4">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {t.noResultsTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6">
                    {t.noResultsDesc}
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-emerald-600 rounded-xl shadow-md hover:from-orange-700 hover:to-emerald-700 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.resetFilters}</span>
                  </button>
                </div>
              )}
            </section>

            {/* Google Calendar Section - Pune Events */}
            <div id="pune-calendar-section">
              <PuneCalendarSection language={language} />
            </div>

            {/* Puneri Patya Section */}
            <PuneriPatyaSection language={language} />

            {/* Premium Follow Us Section by Viraj Enterprise */}
            <FollowUs />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onSelectCategory={(id) => {
          handleNavigateView('places');
          setSelectedCategory(id);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onNavigateView={handleNavigateView}
      />

      {/* Floating 'पु' Voice AI Agent */}
      <FloatingVoiceAgent
        language={language}
        isOpen={isVoiceAgentOpen}
        onToggleOpen={() => setIsVoiceAgentOpen((prev) => !prev)}
        onNavigateView={handleNavigateView}
        onSelectCategory={setSelectedCategory}
        onSearchPlace={(q) => {
          setSearchQuery(q);
          handleNavigateView('places');
        }}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Place Detail & Review Modal */}
      <PlaceDetailModal
        place={activeModalPlace}
        onClose={() => setActiveModalPlace(null)}
        language={language}
        onAddReview={handleAddReview}
        onBookNow={handleBookNow}
        onReportWrongInfo={handleOpenReportWrongInfo}
      />

      {/* Report Wrong Info Modal */}
      <ReportWrongInfoModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setReportingPlace(null);
        }}
        place={reportingPlace}
        language={language}
      />

      {/* Boost Business / Monetization Modal */}
      <BoostBusinessModal
        isOpen={isBoostModalOpen}
        onClose={() => setIsBoostModalOpen(false)}
        language={language}
        defaultPlanId={boostPlanDefault}
        initialBusinessName={boostBusinessName}
      />

      {/* Google Sheet Database Sync Modal */}
      <GoogleSheetSyncModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        language={language}
        onImportPlaces={handleImportSheetPlaces}
        syncedCount={customSheetPlaces.length}
      />

      {/* Razorpay & UPI Payment Modal */}
      <RazorpayPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        language={language}
        paymentType={paymentType}
        place={bookingPlace}
      />

      {/* Emergency One-Tap Call Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        language={language}
      />

      {/* Persistent Bottom 6-Icon Navigation Bar */}
      <BottomNavigation
        activeView={activeView}
        onChangeView={handleNavigateView}
      />
    </div>
  );
}
