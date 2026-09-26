import React, { useState } from 'react';
import { Sparkles, ExternalLink, ShieldCheck, DollarSign } from 'lucide-react';
import { trackEvent, trackWhatsAppClick } from '../utils/analytics';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface AdMobBannerProps {
  slotTitle?: string;
  className?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({
  slotTitle = 'Ad Space - Pune Hotels',
  className = '',
}) => {
  const [admobUnitId] = useState(() => {
    try {
      return localStorage.getItem('ve_admob_banner_id') || 'ca-app-pub-3940256099942544/6300978111';
    } catch {
      return 'ca-app-pub-3940256099942544/6300978111';
    }
  });

  const handleAdClick = () => {
    trackEvent('ad_banner_click', { slot: slotTitle });
    trackWhatsAppClick(VIRAJ_ENTERPRISE_INFO.phone, 'ad_space_sponsor');
    const msg = encodeURIComponent(
      `Hello Milind Bhosale (Viraj Enterprise), I want to sponsor the '${slotTitle}' ad slot on Pune Super App for ₹499!`
    );
    window.open(`https://wa.me/91${VIRAJ_ENTERPRISE_INFO.phone}?text=${msg}`, '_blank');
  };

  return (
    <div
      id="admob-pune-hotels-slot"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121217] via-[#1a1a24] to-[#121217] border-2 border-dashed border-[#D4AF37]/50 p-4 sm:p-5 shadow-lg group">
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 bg-[#D4AF37] text-stone-950 font-black text-[9px] px-2.5 py-0.5 rounded-bl-lg uppercase tracking-widest shadow-xs">
          Sponsored / AdMob Ready
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30 uppercase tracking-wider">
                Google AdMob Placement
              </span>
              <span className="text-[10px] text-stone-500 font-mono">
                {admobUnitId.slice(0, 24)}...
              </span>
            </div>

            {/* User Requested Name: "Ad Space - Pune Hotels" */}
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 group-hover:text-amber-300 transition-colors font-serif">
              {slotTitle}
            </h3>

            <p className="text-xs text-stone-400 max-w-xl mt-0.5">
              Promote your Pune Restaurant, Misal Joint, Sweet Mart, or Hotel to thousands of local Pune travelers & foodies daily!
            </p>
          </div>

          {/* Action CTA to Sponsor */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleAdClick}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>जाहिरात द्या (₹४९९ / महिना)</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
