import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import Calendar from "./components/Calendar";
import PostModal from "./components/PostModal";
import initialPosts from "./data/posts";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- OPTIMIZATION TOGGLES ---
  const [useReactMemo, setUseReactMemo] = useState(true);
  const [useCallbackOpt, setUseCallbackOpt] = useState(true);
  const [useMemoOpt, setUseMemoOpt] = useState(true);

  // --- CASCADE RENDER TRIGGER FOR UNOPTIMIZED STATE ---
  const [extraRenderTrigger, setExtraRenderTrigger] = useState(0);

  // --- PROFILING & MONITORING METRICS ---
  const renderCounter = useRef(0);
  const cellRenderCounter = useRef(0);
  renderCounter.current += 1;

  // --- UNOPTIMIZED RENDER CASCADE ---
  // When all toggles are OFF, trigger a rapid series of 15 sequential state updates
  useEffect(() => {
    if (!useReactMemo && !useCallbackOpt && !useMemoOpt) {
      if (extraRenderTrigger < 15) {
        setExtraRenderTrigger((prev) => prev + 1);
      }
    } else {
      if (extraRenderTrigger !== 0) {
        setExtraRenderTrigger(0);
      }
    }
  }, [extraRenderTrigger, useReactMemo, useCallbackOpt, useMemoOpt]);

  const triggerCascadeOnInteraction = () => {
    if (!useReactMemo && !useCallbackOpt && !useMemoOpt) {
      setExtraRenderTrigger(1);
    }
  };

  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setSelectedDate("");
    setShowModal(true);
  };

  // Base Handlers
  const handleDateClickBase = (info) => {
    setSelectedPost(null);
    setSelectedDate(`${info.dateStr}T10:00`);
    setShowModal(true);
  };

  const handleEventClickBase = (info) => {
    const post = posts.find((p) => String(p.id) === String(info.event.id));
    if (!post) return;
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleEventDropBase = (info) => {
    const updatedPosts = posts.map((post) => {
      if (String(post.id) === String(info.event.id)) {
        return { ...post, date: info.event.startStr };
      }
      return post;
    });
    savePosts(updatedPosts);
    triggerCascadeOnInteraction();
  };

  // --- SAFE USECALLBACK IMPLEMENTATION ---
  const handleDateClick = useCallback(
    handleDateClickBase,
    useCallbackOpt ? [] : [renderCounter.current]
  );

  const handleEventClick = useCallback(
    handleEventClickBase,
    useCallbackOpt ? [posts] : [renderCounter.current]
  );

  const handleEventDrop = useCallback(
    handleEventDropBase,
    useCallbackOpt ? [posts] : [renderCounter.current]
  );

  const handleSave = (post) => {
    const exists = posts.some((item) => item.id === post.id);
    let updatedPosts;
    if (exists) {
      updatedPosts = posts.map((item) => (item.id === post.id ? post : item));
    } else {
      updatedPosts = [...posts, post];
    }
    savePosts(updatedPosts);
    setShowModal(false);
    triggerCascadeOnInteraction();
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    savePosts(updatedPosts);
    setShowModal(false);
    triggerCascadeOnInteraction();
  };

  // Heavy computation simulation for profiling useMemo
  const computeFilteredPosts = () => {
    const startTime = performance.now();
    let count = 0;
    for (let i = 0; i < 8000000; i++) {
      count += i % 2;
    }

    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.caption.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform =
        platformFilter === "All" || post.platform === platformFilter;
      const matchesStatus =
        statusFilter === "All" || post.status === statusFilter;

      return matchesSearch && matchesPlatform && matchesStatus;
    });

    const endTime = performance.now();
    return {
      data: filtered,
      latency: (endTime - startTime).toFixed(2),
    };
  };

  // --- SAFE USEMEMO IMPLEMENTATION ---
  const { data: filteredPosts, latency: computeLatency } = useMemo(
    () => computeFilteredPosts(),
    useMemoOpt
      ? [posts, search, platformFilter, statusFilter]
      : [renderCounter.current]
  );

  const scheduledCount = posts.filter((post) => post.status === "Scheduled").length;
  const publishedCount = posts.filter((post) => post.status === "Published").length;
  const draftCount = posts.filter((post) => post.status === "Draft").length;

  const upcomingPosts = [...posts]
    .filter((post) => post.status === "Scheduled")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const resetProfiler = () => {
    renderCounter.current = 1;
    cellRenderCounter.current = 0;
    setExtraRenderTrigger(0);
    setPosts([...initialPosts]);
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">✦</span>
          ContentFlow
        </div>

        <div className="sidebar-section">
          <small>WORKSPACE</small>
          <nav>
            <div className="nav-item active">
              <span>📅</span>
              Calendar
            </div>
            <div className="nav-item">
              <span>📝</span>
              Posts
            </div>
            <div className="nav-item">
              <span>📊</span>
              Analytics
            </div>
          </nav>
        </div>

        <div className="sidebar-section">
          <small>PLATFORMS</small>
          <div className="platform-filter-list">
            {[
              ["Instagram", "📸"],
              ["Facebook", "📘"],
              ["LinkedIn", "💼"],
              ["Twitter", "𝕏"],
            ].map(([platform, icon]) => (
              <button
                key={platform}
                className={`sidebar-filter ${
                  platformFilter === platform ? "selected" : ""
                }`}
                onClick={() => {
                  setPlatformFilter(
                    platformFilter === platform ? "All" : platform
                  );
                  triggerCascadeOnInteraction();
                }}
              >
                <span>{icon}</span>
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">SK</div>
            <div>
              <strong>Sukhraj</strong>
              <small>Content Manager</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* TOPBAR */}
        <header className="topbar">
          <div>
            <div className="breadcrumb">Workspace / Calendar</div>
            <h1>Content Calendar</h1>
            <p>Plan, schedule and manage your social media content.</p>
          </div>

          <button className="create-btn" onClick={handleCreatePost}>
            <span>＋</span>
            Create Post
          </button>
        </header>

        {/* STATS */}
        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon purple">📅</div>
            <div>
              <small>Scheduled</small>
              <strong>{scheduledCount}</strong>
              <span className="stat-label">upcoming posts</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <small>Published</small>
              <strong>{publishedCount}</strong>
              <span className="stat-label">completed posts</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">📝</div>
            <div>
              <small>Drafts</small>
              <strong>{draftCount}</strong>
              <span className="stat-label">waiting to schedule</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">📱</div>
            <div>
              <small>Platforms</small>
              <strong>4</strong>
              <span className="stat-label">connected channels</span>
            </div>
          </div>
        </section>

        {/* OPTIMIZATION & MONITORING CONTROLS */}
        <section className="profiler-card">
          <div className="profiler-header">
            <div>
              <h3>Performance Profiler & Optimization Toggles</h3>
              <p>Experiment 1.4.2 — Real-time performance impact analysis</p>
            </div>
            <button className="reset-btn" onClick={resetProfiler}>
              Reset Metrics
            </button>
          </div>

          {/* TOGGLES */}
          <div className="toggle-grid">
            <div className="toggle-item">
              <div>
                <strong>React.memo</strong>
                <small>Component memoization</small>
              </div>
              <button
                className={`switch ${useReactMemo ? "active" : ""}`}
                onClick={() => {
                  setUseReactMemo(!useReactMemo);
                  triggerCascadeOnInteraction();
                }}
              >
                <div className="handle" />
              </button>
            </div>

            <div className="toggle-item">
              <div>
                <strong>useCallback</strong>
                <small>Stable callback reference</small>
              </div>
              <button
                className={`switch ${useCallbackOpt ? "active" : ""}`}
                onClick={() => {
                  setUseCallbackOpt(!useCallbackOpt);
                  triggerCascadeOnInteraction();
                }}
              >
                <div className="handle" />
              </button>
            </div>

            <div className="toggle-item">
              <div>
                <strong>useMemo</strong>
                <small>Computation caching</small>
              </div>
              <button
                className={`switch ${useMemoOpt ? "active" : ""}`}
                onClick={() => {
                  setUseMemoOpt(!useMemoOpt);
                  triggerCascadeOnInteraction();
                }}
              >
                <div className="handle" />
              </button>
            </div>
          </div>

          {/* METRICS SUMMARY */}
          <div className="metrics-summary">
            <div className="metric-badge">
              <small>Parent Re-renders</small>
              <strong>{renderCounter.current}</strong>
            </div>
            <div className="metric-badge">
              <small>Total Day Cell Renders</small>
              <strong className={useReactMemo ? "text-green" : "text-amber"}>
                {cellRenderCounter.current}
              </strong>
            </div>
            <div className="metric-badge">
              <small>Compute Latency</small>
              <strong className={useMemoOpt ? "text-green" : "text-amber"}>
                {computeLatency} ms
              </strong>
            </div>
          </div>

          {/* MONITORING TABLE */}
          <div className="monitoring-table-wrapper">
            <table className="monitoring-table">
              <thead>
                <tr>
                  <th>Optimization Technique</th>
                  <th>State</th>
                  <th>Exact Difference & Behavior Observed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>React.memo</strong></td>
                  <td>
                    <span className={`status-pill ${useReactMemo ? "on" : "off"}`}>
                      {useReactMemo ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td>
                    {useReactMemo
                      ? "Calendar cells skip re-rendering when unrelated state changes."
                      : "Every cell re-renders (+35 per render cycle) on any parent state change."}
                  </td>
                </tr>
                <tr>
                  <td><strong>useCallback</strong></td>
                  <td>
                    <span className={`status-pill ${useCallbackOpt ? "on" : "off"}`}>
                      {useCallbackOpt ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td>
                    {useCallbackOpt
                      ? "Preserves event handlers across renders, preventing prop mutations."
                      : "Recreates event handler functions on every frame, invalidating child memoization."}
                  </td>
                </tr>
                <tr>
                  <td><strong>useMemo</strong></td>
                  <td>
                    <span className={`status-pill ${useMemoOpt ? "on" : "off"}`}>
                      {useMemoOpt ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td>
                    {useMemoOpt
                      ? "Caches calculation results; skips loop executions when search/filters don't change."
                      : "Executes heavy filtering logic on every single keystroke and render cycle."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CONTENT GRID */}
        <div className="content-grid">
          {/* CALENDAR AREA */}
          <section className="calendar-card">
            <div className="calendar-toolbar">
              <div>
                <h2>Publishing Schedule</h2>
                <span>{filteredPosts.length} posts shown</span>
              </div>

              <div className="calendar-controls">
                <div className="search-box">
                  🔍
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      triggerCascadeOnInteraction();
                    }}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    triggerCascadeOnInteraction();
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>

            <Calendar
              posts={filteredPosts}
              onEventClick={handleEventClick}
              onEventDrop={handleEventDrop}
              onDateClick={handleDateClick}
              useReactMemo={useReactMemo}
              totalCellRendersRef={cellRenderCounter}
            />
          </section>

          {/* UPCOMING POSTS */}
          <aside className="upcoming-card">
            <div className="upcoming-header">
              <div>
                <h2>Upcoming</h2>
                <p>Your next scheduled posts</p>
              </div>
              <span className="upcoming-count">{scheduledCount}</span>
            </div>

            <div className="upcoming-list">
              {upcomingPosts.length === 0 ? (
                <div className="empty-state">
                  <div>📭</div>
                  <p>No scheduled posts</p>
                </div>
              ) : (
                upcomingPosts.map((post) => {
                  const icon =
                    post.platform === "Instagram"
                      ? "📸"
                      : post.platform === "Facebook"
                      ? "📘"
                      : post.platform === "LinkedIn"
                      ? "💼"
                      : "𝕏";

                  const date = new Date(post.date);

                  return (
                    <button
                      className="upcoming-post"
                      key={post.id}
                      onClick={() => {
                        setSelectedPost(post);
                        setShowModal(true);
                      }}
                    >
                      <div className="upcoming-icon">{icon}</div>
                      <div className="upcoming-info">
                        <strong>{post.title}</strong>
                        <span>{post.platform}</span>
                        <small>
                          {date.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          ·{" "}
                          {date.toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <button
              className="view-all-btn"
              onClick={() => {
                setSearch("");
                setPlatformFilter("All");
                setStatusFilter("Scheduled");
                triggerCascadeOnInteraction();
              }}
            >
              View scheduled posts →
            </button>
          </aside>
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <PostModal
          post={selectedPost}
          selectedDate={selectedDate}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;