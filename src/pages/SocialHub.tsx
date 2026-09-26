import React, { useState } from 'react';
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaCheckCircle,
  FaShareAlt,
  FaUsers,
  FaHeart,
  FaPhoneAlt,
} from 'react-icons/fa';
import { Share2, Sparkles, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';
import { recordWhatsAppClick } from '../utils/sheet';

export const SocialHub: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [followClicks, setFollowClicks] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('ve_social_click_counts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { wa: 384, insta: 277, fb: 1042, web: 615 };
  });

  const recordClick = (key: string) => {
    setFollowClicks((prev) => {
      const updated = { ...prev, [key]: (prev[key] || 0) + 1 };
      try {
        localStorage.setItem('ve_social_click_counts', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Pune Super App - Viraj Enterprise',
          text: 'पुणे एआय सुपर ॲप - सर्व पुणेरी हॉटेल्स, मंदिरे, आयपीएल स्कोअर, हवामान, आणि बँक माहिती एकाच ॲपमध्ये! संपर्क: मिलिंद भोसले ९०२१७४५४०३',
          url: window.location.origin,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <VeLogo size={74} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Social Connect Hub • Viraj Enterprise
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-lg mx-auto">
            Connect directly with <strong className="text-white">Milind Bhosale</strong> across all verified social media profiles and WhatsApp support channels!
          </p>

          {/* Share App Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleShareApp}
              className="inline-flex items-center gap-2 py-2 px-5 rounded-2xl bg-stone-900 hover:bg-stone-850 border border-[#D4AF37]/50 text-amber-400 text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Pune Super App With Friends'}</span>
            </button>
          </div>
        </div>

        {/* 4 BIG BUTTONS WITH REAL LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* 1. WHATSAPP BUTTON */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#121814] via-[#101c13] to-[#0a0f0b] p-6 border-2 border-[#25D366]/80 shadow-[0_6px_25px_rgba(37,211,102,0.25)] flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg">
                  <FaWhatsapp />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white font-sans">
                    WhatsApp Official
                  </h2>
                  <span className="text-xs text-emerald-400 font-semibold">
                    Direct Contact • Milind Bhosale
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400 block">
                  {followClicks.wa}+ Connected
                </span>
                <span className="text-[10px] text-stone-500">24x7 Active</span>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              Inquire about Pune directory listings, hotel promotions, ₹499 ad boosts, or general Pune civic queries.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href="https://wa.me/919021745403?text=Namaste%20Milind%20Bhosale%20(Viraj%20Enterprise)"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  recordClick('wa');
                  recordWhatsAppClick('Social Hub 9021745403');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Chat: 9021745403</span>
              </a>

              <a
                href="https://wa.me/9172523188?text=Namaste%20Milind%20Bhosale%20(Viraj%20Enterprise)"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  recordClick('wa');
                  recordWhatsAppClick('Social Hub 9172523188');
                }}
                className="py-3 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-emerald-400 font-bold text-xs border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>9172523188</span>
              </a>
            </div>
          </div>

          {/* 2. INSTAGRAM BUTTON */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1c1218] via-[#1a1019] to-[#0d090d] p-6 border-2 border-[#d62976]/80 shadow-[0_6px_25px_rgba(214,41,118,0.25)] flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl text-white flex items-center justify-center text-2xl shadow-lg"
                  style={{
                    background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
                  }}
                >
                  <FaInstagram />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white font-sans">
                    Instagram Profile
                  </h2>
                  <span className="text-xs text-pink-400 font-semibold">
                    @milind_bhosale.1984
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-pink-400 block">
                  {followClicks.insta} Followers
                </span>
                <span className="text-[10px] text-stone-500">Pune Updates</span>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              Follow for daily Pune reels, Ganesh festival coverage, historic Puneri culture, and behind-the-scenes at Viraj Enterprise.
            </p>

            <a
              href="https://instagram.com/milind_bhosale.1984"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordClick('insta')}
              className="w-full py-3 px-4 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              style={{
                background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
              }}
            >
              <FaInstagram className="w-4 h-4" />
              <span>Follow on Instagram (@milind_bhosale.1984)</span>
            </a>
          </div>

          {/* 3. FACEBOOK BUTTON */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#10141d] via-[#0d121c] to-[#090b10] p-6 border-2 border-[#1877F2]/80 shadow-[0_6px_25px_rgba(24,119,242,0.25)] flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center text-2xl shadow-lg">
                  <FaFacebook />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-lg font-black text-white font-sans">
                      Facebook Page
                    </h2>
                    <FaCheckCircle className="text-[#1877F2] text-sm" title="Blue Tick Verified" />
                  </div>
                  <span className="text-xs text-sky-400 font-semibold">
                    MilindBhosale Official
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-sky-400 block">
                  1K+ Followers
                </span>
                <span className="text-[10px] text-sky-300 font-bold flex items-center justify-end gap-1">
                  ✓ Blue Tick
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              Join the 1,000+ member community for Pune civic discussions, festival broadcasts, and local business networking.
            </p>

            <a
              href="https://facebook.com/MilindBhosale"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordClick('fb')}
              className="w-full py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#1567d3] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <FaFacebook className="w-4 h-4" />
              <span>Follow on Facebook (1K+ Blue Tick)</span>
            </a>
          </div>

          {/* 4. WEBSITE BUTTON */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1a1711] via-[#17140e] to-[#0f0d09] p-6 border-2 border-[#D4AF37] shadow-[0_6px_25px_rgba(212,175,55,0.25)] flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-stone-950 flex items-center justify-center text-2xl shadow-lg">
                  <FaGlobe />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white font-serif">
                    Official Website
                  </h2>
                  <span className="text-xs text-amber-400 font-semibold">
                    virajenterprise.com
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-amber-300 block">
                  {followClicks.web}+ Visits
                </span>
                <span className="text-[10px] text-stone-500">Corporate Portal</span>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              Official headquarters, corporate services, advertising solutions, and IT consultancy services in Pune.
            </p>

            <a
              href="https://virajenterprise.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordClick('web')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <FaGlobe className="w-4 h-4" />
              <span>Visit virajenterprise.com</span>
            </a>
          </div>
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Social Connect Hub" />
      </div>
    </div>
  );
};
