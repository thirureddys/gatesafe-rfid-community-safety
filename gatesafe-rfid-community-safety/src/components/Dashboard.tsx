import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Users,
  Package,
  Radio,
  CheckCircle2,
  Clock,
  Wifi,
  RotateCcw,
} from 'lucide-react';
import { SystemState, TrackedEntity } from '../types';
import { formatRelativeTime, formatTimeClock } from '../lib/utils';

interface DashboardProps {
  state: SystemState;
  onAcknowledge: (tagId: string) => Promise<void>;
  onResetDemo: () => Promise<void>;
}

export const Dashboard: React.FC<DashboardProps> = ({ state, onAcknowledge, onResetDemo }) => {
  const [filterTab, setFilterTab] = useState<'ALL' | 'KID' | 'ASSET'>('ALL');
  const [acknowledgingId, setAcknowledgingId] = useState<string | null>(null);

  const kids = state.entities.filter((e) => e.category === 'KID');
  const assets = state.entities.filter((e) => e.category === 'ASSET');
  const activeAlerts = state.entities.filter((e) => e.status !== 'SECURE');

  const filteredEntities = state.entities.filter((entity) => {
    if (filterTab === 'ALL') return true;
    return entity.category === filterTab;
  });

  const handleAck = async (tagId: string) => {
    setAcknowledgingId(tagId);
    try {
      await onAcknowledge(tagId);
    } finally {
      setAcknowledgingId(null);
    }
  };

  const renderStatusBadge = (entity: TrackedEntity) => {
    if (entity.status === 'UNAUTHORIZED_MOVEMENT') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 animate-pulse border border-red-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          Unauthorized Movement
        </span>
      );
    }
    if (entity.status === 'INACTIVITY_ALERT') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 animate-pulse border border-amber-300">
          <Clock className="w-3.5 h-3.5" />
          Inactivity Alert (&gt;{state.inactivityLimitMinutes}m)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <ShieldCheck className="w-3.5 h-3.5" />
        Secure
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Kids Monitored</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{kids.length}</span>
            <span className="text-xs text-emerald-600 font-medium">Active RFID Wristbands</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Protected Society Assets</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{assets.length}</span>
            <span className="text-xs text-slate-500">Anti-Theft Tagged</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Active Security Alerts</span>
            <div
              className={`p-2 rounded-lg ${
                activeAlerts.length > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${
                activeAlerts.length > 0 ? 'text-red-600' : 'text-slate-900'
              }`}
            >
              {activeAlerts.length}
            </span>
            <span className="text-xs text-slate-500">
              {activeAlerts.length > 0 ? 'Requires immediate check' : 'All zones nominal'}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">RFID Gateway Nodes</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Radio className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{state.zones.length} / {state.zones.length}</span>
            <span className="text-xs text-emerald-600 font-medium">Online (RSSI Sync)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Live Zone & Tag Registry</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time RFID triangulation across amenities and perimeter gates
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg bg-slate-100 p-1">
                {(['ALL', 'KID', 'ASSET'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      filterTab === tab
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'ALL' ? `All (${state.entities.length})` : tab === 'KID' ? `Kids (${kids.length})` : `Assets (${assets.length})`}
                  </button>
                ))}
              </div>

              <button
                onClick={onResetDemo}
                title="Reset Demo Data"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Tag / Entity</th>
                  <th className="py-3 px-4">Current Zone</th>
                  <th className="py-3 px-4">Last Ping</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredEntities.map((entity) => (
                  <tr
                    key={entity.tagId}
                    className={`transition-colors ${
                      entity.status === 'UNAUTHORIZED_MOVEMENT'
                        ? 'bg-red-50/40'
                        : entity.status === 'INACTIVITY_ALERT'
                        ? 'bg-amber-50/40'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            entity.category === 'KID'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {entity.category === 'KID' ? 'KID' : 'AST'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{entity.name}</div>
                          <div className="text-xs text-slate-500">
                            <span className="font-mono text-slate-600">{entity.tagId}</span> • {entity.ownerOrLocation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{entity.currentZoneName}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Wifi className="w-3 h-3" /> {entity.rssi} dBm
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {formatRelativeTime(entity.lastSeenAt)}
                    </td>
                    <td className="py-3.5 px-4">{renderStatusBadge(entity)}</td>
                    <td className="py-3.5 px-4 text-right">
                      {entity.status !== 'SECURE' ? (
                        <button
                          onClick={() => handleAck(entity.tagId)}
                          disabled={acknowledgingId === entity.tagId}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {acknowledgingId === entity.tagId ? 'Clearing...' : 'Verify & Clear'}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Monitored</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col max-h-[580px]">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <h2 className="text-base font-semibold text-slate-900">Movement Feed</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live
            </span>
          </div>

          <div className="p-4 overflow-y-auto space-y-3 flex-1">
            {state.events.map((evt) => (
              <div
                key={evt.id}
                className={`p-3.5 rounded-lg border text-xs transition-all ${
                  evt.alertTriggered
                    ? 'bg-red-50/70 border-red-200 text-red-950'
                    : 'bg-slate-50/70 border-slate-200/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-mono font-semibold text-slate-600">{evt.readerId}</span>
                  <span>{formatTimeClock(evt.timestamp)}</span>
                </div>
                <p className={`font-medium leading-relaxed ${evt.alertTriggered ? 'text-red-800' : 'text-slate-800'}`}>
                  {evt.message}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Tag: {evt.tagId}</span>
                  <span>RSSI: {evt.rssi} dBm</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
