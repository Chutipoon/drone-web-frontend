'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDrone } from '@/context/DroneContext';
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
} from 'lucide-react';

interface DroneLogRecord {
  drone_id: number;
  drone_name: string;
  created: string;
  country: string;
  celsius: number;
}

const ITEMS_PER_PAGE = 12;

export default function ViewLogsPage() {
  const { droneId, config } = useDrone();
  const activeDroneId = config?.drone_id ?? droneId;

  const apiUrl = (process.env.API_URL || 'http://localhost:4000').replace(/\/$/, '');
  const logPath = process.env.LOG_PATH || '/logs';

  const [logs, setLogs] = useState<DroneLogRecord[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      setError(null);
      try {
        const url = `${apiUrl}${logPath}/${activeDroneId}?page=${targetPage}&perPage=${ITEMS_PER_PAGE}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`ไม่สามารถดึงข้อมูล Logs ได้ (Status ${response.status})`);
        }

        const headerTotalPages = parseInt(response.headers.get('X-Total-Pages') || '1', 10);
        const headerTotalItems = parseInt(response.headers.get('X-Total-Items') || '0', 10);

        const data: DroneLogRecord[] = await response.json();
        const logList = Array.isArray(data) ? data : [];

        setLogs(logList);
        setTotalPages(Math.max(1, headerTotalPages || 1));
        setTotalItems(headerTotalItems || logList.length);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูล Logs';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, logPath, activeDroneId]
  );

  useEffect(() => {
    fetchLogs(page);
  }, [page, fetchLogs]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-sky-500/20 mb-2">
            <span>Page #3</span>
            <span>•</span>
            <span>GET /logs/{activeDroneId}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            View Logs
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            แสดงรายการ Log อุณหภูมิของ Drone ID{' '}
            <code className="font-semibold text-sky-400">{activeDroneId}</code>{' '}
            {config?.drone_name ? `(${config.drone_name})` : ''} เรียงตามเวลา Created ล่าสุดขึ้นก่อน (จำกัด {ITEMS_PER_PAGE} รายการ/หน้า)
          </p>
        </div>

        <button
          onClick={() => fetchLogs(page)}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Drone ID</th>
                <th className="px-6 py-4">Drone Name</th>
                <th className="px-6 py-4">Celsius</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400">
                    <div className="inline-flex items-center gap-2.5">
                      <Loader2 className="h-5 w-5 animate-spin text-sky-400" />
                      <span>กำลังดึงข้อมูลรายการ Log...</span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileSpreadsheet className="h-8 w-8 text-slate-600" />
                      <p>ไม่พบข้อมูล Log สำหรับ Drone ID {activeDroneId}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr
                    key={`${log.created}-${index}`}
                    className="transition-colors hover:bg-slate-800/40"
                  >
                    <td className="whitespace-nowrap px-6 py-3.5 font-mono text-xs text-slate-300">
                      {log.created}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3.5 text-slate-200">
                      {log.country}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3.5 font-mono font-medium text-white">
                      {log.drone_id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3.5 font-medium text-sky-400">
                      {log.drone_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3.5 font-semibold text-white">
                      <span className="inline-flex items-center rounded-lg bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-300 ring-1 ring-sky-500/20">
                        {log.celsius} °C
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 bg-slate-950/60 px-6 py-4 sm:flex-row">
          <div className="text-xs text-slate-400">
            หน้า <span className="font-semibold text-white">{page}</span> จาก{' '}
            <span className="font-semibold text-white">{totalPages}</span>{' '}
            {totalItems > 0 && (
              <span>
                (ทั้งหมด <strong className="text-slate-200">{totalItems}</strong> รายการ • แสดงสูงสุด{' '}
                {ITEMS_PER_PAGE} รายการ/หน้า)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1 || loading}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  (p >= page - 2 && p <= page + 2)
              )
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev !== undefined && p - prev > 1;
                return (
                  <React.Fragment key={p}>
                    {showEllipsis && (
                      <span className="px-1.5 text-xs text-slate-500">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(p)}
                      disabled={loading}
                      className={`h-8 min-w-[2rem] rounded-lg px-2.5 text-xs font-semibold transition ${
                        p === page
                          ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/30'
                          : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages || loading}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
