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
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
            Performance Profiler & Monitor
          </h2>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all shadow-sm"
        >
          Reset Profiler
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-b from-indigo-50/50 to-slate-50 border border-indigo-100/60 rounded-3xl p-5 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Parent Re-renders
          </span>
          <span className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            {renderCount}
          </span>
        </div>

        <div className="bg-gradient-to-b from-amber-50/50 to-slate-50 border border-amber-100/60 rounded-3xl p-5 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Compute Latency
          </span>
          <span className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {computeLatency.toFixed(2)} <span className="text-sm font-semibold">ms</span>
          </span>
        </div>
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 text-slate-400 font-bold text-[11px] uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3.5 px-5">Technique</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5">Impact Observed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium text-xs">
            <tr>
              <td className="py-3.5 px-5 font-bold text-slate-800">React.memo</td>
              <td className="py-3.5 px-5">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                  useReactMemo ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {useReactMemo ? 'ON' : 'OFF'}
                </span>
              </td>
              <td className="py-3.5 px-5 text-slate-500">
                {useReactMemo ? 'Grid cells skip re-renders on unrelated parent state changes' : 'Re-rendering all grid cells on update'}
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-bold text-slate-800">useCallback</td>
              <td className="py-3.5 px-5">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                  useCallbackOpt ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {useCallbackOpt ? 'ON' : 'OFF'}
                </span>
              </td>
              <td className="py-3.5 px-5 text-slate-500">
                {useCallbackOpt ? 'Stable handler reference across renders' : 'Recreating drag-and-drop functions on state change'}
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-bold text-slate-800">useMemo</td>
              <td className="py-3.5 px-5">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                  useMemoOpt ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {useMemoOpt ? 'ON' : 'OFF'}
                </span>
              </td>
              <td className="py-3.5 px-5 text-slate-500">
                {useMemoOpt ? 'Cached search calculations' : 'Recalculating search loops on every state change'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}