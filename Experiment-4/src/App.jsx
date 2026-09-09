import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Calendar from './components/Calendar';
import OptimizationToggles from './components/OptimizationToggles';
import PerformanceMonitor from './components/PerformanceMonitor';
import PostModal from './components/PostModal';
import Sidebar from './components/Sidebar';

const INITIAL_POSTS = [
  { id: '1', title: 'POST vac photos', platform: 'Instagram', date: '2026-09-02', time: '10:00' },
  { id: '2', title: 'JOURNALING for MENTAL HEALTH', platform: 'YouTube', date: '2026-09-09', time: '10:00' },
  { id: '3', title: 'Add CS teacher on linkedin', platform: 'LinkedIn', date: '2026-09-18', time: '10:00' }
];

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Performance Profiling States
  const [useReactMemo, setUseReactMemo] = useState(true);
  const [useCallbackOpt, setUseCallbackOpt] = useState(true);
  const [useMemoOpt, setUseMemoOpt] = useState(true);

  // Render & Latency Tracker
  const renderCounter = useRef(0);
  const [computeLatency, setComputeLatency] = useState(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  // Filter Computation with Latency Benchmarking
  const filteredPosts = useMemo(() => {
    const startTime = performance.now();
    
    // Controlled loop simulation if useMemo is disabled
    let result = posts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!useMemoOpt) {
      for (let i = 0; i < 500000; i++) {
        Math.sqrt(i);
      }
    }

    const endTime = performance.now();
    setComputeLatency(endTime - startTime);

    return result;
  }, [posts, searchQuery, useMemoOpt]);

  // Safe Post Selection Guard
  const activePost = useMemo(() => {
    return posts.find((p) => p.id === selectedPostId) || null;
  }, [posts, selectedPostId]);

  // Drag & Drop Handler (toggles between memoized & non-memoized)
  const rawHandleMovePost = (postId, newDate) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, date: newDate } : post))
    );
  };

  const memoizedHandleMovePost = useCallback((postId, newDate) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, date: newDate } : post))
    );
  }, []);

  const handleMovePost = useCallbackOpt ? memoizedHandleMovePost : rawHandleMovePost;

  const handleResetProfiler = () => {
    renderCounter.current = 0;
    setComputeLatency(0);
    setPosts(INITIAL_POSTS);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 space-y-6">
        {/* Performance Control Bar */}
        <OptimizationToggles
          useReactMemo={useReactMemo}
          setUseReactMemo={setUseReactMemo}
          useCallbackOpt={useCallbackOpt}
          setUseCallbackOpt={setUseCallbackOpt}
          useMemoOpt={useMemoOpt}
          setUseMemoOpt={setUseMemoOpt}
        />

        {/* Main Dashboard Layout */}
        <div className="flex flex-col xl:flex-row gap-6 w-full items-start">
          
          {/* Calendar Container */}
          <div className="flex-1 min-w-0 w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Publishing Schedule</h1>
                <p className="text-sm text-slate-500">{filteredPosts.length} posts shown</p>
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                />
                <svg className="w-4 h-4 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Scrollable Calendar Wrapper */}
            <div className="w-full overflow-x-auto">
              <Calendar
                posts={filteredPosts}
                onMovePost={handleMovePost}
                onSelectPost={(id) => setSelectedPostId(id)}
                isMemoized={useReactMemo}
              />
            </div>
          </div>

          {/* Right Panel: Upcoming Posts */}
          <div className="w-full xl:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Upcoming</h2>
              <span className="bg-indigo-50 text-indigo-600 font-semibold px-2.5 py-0.5 rounded-full text-xs">
                {posts.length}
              </span>
            </div>
            <p className="text-xs text-slate-400">Your next scheduled posts</p>

            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  className="p-3 bg-slate-50 border border-slate-100 hover:border-indigo-200 rounded-xl cursor-pointer transition-all hover:shadow-sm"
                >
                  <div className="font-semibold text-sm text-slate-800">{post.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{post.platform} • {post.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Profiler */}
        <PerformanceMonitor
          renderCount={renderCounter.current}
          computeLatency={computeLatency}
          useReactMemo={useReactMemo}
          useCallbackOpt={useCallbackOpt}
          useMemoOpt={useMemoOpt}
          onReset={handleResetProfiler}
        />
      </main>

      {/* Safe Modal Guard */}
      {activePost && (
        <PostModal post={activePost} onClose={() => setSelectedPostId(null)} />
      )}
    </div>
  );
}