'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDrone } from '@/context/DroneContext';
import { Cpu, Thermometer, Table2, Radio, Stamp } from 'lucide-react';

// Long ripped paper bottom path for the navbar
const NAVBAR_TEAR_WHITE =
  'M0,0 L1200,0 L1200,10 L1170,22 L1140,12 L1110,26 L1080,14 L1050,23 L1020,11 L990,25 L960,13 L930,24 L900,10 L870,26 L840,12 L810,24 L780,11 L750,25 L720,13 L690,23 L660,10 L630,24 L600,12 L570,26 L540,11 L510,24 L480,13 L450,25 L420,11 L390,24 L360,10 L330,26 L300,13 L270,24 L240,11 L210,25 L180,12 L150,24 L120,10 L90,25 L60,12 L30,23 L0,15 Z';

const NAVBAR_TEAR_PAPER =
  'M0,0 L1200,0 L1200,5 L1170,14 L1140,6 L1110,18 L1080,8 L1050,16 L1020,5 L990,17 L960,7 L930,16 L900,4 L870,18 L840,7 L810,16 L780,5 L750,17 L720,7 L690,15 L660,4 L630,16 L600,6 L570,18 L540,5 L510,16 L480,7 L450,17 L420,5 L390,16 L360,4 L330,18 L300,7 L270,16 L240,5 L210,17 L180,6 L150,16 L120,4 L90,17 L60,6 L30,15 L0,8 Z';

export default function Navbar() {
  const pathname = usePathname();
  const { config, droneId } = useDrone();

  const navItems = [
    {
      href: '/',
      number: 'PAGE #1',
      label: 'View Config',
      icon: Cpu,
    },
    {
      href: '/log-form',
      number: 'PAGE #2',
      label: 'Log Form',
      icon: Thermometer,
    },
    {
      href: '/logs',
      number: 'PAGE #3',
      label: 'View Logs',
      icon: Table2,
    },
  ];

  const activeDroneId = config?.drone_id ?? droneId;
  const droneName = config?.drone_name;

  return (
    <header className="sticky top-0 z-40 filter drop-shadow-[0_8px_16px_rgba(35,20,10,0.38)]">
      {/* Paper Header Strip */}
      <div className="notebook-ruled border-b border-stone-300/50 bg-[#f8f4ea] text-stone-900">
        {/* Tiny Punch Hole Stitch Line along top */}
        <div className="flex items-center justify-between px-4 pt-1.5 pb-1 opacity-70">
          <div className="flex items-center gap-4 text-[10px] tracking-widest text-stone-500 uppercase font-bold">
            <span>• FIELD OBSERVATION LOG •</span>
            <span className="hidden sm:inline">SERIAL NO. #{activeDroneId}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-mono">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          {/* Logo / Drone Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-sm border-2 border-stone-800 bg-[#ede4d4] text-stone-900 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] transition-transform group-hover:-translate-y-0.5">
              <Radio className="h-6 w-6 text-stone-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-stone-900 uppercase">
                  DRONE TELEMETRY
                </span>
                <span className="rubber-stamp stamp-blue text-[10px] px-1.5 py-0.2 -rotate-1">
                  SYS//LOG
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600 font-mono">
                <span className="font-bold text-stone-800">DRONE #{activeDroneId}</span>
                {droneName && (
                  <>
                    <span>•</span>
                    <span className="highlighter-yellow font-bold text-stone-900">
                      {droneName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>

          {/* Navigation Index Tabs */}
          <nav className="flex flex-wrap items-center gap-2 pt-1 pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold uppercase transition-all ${
                    isActive
                      ? 'bg-[#ffffff] text-stone-950 border-2 border-stone-800 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] -translate-y-0.5'
                      : 'bg-[#ede5d5] text-stone-700 border border-stone-400/80 hover:bg-[#fff9ee] hover:text-stone-950 hover:border-stone-700'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? 'text-stone-900' : 'text-stone-500 group-hover:text-stone-800'
                    }`}
                  />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] font-semibold tracking-wider text-stone-500">
                      {item.number}
                    </span>
                    <span className="tracking-tight">{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-rose-600 border border-stone-900" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Ripped Edge at Bottom of Header */}
      <div className="relative w-full overflow-hidden leading-none -mt-px pointer-events-none select-none">
        <svg
          viewBox="0 0 1200 28"
          preserveAspectRatio="none"
          className="w-full h-4 sm:h-5 block"
        >
          {/* White torn paper fiber underlayer */}
          <path fill="#ffffff" d={NAVBAR_TEAR_WHITE} />
          {/* Paper surface */}
          <path fill="#f8f4ea" d={NAVBAR_TEAR_PAPER} />
        </svg>
      </div>
    </header>
  );
}
