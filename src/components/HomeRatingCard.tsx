import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { saveLeadToSheet, recordWhatsAppClick } from '../utils/sheet';

export const HomeRatingCard: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    setIsSubmitting(true);

    // Save to Google Sheet lead log
    saveLeadToSheet({
      name: 'App User Feedback',
      search: `${rating} Star Rating`,
      action: `Submitted ${rating} Star Rating: ${comment || 'No comment'}`,
      notes: `User gave ${rating} Stars to Viraj Enterprise Pune Super App`,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleShareToWhatsApp = () => {
    recordWhatsAppClick(`5-Star Review: ${rating} Stars`);
    const text = encodeURIComponent(
      `⭐ *Viraj Enterprise Pune Super App Review*\n\nमाझे रेटिंग: ${rating} / 5 Stars ⭐\nमाझा अनुभव: ${
        comment || 'पुणे सुपर ॲप खूप छान आहे, सर्व सुविधा एकाच ठिकाणी उपलब्ध आहेत!'
      }\n\n- Milind Bhosale (Viraj Enterprise Pune)`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-3 sm:px-6">
      <div className="rounded-3xl bg-[#141419] border-2 border-[#D4AF37] p-5 sm:p-7 shadow-[0_8px_30px_rgba(212,175,55,0.2)] text-stone-200 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-[#D4AF37]/50 text-amber-300 text-xs font-bold font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>४.८★ (१,२४३ लोकांनी रेटिंग दिले)</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
            Amhala Rating Dya 🙏 (आम्हाला रेटिंग द्या)
          </h3>

          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
            विरज एंटरप्राइज पुणे सुपर ॲप कसा वाटला? तुमचा अभिप्राय आम्हाला अधिक चांगल्या सुविधा देण्यासाठी मदत करतो.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3 bg-stone-950/70 rounded-2xl border border-emerald-500/40 p-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-black text-white font-serif">
              Dhanyawad Milind Bhosale 🙏
            </h4>
            <p className="text-xs sm:text-sm text-stone-300">
              तुमचे {rating} स्टार रेटिंग व अभिप्राय सुरक्षित नोंदवले गेले आहेत.
            </p>
            <button
              onClick={handleShareToWhatsApp}
              className="mt-2 py-2 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp वर पण शेअर करा ९०२१७४५४०३</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <div className="flex flex-col items-center justify-center gap-2 py-2 bg-stone-950/60 rounded-2xl border border-stone-800">
              <StarRating rating={rating} onRate={setRating} size={32} />
              <span className="text-xs text-amber-300 font-bold font-mono">
                {rating === 5
                  ? '★★★★★ उत्कृष्ट (Excellent - 5 Stars)'
                  : rating === 4
                  ? '★★★★☆ खूप छान (Very Good - 4 Stars)'
                  : rating === 3
                  ? '★★★☆☆ ठीक (Good - 3 Stars)'
                  : 'तुमचे रेटिंग: ' + rating + ' Stars'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-stone-300 font-semibold block">
                तुमचा अनुभव किंवा प्रतिक्रिया लिहा (पर्यायी):
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="उदा. ॲपमधील तुळशीबाग बाजारपेठ व लाइव्ह बातम्या खूप उपयुक्त आहेत..."
                rows={2}
                className="w-full rounded-xl bg-stone-950 border border-stone-800 focus:border-[#D4AF37] p-3 text-xs text-white placeholder-stone-500 outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.35)] cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Rating (रेटिंग सबमिट करा)</span>
              </button>

              <button
                type="button"
                onClick={handleShareToWhatsApp}
                className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
