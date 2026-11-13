'use client';

import React from 'react';

export interface TornPaperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 1 | 2 | 3;
  tornBottom?: boolean;
  tornTop?: boolean;
  punchHolesTop?: boolean;
  withMarginLine?: boolean;
  rotation?: 'none' | 'left' | 'right' | 'slight-left' | 'slight-right';
  noPadding?: boolean;
}

// Organic torn jagged paths for 1200px width
// Variant 1: Gentle natural tear
const TEAR_V1_WHITE =
  'M0,0 L1200,0 L1200,12 L1175,22 L1150,14 L1120,26 L1090,16 L1065,24 L1030,12 L1000,28 L970,18 L940,24 L910,14 L880,27 L850,15 L820,29 L790,16 L760,25 L730,14 L700,28 L670,17 L640,26 L610,13 L580,28 L550,16 L520,27 L490,14 L460,28 L430,17 L400,26 L370,14 L340,29 L310,16 L280,27 L250,15 L220,28 L190,14 L160,26 L130,17 L100,29 L70,14 L40,26 L15,18 L0,25 Z';

const TEAR_V1_PAPER =
  'M0,0 L1200,0 L1200,6 L1175,15 L1150,8 L1120,18 L1090,10 L1065,16 L1030,7 L1000,20 L970,11 L940,17 L910,8 L880,19 L850,9 L820,21 L790,10 L760,18 L730,8 L700,20 L670,11 L640,19 L610,7 L580,20 L550,10 L520,19 L490,8 L460,20 L430,11 L400,18 L370,8 L340,21 L310,10 L280,19 L250,9 L220,20 L190,8 L160,18 L130,11 L100,21 L70,8 L40,18 L15,11 L0,18 Z';

// Variant 2: Deeper, uneven rip with shredded drip accents
const TEAR_V2_WHITE =
  'M0,0 L1200,0 L1200,18 L1180,8 L1155,27 L1130,12 L1105,31 L1080,14 L1050,22 L1020,33 L990,14 L965,28 L935,11 L905,31 L875,16 L845,29 L815,10 L785,34 L755,14 L725,28 L695,12 L665,30 L635,16 L605,32 L575,13 L545,29 L515,15 L485,33 L455,12 L425,30 L395,14 L365,32 L335,11 L305,30 L275,16 L245,33 L215,12 L185,28 L155,15 L125,31 L95,10 L65,28 L35,14 L0,29 Z';

const TEAR_V2_PAPER =
  'M0,0 L1200,0 L1200,10 L1180,3 L1155,19 L1130,6 L1105,22 L1080,8 L1050,15 L1020,24 L990,7 L965,20 L935,5 L905,22 L875,9 L845,20 L815,5 L785,25 L755,8 L725,19 L695,6 L665,21 L635,9 L605,23 L575,7 L545,20 L515,8 L485,24 L455,6 L425,21 L395,8 L365,23 L335,5 L305,21 L275,9 L245,24 L215,6 L185,19 L155,8 L125,22 L95,4 L65,19 L35,8 L0,20 Z';

// Variant 3: Angular shredded tear
const TEAR_V3_WHITE =
  'M0,0 L1200,0 L1200,14 L1170,24 L1145,11 L1115,28 L1085,15 L1055,27 L1025,12 L995,30 L965,16 L935,27 L905,13 L875,29 L845,15 L815,26 L785,11 L755,30 L725,15 L695,27 L665,13 L635,31 L605,16 L575,28 L545,12 L515,29 L485,16 L455,27 L425,11 L395,30 L365,15 L335,28 L305,13 L275,29 L245,14 L215,27 L185,12 L155,29 L125,15 L95,28 L65,12 L35,27 L0,18 Z';

const TEAR_V3_PAPER =
  'M0,0 L1200,0 L1200,7 L1170,16 L1145,5 L1115,19 L1085,8 L1055,18 L1025,6 L995,21 L965,9 L935,18 L905,6 L875,20 L845,8 L815,17 L785,5 L755,21 L725,8 L695,18 L665,6 L635,22 L605,9 L575,19 L545,6 L515,20 L485,9 L455,18 L425,5 L395,21 L365,8 L335,19 L305,6 L275,20 L245,7 L215,18 L185,6 L155,20 L125,8 L95,19 L65,6 L35,18 L0,10 Z';

// Top Tear paths (inverted)
const TOP_TEAR_WHITE =
  'M0,32 L1200,32 L1200,18 L1170,8 L1140,21 L1110,6 L1080,22 L1050,9 L1020,24 L990,7 L960,21 L930,9 L900,23 L870,8 L840,22 L810,6 L780,24 L750,9 L720,21 L690,7 L660,22 L630,8 L600,23 L570,7 L540,22 L510,9 L480,23 L450,7 L420,22 L390,8 L360,23 L330,6 L300,22 L270,9 L240,24 L210,7 L180,21 L150,9 L120,22 L90,8 L60,24 L30,9 L0,19 Z';

const TOP_TEAR_PAPER =
  'M0,32 L1200,32 L1200,24 L1170,16 L1140,27 L1110,14 L1080,28 L1050,17 L1020,30 L990,15 L960,27 L930,17 L900,29 L870,16 L840,28 L810,14 L780,30 L750,17 L720,27 L690,15 L660,28 L630,16 L600,29 L570,15 L540,28 L510,17 L480,29 L450,15 L420,28 L390,16 L360,29 L330,14 L300,28 L270,17 L240,30 L210,15 L180,27 L150,17 L120,28 L90,16 L60,30 L30,17 L0,25 Z';

export default function TornPaper({
  children,
  className = '',
  variant = 1,
  tornBottom = true,
  tornTop = false,
  punchHolesTop = false,
  withMarginLine = false,
  rotation = 'none',
  noPadding = false,
}: TornPaperProps) {
  const getBottomPath = () => {
    switch (variant) {
      case 2:
        return { white: TEAR_V2_WHITE, paper: TEAR_V2_PAPER };
      case 3:
        return { white: TEAR_V3_WHITE, paper: TEAR_V3_PAPER };
      default:
        return { white: TEAR_V1_WHITE, paper: TEAR_V1_PAPER };
    }
  };

  const getRotationClass = () => {
    switch (rotation) {
      case 'left':
        return '-rotate-1 hover:rotate-0 transition-transform duration-300';
      case 'right':
        return 'rotate-1 hover:rotate-0 transition-transform duration-300';
      case 'slight-left':
        return '-rotate-[0.5deg] hover:rotate-0 transition-transform duration-300';
      case 'slight-right':
        return 'rotate-[0.5deg] hover:rotate-0 transition-transform duration-300';
      default:
        return '';
    }
  };

  const bottomPaths = getBottomPath();

  return (
    <div
      className={`relative filter drop-shadow-[0_8px_16px_rgba(40,25,12,0.32)] ${getRotationClass()} ${className}`}
    >
      {/* Top Torn Edge */}
      {tornTop && (
        <div className="relative w-full overflow-hidden leading-none -mb-px pointer-events-none select-none z-10">
          <svg
            viewBox="0 0 1200 32"
            preserveAspectRatio="none"
            className="w-full h-5 sm:h-6 block"
          >
            {/* White fiber underlayer */}
            <path fill="#ffffff" d={TOP_TEAR_WHITE} />
            {/* Cream paper layer */}
            <path fill="#f8f4ea" d={TOP_TEAR_PAPER} />
          </svg>
        </div>
      )}

      {/* Main Paper Body with Lined Texture */}
      <div
        className={`relative z-0 ${
          withMarginLine ? 'notebook-ruled-margin' : 'notebook-ruled'
        } ${!tornTop && !punchHolesTop ? 'rounded-t-sm' : ''} ${
          !tornBottom ? 'rounded-b-sm' : ''
        } text-stone-900 border-x border-stone-300/40`}
      >
        {/* Optional Punch Holes Bar */}
        {punchHolesTop && (
          <div className="flex items-center justify-between px-6 pt-3 pb-2 border-b border-stone-300/70 select-none">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#705c49] shadow-[inset_0_2px_3px_rgba(0,0,0,0.65)] border border-[#524131]/40"
              />
            ))}
          </div>
        )}

        {/* Paper Content */}
        <div className={noPadding ? '' : 'p-5 sm:p-7'}>{children}</div>
      </div>

      {/* Bottom Torn Edge */}
      {tornBottom && (
        <div className="relative w-full overflow-hidden leading-none -mt-px pointer-events-none select-none z-10">
          <svg
            viewBox="0 0 1200 36"
            preserveAspectRatio="none"
            className="w-full h-5 sm:h-7 block"
          >
            {/* White fiber layer */}
            <path fill="#ffffff" d={bottomPaths.white} />
            {/* Cream paper layer */}
            <path fill="#f8f4ea" d={bottomPaths.paper} />
          </svg>
        </div>
      )}
    </div>
  );
}
