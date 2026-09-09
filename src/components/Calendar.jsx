import React, { useMemo, memo } from "react";

// Individual Day Cell Component
const DayCell = memo(
  ({ dateObj, posts, onDateClick, onEventClick, onEventDrop, renderTracker, useReactMemo }) => {
    // Increment total day cell renders safely
    if (renderTracker && renderTracker.current !== undefined) {
      renderTracker.current += 1;
    }

    const formattedDate = dateObj ? dateObj.toISOString().split("T")[0] : "";
    const dayNumber = dateObj ? dateObj.getDate() : "";
    const isCurrentMonth = dateObj ? dateObj.getMonth() === 8 : false; // September

    const safePosts = Array.isArray(posts) ? posts : [];
    const dayPosts = safePosts.filter(
      (post) => post && post.date && post.date.startsWith(formattedDate)
    );

    // HTML5 Drag and Drop Handlers
    const handleDragStart = (e, postId) => {
      e.dataTransfer.setData("text/plain", postId);
      e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const postId = e.dataTransfer.getData("text/plain");
      if (postId && onEventDrop) {
        onEventDrop({
          event: {
            id: postId,
            startStr: `${formattedDate}T10:00:00`,
          },
        });
      }
    };

    return (
      <div
        className={`calendar-day ${!isCurrentMonth ? "other-month" : ""}`}
        onClick={() => onDateClick && onDateClick({ dateStr: formattedDate })}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="day-number">{dayNumber}</div>
        <div className="day-events">
          {dayPosts.map((post) => (
            <div
              key={post.id || Math.random()}
              className="calendar-event-chip"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, post.id)}
              style={{
                backgroundColor:
                  post.platform === "LinkedIn"
                    ? "#0A66C2"
                    : post.platform === "Instagram"
                    ? "#E1306C"
                    : "#1877F2",
                cursor: "grab",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (onEventClick) {
                  onEventClick({ event: { id: post.id } });
                }
              }}
            >
              <span className="chip-title">{post.title || "Untitled"}</span>
              <span className="chip-time">
                {post.date && post.date.includes("T")
                  ? post.date.split("T")[1].slice(0, 5)
                  : "10:00"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (!nextProps.useReactMemo) return false;
    return (
      prevProps.posts === nextProps.posts &&
      prevProps.onDateClick === nextProps.onDateClick &&
      prevProps.onEventClick === nextProps.onEventClick &&
      prevProps.onEventDrop === nextProps.onEventDrop
    );
  }
);

function Calendar({
  posts = [],
  onEventClick = () => {},
  onEventDrop = () => {},
  onDateClick = () => {},
  useReactMemo = true,
  totalCellRendersRef = { current: 0 },
}) {
  const days = useMemo(() => {
    const calendarDays = [];
    for (let i = 2; i > 0; i--) {
      calendarDays.push(new Date(2026, 8, 1 - i));
    }
    for (let i = 1; i <= 30; i++) {
      calendarDays.push(new Date(2026, 8, i));
    }
    for (let i = 1; calendarDays.length < 35; i++) {
      calendarDays.push(new Date(2026, 9, i));
    }
    return calendarDays;
  }, []);

  return (
    <div className="custom-calendar-grid">
      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
      </div>

      <div className="days-grid">
        {days.map((dateObj, index) => (
          <DayCell
            key={index}
            dateObj={dateObj}
            posts={posts}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
            onEventDrop={onEventDrop}
            useReactMemo={useReactMemo}
            renderTracker={totalCellRendersRef}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(Calendar);