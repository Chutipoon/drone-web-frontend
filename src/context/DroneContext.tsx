'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface DroneConfig {
  drone_id: number;
  drone_name: string;
  light: string;
  country: string;
  weight?: number;
}

interface DroneContextType {
  droneId: string;
  config: DroneConfig | null;
  condition: string | null;
  loading: boolean;
  error: string | null;
  refreshConfig: () => Promise<void>;
}

const DroneContext = createContext<DroneContextType | undefined>(undefined);

const STORAGE_KEY = 'drone_config_cache';

export function DroneProvider({ children }: { children: React.ReactNode }) {
  const droneId = process.env.DRONE_ID || '67010210';
  const apiUrl = (process.env.API_URL || 'http://localhost:4000').replace(/\/$/, '');
  const configPath = process.env.CONFIG_PATH || '/configs';
  const statusPath = process.env.STATUS_PATH || '/status';

  const [config, setConfig] = useState<DroneConfig | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [configRes, statusRes] = await Promise.all([
        fetch(`${apiUrl}${configPath}/${droneId}`),
        fetch(`${apiUrl}${statusPath}/${droneId}`).catch(() => null),
      ]);

      if (!configRes.ok) {
        throw new Error(`ไม่สามารถดึงข้อมูล Config ของ Drone ID ${droneId} ได้ (Status ${configRes.status})`);
      }

      const configData: DroneConfig = await configRes.json();
      setConfig(configData);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(configData));
      }

      if (statusRes && statusRes.ok) {
        const statusData = await statusRes.json();
        setCondition(statusData.condition ?? null);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ API Server';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, configPath, statusPath, droneId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as DroneConfig;
          if (String(parsed.drone_id) === String(droneId)) {
            setConfig(parsed);
          }
        } catch {
          // ignore invalid cache
        }
      }
    }
    refreshConfig();
  }, [droneId, refreshConfig]);

  return (
    <DroneContext.Provider
      value={{
        droneId,
        config,
        condition,
        loading,
        error,
        refreshConfig,
      }}
    >
      {children}
    </DroneContext.Provider>
  );
}

export function useDrone() {
  const context = useContext(DroneContext);
  if (!context) {
    throw new Error('useDrone must be used within a DroneProvider');
  }
  return context;
}
