import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { VeLogo } from './VeLogo';
import { getSocialLinks, VIRAJ_ENTERPRISE_INFO, SocialLinksConfig } from '../utils/constants';

interface FollowUsProps {
  className?: string;
}

export const FollowUs: React.FC<FollowUsProps> = ({ className = '' }) => {
  const [links, setLinks] = useState<SocialLinksConfig>(getSocialLinks());

  useEffect(() => {
    setLinks(getSocialLinks());
  }, []);

  const handleWhatsApp = () => {
    const phone = links.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(links.whatsappMessage || 'Namaste Viraj Enterprise Pune AI Agent');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = () => {
    window.open(links.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebook = () => {
    window.open(links.facebookUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="follow-us-section"
      className={`relative w-full bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 overflow-hidden ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.15) 0%, rgba(10, 10, 10, 0.98) 70%)`,
      }}
    >
      {/* Top Gold Divider Line */}
      <div className="w-full max-w-4xl mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-10 opacity-80" />

      {/* Background Subtle Gold Glitter Dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-md mx-auto text-center flex flex-col items-center">
        {/* Top VE Royal Crest with Laurel Wreath */}
        <div className="mb-4 relative group cursor-pointer">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-600/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
          <VeLogo size={80} className="relative drop-shadow-[0_0_18px_rgba(212,175,55,0.45)]" />
        </div>

        {/* Title: Gold Gradient 32px Serif Bold */}
        <h2 className="text-[28px] sm:text-[34px] font-extrabold tracking-wide font-serif bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-sm mb-1.5">
          Follow Us
        </h2>

        {/* Subtitle in Light Gold */}
        <p className="text-sm sm:text-base font-medium text-[#F7E7A9] tracking-wide mb-8">
          Pune AI Agent • by Viraj Enterprise
        </p>

        {/* 3 Big Social Buttons */}
        <div className="w-full space-y-4">
          {/* 1. WHATSAPP BUTTON */}
          <button
            onClick={handleWhatsApp}
            type="button"
            className="w-full h-[65px] rounded-[18px] bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] border-2 border-[#D4AF37] shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] transition-all duration-200 flex items-center justify-center gap-3.5 px-6 group cursor-pointer hover:scale-[1.02]"
            aria-label="Follow on WhatsApp"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:rotate-6 transition-transform">
              <FaWhatsapp className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-[18px] tracking-wide font-sans">
              Follow on WhatsApp
            </span>
          </button>

          {/* 2. INSTAGRAM BUTTON */}
          <button
            onClick={handleInstagram}
            type="button"
            className="w-full h-[65px] rounded-[18px] active:scale-[0.98] border-2 border-[#D4AF37] shadow-[0_6px_20px_rgba(214,41,118,0.35)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] transition-all duration-200 flex items-center justify-center gap-3.5 px-6 group cursor-pointer hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
            }}
            aria-label="Follow on Instagram"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:rotate-6 transition-transform">
              <FaInstagram className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-[18px] tracking-wide font-sans drop-shadow-sm">
              Follow on Instagram
            </span>
          </button>

          {/* 3. FACEBOOK BUTTON */}
          <button
            onClick={handleFacebook}
            type="button"
            className="w-full h-[65px] rounded-[18px] bg-[#1877F2] hover:bg-[#1567d3] active:scale-[0.98] border-2 border-[#D4AF37] shadow-[0_6px_20px_rgba(24,119,242,0.35)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] transition-all duration-200 flex items-center justify-center gap-3.5 px-6 group cursor-pointer hover:scale-[1.02]"
            aria-label="Follow on Facebook"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:rotate-6 transition-transform">
              <FaFacebook className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-[18px] tracking-wide font-sans">
              Follow on Facebook
            </span>
          </button>
        </div>

        {/* Brand note & owner info */}
        <div className="mt-8 text-xs text-stone-400 flex items-center gap-2">
          <span className="text-amber-400 font-semibold">{VIRAJ_ENTERPRISE_INFO.brand}</span>
          <span>•</span>
          <span>Pune Official Connect</span>
        </div>
      </div>

      {/* Bottom Gold Divider Line */}
      <div className="w-full max-w-4xl mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-10 opacity-80" />
    </section>
  );
};
