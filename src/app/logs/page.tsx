'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDrone } from '@/context/DroneContext';
import TornPaper from '@/components/TornPaper';
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
  BookOpen,
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
        const message =
          err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูล Logs';
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
    <div className="space-y-8">
      {/* Header Notice Sheet */}
      <TornPaper
        punchHolesTop={true}
        tornBottom={true}
        variant={2}
        rotation="slight-left"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rubber-stamp stamp-blue text-[11px] px-2 py-0.5">
                DOC REF #03
              </span>
              <span className="text-xs text-stone-500 font-bold">•</span>
              <span className="highlighter-yellow text-xs font-bold text-stone-900 uppercase">
                GET /logs/{activeDroneId}
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl uppercase">
              Field Telemetry Ledger
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-mono">
              สมุดบัญชีบันทึกประวัติอุณหภูมิภาคสนามของ Drone ID{' '}
              <span className="font-bold text-stone-950 underline">{activeDroneId}</span>{' '}
              {config?.drone_name ? `(${config.drone_name})` : ''} เรียงลำดับตามเวลาล่าสุด
            </p>
          </div>

          <button
            onClick={() => fetchLogs(page)}
            disabled={loading}
            className="rubber-stamp stamp-blue px-4 py-2.5 text-xs font-bold transition hover:bg-blue-100/60 active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm self-start sm:self-auto"
          >
            <RefreshCw
              className={`mr-2 inline h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            <span>[ RE-READ LEDGER ]</span>
          </button>
        </div>
      </TornPaper>

      {/* Error Message */}
      {error && (
        <TornPaper
          variant={1}
          tornBottom={true}
          rotation="right"
          className="border-l-4 border-l-red-700"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 shrink-0 text-red-700 mt-0.5" />
            <div>
              <p className="font-black text-red-800 uppercase tracking-wide text-xs sm:text-sm">
                [!] LEDGER READ ERROR / ไม่สามารถอ่านสมุดบันทึกได้
              </p>
              <p className="text-xs text-red-900 font-mono mt-1">{error}</p>
            </div>
          </div>
        </TornPaper>
      )}

      {/* Main Ledger Sheet with Ruled Table */}
      <TornPaper
        punchHolesTop={true}
        tornBottom={true}
        variant={3}
        withMarginLine={true}
        noPadding={true}
      >
        {/* Ledger Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-stone-800 px-6 py-4 bg-[#ede5d4]">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-stone-800" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-900">
              OFFICIAL TELEMETRY LEDGER SHEET — UNIT #{activeDroneId}
            </span>
          </div>
          <span className="rubber-stamp stamp-green text-[10px] px-2 py-0.5">
            LOGGED RECORDS
          </span>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="border-b-2 border-stone-800 bg-[#f0e8d9] text-[11px] font-black uppercase tracking-wider text-stone-700">
                <th className="px-6 py-3.5 border-r border-stone-300">CREATED (TIMESTAMP)</th>
                <th className="px-6 py-3.5 border-r border-stone-300">COUNTRY</th>
                <th className="px-6 py-3.5 border-r border-stone-300">DRONE ID</th>
                <th className="px-6 py-3.5 border-r border-stone-300">CALLSIGN</th>
                <th className="px-6 py-3.5">RECORDED CELSIUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300/80">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-stone-600">
                    <div className="inline-flex items-center gap-2.5">
                      <Loader2 className="h-5 w-5 animate-spin text-stone-800" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        RETRIEVING LEDGER RECORDS FROM DISK...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-stone-600">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileSpreadsheet className="h-8 w-8 text-stone-500" />
                      <p className="font-bold uppercase tracking-wider text-xs">
                        NO LOG ENTRIES RECORDED FOR DRONE #{activeDroneId}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        ยังไม่มีบันทึกอุณหภูมิในระบบสำหรับโดรนนี้
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr
                    key={`${log.created}-${index}`}
                    className="hover:bg-amber-100/40 transition-colors"
                  >
                    <td className="whitespace-nowrap px-6 py-3 border-r border-stone-300/60 font-bold text-stone-800">
                      {log.created}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 border-r border-stone-300/60 font-medium text-stone-700">
                      {log.country}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 border-r border-stone-300/60 font-black text-stone-900">
                      #{log.drone_id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 border-r border-stone-300/60 font-bold text-stone-900">
                      {log.drone_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 font-black text-stone-950">
                      <span className="highlighter-yellow text-xs px-2 py-0.5 inline-block font-mono">
                        {log.celsius} °C
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Ledger Pagination Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-stone-800 bg-[#ede4d4] px-6 py-4 sm:flex-row">
          <div className="text-xs font-mono text-stone-700 font-bold">
            PAGE <span className="underline">{page}</span> OF{' '}
            <span className="underline">{totalPages}</span>{' '}
            {totalItems > 0 && (
              <span className="font-normal text-stone-600">
                (TOTAL <strong>{totalItems}</strong> ENTRIES • MAX {ITEMS_PER_PAGE} PER SHEET)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1 || loading}
              className="rubber-stamp stamp-blue px-3 py-1.5 text-xs font-bold transition hover:bg-blue-100/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1 inline" />
              <span>PREV</span>
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
                      <span className="px-1 text-xs text-stone-500 font-mono">..</span>
                    )}
                    <button
                      onClick={() => handlePageChange(p)}
                      disabled={loading}
                      className={`h-7 min-w-[2rem] px-2 text-xs font-mono font-bold transition ${
                        p === page
                          ? 'bg-stone-900 text-stone-100 shadow-sm border border-stone-900'
                          : 'border border-stone-400 bg-stone-100/90 text-stone-800 hover:bg-stone-200'
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
              className="rubber-stamp stamp-blue px-3 py-1.5 text-xs font-bold transition hover:bg-blue-100/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>NEXT</span>
              <ChevronRight className="h-3.5 w-3.5 ml-1 inline" />
            </button>
          </div>
        </div>
      </TornPaper>
    </div>
  );
}
