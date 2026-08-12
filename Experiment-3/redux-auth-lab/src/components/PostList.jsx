import { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

function PostList() {

  const posts = useSelector(
    (state) => state.posts.posts
  );

  const [search, setSearch] = useState("");

  const [platformFilter, setPlatformFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortOrder, setSortOrder] =
    useState("Newest");

  let filteredPosts = [...posts];

  // Search
  filteredPosts = filteredPosts.filter((post) =>
    post.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Platform Filter
  if (platformFilter !== "All") {

    filteredPosts = filteredPosts.filter(
      (post) =>
        post.platform === platformFilter
    );

  }

  // Status Filter
  if (statusFilter !== "All") {

    filteredPosts = filteredPosts.filter(
      (post) =>
        post.status === statusFilter
    );

  }

  // Sort

  filteredPosts.sort((a, b) => {

    // Always keep pinned first

    if (a.pinned && !b.pinned) return -1;

    if (!a.pinned && b.pinned) return 1;

    if (sortOrder === "Newest") {

      return b.id - a.id;

    }

    return a.id - b.id;

  });

  return (

    <>

      <div className="filter-bar">

        <input
          type="text"
          placeholder="🔍 Search posts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={platformFilter}
          onChange={(e) =>
            setPlatformFilter(e.target.value)
          }
        >

          <option>All</option>

          <option>LinkedIn</option>

          <option>Instagram</option>

          <option>Facebook</option>

          <option>X</option>

        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option>All</option>

          <option>Published</option>

          <option>Draft</option>

        </select>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
        >

          <option>Newest</option>

          <option>Oldest</option>

        </select>

      </div>

      <p className="results-text">

        Showing {filteredPosts.length} of {posts.length} posts

      </p>

      {filteredPosts.length === 0 ? (

        <div className="empty-state">

          <h2>

            📭 No Posts Found

          </h2>

          <p>

            Try changing your search or filters.

          </p>

        </div>

      ) : (

        <div className="post-grid">

          {filteredPosts.map((post) => (

            <PostCard
              key={post.id}
              post={post}
            />

          ))}

        </div>

      )}

    </>

  );

}

export default PostList;