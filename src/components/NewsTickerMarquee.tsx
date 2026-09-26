import React from 'react';
import { Radio, ChevronRight, Newspaper } from 'lucide-react';

interface NewsTickerMarqueeProps {
  onNavigateNews: () => void;
  className?: string;
}

export const NewsTickerMarquee: React.FC<NewsTickerMarqueeProps> = ({
  onNavigateNews,
  className = '',
}) => {
  const tickerItems = [
    '🔴 LIVE: पुण्यात स्वारगेट ते कात्रज मेट्रो मार्गाच्या कामाला वेग',
    'महाराष्ट्र: लाडकी बहीण योजनेचे नवीन ₹१,५०० हप्ते थेट खात्यात जमा',
    'Bank Holiday: आज बँक चालू आहे का? RBI २०२६ सुट्ट्यांची स्थिती पहा',
    'Aajcha San: कालनिर्णय पंचांग व आगामी सण उत्सव दिनदर्शिका',
    'IPL 2026: गहुंजे MCA स्टेडियमवर रंगणार पुणे महामुकाबला थेट स्कोअर',
    'हवामान: पुण्यात आज २८°C ते ३१°C दरम्यान आल्हाददायक वातावरण',
  ];

  return (
    <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-1 ${className}`}>
      <div
        onClick={onNavigateNews}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c0d0d] via-[#141419] to-[#1a1408] border border-[#D4AF37]/60 shadow-[0_2px_15px_rgba(212,175,55,0.2)] p-2 sm:p-2.5 flex items-center gap-3 cursor-pointer group hover:border-[#D4AF37] transition-all"
        title="ताजी बातमी वाचण्यासाठी क्लिक करा"
      >
        {/* Left Live Badge like TV news channel */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-600 text-white font-black text-[10px] sm:text-xs tracking-wider uppercase shrink-0 shadow-md animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          <span>LIVE NEWS</span>
        </div>

        {/* Marquee Text Container */}
        <div className="flex-1 overflow-hidden relative whitespace-nowrap">
          <div className="inline-block animate-marquee group-hover:[animation-play-state:paused]">
            <span className="text-xs sm:text-sm font-semibold text-stone-200">
              {tickerItems.join('  •  ')}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-stone-200 ml-8">
              {tickerItems.join('  •  ')}
            </span>
          </div>
        </div>

        {/* Right Clickable Indicator */}
        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform hidden sm:flex">
          <span>सर्व वाचा</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
