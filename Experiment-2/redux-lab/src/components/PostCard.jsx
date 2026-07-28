import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  deletePost,
  likePost,
  togglePin,
  setEditingPost,
} from "../features/postSlice";

function PostCard({ post }) {
  const dispatch = useDispatch();

  const getPlatformClass = (platform) => {
    switch (platform) {
      case "LinkedIn":
        return "linkedin";

      case "Instagram":
        return "instagram";

      case "Facebook":
        return "facebook";

      case "X":
        return "twitter";

      default:
        return "";
    }
  };

  const handleLike = () => {
    dispatch(likePost(post.id));
    toast.success("❤️ Post liked!");
  };

  const handlePin = () => {
    dispatch(togglePin(post.id));

    if (post.pinned) {
      toast("📌 Post unpinned");
    } else {
      toast.success("📌 Post pinned");
    }
  };

  const handleEdit = () => {
    dispatch(setEditingPost(post));
    toast("✏️ Editing post...");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    dispatch(deletePost(post.id));

    toast.success("🗑 Post deleted");
  };

  return (
    <div className={`post-card ${post.pinned ? "pinned-card" : ""}`}>

      {post.pinned && (
        <div className="pin-ribbon">
          📌 PINNED
        </div>
      )}

      <div className="post-top">

        <div>

          <span
            className={`platform ${getPlatformClass(post.platform)}`}
          >
            {post.platform}
          </span>

          <span
            className={
              post.status === "Published"
                ? "status published"
                : "status draft"
            }
          >
            {post.status}
          </span>

        </div>

      </div>

      <div className="post-content">
        {post.title}
      </div>

      <div className="post-footer">

        <small>
          📅 {post.createdAt}
        </small>

      </div>

      <div className="post-actions">

        <button
          className="action like"
          onClick={handleLike}
        >
          ❤️ {post.likes}
        </button>

        <button
          className="action pin"
          onClick={handlePin}
        >
          {post.pinned ? "📌 Unpin" : "📌 Pin"}
        </button>

        <button
          className="action edit"
          onClick={handleEdit}
        >
          ✏️ Edit
        </button>

        <button
          className="action delete"
          onClick={handleDelete}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}
export default PostCard;
