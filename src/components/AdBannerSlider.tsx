import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink, Tag, ShieldCheck } from 'lucide-react';
import { Language } from '../data/translations';

interface AdBannerSliderProps {
  language: Language;
  onOpenPostAd: () => void;
}

interface AdItem {
  id: string;
  badgeEn: string;
  badgeMr: string;
  titleEn: string;
  titleMr: string;
  subtitleEn: string;
  subtitleMr: string;
  offerEn: string;
  offerMr: string;
  actionTextEn: string;
  actionTextMr: string;
  bgGradient: string;
  borderColor: string;
  image: string;
  link?: string;
  isCustomAdSlot?: boolean;
}

const ADS_DATA: AdItem[] = [
  {
    id: 'ad-chitale',
    badgeEn: 'Pune Icon · Chitale Bandhu',
    badgeMr: 'पुण्याची ओळख · चितळे बंधू',
    titleEn: 'Chitale Bandhu Mithaiwale',
    titleMr: 'चितळे बंधू मिठाईवाले',
    subtitleEn: 'World-famous authentic Puneri Bakarwadi & melt-in-mouth Mango Barfi made fresh daily.',
    subtitleMr: 'अस्सल पुणेरी चव - खमंग बाकरवडी व आंबा बर्फी! डेक्कन व बाजीराव रोडसह सर्व शाखांमध्ये उपलब्ध.',
    offerEn: 'Special Festival Box: 10% Off on Pre-orders',
    offerMr: 'सणासुदीचा खास बॉक्स: आगाऊ बुकिंगवर १०% सवलत',
    actionTextEn: 'Order Online',
    actionTextMr: 'ऑनलाइन मागवा',
    bgGradient: 'from-amber-700 via-orange-800 to-stone-900',
    borderColor: 'border-amber-400/40',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    link: 'https://chitalebandhu.in/',
  },
  {
    id: 'ad-vaishali',
    badgeEn: 'FC Road Heritage · Food Legend',
    badgeMr: 'एफसी रोडची शान · खाद्यसंस्कृती',
    titleEn: 'Hotel Vaishali & Roopali (FC Road)',
    titleMr: 'हॉटेल वैशाली व रुपाली (एफसी रोड)',
    subtitleEn: 'Iconic Puneri SPDP, Mysore Masala Dosa, and steaming filter coffee under the banyan tree.',
    subtitleMr: 'पुणेकरांचा लाडका कट्टा! गरमागरम एसपीएस (SPDP), म्हैसूर डोसा आणि अस्सल फिल्टर कॉफी.',
    offerEn: 'Open 7:00 AM to 11:00 PM · Pure Veg',
    offerMr: 'वेळ सकाळी ७ ते रात्री ११ · अस्सल पुणेरी नाश्ता',
    actionTextEn: 'View Menu & Location',
    actionTextMr: 'मेनू व पत्ता पहा',
    bgGradient: 'from-emerald-800 via-teal-900 to-stone-900',
    borderColor: 'border-emerald-400/40',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    link: 'https://www.google.com/maps/search/?api=1&query=Hotel+Vaishali+FC+Road+Pune',
  },
  {
    id: 'ad-kayani',
    badgeEn: 'Since 1955 · Pune Camp',
    badgeMr: 'पुणे कॅम्प · ऐतिहासिक चव',
    titleEn: 'Kayani Bakery - Legendary Mawa Cake',
    titleMr: 'कयानी बेकरी - जगप्रसिद्ध मावा केक',
    subtitleEn: 'Fresh buttery Shrewsbury biscuits, rich sponge Mawa cake and ginger biscuits on East Street.',
    subtitleMr: 'ईस्ट स्ट्रीट, कॅम्प! गरम-गरम सुप्रसिद्ध मावा केक आणि शुरजबरी बिस्किटे. पुण्याची अस्सल भेट.',
    offerEn: 'Fresh Morning Batch at 7:30 AM & 3:30 PM',
    offerMr: 'ताजा बॅच सकाळी ७:३० व दुपारी ३:३० वाजता',
    actionTextEn: 'Locate on Map',
    actionTextMr: 'नकाशावर पहा',
    bgGradient: 'from-orange-800 via-amber-900 to-stone-900',
    borderColor: 'border-orange-400/40',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    link: 'https://www.google.com/maps/search/?api=1&query=Kayani+Bakery+East+Street+Pune+Camp',
  },
  {
    id: 'ad-realestate',
    badgeEn: 'Pune Real Estate Expo 2026',
    badgeMr: 'पुणे गृह महोत्सव २०२६',
    titleEn: 'Luxury 2 & 3 BHK Homes in Baner & Kharadi',
    titleMr: 'बाणेर, वाकड व खराडीत स्वप्नातील घर!',
    subtitleEn: 'Premium gated communities with 50+ lifestyle amenities. Zero stamp duty on select bookings.',
    subtitleMr: 'आयटी हब जवळ आधुनिक सुखसोयींनी युक्त घरे. मर्यादित काळासाठी ०% मुद्रांक शुल्क (Stamp Duty) सवलत.',
    offerEn: 'Starting ₹69 Lakhs All-Inclusive',
    offerMr: 'किंमत ₹६९ लाखांपासून सुरू · त्वरित ताबा',
    actionTextEn: 'Book Free Site Visit',
    actionTextMr: 'मोफत साईट व्हिजिट बुक करा',
    bgGradient: 'from-blue-900 via-indigo-950 to-stone-900',
    borderColor: 'border-blue-400/40',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    link: '#',
  },
  {
    id: 'ad-post-here',
    badgeEn: 'Business Spotlight · Verified Promo',
    badgeMr: 'तुमची व्यावसायिक जाहिरात · पुणे शहर',
    titleEn: 'Promote Your Pune Business for ₹499!',
    titleMr: 'तुमची जाहिरात येथे दाखवा - फक्त ₹४९९!',
    subtitleEn: 'Reach over 100,000+ local Pune citizens, tourists, and students directly on Pune AI Agent.',
    subtitleMr: 'पुण्यातील लाखो नागरिक, प्रवासी आणि विद्यार्थ्यांपर्यंत तुमचा व्यवसाय पोहोचवा. झटपट Razorpay बुकिंग.',
    offerEn: 'Instant Activation · Includes Google Map & Direct Call link',
    offerMr: 'झटपट मंजुरी · गुगल मॅप व कॉल लिंकसह',
    actionTextEn: 'Book Ad Slot (₹499)',
    actionTextMr: 'जाहिरात जागा बुक करा (₹४९९)',
    bgGradient: 'from-rose-900 via-orange-900 to-amber-950',
    borderColor: 'border-amber-300',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    isCustomAdSlot: true,
  },
];

export const AdBannerSlider: React.FC<AdBannerSliderProps> = ({
  language,
  onOpenPostAd,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ADS_DATA.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentAd = ADS_DATA[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ADS_DATA.length) % ADS_DATA.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ADS_DATA.length);
  };

  const handleActionClick = () => {
    if (currentAd.isCustomAdSlot) {
      onOpenPostAd();
    } else if (currentAd.link && currentAd.link !== '#') {
      window.open(currentAd.link, '_blank', 'noopener,noreferrer');
    } else {
      onOpenPostAd();
    }
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      aria-label="Pune Business Advertisements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border shadow-lg transition-all duration-500 group">
        {/* Slide Item */}
        <div
          className={`relative min-h-[170px] sm:min-h-[190px] p-5 sm:p-7 flex flex-col justify-between text-white bg-gradient-to-r ${currentAd.bgGradient} ${currentAd.borderColor} border`}
        >
          {/* Background Decorative Image Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-2/5 opacity-25 sm:opacity-35 pointer-events-none overflow-hidden mix-blend-luminosity">
            <img
              src={currentAd.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/60 to-transparent" />
          </div>

          {/* Top Row: Badge + Pune Sponsor Tag */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-md text-amber-200 border border-white/20 shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{language === 'mr' ? currentAd.badgeMr : currentAd.badgeEn}</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                <span>पुणे प्रायोजित</span>
              </span>
            </div>

            {/* Quick post ad button on top right */}
            <button
              onClick={onOpenPostAd}
              className="text-[11px] font-bold text-amber-200 hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'mr' ? 'येथे जाहिरात द्या' : 'Advertise Here'} (₹499)</span>
            </button>
          </div>

          {/* Center: Title & Subtitle */}
          <div className="relative z-10 my-2 max-w-2xl">
            <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-xs font-devanagari-hero">
              {language === 'mr' ? currentAd.titleMr : currentAd.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2 leading-relaxed font-medium">
              {language === 'mr' ? currentAd.subtitleMr : currentAd.subtitleEn}
            </p>
          </div>

          {/* Bottom Row: Offer + CTA Action Button */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-black/30 px-3 py-1 rounded-xl backdrop-blur-xs border border-amber-300/20">
              <Tag className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? currentAd.offerMr : currentAd.offerEn}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleActionClick}
                className="px-4 py-2 text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'mr' ? currentAd.actionTextMr : currentAd.actionTextEn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous advertisement"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next advertisement"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {ADS_DATA.map((ad, idx) => (
            <button
              key={ad.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
