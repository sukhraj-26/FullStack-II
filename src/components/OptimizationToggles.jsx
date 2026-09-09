import React from "react";

export default function OptimizationToggles({
  useReactMemo,
  setUseReactMemo,
  useCallbackOpt,
  setUseCallbackOpt,
  useMemoOpt,
  setUseMemoOpt,
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
        Optimization Controls (Experiment 1.4.2)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* React.memo Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <span className="text-sm font-semibold text-slate-800 block">React.memo</span>
            <span className="text-xs text-slate-500">Skip unnecessary re-renders</span>
          </div>
          <button
            onClick={() => setUseReactMemo(!useReactMemo)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              useReactMemo ? "bg-purple-600 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
          </button>
        </div>

        {/* useCallback Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <span className="text-sm font-semibold text-slate-800 block">useCallback</span>
            <span className="text-xs text-slate-500">Stabilize function identity</span>
          </div>
          <button
            onClick={() => setUseCallbackOpt(!useCallbackOpt)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              useCallbackOpt ? "bg-purple-600 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
          </button>
        </div>

        {/* useMemo Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <span className="text-sm font-semibold text-slate-800 block">useMemo</span>
            <span className="text-xs text-slate-500">Cache heavy computations</span>
          </div>
          <button
            onClick={() => setUseMemoOpt(!useMemoOpt)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              useMemoOpt ? "bg-purple-600 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
          </button>
        </div>
      </div>
    </div>
  );
}