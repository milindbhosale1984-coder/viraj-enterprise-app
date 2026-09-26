import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Building2,
  Hospital,
  Hotel,
  UtensilsCrossed,
  ShoppingCart,
  Bus,
  ExternalLink,
  Share2,
  Compass,
  Sparkles,
  Phone,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { recordWhatsAppClick } from '../utils/sheet';

interface NearMeCategory {
  id: string;
  nameMr: string;
  nameEn: string;
  icon: any;
  searchQuery: string;
  estimatedDist: string;
  popularSpots: string;
  badgeColor: string;
}

const NEAR_ME_CATEGORIES: NearMeCategory[] = [
  {
    id: 'bank',
    nameMr: 'बँक व एटीएम',
    nameEn: 'Bank & ATM',
    icon: Building2,
    searchQuery: 'banks+and+atms+near+me',
    estimatedDist: '३०० मी वर (300m var)',
    popularSpots: 'SBI, Bank of Maharashtra, HDFC, ICICI ATM',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'hospital',
    nameMr: 'दवाखाना व रुग्णालय',
    nameEn: 'Hospital & Clinic',
    icon: Hospital,
    searchQuery: 'hospitals+and+clinics+near+me',
    estimatedDist: '५०० मी वर (500m var)',
    popularSpots: 'Emergency ICU, Medical Store, 24x7 Pharmacy',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
  },
  {
    id: 'hotel',
    nameMr: 'हॉटेल्स व लॉज',
    nameEn: 'Hotels & Stay',
    icon: Hotel,
    searchQuery: 'hotels+and+lodging+near+me',
    estimatedDist: '७०० मी वर (700m var)',
    popularSpots: 'Family Hotels, AC Rooms, Business Lodging',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'khanaval',
    nameMr: 'अस्सल खानावळ व मेस',
    nameEn: 'Khanaval & Mess',
    icon: UtensilsCrossed,
    searchQuery: 'khanaval+and+bhojanalay+near+me',
    estimatedDist: '४०० मी वर (400m var)',
    popularSpots: 'घरगुती जेवण, अस्सल पुणेरी मिसळ, शाकाहारी/मांसाहारी थाळी',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  },
  {
    id: 'market',
    nameMr: 'मार्केट व किराणा',
    nameEn: 'Market & Grocery',
    icon: ShoppingCart,
    searchQuery: 'market+supermarket+grocery+near+me',
    estimatedDist: '३५० मी वर (350m var)',
    popularSpots: 'भाजी मंडई, सुपरमार्केट, बेकरी, दूध डेअरी',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: 'bus_stand',
    nameMr: 'बस स्टँड व मेट्रो स्टेशन',
    nameEn: 'Bus Stand & Metro',
    icon: Bus,
    searchQuery: 'bus+stand+and+metro+stations+near+me',
    estimatedDist: '६०० मी वर (600m var)',
    popularSpots: 'PMPML Bus Stop, Pune Metro, रिक्षा स्टँड',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
];

export const NearMe: React.FC = () => {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState<string>('पुणे (डिटेक्ट करत आहे...)');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<NearMeCategory>(NEAR_ME_CATEGORIES[0]);

  // Request user GPS location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('तुमच्या ब्राउझरमध्ये GPS जिओलोकेशन सुविधा उपलब्ध नाही.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setLocationAddress(`अक्षांश: ${latitude.toFixed(4)}, रेखांश: ${longitude.toFixed(4)} (पुणे परिसर)`);
        setIsLocating(false);
      },
      (err) => {
        // Fallback to Pune central
        setUserCoords({ lat: 18.5204, lng: 73.8567 });
        setLocationAddress('पुणे शहर मध्यवर्ती (शनिवार वाडा / स्वारगेट परिसर)');
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    // Attempt automatic soft location on mount
    handleGetLocation();
  }, []);

  const openGoogleMaps = (query: string) => {
    let url = `https://www.google.com/maps/search/${query}/`;
    if (userCoords) {
      url += `@${userCoords.lat},${userCoords.lng},15z`;
    }
    window.open(url, '_blank');
  };

  const handleShareLocationOnWhatsApp = (categoryName: string) => {
    recordWhatsAppClick(`Near Me: ${categoryName}`);
    let coordsText = userCoords
      ? `Latitude: ${userCoords.lat.toFixed(4)}, Longitude: ${userCoords.lng.toFixed(4)}`
      : 'Pune Area';
    const text = encodeURIComponent(
      `Namaste Milind Bhosale (Viraj Enterprise Pune), I am looking for [${categoryName}] near me in Pune.\nMy Location: ${coordsText}\nKrupaya javalche changle options sanga.`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  // Google Maps embed URL
  const embedQuery = userCoords
    ? `${selectedCategory.searchQuery}&center=${userCoords.lat},${userCoords.lng}`
    : `${selectedCategory.searchQuery}+near+Pune+Maharashtra`;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    embedQuery
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>पुणे लाइव्ह लोकेशन मार्गदर्शक • GPS Near Me Facility</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Majhya Jawal Kay Ahe Bagha - Near Me
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            बँक, दवाखाना, हॉटेल्स, अस्सल खानावळ, मंडई आणि बस स्टँड तुमच्या जवळ शोधा • Viraj Enterprise
          </p>

          {/* MAIN BIG GPS TRIGGER BUTTON */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleGetLocation}
              disabled={isLocating}
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_6px_25px_rgba(212,175,55,0.4)] cursor-pointer transition-all active:scale-95 border-2 border-yellow-200"
            >
              <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'लोकेशन शोधत आहे...' : '📍 Majhya Jawal Kay Ahe Bagha'}</span>
            </button>

            <button
              onClick={() => handleShareLocationOnWhatsApp(selectedCategory.nameMr)}
              className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Share Location on WhatsApp 9021745403</span>
            </button>
          </div>

          {/* Current GPS address badge */}
          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-stone-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-mono text-stone-300">
              सध्याचे स्थान: <strong className="text-white">{locationAddress}</strong>
            </span>
          </div>
        </div>

        {/* 6 CATEGORIES WITH ICONS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>तुमच्या जवळ शोधण्यासाठी वर्गवारी निवडा (Choose Category):</span>
            </h2>
            <span className="text-xs text-[#D4AF37] font-semibold hidden sm:inline">
              ६ प्रमुख सुविधा
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NEAR_ME_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory.id === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-2xl p-3.5 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 text-center group select-none ${
                    isSelected
                      ? 'bg-stone-900 border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.35)] scale-105'
                      : 'bg-[#141419] border-stone-800 hover:border-stone-700 hover:scale-[1.02]'
                  }`}
                >
                  <div className="mx-auto w-12 h-12 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-amber-400 group-hover:text-yellow-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-white truncate">
                      {cat.nameMr}
                    </h3>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {cat.nameEn}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${cat.badgeColor}`}>
                    {cat.estimatedDist}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED CATEGORY DETAILS & GOOGLE MAPS EMBED */}
        <div className="rounded-3xl bg-[#141419] p-5 sm:p-6 border-2 border-[#D4AF37] shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-amber-300">
                <selectedCategory.icon className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white font-serif">
                    {selectedCategory.nameMr} ({selectedCategory.nameEn})
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    {selectedCategory.estimatedDist}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  जवळपास उपलब्ध: <strong className="text-stone-300">{selectedCategory.popularSpots}</strong>
                </p>
              </div>
            </div>

            {/* BUTTONS: Google Map Var Bagha + WhatsApp Share */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => openGoogleMaps(selectedCategory.searchQuery)}
                className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Map Var Bagha</span>
              </button>

              <button
                onClick={() => handleShareLocationOnWhatsApp(selectedCategory.nameMr)}
                className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Live Google Maps Iframe */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-800 shadow-inner">
            <iframe
              title={`Maps near me for ${selectedCategory.nameEn}`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              loading="lazy"
              allowFullScreen
              src={mapSrc}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 pt-1 gap-2">
            <span>
              💡 टीप: नकाशावर क्लिक करून तुम्ही संबंधित ठिकाणाचा अचूक मार्ग (Turn-by-Turn GPS Navigation) सुरू करू शकता.
            </span>
            <span className="font-mono text-amber-400">
              पुणे २४ तास सेवा
            </span>
          </div>
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Near Me - Majhya Jawal Kay Ahe Bagha" />
      </div>
    </div>
  );
};
