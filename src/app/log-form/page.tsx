'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDrone } from '@/context/DroneContext';
import {
  Thermometer,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
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
      const message = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการส่งข้อมูลไปที่ API Server';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-sky-500/20 mb-2">
          <span>Page #2</span>
          <span>•</span>
          <span>POST /logs</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Temperature Log Form
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          บันทึกค่าอุณหภูมิ (Celsius) ของโดรนไปยัง API Server โดยใช้ข้อมูล{' '}
          <code className="text-slate-300">drone_id</code>,{' '}
          <code className="text-slate-300">drone_name</code> และ{' '}
          <code className="text-slate-300">country</code> จากค่า Config
        </p>
      </div>

      {/* Active Drone Config Badge */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          ข้อมูลโดรนจาก Config (Page #1) ที่จะถูกส่งไปพร้อมกับอุณหภูมิ
        </div>
        {configLoading && !config ? (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
            <span>กำลังโหลดข้อมูล Config...</span>
          </div>
        ) : config ? (
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-slate-950/70 p-3 border border-slate-800/80">
              <div className="text-xs text-slate-400">drone_id</div>
              <div className="mt-0.5 font-mono font-semibold text-white">{config.drone_id}</div>
            </div>
            <div className="rounded-xl bg-slate-950/70 p-3 border border-slate-800/80">
              <div className="text-xs text-slate-400">drone_name</div>
              <div className="mt-0.5 font-semibold text-sky-400">{config.drone_name}</div>
            </div>
            <div className="rounded-xl bg-slate-950/70 p-3 border border-slate-800/80">
              <div className="text-xs text-slate-400">country</div>
              <div className="mt-0.5 font-semibold text-emerald-400">{config.country}</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-rose-400">
            {configError || 'ไม่พบข้อมูล Config ของโดรน'}
          </div>
        )}
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl space-y-6"
      >
        <div>
          <label
            htmlFor="celsius"
            className="block text-sm font-semibold text-slate-200"
          >
            Temperature in celsius
          </label>
          <p className="mt-1 text-xs text-slate-400">
            ป้อนค่าอุณหภูมิในหน่วยองศาเซลเซียส (°C) ที่ต้องการบันทึก
          </p>
          <div className="relative mt-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Thermometer className="h-5 w-5 text-sky-400" />
            </div>
            <input
              id="celsius"
              name="celsius"
              type="number"
              step="any"
              required
              value={celsius}
              onChange={(e) => setCelsius(e.target.value)}
              placeholder="เช่น 45"
              className="block w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-12 pr-14 text-base text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-sm font-semibold text-slate-400">
              °C
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || !config}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:from-sky-400 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit data</span>
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {submitError && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="text-sm">{submitError}</div>
        </div>
      )}

      {/* Success Message */}
      {submittedRecord && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-100 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-300 font-semibold">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span>บันทึกข้อมูล Log อุณหภูมิสำเร็จ!</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl bg-slate-950/60 p-3 border border-emerald-500/20">
              <span className="text-slate-400">Drone ID</span>
              <div className="mt-1 font-mono font-bold text-white">{submittedRecord.drone_id}</div>
            </div>
            <div className="rounded-xl bg-slate-950/60 p-3 border border-emerald-500/20">
              <span className="text-slate-400">Drone Name</span>
              <div className="mt-1 font-bold text-white">{submittedRecord.drone_name}</div>
            </div>
            <div className="rounded-xl bg-slate-950/60 p-3 border border-emerald-500/20">
              <span className="text-slate-400">Country</span>
              <div className="mt-1 font-bold text-white">{submittedRecord.country}</div>
            </div>
            <div className="rounded-xl bg-slate-950/60 p-3 border border-emerald-500/20">
              <span className="text-slate-400">Celsius</span>
              <div className="mt-1 font-bold text-sky-400">{submittedRecord.celsius} °C</div>
            </div>
          </div>
          <div>
            <Link
              href="/logs"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <span>ดูรายการที่เพิ่งบันทึกใน Page #3: View Logs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
