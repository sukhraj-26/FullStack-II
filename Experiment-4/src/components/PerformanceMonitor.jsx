import React from 'react';

export default function PerformanceMonitor({
  renderCount = 0,
  computeLatency = 0,
  useReactMemo,
  useCallbackOpt,
  useMemoOpt,
  onReset
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wider text-slate-800 uppercase">
          PERFORMANCE PROFILER & MONITOR
        </h2>
        <button
          onClick={onReset}
          className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
        >
          Reset Profiler
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Parent Re-renders
          </span>
          <span className="text-3xl font-extrabold text-indigo-600">{renderCount}</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Compute Latency
          </span>
          <span className="text-3xl font-extrabold text-amber-500">
            {computeLatency.toFixed(2)} <span className="text-sm font-medium">ms</span>
          </span>
        </div>
      </div>

      <div className="border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 font-semibold text-xs border-b border-slate-100">
            <tr>
              <th className="py-3 px-4">Technique</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Impact Observed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="py-3 px-4 font-semibold">React.memo</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                  useReactMemo ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {useReactMemo ? 'ON' : 'OFF'}
                </span>
              </td>
              <td className="py-3 px-4 text-xs text-slate-500">
                {useReactMemo ? 'Grid cells skip re-renders on unrelated parent state changes' : 'Re-rendering all grid cells on every state update'}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">useCallback</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                  useCallbackOpt ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {useCallbackOpt ? 'ON' : 'OFF'}
                </span>
              </td>
              <td className="py-3 px-4 text-xs text-slate-500">
                {useCallbackOpt ? 'Stable handler reference across renders' : 'Recreating drag-and-drop functions on every state change'}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">useMemo</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                  useMemoOpt ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {useMemoOpt ? 'ON' : 'OFF'}
                </span>
              </td>
              <td className="py-3 px-4 text-xs text-slate-500">
                {useMemoOpt ? 'Cached search calculations' : 'Recalculating search loops on every single state change'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}