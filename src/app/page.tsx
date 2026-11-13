'use client';

import React from 'react';
import Link from 'next/link';
import { useDrone } from '@/context/DroneContext';
import TornPaper from '@/components/TornPaper';
import {
  Hash,
  Bot,
  Lightbulb,
  Globe2,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Scale,
  Activity,
  FileText,
  Tag,
} from 'lucide-react';

export default function ViewConfigPage() {
  const { droneId, config, condition, loading, error, refreshConfig } = useDrone();

  return (
    <div className="space-y-8">
      {/* Header Section as a Torn Paper Notice */}
      <TornPaper
        punchHolesTop={true}
        tornBottom={true}
        variant={1}
        rotation="slight-left"
        className="w-full"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="rubber-stamp stamp-blue text-[11px] px-2 py-0.5">
                DOC REF #01
              </span>
              <span className="text-xs text-stone-500 font-bold">•</span>
              <span className="highlighter-yellow text-xs font-bold text-stone-900 uppercase">
                Drone Telemetry Specifications
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl uppercase">
              View Configuration
            </h1>
            <p className="mt-1 text-sm text-stone-600 font-mono">
              ข้อมูลการตั้งค่าประจำหน่วยโดรน (ID:{' '}
              <span className="font-bold text-stone-950 underline decoration-stone-400">
                {droneId}
              </span>{' '}
              จากไฟล์ <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-stone-800">.env</code>) ดึงผ่าน API Server
            </p>
          </div>

          <button
            onClick={refreshConfig}
            disabled={loading}
            className="rubber-stamp stamp-blue px-4 py-2.5 text-xs font-bold transition hover:bg-blue-100/60 active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm self-start sm:self-auto"
          >
            <RefreshCw
              className={`mr-2 inline h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            <span>[ RE-SYNC CONFIG ]</span>
          </button>
        </div>
      </TornPaper>

      {/* Error State */}
      {error && (
        <TornPaper
          variant={2}
          tornBottom={true}
          rotation="right"
          className="border-l-4 border-l-red-600"
        >
          <div className="flex items-start gap-3 text-red-950">
            <AlertCircle className="h-6 w-6 shrink-0 text-red-600 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-bold text-red-800 uppercase tracking-wide">
                [!] เกิดข้อผิดพลาดในการดึงข้อมูลจาก API Server
              </p>
              <p className="font-mono text-xs text-red-900">{error}</p>
            </div>
          </div>
        </TornPaper>
      )}

      {/* Loading Skeleton */}
      {loading && !config ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <TornPaper
              key={item}
              variant={item as 1 | 2 | 3}
              punchHolesTop={item % 2 === 1}
              tornBottom={true}
            >
              <div className="h-28 animate-pulse flex flex-col justify-between">
                <div className="h-4 bg-stone-300/60 rounded w-1/2" />
                <div className="h-8 bg-stone-300/80 rounded w-3/4" />
                <div className="h-3 bg-stone-300/50 rounded w-full" />
              </div>
            </TornPaper>
          ))}
        </div>
      ) : config ? (
        <>
          {/* Main 4 Required Config Cards as Individual Ripped Notebook Sheets */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Drone ID */}
            <TornPaper
              variant={1}
              punchHolesTop={true}
              tornBottom={true}
              rotation="slight-left"
              className="transition-transform"
            >
              <div className="flex items-center justify-between border-b border-stone-300/50 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  REF. ID
                </span>
                <div className="rubber-stamp stamp-blue text-[10px] px-1.5 py-0.5">
                  <Hash className="h-3.5 w-3.5 mr-0.5 inline" />
                  KEY
                </div>
              </div>
              <div className="mt-4 text-3xl font-black text-stone-900 tracking-tight font-mono">
                #{config.drone_id}
              </div>
              <p className="mt-2 text-[11px] text-stone-500 font-mono">
                รหัสประจำตัวโดรนจาก .env
              </p>
            </TornPaper>

            {/* 2. Drone Name */}
            <TornPaper
              variant={2}
              punchHolesTop={false}
              tornBottom={true}
              rotation="slight-right"
              className="transition-transform"
            >
              <div className="flex items-center justify-between border-b border-stone-300/50 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  UNIT CALLSIGN
                </span>
                <div className="rubber-stamp stamp-amber text-[10px] px-1.5 py-0.5">
                  <Bot className="h-3.5 w-3.5 mr-0.5 inline" />
                  NAME
                </div>
              </div>
              <div className="mt-4 text-2xl font-black text-stone-900 tracking-tight font-mono truncate">
                {config.drone_name}
              </div>
              <p className="mt-2 text-[11px] text-stone-500 font-mono">
                ชื่อเรียกหน่วยโดรน
              </p>
            </TornPaper>

            {/* 3. Light */}
            <TornPaper
              variant={3}
              punchHolesTop={true}
              tornBottom={true}
              rotation="slight-left"
              className="transition-transform"
            >
              <div className="flex items-center justify-between border-b border-stone-300/50 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  BEACON LIGHT
                </span>
                <div className="p-1 rounded bg-stone-200 text-stone-700">
                  <Lightbulb className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-black uppercase text-stone-900 tracking-tight font-mono">
                  {config.light}
                </span>
                <span
                  className={`rubber-stamp text-[10px] px-2 py-0.5 ${
                    config.light?.toLowerCase() === 'on'
                      ? 'stamp-green'
                      : 'stamp-red'
                  }`}
                >
                  {config.light?.toLowerCase() === 'on' ? 'ACTIVE' : 'OFFLINE'}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-stone-500 font-mono">
                สถานะไฟสัญญาณโดรน
              </p>
            </TornPaper>

            {/* 4. Country */}
            <TornPaper
              variant={1}
              punchHolesTop={false}
              tornBottom={true}
              rotation="slight-right"
              className="transition-transform"
            >
              <div className="flex items-center justify-between border-b border-stone-300/50 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  STATION NATION
                </span>
                <div className="rubber-stamp stamp-green text-[10px] px-1.5 py-0.5">
                  <Globe2 className="h-3.5 w-3.5 mr-0.5 inline" />
                  LOC
                </div>
              </div>
              <div className="mt-4 text-2xl font-black text-stone-900 tracking-tight font-mono truncate">
                {config.country}
              </div>
              <p className="mt-2 text-[11px] text-stone-500 font-mono">
                ประเทศประจำการ
              </p>
            </TornPaper>
          </div>

          {/* Full Field Record Sheet with Margin & Technical Specs */}
          <TornPaper
            punchHolesTop={true}
            tornBottom={true}
            variant={2}
            withMarginLine={true}
            className="w-full"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-300 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded border-2 border-stone-800 bg-[#ede4d4]">
                  <FileText className="h-5 w-5 text-stone-800" />
                </div>
                <div>
                  <h2 className="text-base font-black text-stone-900 uppercase tracking-tight">
                    TECHNICAL SPECIFICATIONS RECORD
                  </h2>
                  <p className="text-xs text-stone-600 font-mono">
                    ข้อมูลบันทึกสำหรับใช้งานร่วมกับ Page #2 และ Page #3
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {config.weight !== undefined && (
                  <span className="rubber-stamp stamp-blue text-[11px] px-2.5 py-1">
                    <Scale className="h-3.5 w-3.5 mr-1 inline text-blue-700" />
                    WEIGHT: {config.weight} KG
                  </span>
                )}
                {condition && (
                  <span className="rubber-stamp stamp-green text-[11px] px-2.5 py-1">
                    <Activity className="h-3.5 w-3.5 mr-1 inline text-green-700" />
                    STATUS: {condition.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Typewriter Parameter Grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border border-dashed border-stone-400/80 bg-stone-100/70 p-3.5 rounded-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  PARAMETER 01
                </div>
                <div className="text-xs text-stone-600 font-medium mt-0.5">Drone ID</div>
                <div className="mt-1 font-mono text-lg font-black text-stone-900">
                  #{config.drone_id}
                </div>
              </div>

              <div className="border border-dashed border-stone-400/80 bg-stone-100/70 p-3.5 rounded-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  PARAMETER 02
                </div>
                <div className="text-xs text-stone-600 font-medium mt-0.5">Callsign</div>
                <div className="mt-1 font-mono text-lg font-black text-stone-900 truncate">
                  {config.drone_name}
                </div>
              </div>

              <div className="border border-dashed border-stone-400/80 bg-stone-100/70 p-3.5 rounded-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  PARAMETER 03
                </div>
                <div className="text-xs text-stone-600 font-medium mt-0.5">Light Signal</div>
                <div className="mt-1 font-mono text-lg font-black text-stone-900 uppercase">
                  {config.light}
                </div>
              </div>

              <div className="border border-dashed border-stone-400/80 bg-stone-100/70 p-3.5 rounded-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  PARAMETER 04
                </div>
                <div className="text-xs text-stone-600 font-medium mt-0.5">Country Code</div>
                <div className="mt-1 font-mono text-lg font-black text-stone-900 truncate">
                  {config.country}
                </div>
              </div>
            </div>

            {/* Next Steps Paper Navigation Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-stone-300 pt-5">
              <Link
                href="/log-form"
                className="rubber-stamp stamp-blue px-4 py-3 text-xs font-black transition hover:bg-blue-100/80 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <span>[ ➔ GO TO PAGE #2: LOG TEMPERATURE ]</span>
                <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
              <Link
                href="/logs"
                className="rubber-stamp stamp-amber px-4 py-3 text-xs font-black transition hover:bg-amber-100/80 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <span>[ ➔ GO TO PAGE #3: FIELD LOGS ]</span>
                <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
            </div>
          </TornPaper>
        </>
      ) : null}
    </div>
  );
}
