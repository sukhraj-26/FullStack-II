import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 p-4">
      <div className="text-xl font-bold text-white mb-8 px-2">
        PostScheduler
      </div>
      <nav className="space-y-2">
        <a href="#" className="block px-3 py-2 bg-indigo-600 text-white rounded-xl font-medium">
          Dashboard
        </a>
      </nav>
    </aside>
  );
}