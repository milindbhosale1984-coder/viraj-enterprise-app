/**
 * Pune AI Agent - Analytics & Monetization Tracker
 * Powered by Viraj Enterprise
 * Tracks user events, hotel searches, QR codes, weather views, and WhatsApp clicks
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported, Analytics } from 'firebase/analytics';

// Firebase configuration (can be updated with production keys)
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForPuneSuperAppAnalytics123",
  authDomain: "pune-ai-agent.firebaseapp.com",
  projectId: "pune-ai-agent",
  storageBucket: "pune-ai-agent.appspot.com",
  messagingSenderId: "9021745403",
  appId: "1:9021745403:web:puneaiagentviraj",
  measurementId: "G-PUNEAIAGENT"
};

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

// Safe client-side initialization
if (typeof window !== 'undefined') {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    } else {
      app = getApps()[0];
    }
  } catch (e) {
    // Graceful fallback to local analytics
  }
}

export interface AnalyticsStats {
  totalVisitors: number;
  totalHotelSearches: number;
  totalWhatsAppClicks: number;
  totalQRGenerated: number;
  totalWeatherViews: number;
  popularHotels: Record<string, number>;
  popularCategories: Record<string, number>;
  recentEvents: Array<{
    name: string;
    label: string;
    timestamp: number;
  }>;
}

const STORAGE_KEY = 've_pune_analytics_stats';

export function getAnalyticsStats(): AnalyticsStats {
  if (typeof window === 'undefined') {
    return {
      totalVisitors: 1240,
      totalHotelSearches: 432,
      totalWhatsAppClicks: 189,
      totalQRGenerated: 94,
      totalWeatherViews: 312,
      popularHotels: {
        'Goodluck Cafe': 78,
        'Vaishali FC Road': 64,
        'Hotel Shreyas': 52,
        'Kayani Bakery': 49,
        'Bedekar Misal': 38,
      },
      popularCategories: {
        'hotels': 195,
        'mandir': 142,
        'hospitals': 68,
        'fuel': 88,
      },
      recentEvents: [],
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}

  // Initial realistic seeding for Pune Viraj Enterprise portal
  const initial: AnalyticsStats = {
    totalVisitors: 1240,
    totalHotelSearches: 432,
    totalWhatsAppClicks: 189,
    totalQRGenerated: 94,
    totalWeatherViews: 312,
    popularHotels: {
      'Goodluck Cafe': 78,
      'Vaishali FC Road': 64,
      'Hotel Shreyas': 52,
      'Kayani Bakery': 49,
      'Bedekar Misal': 38,
      'Cafe Irani Chai': 27,
    },
    popularCategories: {
      'hotels': 195,
      'mandir': 142,
      'hospitals': 68,
      'fuel': 88,
    },
    recentEvents: [
      { name: 'hotel_search', label: 'Goodluck Cafe FC Road', timestamp: Date.now() - 120000 },
      { name: 'whatsapp_click', label: 'Call 9021745403 Inquiry', timestamp: Date.now() - 360000 },
      { name: 'qr_generated', label: 'UPI Payment ₹499', timestamp: Date.now() - 600000 },
      { name: 'weather_view', label: 'Pune Live Weather 28°C', timestamp: Date.now() - 900000 },
    ],
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {}

  return initial;
}

export function saveAnalyticsStats(stats: AnalyticsStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {}
}

/**
 * Track an arbitrary event with Firebase Analytics + Local Admin Dashboard sync
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  // 1. Firebase Analytics
  if (analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch {}
  }

  // 2. Local stats update for Admin Dashboard
  try {
    const stats = getAnalyticsStats();
    
    // Append to recent events (keep latest 20)
    const label = params.hotel_name || params.label || params.target || eventName;
    stats.recentEvents = [
      { name: eventName, label: String(label), timestamp: Date.now() },
      ...(stats.recentEvents || []),
    ].slice(0, 20);

    saveAnalyticsStats(stats);
  } catch {}
}

/**
 * Track Hotel / Restaurant / Place Search
 */
export function trackHotelSearch(placeName: string, category: string = 'hotels'): void {
  trackEvent('hotel_search', {
    hotel_name: placeName,
    category: category,
  });

  try {
    const stats = getAnalyticsStats();
    stats.totalHotelSearches = (stats.totalHotelSearches || 0) + 1;
    if (placeName && placeName.trim().length > 1) {
      const clean = placeName.trim();
      stats.popularHotels[clean] = (stats.popularHotels[clean] || 0) + 1;
    }
    if (category) {
      stats.popularCategories[category] = (stats.popularCategories[category] || 0) + 1;
    }
    saveAnalyticsStats(stats);
  } catch {}
}

/**
 * Track QR Generated Event
 */
export function trackQRGenerated(type: string, label: string): void {
  trackEvent('qr_generated', {
    qr_type: type,
    qr_label: label,
  });

  try {
    const stats = getAnalyticsStats();
    stats.totalQRGenerated = (stats.totalQRGenerated || 0) + 1;
    saveAnalyticsStats(stats);
  } catch {}
}

/**
 * Track Pune Weather View
 */
export function trackWeatherView(): void {
  trackEvent('weather_view', {
    location: 'Pune',
  });

  try {
    const stats = getAnalyticsStats();
    stats.totalWeatherViews = (stats.totalWeatherViews || 0) + 1;
    saveAnalyticsStats(stats);
  } catch {}
}

/**
 * Track WhatsApp Click to 9021745403 / Viraj Enterprise
 */
export function trackWhatsAppClick(targetNumber: string = '9021745403', source: string = 'home_button'): void {
  trackEvent('whatsapp_click', {
    target_number: targetNumber,
    source: source,
  });

  try {
    const stats = getAnalyticsStats();
    stats.totalWhatsAppClicks = (stats.totalWhatsAppClicks || 0) + 1;
    saveAnalyticsStats(stats);
  } catch {}
}

/**
 * Track Visitor
 */
export function trackVisitor(): void {
  if (typeof window === 'undefined') return;
  const sessionKey = 've_session_recorded';
  if (!sessionStorage.getItem(sessionKey)) {
    sessionStorage.setItem(sessionKey, '1');
    trackEvent('page_view', { path: window.location.pathname });
    try {
      const stats = getAnalyticsStats();
      stats.totalVisitors = (stats.totalVisitors || 0) + 1;
      saveAnalyticsStats(stats);
    } catch {}
  }
}
