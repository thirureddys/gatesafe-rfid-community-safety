import { SystemState } from '../types';

const API_BASE = '/api';

export async function fetchSystemState(): Promise<SystemState> {
  const res = await fetch(`${API_BASE}/state`);
  if (!res.ok) {
    throw new Error(`Failed to fetch system state: ${res.statusText}`);
  }
  return res.json();
}

export async function triggerRfidScan(payload: {
  tagId: string;
  zoneId: string;
  rssi?: number;
  simulateInactiveMinutes?: number;
}): Promise<{ success: boolean; state: SystemState; eventMessage: string }> {
  const res = await fetch(`${API_BASE}/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to trigger RFID scan');
  }
  return res.json();
}

export async function acknowledgeAlert(tagId: string): Promise<SystemState> {
  const res = await fetch(`${API_BASE}/acknowledge/${encodeURIComponent(tagId)}`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to acknowledge alert');
  }
  return res.json();
}

export async function resetDemoData(): Promise<SystemState> {
  const res = await fetch(`${API_BASE}/reset`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to reset demo state');
  }
  return res.json();
}
