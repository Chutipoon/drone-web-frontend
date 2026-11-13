'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDrone } from '@/context/DroneContext';
import TornPaper from '@/components/TornPaper';
import {
  Thermometer,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  FileSpreadsheet,
  Stamp,
} from 'lucide-react';

interface SubmittedRecord {
  drone_id: number;
  drone_name: string;
  country: string;
  celsius: number;
  created?: string;
}

export default function TemperatureLogFormPage() {
  const { config, loading: configLoading, error: configError } = useDrone();
  const [celsius, setCelsius] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<SubmittedRecord | null>(null);

  const apiUrl = (process.env.API_URL || 'http://localhost:4000').replace(/\/$/, '');
  const logPath = process.env.LOG_PATH || '/logs';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmittedRecord(null);

    if (!config) {
      setSubmitError('ยังไม่มีข้อมูล Config ของโดรน กรุณารอสักครู่หรือกลับไปหน้า Page #1');
      return;
    }

    const numericCelsius = Number(celsius);
    if (celsius.trim() === '' || Number.isNaN(numericCelsius)) {
      setSubmitError('กรุณากรอกค่าอุณหภูมิ (Temperature in celsius) เป็นตัวเลขที่ถูกต้อง');
      return;
    }

    setSubmitting(true);
    try {
      // Strictly send ONLY drone_id, drone_name, country, celsius per Assignment #2 specification
      const payload = {
        drone_id: config.drone_id,
        drone_name: config.drone_name,
        country: config.country,
        celsius: numericCelsius,
      };

      const response = await fetch(`${apiUrl}${logPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || `บันทึกข้อมูลไม่สำเร็จ (Status ${response.status})`);
      }

      const data = await response.json();
      setSubmittedRecord({
        drone_id: payload.drone_id,
        drone_name: payload.drone_name,
        country: payload.country,
        celsius: payload.celsius,
        created: data.created,
      });
      setCelsius('');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการส่งข้อมูลไปที่ API Server';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Page Title Notice Header */}
      <TornPaper
        punchHolesTop={true}
        tornBottom={true}
        variant={3}
        rotation="slight-left"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="rubber-stamp stamp-blue text-[11px] px-2 py-0.5">
            DOC REF #02
          </span>
          <span className="text-xs text-stone-500 font-bold">•</span>
          <span className="highlighter-yellow text-xs font-bold text-stone-900 uppercase">
            POST /logs
          </span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl uppercase">
          Temperature Observation Form
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 font-mono">
          แบบฟอร์มบันทึกค่าอุณหภูมิ (°C) ของโดรนลงสมุดบันทึกภาคสนาม ส่งผ่าน API Server
        </p>
      </TornPaper>

      {/* Main Ruled Form Sheet */}
      <TornPaper
        punchHolesTop={true}
        tornBottom={true}
        variant={1}
        withMarginLine={true}
      >
        {/* Pre-filled Config Strip */}
        <div className="border-b-2 border-stone-800 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-widest text-stone-700">
              OPERATING UNIT IDENTIFICATION
            </span>
            <span className="rubber-stamp stamp-green text-[10px] px-2 py-0.2">
              VERIFIED CONFIG
            </span>
          </div>

          {configLoading && !config ? (
            <div className="mt-3 flex items-center gap-2 text-xs text-stone-600 font-mono">
              <Loader2 className="h-4 w-4 animate-spin text-stone-800" />
              <span>กำลังโหลดข้อมูลประจำหน่วยโดรน...</span>
            </div>
          ) : config ? (
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="border border-dashed border-stone-400 bg-stone-100/60 p-2.5 rounded-sm">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">
                  DRONE_ID
                </span>
                <span className="text-base font-black text-stone-900">
                  #{config.drone_id}
                </span>
              </div>
              <div className="border border-dashed border-stone-400 bg-stone-100/60 p-2.5 rounded-sm">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">
                  DRONE_NAME
                </span>
                <span className="text-sm font-black text-stone-900 truncate block">
                  {config.drone_name}
                </span>
              </div>
              <div className="border border-dashed border-stone-400 bg-stone-100/60 p-2.5 rounded-sm">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">
                  COUNTRY
                </span>
                <span className="text-sm font-black text-stone-900 truncate block">
                  {config.country}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-xs text-red-800 font-bold">
              {configError || 'ไม่พบข้อมูล Config ของโดรน กรุณาเปิด Page #1'}
            </div>
          )}
        </div>

        {/* Input Form with Ruled Fill-in-the-blank line */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="celsius"
                className="block text-sm font-black uppercase tracking-wide text-stone-900"
              >
                1. TEMPERATURE READING (°C)
              </label>
              <span className="text-[10px] text-stone-500 font-mono">
                [REQUIRED FIELD]
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-600 font-mono">
              ป้อนค่าอุณหภูมิในหน่วยองศาเซลเซียสที่วัดได้จากเซนเซอร์ภาคสนาม
            </p>

            {/* Hand-written / Typewriter Underlined Input */}
            <div className="relative mt-4 flex items-center border-b-2 border-stone-800 pb-1">
              <div className="text-stone-700 mr-3">
                <Thermometer className="h-6 w-6 text-stone-800" />
              </div>
              <input
                id="celsius"
                name="celsius"
                type="number"
                step="any"
                required
                value={celsius}
                onChange={(e) => setCelsius(e.target.value)}
                placeholder="เช่น 28.5"
                className="w-full bg-transparent font-mono text-2xl font-black text-stone-950 placeholder-stone-400 focus:outline-none"
              />
              <span className="text-lg font-black text-stone-800 ml-2 font-mono">
                °C
              </span>
            </div>
          </div>

          {/* Rubber Stamp Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || !config}
              className="rubber-stamp stamp-blue w-full py-3.5 text-sm sm:text-base font-black tracking-widest cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,0.85)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>TRANSMITTING TELEMETRY...</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  <span>[ ✦ TRANSMIT & STAMP LOG ENTRY ✦ ]</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </TornPaper>

      {/* Error Stamped Slip */}
      {submitError && (
        <TornPaper
          variant={2}
          tornBottom={true}
          rotation="right"
          className="border-l-4 border-l-red-700"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 shrink-0 text-red-700 mt-0.5" />
            <div>
              <p className="font-black text-red-800 uppercase tracking-wide text-xs sm:text-sm">
                [!] LOGGING REJECTED / ส่งข้อมูลไม่สำเร็จ
              </p>
              <p className="text-xs text-red-900 font-mono mt-1">{submitError}</p>
            </div>
          </div>
        </TornPaper>
      )}

      {/* Success Stamped Slip */}
      {submittedRecord && (
        <TornPaper
          variant={1}
          punchHolesTop={true}
          tornBottom={true}
          rotation="slight-right"
          className="border-l-4 border-l-emerald-700"
        >
          <div className="flex items-center justify-between border-b border-stone-300 pb-3">
            <div className="flex items-center gap-2 text-emerald-900">
              <CheckCircle2 className="h-6 w-6 text-emerald-700" />
              <span className="font-black uppercase tracking-wide text-sm sm:text-base">
                TELEMETRY LOG VERIFIED & STAMPED!
              </span>
            </div>
            <span className="rubber-stamp stamp-green text-[10px] px-2 py-0.5">
              ACCEPTED
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="border border-stone-300 bg-stone-100/80 p-2.5 rounded">
              <span className="text-[10px] text-stone-500 font-bold block">DRONE ID</span>
              <span className="text-sm font-black text-stone-900">
                #{submittedRecord.drone_id}
              </span>
            </div>
            <div className="border border-stone-300 bg-stone-100/80 p-2.5 rounded">
              <span className="text-[10px] text-stone-500 font-bold block">NAME</span>
              <span className="text-sm font-black text-stone-900 truncate block">
                {submittedRecord.drone_name}
              </span>
            </div>
            <div className="border border-stone-300 bg-stone-100/80 p-2.5 rounded">
              <span className="text-[10px] text-stone-500 font-bold block">COUNTRY</span>
              <span className="text-sm font-black text-stone-900 truncate block">
                {submittedRecord.country}
              </span>
            </div>
            <div className="border border-stone-300 bg-stone-100/80 p-2.5 rounded">
              <span className="text-[10px] text-stone-500 font-bold block">RECORDED CELSIUS</span>
              <span className="text-sm font-black text-stone-950 block highlighter-yellow">
                {submittedRecord.celsius} °C
              </span>
            </div>
          </div>

          <div className="mt-6 border-t border-stone-300 pt-4">
            <Link
              href="/logs"
              className="rubber-stamp stamp-green text-xs font-black px-4 py-2.5 hover:bg-green-100/80 transition-colors inline-flex items-center gap-2"
            >
              <span>[ ➔ VIEW RECORD IN PAGE #3: FIELD LOGS ]</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </TornPaper>
      )}
    </div>
  );
}
