import React, { useState } from 'react';
import {
  Smartphone,
  ShieldCheck,
  Bell,
  MapPin,
  Clock,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
} from 'lucide-react';
import { SystemState } from '../types';
import { formatRelativeTime, formatTimeClock } from '../lib/utils';

interface ParentViewProps {
  state: SystemState;
  onAcknowledge: (tagId: string) => Promise<void>;
}

export const ParentView: React.FC<ParentViewProps> = ({ state, onAcknowledge }) => {
  const availableFlats = ['A-402', 'B-1104', 'C-205'];
  const [selectedFlat, setSelectedFlat] = useState<string>('A-402');

  const familyKids = state.entities.filter(
    (e) => e.category === 'KID' && e.flatNumber === selectedFlat
  );

  const familyTagIds = new Set(familyKids.map((k) => k.tagId));
  const familyEvents = state.events.filter((ev) => familyTagIds.has(ev.tagId));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Parent Mobile App Simulator</h2>
          <p className="text-xs text-slate-500">
            Simulated resident view with real-time amenity tracking &amp; 20-minute inactivity guard
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600">Select Resident Flat:</span>
          <div className="inline-flex rounded-lg bg-slate-100 p-1">
            {availableFlats.map((flat) => (
              <button
                key={flat}
                onClick={() => setSelectedFlat(flat)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedFlat === flat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Flat {flat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[400px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
        <div className="bg-slate-50 rounded-[2rem] overflow-hidden min-h-[660px] flex flex-col">
          <div className="bg-indigo-600 text-white px-6 pt-5 pb-6 rounded-b-3xl shadow-md">
            <div className="flex items-center justify-between text-[11px] opacity-85 mb-3">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" /> GateSafe Parent
              </span>
              <span>Flat {selectedFlat}</span>
            </div>
            <h3 className="text-lg font-bold">Family Safety Guard</h3>
            <p className="text-xs text-indigo-100 mt-0.5">
              Auto-alerts enabled for Perimeter Exit &amp; {state.inactivityLimitMinutes}m Inactivity
            </p>
          </div>

          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
              Registered Dependents ({familyKids.length})
            </div>

            {familyKids.map((kid) => {
              const isAlert = kid.status !== 'SECURE';
              return (
                <div
                  key={kid.tagId}
                  className={`p-4 rounded-2xl border shadow-sm transition-all ${
                    isAlert
                      ? 'bg-red-50 border-red-200'
                      : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{kid.name}</h4>
                      <span className="text-[11px] font-mono text-slate-500">{kid.tagId}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        isAlert
                          ? 'bg-red-100 text-red-700 animate-pulse'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {isAlert ? (
                        <>
                          <AlertTriangle className="w-3 h-3" /> Check Needed
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3 h-3" /> Safe Zone
                        </>
                      )}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="truncate">{kid.currentZoneName}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatRelativeTime(kid.lastSeenAt)}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                      Band Battery: {kid.batteryLevel}%
                    </span>
                    {isAlert && (
                      <button
                        onClick={() => onAcknowledge(kid.tagId)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                      >
                        <CheckCircle2 className="w-3 h-3" /> I&apos;ve Checked
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 px-1 mb-2">
                <Bell className="w-3.5 h-3.5" /> Push Alert Timeline
              </div>

              {familyEvents.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                  No recent movement logs for Flat {selectedFlat}
                </div>
              ) : (
                <div className="space-y-2">
                  {familyEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className={`p-3 rounded-xl border text-xs ${
                        ev.alertTriggered
                          ? 'bg-amber-50 border-amber-200 text-amber-950'
                          : 'bg-white border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                        <span>{ev.entityName}</span>
                        <span>{formatTimeClock(ev.timestamp)}</span>
                      </div>
                      <p className="font-medium">{ev.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
