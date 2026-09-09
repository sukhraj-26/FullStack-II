import React, { memo } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Day Cell Component
const DayCell = ({ day, dateStr, posts, onMovePost, onSelectPost }) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain');
    if (postId && dateStr) {
      onMovePost(postId, dateStr);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="min-h-[100px] border border-slate-100 rounded-xl p-2 bg-white hover:bg-slate-50/50 transition-colors flex flex-col justify-between"
    >
      <span className="text-sm font-semibold text-slate-600">{day}</span>
      
      <div className="space-y-1 mt-1">
        {posts.map((post) => (
          <div
            key={post.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', post.id)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectPost(post.id);
            }}
            className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-medium truncate cursor-grab active:cursor-grabbing shadow-sm transition-all"
          >
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const MemoizedDayCell = memo(DayCell);

export default function Calendar({ posts, onMovePost, onSelectPost, isMemoized }) {
  // Generate 30 days for September 2026
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-09-${dayNum.toString().padStart(2, '0')}`;
    return { dayNum, dateStr };
  });

  const CellComponent = isMemoized ? MemoizedDayCell : DayCell;

  return (
    <div className="min-w-[650px] w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center">
        {DAYS.map((day) => (
          <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">
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