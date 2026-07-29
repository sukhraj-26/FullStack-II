import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFilteredPosts,
  selectSearch,
  selectPlatformFilter,
  setSearch,
  setPlatformFilter,
} from "../features/postSlice";

import PostCard from "./PostCard";

function PostList() {

  const dispatch = useDispatch();

  const posts = useSelector(selectFilteredPosts);

  const search = useSelector(selectSearch);

  const filter = useSelector(selectPlatformFilter);

  const [sortBy, setSortBy] = useState("Newest");

  // Memoized Sorting
  const sortedPosts = useMemo(() => {

    return [...posts].sort((a, b) => {

      switch (sortBy) {

        case "Newest":
          return b.id - a.id;

        case "Oldest":
          return a.id - b.id;

        case "Most Liked":
          return b.likes - a.likes;

        case "Pinned First":
          return Number(b.pinned) - Number(a.pinned);

        default:
          return 0;
      }

    });

  }, [posts, sortBy]);

  return (

    <div className="post-section">

      <div className="toolbar">

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={(e) =>
              dispatch(setSearch(e.target.value))
            }
          />

        </div>

        <div className="filters">

          <select
            value={filter}
            onChange={(e) =>
              dispatch(setPlatformFilter(e.target.value))
            }
          >
            <option>All</option>
            <option>LinkedIn</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>X</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Most Liked</option>
            <option>Pinned First</option>
          </select>

        </div>

      </div>

      <div className="list-header">

        <h2>Recent Posts</h2>

        <span>{sortedPosts.length} Posts</span>

      </div>

      {sortedPosts.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">

            📝

          </div>

          <h2>No Posts Found</h2>

          <p>

            Start by creating your first social media post.

          </p>

        </div>

      ) : (

        <div className="post-grid">

          {sortedPosts.map((post) => (

            <PostCard
              key={post.id}
              post={post}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default PostList;