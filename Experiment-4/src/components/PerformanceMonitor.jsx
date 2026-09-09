import React from "react";

export default function PerformanceMonitor({
  renderCount,
  computeDuration,
  useReactMemo,
  useCallbackOpt,
  useMemoOpt,
  onResetMetrics,
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Performance Profiler & Monitor
        </h3>
        <button
          onClick={onResetMetrics}
          className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
        >
          Reset Profiler
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
          <div className="text-xs text-slate-500 font-medium mb-1">Parent Re-renders</div>
          <div className="text-2xl font-extrabold text-purple-700">{renderCount}</div>
        </div>

        <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-center">
          <div className="text-xs text-slate-500 font-medium mb-1">Compute Latency</div>
          <div className={`text-2xl font-extrabold ${useMemoOpt ? "text-emerald-600" : "text-amber-600"}`}>
            {computeDuration} <span className="text-sm font-normal">ms</span>
          </div>
        </div>
      </div>

      {/* MONITORING STATUS TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-2.5 font-semibold">Technique</th>
              <th className="p-2.5 font-semibold">Status</th>
              <th className="p-2.5 font-semibold">Impact Observed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr>
              <td className="p-2.5 font-semibold text-slate-700">React.memo</td>
              <td className="p-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${useReactMemo ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {useReactMemo ? "ACTIVE" : "OFF"}
                </span>
              </td>
              <td className="p-2.5 text-slate-500">
                {useReactMemo ? "Skipping unchanged day cell renders" : "Re-rendering all grid cells on update"}
              </td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold text-slate-700">useCallback</td>
              <td className="p-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${useCallbackOpt ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {useCallbackOpt ? "ACTIVE" : "OFF"}
                </span>
              </td>
              <td className="p-2.5 text-slate-500">
                {useCallbackOpt ? "Preserving event handler references" : "Recreating drag-and-drop functions"}
              </td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold text-slate-700">useMemo</td>
              <td className="p-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${useMemoOpt ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {useMemoOpt ? "ACTIVE" : "OFF"}
                </span>
              </td>
              <td className="p-2.5 text-slate-500">
                {useMemoOpt ? "Caching post statistics calculation" : "Recalculating heavy loops on every state change"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}