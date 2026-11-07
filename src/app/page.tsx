'use client';

import React from 'react';
import Link from 'next/link';
import { useDrone } from '@/context/DroneContext';
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
} from 'lucide-react';

export default function ViewConfigPage() {
  const { droneId, config, condition, loading, error, refreshConfig } = useDrone();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-sky-500/20 mb-2">
            <span>Page #1</span>
            <span>•</span>
            <span>Drone Configuration</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            View Config
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            แสดงข้อมูลการตั้งค่าของโดรน (Drone ID: <code className="text-sky-400 font-semibold">{droneId}</code> จากไฟล์ <code className="text-slate-300">.env</code>) ที่ดึงผ่าน API Server
          </p>
        </div>

        <button
          onClick={refreshConfig}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
          <span>Refresh Config</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-rose-300">เกิดข้อผิดพลาดในการดึงข้อมูลจาก API Server</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !config ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6"
            />
          ))}
        </div>
      ) : config ? (
        <>
          {/* Main 4 Required Config Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Drone ID */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:border-sky-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Drone ID
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Hash className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold text-white tracking-tight">
                {config.drone_id}
              </div>
              <p className="mt-1 text-xs text-slate-500">รหัสประจำตัวโดรนจาก .env</p>
            </div>

            {/* 2. Drone Name */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:border-indigo-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Drone Name
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Bot className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold text-white tracking-tight">
                {config.drone_name}
              </div>
              <p className="mt-1 text-xs text-slate-500">ชื่อเรียกหน่วยโดรน</p>
            </div>

            {/* 3. Light */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:border-amber-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Light
                </span>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    config.light?.toLowerCase() === 'on'
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Lightbulb className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <span className="text-2xl font-bold uppercase text-white tracking-tight">
                  {config.light}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    config.light?.toLowerCase() === 'on'
                      ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 ring-1 ring-slate-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      config.light?.toLowerCase() === 'on' ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}
                  />
                  {config.light?.toLowerCase() === 'on' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">สถานะไฟสัญญาณของโดรน</p>
            </div>

            {/* 4. Country */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Country
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Globe2 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold text-white tracking-tight">
                {config.country}
              </div>
              <p className="mt-1 text-xs text-slate-500">ประเทศประจำการของโดรน</p>
            </div>
          </div>

          {/* Summary Table & Additional Info */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h2 className="text-base font-semibold text-white">
                  ข้อมูล Config ที่บันทึกไว้สำหรับใช้งานใน Page #2 และ Page #3
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                {config.weight !== undefined && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1">
                    <Scale className="h-3.5 w-3.5 text-sky-400" />
                    Weight: <strong className="text-slate-200">{config.weight}</strong>
                  </span>
                )}
                {condition && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1">
                    <Activity className="h-3.5 w-3.5 text-indigo-400" />
                    Condition: <strong className="text-slate-200 uppercase">{condition}</strong>
                  </span>
                )}
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800/60">
                <dt className="text-xs text-slate-400">Drone ID</dt>
                <dd className="mt-1 font-mono text-base font-semibold text-white">
                  {config.drone_id}
                </dd>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800/60">
                <dt className="text-xs text-slate-400">Drone Name</dt>
                <dd className="mt-1 text-base font-semibold text-white">{config.drone_name}</dd>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800/60">
                <dt className="text-xs text-slate-400">Light</dt>
                <dd className="mt-1 text-base font-semibold text-white">{config.light}</dd>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800/60">
                <dt className="text-xs text-slate-400">Country</dt>
                <dd className="mt-1 text-base font-semibold text-white">{config.country}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/log-form"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                <span>ไปที่ Page #2: บันทึกอุณหภูมิ (Temperature Log Form)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/logs"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              >
                <span>ไปที่ Page #3: ดูประวัติ Log (View Logs)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
