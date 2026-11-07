import type { Metadata } from 'next';
import './globals.css';
import { DroneProvider } from '@/context/DroneContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Drone Control Center | Assignment #2',
  description: 'Web Frontend for Drone Config & Temperature Logging (Assignment #2)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        <DroneProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
              {children}
            </main>
            <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
              Assignment #2 — Drone Telemetry Web Frontend • Connected via Assignment #1 API Server
            </footer>
          </div>
        </DroneProvider>
      </body>
    </html>
  );
}
