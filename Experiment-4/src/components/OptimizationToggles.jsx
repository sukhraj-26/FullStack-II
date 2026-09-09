import React from 'react';

export default function OptimizationToggles({
  useReactMemo,
  setUseReactMemo,
  useCallbackOpt,
  setUseCallbackOpt,
  useMemoOpt,
  setUseMemoOpt
}) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse"></span>
        <h2 className="text-lg font-bold text-slate-800">
          Optimization Controls <span className="text-xs font-semibold text-slate-400 ml-1">(Experiment 1.4.2)</span>
        </h2>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Toggle React hooks on or off to analyze DOM re-render spikes and compute latency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* React.memo Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-100/80 rounded-2xl transition-all hover:bg-slate-50">
          <div>
            <div className="font-bold text-sm text-slate-800">React.memo</div>
            <div className="text-[11px] text-slate-400 font-medium">Skip cell re-renders</div>
          </div>
          <button
            onClick={() => setUseReactMemo((prev) => !prev)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
              useReactMemo
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {useReactMemo ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* useCallback Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-100/80 rounded-2xl transition-all hover:bg-slate-50">
          <div>
            <div className="font-bold text-sm text-slate-800">useCallback</div>
            <div className="text-[11px] text-slate-400 font-medium">Stabilize handler refs</div>
          </div>
          <button
            onClick={() => setUseCallbackOpt((prev) => !prev)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
              useCallbackOpt
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {useCallbackOpt ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* useMemo Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-100/80 rounded-2xl transition-all hover:bg-slate-50">
          <div>
            <div className="font-bold text-sm text-slate-800">useMemo</div>
            <div className="text-[11px] text-slate-400 font-medium">Cache heavy loops</div>
          </div>
          <button
            onClick={() => setUseMemoOpt((prev) => !prev)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
              useMemoOpt
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {useMemoOpt ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}