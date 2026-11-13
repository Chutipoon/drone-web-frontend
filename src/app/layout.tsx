import type { Metadata } from 'next';
import './globals.css';
import { DroneProvider } from '@/context/DroneContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Drone Telemetry Field Log | Assignment #2',
  description:
    'Field Logbook & Telemetry System for Drone Config & Temperature Logging (Assignment #2)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen antialiased selection:bg-yellow-300 selection:text-stone-900">
        <DroneProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
              {children}
            </main>
            <footer className="py-8 text-center select-none">
              <div className="inline-block border-2 border-dashed border-[#574433] bg-[#715c48]/50 px-6 py-2.5 rounded-sm shadow-sm">
                <p className="text-xs font-mono tracking-widest text-[#ebd8c5] uppercase">
                  ASSIGNMENT #2 — DRONE TELEMETRY LOG • OFFICIAL FIELD RECORD
                </p>
                <p className="text-[10px] text-[#cfba9f] mt-0.5">
                  Connected via Assignment #1 API Server • Hand-logged Telemetry System
                </p>
              </div>
            </footer>
          </div>
        </DroneProvider>
      </body>
    </html>
  );
}
