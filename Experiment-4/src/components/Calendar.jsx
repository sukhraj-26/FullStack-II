import React, { memo } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DayCell = ({ day, dateStr, posts = [], onMovePost, onSelectPost }) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain');
    if (postId && dateStr && onMovePost) {
      onMovePost(postId, dateStr);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="min-h-[105px] border border-slate-100/80 rounded-2xl p-2.5 bg-white hover:bg-slate-50/70 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between"
    >
      <span className="text-xs font-bold text-slate-400">{day}</span>
      
      <div className="space-y-1.5 mt-1">
        {posts.map((post) => (
          <div
            key={post.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', post.id)}
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectPost) onSelectPost(post.id);
            }}
            className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl text-xs font-semibold truncate cursor-grab active:cursor-grabbing shadow-sm shadow-rose-500/20 transition-all"
          >
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const MemoizedDayCell = memo(DayCell);

export default function Calendar({ posts = [], onMovePost, onSelectPost, isMemoized }) {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-09-${dayNum.toString().padStart(2, '0')}`;
    return { dayNum, dateStr };
  });

  const CellComponent = isMemoized ? MemoizedDayCell : DayCell;

  return (
    <div className="min-w-[650px] w-full">
      <div className="grid grid-cols-7 gap-2.5 mb-3 text-center">
        {DAYS.map((day) => (
          <div key={day} className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2.5">
        {daysInMonth.map(({ dayNum, dateStr }) => {
          const dayPosts = posts.filter((p) => p.date === dateStr);
          return (
            <CellComponent
              key={dateStr}
              day={dayNum}
              dateStr={dateStr}
              posts={dayPosts}
              onMovePost={onMovePost}
              onSelectPost={onSelectPost}
            />
          );
        })}
      </div>
    </div>
  );
}