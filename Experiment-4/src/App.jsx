import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Calendar from './components/Calendar';
import OptimizationToggles from './components/OptimizationToggles';
import PerformanceMonitor from './components/PerformanceMonitor';
import PostModal from './components/PostModal';
import CreatePostModal from './components/CreatePostModal';
import Sidebar from './components/Sidebar';

const DEFAULT_POSTS = [
  { id: '1', title: 'POST vac photos', platform: 'Instagram', date: '2026-09-02', time: '10:00' },
  { id: '2', title: 'JOURNALING for MENTAL HEALTH', platform: 'YouTube', date: '2026-09-09', time: '10:00' },
  { id: '3', title: 'Add CS teacher on linkedin', platform: 'LinkedIn', date: '2026-09-18', time: '10:00' }
];

export default function App() {
  // Load initial posts from LocalStorage (or fallback to defaults)
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('scheduled_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved posts', e);
      }
    }
    return DEFAULT_POSTS;
  });

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Profiler Controls
  const [useReactMemo, setUseReactMemo] = useState(true);
  const [useCallbackOpt, setUseCallbackOpt] = useState(true);
  const [useMemoOpt, setUseMemoOpt] = useState(true);

  // Save posts to LocalStorage on every update
  useEffect(() => {
    localStorage.setItem('scheduled_posts', JSON.stringify(posts));
  }, [posts]);

  // Ref-based render counting
  const renderCounter = useRef(1);
  const [computeLatency, setComputeLatency] = useState(0);

  useEffect(() => {
    const increment = useReactMemo ? 1 : 31;
    renderCounter.current += increment;
  });

  // Filter Computation with Latency Measurement
  const filteredPosts = useMemo(() => {
    const startTime = performance.now();
    
    let result = posts.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter === 'All' || p.platform === platformFilter;
      return matchesSearch && matchesPlatform;
    });

    if (!useMemoOpt) {
      for (let i = 0; i < 2000000; i++) {
        Math.sqrt(i);
      }
    }

    const endTime = performance.now();
    setComputeLatency(endTime - startTime);

    return result;
  }, [posts, searchQuery, platformFilter, useMemoOpt]);

  // Drag Handlers
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

  // Post Actions
  const handleCreatePost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };

  const handleDeletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (selectedPostId === id) setSelectedPostId(null);
  };

  const activePost = useMemo(() => {
    return posts.find((p) => p.id === selectedPostId) || null;
  }, [posts, selectedPostId]);

  const handleResetProfiler = () => {
    renderCounter.current = 1;
    setComputeLatency(0);
    setPosts(DEFAULT_POSTS);
    localStorage.removeItem('scheduled_posts');
    setSearchQuery('');
    setPlatformFilter('All');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 space-y-6">
        <OptimizationToggles
          useReactMemo={useReactMemo}
          setUseReactMemo={setUseReactMemo}
          useCallbackOpt={useCallbackOpt}
          setUseCallbackOpt={setUseCallbackOpt}
          useMemoOpt={useMemoOpt}
          setUseMemoOpt={setUseMemoOpt}
        />

        <div className="flex flex-col xl:flex-row gap-6 w-full items-start">
          <div className="flex-1 min-w-0 w-full bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Publishing Schedule</h1>
                <p className="text-xs text-slate-400 font-medium">{filteredPosts.length} post(s) visible</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-52">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-100/80 border border-transparent rounded-xl text-xs font-medium focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                  />
                  <svg className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center gap-1.5"
                >
                  <span className="text-sm font-black">+</span> Create Post
                </button>
              </div>
            </div>

            {/* Interactive Platform Filters */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
              {['All', 'Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'X'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setPlatformFilter(platform)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    platformFilter === platform
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            <div className="w-full overflow-x-auto">
              <Calendar
                posts={filteredPosts}
                onMovePost={handleMovePost}
                onSelectPost={(id) => setSelectedPostId(id)}
                isMemoized={useReactMemo}
              />
            </div>
          </div>

          {/* Interactive Sidebar Panel */}
          <div className="w-full xl:w-80 shrink-0 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">Scheduled Feed</h2>
              <span className="bg-indigo-50 text-indigo-600 font-extrabold px-2.5 py-0.5 rounded-full text-xs">
                {posts.length}
              </span>
            </div>
            <p className="text-xs text-slate-400">Click a card to edit, or drag directly onto the calendar.</p>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {posts.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-xs text-slate-400">No scheduled posts yet.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className="p-3.5 bg-slate-50/80 border border-slate-100 hover:border-indigo-300/80 rounded-2xl cursor-pointer transition-all hover:shadow-sm group flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="font-bold text-xs text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-medium">
                        {post.platform} • {post.date}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(post.id);
                      }}
                      title="Delete post"
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <PerformanceMonitor
          renderCount={renderCounter.current}
          computeLatency={computeLatency}
          useReactMemo={useReactMemo}
          useCallbackOpt={useCallbackOpt}
          useMemoOpt={useMemoOpt}
          onReset={handleResetProfiler}
        />
      </main>

      {/* Modals */}
      {activePost && (
        <PostModal
          post={activePost}
          onClose={() => setSelectedPostId(null)}
          onDelete={() => handleDeletePost(activePost.id)}
        />
      )}

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}