import React from 'react';

export default function PostModal({ post, onClose, onDelete }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold mb-2">
              {post.platform}
            </span>
            <h3 className="text-xl font-bold text-slate-800">{post.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Scheduled Date:</span>
            <span className="text-slate-700 font-bold">{post.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Scheduled Time:</span>
            <span className="text-slate-700 font-bold">{post.time || '10:00'}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-sm transition-all"
            >
              Delete Post
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
