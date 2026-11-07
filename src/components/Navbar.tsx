'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDrone } from '@/context/DroneContext';
import { Cpu, Thermometer, Table2, Radio } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { config, droneId } = useDrone();

  const navItems = [
    {
      href: '/',
      label: 'Page #1: View Config',
      icon: Cpu,
    },
    {
      href: '/log-form',
      label: 'Page #2: Temperature Log Form',
      icon: Thermometer,
    },
    {
      href: '/logs',
      label: 'Page #3: View Logs',
      icon: Table2,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white">
                Drone Control Center
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>ID: #{config?.drone_id ?? droneId}</span>
                {config?.drone_name && (
                  <>
                    <span>•</span>
                    <span className="text-sky-400 font-medium">{config.drone_name}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
