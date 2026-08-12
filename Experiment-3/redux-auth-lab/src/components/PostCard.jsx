import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  deletePost,
  likePost,
  togglePin,
  setEditingPost,
} from "../features/postSlice";

function PostCard({ post }) {
  const dispatch = useDispatch();

  const role = useSelector(
    (state) => state.auth.user?.role
  );

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
    if (role !== "Admin") {
      toast.error("Only Admin can pin posts.");
      return;
    }

    dispatch(togglePin(post.id));

    toast.success(
      post.pinned
        ? "📌 Post unpinned"
        : "📌 Post pinned"
    );
  };

  const handleEdit = () => {
    if (role === "Viewer") {
      toast.error(
        "Viewer cannot edit posts."
      );
      return;
    }

    dispatch(setEditingPost(post));

    toast("✏️ Editing post...");
  };

  const handleDelete = () => {
    if (
      role !== "Admin" &&
      role !== "Editor"
    ) {
      toast.error(
        "You don't have permission to delete posts."
      );
      return;
    }

    const confirmDelete =
      window.confirm(
        "Delete this post?"
      );

    if (!confirmDelete) return;

    dispatch(deletePost(post.id));

    toast.success("🗑 Post deleted");
  };

  return (
    <div
      className={`post-card ${
        post.pinned
          ? "pinned-card"
          : ""
      }`}
    >
      {post.pinned && (
        <div className="pin-ribbon">
          📌 PINNED
        </div>
      )}

      <div className="post-top">
        <div>
          <span
            className={`platform ${getPlatformClass(
              post.platform
            )}`}
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
        <p>{post.title}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Uploaded Preview"
            className="post-image"
          />
        )}

        {post.fileName && (
          <div className="attached-file">
            📎 {post.fileName}
          </div>
        )}
      </div>

      <div className="post-footer">
        <small>
          📅 {post.createdAt}
        </small>
      </div>

      <div className="post-actions">

        {(role === "Admin" ||
          role === "Editor" ||
          role === "Viewer") && (
          <button
            className="action like"
            onClick={handleLike}
          >
            ❤️ {post.likes}
          </button>
        )}

        {role === "Admin" && (
          <button
            className="action pin"
            onClick={handlePin}
          >
            {post.pinned
              ? "📌 Unpin"
              : "📌 Pin"}
          </button>
        )}

        {(role === "Admin" ||
          role === "Editor") && (
          <button
            className="action edit"
            onClick={handleEdit}
          >
            ✏️ Edit
          </button>
        )}

        {(role === "Admin" ||
          role === "Editor") && (
          <button
            className="action delete"
            onClick={handleDelete}
          >
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCard;