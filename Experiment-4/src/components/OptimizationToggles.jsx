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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-1">
        Optimization Controls (Experiment 1.4.2)
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Toggle React optimization hooks on or off to measure real-time DOM re-renders and compute latency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* React.memo Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div>
            <div className="font-semibold text-sm text-slate-800">React.memo</div>
            <div className="text-xs text-slate-500">Skip unnecessary cell re-renders</div>
          </div>
          <button
            onClick={() => setUseReactMemo((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              useReactMemo
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {useReactMemo ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* useCallback Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div>
            <div className="font-semibold text-sm text-slate-800">useCallback</div>
            <div className="text-xs text-slate-500">Stabilize drag handler reference</div>
          </div>
          <button
            onClick={() => setUseCallbackOpt((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              useCallbackOpt
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {useCallbackOpt ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* useMemo Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div>
            <div className="font-semibold text-sm text-slate-800">useMemo</div>
            <div className="text-xs text-slate-500">Cache heavy search computations</div>
          </div>
          <button
            onClick={() => setUseMemoOpt((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              useMemoOpt
                ? 'bg-emerald-500 text-white shadow-sm'
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