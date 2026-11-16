import React, { useEffect, useState, useCallback } from 'react';
import {
  Shield,
  LayoutDashboard,
  Briefcase,
  Smartphone,
  Radio,
  AlertCircle,
} from 'lucide-react';
import { SystemState } from './types';
import {
  fetchSystemState,
  triggerRfidScan,
  acknowledgeAlert,
  resetDemoData,
} from './lib/api';
import { Dashboard } from './components/Dashboard';
import { BusinessAnalysis } from './components/BusinessAnalysis';
import { ParentView } from './components/ParentView';
import { Simulator } from './components/Simulator';

type NavTab = 'DASHBOARD' | 'BUSINESS' | 'PARENT';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');
  const [systemState, setSystemState] = useState<SystemState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);

  const loadState = useCallback(async () => {
    try {
      const data = await fetchSystemState();
      setSystemState(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reach GateSafe gateway server');
    }
  }, []);

  useEffect(() => {
    loadState();
    const interval = setInterval(loadState, 3000);
    return () => clearInterval(interval);
  }, [loadState]);

  const handleTriggerScan = async (payload: {
    tagId: string;
    zoneId: string;
    rssi?: number;
    simulateInactiveMinutes?: number;
  }) => {
    const res = await triggerRfidScan(payload);
    setSystemState(res.state);
    return res.eventMessage;
  };

  const handleAcknowledge = async (tagId: string) => {
    const updated = await acknowledgeAlert(tagId);
    setSystemState(updated);
  };

  const handleResetDemo = async () => {
    const resetState = await resetDemoData();
    setSystemState(resetState);
  };

  const alertCount = systemState?.entities.filter((e) => e.status !== 'SECURE').length || 0;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900">
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-200 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight text-base">GateSafe</h1>
              <p className="text-[11px] text-slate-400">RFID Community Safety</p>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'DASHBOARD'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                Live Monitoring
              </span>
              {alertCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-red-500 text-white">
                  {alertCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('BUSINESS')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'BUSINESS'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Business Case
            </button>

            <button
              onClick={() => setActiveTab('PARENT')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'PARENT'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Parent App View
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-3">
          <button
            onClick={() => setIsSimulatorOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wide shadow-md transition-colors"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            Hardware Sim
          </button>
          <div className="text-[11px] text-slate-500 text-center">
            Polling Gateway • 3s Interval
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {activeTab === 'DASHBOARD' && 'Security Admin — Live Monitoring'}
              {activeTab === 'BUSINESS' && 'Business Case & CAPEX Estimator'}
              {activeTab === 'PARENT' && 'Resident Portal — Parent Mobile View'}
            </h2>
            <p className="text-xs text-slate-500">
              Gated Community Child Safety &amp; Anti-Theft Asset Protection Mesh
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
              Inactivity Guard: <strong>{systemState?.inactivityLimitMinutes ?? 20} mins</strong>
            </span>
          </div>
        </header>

        <div className="p-6 flex-1">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{error} — Ensure Express server is running on port 8080 (`npm run dev`).</span>
            </div>
          )}

          {!systemState && !error ? (
            <div className="flex items-center justify-center h-64 text-sm text-slate-500">
              Connecting to GateSafe RFID Gateway...
            </div>
          ) : (
            systemState && (
              <>
                {activeTab === 'DASHBOARD' && (
                  <Dashboard
                    state={systemState}
                    onAcknowledge={handleAcknowledge}
                    onResetDemo={handleResetDemo}
                  />
                )}
                {activeTab === 'BUSINESS' && <BusinessAnalysis />}
                {activeTab === 'PARENT' && (
                  <ParentView state={systemState} onAcknowledge={handleAcknowledge} />
                )}
              </>
            )
          )}
        </div>
      </main>

      {systemState && (
        <Simulator
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
          entities={systemState.entities}
          zones={systemState.zones}
          onTriggerScan={handleTriggerScan}
        />
      )}
    </div>
  );
}

export default App;
