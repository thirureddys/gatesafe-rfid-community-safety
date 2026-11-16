import React from 'react';
import { TrendingUp, Building2, DollarSign, Cpu } from 'lucide-react';

export const BusinessAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-2">
              Commercial Viability &amp; Unit Economics
            </span>
            <h2 className="text-2xl font-bold">GateSafe: RFID Community Safety &amp; Asset Protection</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Comprehensive security solution designed for modern gated communities — tracking children across amenities and preventing high-value society asset theft.
            </p>
          </div>

          <div className="bg-emerald-500/15 border border-emerald-400/30 rounded-xl p-4 text-center min-w-[180px]">
            <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
              Marketplace Verdict
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">85%</div>
            <div className="text-xs text-emerald-200">High Success Probability</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Tier 1 Deployment
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              1. Small Gated Community (100 - 200 Flats)
            </h3>
            <p className="text-xs text-slate-500">
              Designed for boutique residences with standard amenities.
            </p>
          </div>

          <div className="p-5">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2.5">Component</th>
                  <th className="py-2.5">Quantity</th>
                  <th className="py-2.5 text-right">Cost (Estimated)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">RFID Readers (LF/HF)</td>
                  <td className="py-2.5 text-slate-600">10 Units</td>
                  <td className="py-2.5 text-right font-mono">$500</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Gateway/Server Hub</td>
                  <td className="py-2.5 text-slate-600">1 Unit</td>
                  <td className="py-2.5 text-right font-mono">$400</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">RFID Tags (Basic Cards)</td>
                  <td className="py-2.5 text-slate-600">300 Units</td>
                  <td className="py-2.5 text-right font-mono">$450</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Installation &amp; Setup</td>
                  <td className="py-2.5 text-slate-600">Lumpsum</td>
                  <td className="py-2.5 text-right font-mono">$1,200</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Software License</td>
                  <td className="py-2.5 text-slate-600">Basic</td>
                  <td className="py-2.5 text-right font-mono">$1,500</td>
                </tr>
                <tr className="bg-indigo-50/60 font-bold text-slate-900">
                  <td className="py-3 px-2 rounded-l-lg">TOTAL INITIAL CAPEX</td>
                  <td className="py-3"></td>
                  <td className="py-3 px-2 text-right font-mono text-indigo-700 rounded-r-lg">
                    $4,050
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center gap-2 text-sky-600 font-semibold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Tier 2 Enterprise Township
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              2. Large Gated Community (1000 - 1500 Flats)
            </h3>
            <p className="text-xs text-slate-500">
              Designed for massive townships with 30+ amenities.
            </p>
          </div>

          <div className="p-5">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2.5">Component</th>
                  <th className="py-2.5">Quantity</th>
                  <th className="py-2.5 text-right">Cost (Estimated)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">RFID Readers (Long Range)</td>
                  <td className="py-2.5 text-slate-600">30 Units</td>
                  <td className="py-2.5 text-right font-mono">$2,400</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Central Mesh Gateway</td>
                  <td className="py-2.5 text-slate-600">3 Units</td>
                  <td className="py-2.5 text-right font-mono">$1,800</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">RFID Tags (Wearable Bands)</td>
                  <td className="py-2.5 text-slate-600">2,500 Units</td>
                  <td className="py-2.5 text-right font-mono">$6,250</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Installation &amp; Networking</td>
                  <td className="py-2.5 text-slate-600">Lumpsum</td>
                  <td className="py-2.5 text-right font-mono">$5,500</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Software License</td>
                  <td className="py-2.5 text-slate-600">Enterprise</td>
                  <td className="py-2.5 text-right font-mono">$8,000</td>
                </tr>
                <tr className="bg-sky-50/70 font-bold text-slate-900">
                  <td className="py-3 px-2 rounded-l-lg">TOTAL INITIAL CAPEX</td>
                  <td className="py-3"></td>
                  <td className="py-3 px-2 text-right font-mono text-sky-700 rounded-r-lg">
                    $23,950
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Strategic Reasoning (Why 85% Success Probability)
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="font-semibold text-slate-900">1. Emotional Value Proposition:</span>{' '}
              Parent safety is a &ldquo;non-negotiable&rdquo; spend. Parents are willing to pay a premium for systems that ensure their children haven&apos;t left the gate or are active in safe zones.
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="font-semibold text-slate-900">2. Builder Utility:</span>{' '}
              Builders can market the &ldquo;GateSafe&rdquo; tech as a luxury feature, potentially increasing property value by 2–3%, far exceeding the deployment cost.
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="font-semibold text-slate-900">3. Operational Efficiency:</span>{' '}
              Automating asset tracking (gym equipment, lawn mowers, tools) reduces society maintenance costs and theft by up to 90%.
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-4">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              Revenue Generation Models
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <div className="text-xs font-bold uppercase text-indigo-700">Model A (SaaS)</div>
                <div className="text-xl font-extrabold text-slate-900 mt-1">$4,500 / month MRR</div>
                <p className="text-xs text-slate-600 mt-1">
                  Recurring cloud platform &amp; parent mobile notification subscription per township.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <div className="text-xs font-bold uppercase text-emerald-700">Model B (Managed Service)</div>
                <div className="text-xl font-extrabold text-slate-900 mt-1">15% Annual AMC</div>
                <p className="text-xs text-slate-600 mt-1">
                  Annual maintenance contract on RFID readers, mesh gateways, and replacement tags.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Cpu className="w-4 h-4 text-slate-400 shrink-0" />
            <span>MQTT / WebSockets + RSSI De-duplication Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
