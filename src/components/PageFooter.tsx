import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { VeLogo } from './VeLogo';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';
import { recordWhatsAppClick } from '../utils/sheet';

interface PageFooterProps {
  pageName?: string;
  className?: string;
}

export const PageFooter: React.FC<PageFooterProps> = ({ pageName = '', className = '' }) => {
  const handleWhatsApp = (number: string = '9021745403') => {
    recordWhatsAppClick(`Page Footer Click (${pageName || 'App'})`);
    const text = encodeURIComponent(
      `Namaste Milind Bhosale (Viraj Enterprise Pune), I am visiting ${pageName || 'Pune Super App'} and need assistance.`
    );
    window.open(`https://wa.me/91${number}?text=${text}`, '_blank');
  };

  return (
    <footer className={`w-full max-w-5xl mx-auto my-8 px-4 ${className}`}>
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0d0d11] via-[#16161d] to-[#0d0d11] border-2 border-[#D4AF37] p-5 sm:p-6 shadow-[0_4px_25px_rgba(212,175,55,0.2)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* VE Brand Info */}
          <div className="flex items-center gap-3">
            <VeLogo size={46} />
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-sm sm:text-base font-black text-white font-serif tracking-tight">
                  VIRAJ ENTERPRISE • PUNE
                </span>
                <span className="text-[9px] bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-black px-1.5 py-0.2 rounded uppercase">
                  Official
                </span>
              </div>
              <p className="text-xs text-amber-300 font-semibold mt-0.5">
                Owner: <strong className="text-white">Milind Bhosale</strong> • Pune AI Super App
              </p>
              <p className="text-[11px] text-stone-400">
                Bhekrai Nagar, Fursungi, Tal Haveli, Dist Pune - 412308
              </p>
            </div>
          </div>

          {/* Action WhatsApp & Direct Call Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            {/* Primary WhatsApp 9021745403 */}
            <button
              type="button"
              onClick={() => handleWhatsApp('9021745403')}
              className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp: 9021745403</span>
            </button>

            {/* Secondary WhatsApp 72523188 */}
            <button
              type="button"
              onClick={() => handleWhatsApp('72523188')}
              className="py-2.5 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-amber-400 font-semibold text-xs border border-amber-400/40 flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
              <span>9172523188</span>
            </button>

            {/* Call button */}
            <a
              href="tel:9021745403"
              className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <FaPhoneAlt className="w-3 h-3" />
              <span>कॉल करा</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-4 pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400">
          <span>© 2026 Viraj Enterprise. All rights reserved. Made for Pune with ❤️</span>
          <span className="text-amber-400 font-medium">पुणे तिथे काय उणे! • Verified Portal</span>
        </div>
      </div>
    </footer>
  );
};
