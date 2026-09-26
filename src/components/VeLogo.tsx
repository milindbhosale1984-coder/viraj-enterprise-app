import React from 'react';

interface VeLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const VeLogo: React.FC<VeLogoProps> = ({
  size = 48,
  className = '',
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Royal Crest SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)] transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Royal Gold Gradients */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>

          <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#B78103" />
          </linearGradient>

          <radialGradient id="darkBg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="70%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shadow Ring */}
        <circle cx="60" cy="60" r="58" fill="url(#darkBg)" stroke="url(#goldRim)" strokeWidth="3" />

        {/* Laurel Wreath / Beaded Border Accent */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="url(#goldRim)"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.85"
        />

        {/* Inner Gold Frame */}
        <circle cx="60" cy="60" r="48" fill="none" stroke="url(#goldRim)" strokeWidth="1" />

        {/* Laurel Wreath Leaves (Left & Right) */}
        <g stroke="url(#goldRim)" strokeWidth="1.5" fill="none" opacity="0.9">
          {/* Left Wreath */}
          <path d="M 24 60 C 24 40, 36 26, 52 20" />
          <path d="M 23 48 C 28 46, 31 50, 27 54" fill="url(#goldRim)" />
          <path d="M 27 38 C 32 36, 35 41, 30 44" fill="url(#goldRim)" />
          <path d="M 34 29 C 39 28, 41 33, 37 36" fill="url(#goldRim)" />
          <path d="M 44 23 C 48 23, 50 28, 46 30" fill="url(#goldRim)" />

          {/* Right Wreath */}
          <path d="M 96 60 C 96 40, 84 26, 68 20" />
          <path d="M 97 48 C 92 46, 89 50, 93 54" fill="url(#goldRim)" />
          <path d="M 93 38 C 88 36, 85 41, 90 44" fill="url(#goldRim)" />
          <path d="M 86 29 C 81 28, 79 33, 83 36" fill="url(#goldRim)" />
          <path d="M 76 23 C 72 23, 70 28, 74 30" fill="url(#goldRim)" />
        </g>

        {/* Crown / Star Accent at Top */}
        <path
          d="M 54 26 L 60 17 L 66 26 L 62 25 L 60 22 L 58 25 Z"
          fill="url(#goldRim)"
        />

        {/* VE Bold Monogram Center */}
        <text
          x="60"
          y="69"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Georgia, serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="1"
          fill="url(#goldText)"
          filter="url(#goldGlow)"
        >
          VE
        </text>

        {/* Bottom Curved Ribbon Text: VIRAJ ENTERPRISE */}
        <path
          id="textCurve"
          d="M 26 78 C 36 102, 84 102, 94 78"
          fill="none"
        />
        <text fontSize="7.5" fontFamily="sans-serif" fontWeight="800" fill="url(#goldRim)" letterSpacing="1.2">
          <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
            VIRAJ ENTERPRISE
          </textPath>
        </text>

        {/* Small Bottom Star & PUNE */}
        <text
          x="60"
          y="108"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontWeight="800"
          fontSize="6"
          letterSpacing="2.5"
          fill="#D4AF37"
        >
          ★ PUNE ★
        </text>
      </svg>

      {/* Optional Wordmark */}
      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-sm sm:text-base font-black tracking-wider text-amber-400 font-serif">
              VIRAJ ENTERPRISE
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 font-bold rounded border border-amber-400/30 uppercase tracking-widest">
              PUNE
            </span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium tracking-wide">
            Pune AI Agent • Official Portal
          </p>
        </div>
      )}
    </div>
  );
};
