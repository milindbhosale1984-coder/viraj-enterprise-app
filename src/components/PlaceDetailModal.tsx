import React, { useState } from 'react';
import {
  X,
  Star,
  Phone,
  Navigation,
  Clock,
  Tag,
  ShieldCheck,
  Send,
  ThumbsUp,
  User,
  CheckCircle,
} from 'lucide-react';
import { PlaceItem, PlaceReview } from '../types';
import { Language, translations } from '../data/translations';

interface PlaceDetailModalProps {
  place: PlaceItem | null;
  onClose: () => void;
  language: Language;
  onAddReview: (placeId: string, review: PlaceReview) => void;
  onBookNow?: (place: PlaceItem) => void;
  onReportWrongInfo?: (place: PlaceItem) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  language,
  onAddReview,
  onBookNow,
  onReportWrongInfo,
}) => {
  const t = translations[language];

  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!place) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: PlaceReview = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim(),
      rating: reviewRating,
      date: language === 'mr' ? 'आत्ताच' : 'Just now',
      comment: reviewComment.trim(),
      helpfulCount: 1,
    };

    onAddReview(place.id, newRev);
    setReviewerName('');
    setReviewComment('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 3500);
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapQuery
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-orange-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full my-auto shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Sticky Modal Header Image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0 bg-stone-900">
          <img
            src={place.photo}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-orange-600 text-white">
                {language === 'mr' ? place.areaMr : place.area}
              </span>
              <div className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{place.rating.toFixed(1)}</span>
                <span className="text-white/70">({place.reviewsCount} {t.reviewsLabel})</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-devanagari-hero">
              {language === 'mr' ? place.nameMr : place.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === 'mr' ? place.name : place.nameMr}
            </p>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={`tel:${place.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{t.callNow}</span>
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/80 hover:bg-orange-200 dark:hover:bg-orange-900 rounded-xl transition-colors border border-orange-200 dark:border-orange-800"
            >
              <Navigation className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>{language === 'mr' ? 'गुगल मॅप दिशा' : 'Google Map'}</span>
            </a>

            {onBookNow && (
              <button
                type="button"
                onClick={() => onBookNow(place)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-extrabold text-white rounded-xl transition-all shadow-sm cursor-pointer ${
                  place.categoryId === 'hotels'
                    ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:to-rose-700'
                    : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                }`}
              >
                <span>
                  {place.categoryId === 'hotels'
                    ? language === 'mr'
                      ? 'हॉटेल बुकिंग करा (₹299)'
                      : 'Book Hotel Room (₹299)'
                    : language === 'mr'
                    ? 'बुक करा (₹199)'
                    : 'Book Now (₹199)'}
                </span>
              </button>
            )}
            {/* Share and Report Wrong Info */}
            <div className="flex gap-2 col-span-1 sm:col-span-3">
              <button
                type="button"
                onClick={() => {
                  const text = `${place.name} (${place.nameMr}) - ${place.address}\nअधिकृत फोन: ${place.officialPhone || place.phone}`;
                  if (navigator.share) {
                    navigator.share({ title: place.name, text, url: mapUrl }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(`${text}\n${mapUrl}`);
                    alert(language === 'mr' ? 'माहिती कॉपी झाली!' : 'Place details copied!');
                  }
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
              >
                <span>{language === 'mr' ? 'शेअर करा (Share)' : 'Share Details'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onReportWrongInfo) {
                    onReportWrongInfo(place);
                    onClose();
                  }
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-stone-200 dark:border-stone-700 transition-colors"
              >
                <span>{language === 'mr' ? 'चुकीची माहिती नोंदवा (Report Wrong)' : 'Report Wrong Info'}</span>
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
              <span className="block font-semibold text-stone-500 dark:text-stone-400 mb-0.5">
                {language === 'mr' ? 'अधिकृत संपर्क (सार्वजनिक)' : 'Official Contact (Public)'}
              </span>
              <span className="font-bold text-stone-900 dark:text-stone-100 font-mono">
                {place.officialPhone || place.phone || '020-25501000'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
              <span className="block font-semibold text-stone-500 dark:text-stone-400 mb-0.5">
                {t.timings}
              </span>
              <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{language === 'mr' ? place.openingHoursMr : place.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
            <span className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1">
              {language === 'mr' ? 'पत्ता' : 'Full Address'}
            </span>
            <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
              {language === 'mr' ? place.addressMr : place.address}
            </p>
          </div>

          {/* Current Offer Highlight */}
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 dark:from-orange-950/60 dark:via-stone-800 dark:to-emerald-950/60 border-2 border-orange-300 dark:border-orange-900 p-4 rounded-2xl">
            <div className="flex items-start gap-2.5">
              <Tag className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">
                  {t.specialOffer}
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  {language === 'mr' ? place.currentOfferMr : place.currentOffer}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              {language === 'mr' ? 'वैशिष्ट्ये' : 'Highlights'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(language === 'mr' ? place.highlightsMr : place.highlights).map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {t.reviewsLabel} ({place.reviews.length})
              </h3>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{place.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            {/* List of existing reviews */}
            <div className="space-y-3 mb-6">
              {place.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 flex items-center justify-center text-xs font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                        {rev.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3 h-3 ${
                            idx < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300 dark:text-stone-600'
                          }`}
                        />
                      ))}
                      <span className="text-[10px] text-stone-400 ml-1">
                        {rev.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-9">
                    {language === 'mr' && rev.commentMr ? rev.commentMr : rev.comment}
                  </p>
                  <div className="flex justify-end mt-1 text-[11px] text-stone-400 gap-1 items-center">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.helpfulCount} उपयुक्त</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                {t.writeReview}
              </h4>

              {submittedMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {language === 'mr'
                      ? 'आपले परीक्षण यशस्वीरित्या जोडले गेले आहे!'
                      : 'Your review has been successfully submitted!'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      {t.nameInput}
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. अमित कुलकर्णी' : 'e.g. Amit Kulkarni'}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      {t.ratingInput}
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 cursor-pointer focus:outline-hidden"
                          aria-label={`${star} star`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300 dark:text-stone-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300 ml-2">
                        {reviewRating} / 5
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    {t.ratePlace}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder={t.reviewCommentInput}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-emerald-600 hover:from-orange-700 hover:to-emerald-700 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.submitReview}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
