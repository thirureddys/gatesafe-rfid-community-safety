import React, { useState } from 'react';
import { Radio, Send, X, AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import { TrackedEntity, Zone } from '../types';

interface SimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  entities: TrackedEntity[];
  zones: Zone[];
  onTriggerScan: (payload: {
    tagId: string;
    zoneId: string;
    rssi?: number;
    simulateInactiveMinutes?: number;
  }) => Promise<string>;
}

export const Simulator: React.FC<SimulatorProps> = ({
  isOpen,
  onClose,
  entities,
  zones,
  onTriggerScan,
}) => {
  const [selectedTagId, setSelectedTagId] = useState<string>(entities[0]?.tagId || 'TAG-K101');
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || 'Z-GATE');
  const [rssi, setRssi] = useState<number>(-45);
  const [simulateInactivity, setSimulateInactivity] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLastFeedback(null);
    try {
      const msg = await onTriggerScan({
        tagId: selectedTagId,
        zoneId: selectedZoneId,
        rssi,
        simulateInactiveMinutes: simulateInactivity ? 25 : undefined,
      });
      setLastFeedback(msg);
    } catch (err) {
      setLastFeedback(err instanceof Error ? err.message : 'Simulation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const runPreset = async (tagId: string, zoneId: string, inactiveMins?: number) => {
    setSelectedTagId(tagId);
    setSelectedZoneId(zoneId);
    setSimulateInactivity(Boolean(inactiveMins));
    setSubmitting(true);
    try {
      const msg = await onTriggerScan({
        tagId,
        zoneId,
        rssi: -42,
        simulateInactiveMinutes: inactiveMins,
      });
      setLastFeedback(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-300">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Hardware RFID Node Simulator</h3>
              <p className="text-[11px] text-slate-400">
                Emulate physical LF/HF/UHF reader pings without physical tags
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              One-Click Security Test Scenarios
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => runPreset('TAG-A501', 'Z-GATE')}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-red-200 bg-red-50/70 hover:bg-red-100/80 text-left text-xs text-red-900 transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <div>
                  <div className="font-semibold">Simulate Asset Theft</div>
                  <div className="text-[10px] text-red-700">Treadmill &rarr; Main Gate</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => runPreset('TAG-K101', 'Z-POOL', 25)}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-100/80 text-left text-xs text-amber-950 transition-colors"
              >
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-semibold">Simulate 25m Inactivity</div>
                  <div className="text-[10px] text-amber-800">Ananya &rarr; Pool Safety Check</div>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                1. Select RFID Tag (Resident or Society Asset)
              </label>
              <select
                value={selectedTagId}
                onChange={(e) => setSelectedTagId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                {entities.map((ent) => (
                  <option key={ent.tagId} value={ent.tagId}>
                    [{ent.tagId}] {ent.name} ({ent.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                2. Select Target Reader Zone
              </label>
              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} ({zone.readerId})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Signal Strength (RSSI: {rssi} dBm)
                </label>
                <input
                  type="range"
                  min={-90}
                  max={-25}
                  value={rssi}
                  onChange={(e) => setRssi(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-4">
                <input
                  type="checkbox"
                  checked={simulateInactivity}
                  onChange={(e) => setSimulateInactivity(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Simulate &gt;20m stationary</span>
              </label>
            </div>
          </div>

          {lastFeedback && (
            <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>{lastFeedback}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Transmitting...' : 'Trigger Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
