import React, { useState } from 'react';
import {
  Phone,
  Navigation,
  Clock,
  Tag,
  Star,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Share2,
  AlertCircle,
  Building,
  Rocket,
} from 'lucide-react';
import { PlaceItem } from '../types';
import { Language, translations } from '../data/translations';

interface PlaceCardProps {
  place: PlaceItem;
  language: Language;
  onViewDetails: (place: PlaceItem) => void;
  onBookNow?: (place: PlaceItem) => void;
  onFocusOnMap?: (place: PlaceItem) => void;
  onReportWrongInfo?: (place: PlaceItem) => void;
  onBoostBusiness?: (place: PlaceItem) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  language,
  onViewDetails,
  onBookNow,
  onFocusOnMap,
  onReportWrongInfo,
  onBoostBusiness,
}) => {
  const t = translations[language];
  const [imgSrc, setImgSrc] = useState(place.photo);
  const [imgFailed, setImgFailed] = useState(false);

  const handleImgError = () => {
    if (!imgFailed) {
      setImgFailed(true);
      setImgSrc(
        'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80'
      );
    }
  };

  const mapDirectionUrl =
    place.lat && place.lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;

  const officialPhoneDisplay = place.officialPhone || place.phone || '020-25501000';

  const handleShare = () => {
    const text = `${place.name} (${place.nameMr}) - ${place.address}\nअधिकृत फोन: ${officialPhoneDisplay}`;
    const url = mapDirectionUrl;
    if (navigator.share) {
      navigator.share({ title: place.name, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`);
      alert(language === 'mr' ? 'ठिकाण माहिती कॉपी झाली!' : 'Place details copied!');
    }
  };

  return (
    <article className="group bg-white dark:bg-stone-850 rounded-2xl border border-stone-200/90 dark:border-stone-800 hover:border-orange-400 dark:hover:border-orange-500/60 shadow-xs hover:shadow-xl hover:shadow-orange-950/5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={imgSrc}
          alt={place.name}
          onError={handleImgError}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          aria-hidden="true"
        />

        {/* Area Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/10">
          <span>{language === 'mr' ? place.areaMr : place.area}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-extrabold shadow-md">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{place.rating.toFixed(1)}</span>
          <span className="text-[10px] opacity-80">({place.reviewsCount})</span>
        </div>

        {/* Verified Public Listing Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-400/30">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{language === 'mr' ? 'अधिकृत पडताळणी' : 'Verified Listing'}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tagline */}
          <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1 line-clamp-1">
            {language === 'mr' ? place.taglineMr : place.tagline}
          </div>

          {/* Place Title */}
          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug mb-1">
            {language === 'mr' ? place.nameMr : place.name}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-3">
            {language === 'mr' ? place.name : place.nameMr}
          </p>

          {/* Official Phone / Desk */}
          <div className="text-xs text-stone-600 dark:text-stone-300 mb-2 flex items-center justify-between bg-stone-50 dark:bg-stone-800/60 p-2 rounded-lg border border-stone-100 dark:border-stone-800">
            <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>{language === 'mr' ? 'अधिकृत संपर्क:' : 'Official Line:'}</span>
            </span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              {officialPhoneDisplay}
            </span>
          </div>

          {/* Address */}
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 line-clamp-2 leading-relaxed">
            {language === 'mr' ? place.addressMr : place.address}
          </p>

          {/* Opening Hours */}
          <div className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-semibold text-stone-800 dark:text-stone-200 shrink-0">
              {t.timings}:
            </span>
            <span className="text-stone-600 dark:text-stone-400 truncate">
              {language === 'mr' ? place.openingHoursMr : place.openingHours}
            </span>
          </div>

          {/* Current Offer Banner */}
          {place.currentOffer && (
            <div className="mb-4 bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 dark:from-orange-950/40 dark:via-stone-800 dark:to-emerald-950/40 border border-orange-200/80 dark:border-orange-900/50 p-2.5 rounded-xl">
              <div className="flex items-start gap-2">
                <Tag className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">
                    {t.specialOffer}
                  </span>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 leading-snug line-clamp-2">
                    {language === 'mr' ? place.currentOfferMr : place.currentOffer}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
          {/* Deep Links: Ola, Uber, Swiggy, Zomato */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {place.lat && place.lng && (
              <>
                <a
                  href={`https://book.olacabs.com/?lat=${place.lat}&lng=${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[10px] font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 shrink-0"
                  title="Book Ola to this location"
                >
                  Ola
                </a>

                <a
                  href={`https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${place.lat}&dropoff[longitude]=${place.lng}&dropoff[nickname]=${encodeURIComponent(
                    place.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[10px] font-bold rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-stone-200 shrink-0"
                  title="Book Uber to this location"
                >
                  Uber
                </a>
              </>
            )}

            {(place.categoryId === 'restaurants' || place.categoryId === 'hotels') && (
              <>
                <a
                  href={`https://www.swiggy.com/restaurants/search?query=${encodeURIComponent(place.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[10px] font-bold rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 shrink-0"
                  title="Order on Swiggy"
                >
                  Swiggy
                </a>

                <a
                  href={`https://www.zomato.com/pune/restaurants?q=${encodeURIComponent(place.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[10px] font-bold rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 shrink-0"
                  title="Order on Zomato"
                >
                  Zomato
                </a>
              </>
            )}
          </div>

          {/* 4 CORE BUTTONS REQUESTED: Call (official only), Map, Share, Report Wrong Info */}
          {/* Row 1: Call (Official Number) & Map Direction */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${officialPhoneDisplay.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-colors shadow-xs"
              title={`Call ${officialPhoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'कॉल (अधिकृत)' : 'Call (Official)'}</span>
            </a>

            <a
              href={mapDirectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/80 hover:bg-orange-200 dark:hover:bg-orange-900/90 rounded-xl transition-colors border border-orange-200 dark:border-orange-800 shadow-xs"
              title="Direct Google Map Directions"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>{language === 'mr' ? 'दिशा (Map)' : 'Map Direction'}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
            </a>
          </div>

          {/* Row 2: Share & Report Wrong Info */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 cursor-pointer transition-colors"
              title="Share Place Info"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शेअर' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={() => onReportWrongInfo && onReportWrongInfo(place)}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-stone-200 dark:border-stone-700 cursor-pointer transition-colors"
              title="Report Wrong Info"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              <span>{language === 'mr' ? 'दुरुस्ती' : 'Report Wrong'}</span>
            </button>
          </div>

          {/* Boost Your Business CTA */}
          {onBoostBusiness && (
            <button
              type="button"
              onClick={() => onBoostBusiness(place)}
              className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900/60 hover:bg-orange-100/60 text-[11px] font-bold transition-all cursor-pointer"
              title="Boost this listing with Top Search (₹499)"
            >
              <Rocket className="w-3 h-3 text-orange-600" />
              <span>{language === 'mr' ? '🚀 हा व्यवसाय टॉपवर दाखवा (बूस्ट करा)' : '🚀 Boost This Business (Top Search)'}</span>
            </button>
          )}

          {/* Book Now (Hotel / Service) & Details Modal */}
          <div className="grid grid-cols-2 gap-2">
            {onBookNow && (
              <button
                type="button"
                onClick={() => onBookNow(place)}
                className={`w-full flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-extrabold text-white rounded-xl transition-all shadow-xs cursor-pointer ${
                  place.categoryId === 'hotels'
                    ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 ring-1 ring-orange-300'
                    : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                }`}
                title={place.categoryId === 'hotels' ? 'हॉटेल रूम बुकिंग (Razorpay / UPI)' : 'Book with Razorpay / UPI'}
              >
                <span>
                  {place.categoryId === 'hotels'
                    ? language === 'mr'
                      ? 'हॉटेल बुकिंग (₹299)'
                      : 'Book Hotel (₹299)'
                    : language === 'mr'
                    ? 'बुक करा (₹199)'
                    : 'Book Now (₹199)'}
                </span>
              </button>
            )}

            <button
              onClick={() => onViewDetails(place)}
              className={`w-full flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors cursor-pointer ${
                !onBookNow ? 'col-span-2' : ''
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.reviewsLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
