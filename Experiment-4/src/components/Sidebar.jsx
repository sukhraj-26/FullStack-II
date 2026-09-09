import React from 'react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 p-5 shadow-xl">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-rose-400 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-500/20">
          P
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Post<span className="text-indigo-400">Scheduler</span>
        </span>
      </div>

      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 bg-indigo-600/90 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;