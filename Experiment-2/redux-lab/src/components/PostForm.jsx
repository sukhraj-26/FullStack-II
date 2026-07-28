import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  addPost,
  updatePost,
  clearEditingPost,
} from "../features/postSlice";

function PostForm() {
  const dispatch = useDispatch();

  const editingPost = useSelector(
    (state) => state.posts.editingPost
  );

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [status, setStatus] = useState("Published");

  const platformLimits = {
    LinkedIn: 3000,
    Instagram: 2200,
    Facebook: 63206,
    X: 280,
  };

  const maxChars = platformLimits[platform];

  const remaining = maxChars - title.length;

  const progress = (title.length / maxChars) * 100;

  const isLimitExceeded = remaining < 0;

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setPlatform(editingPost.platform);
      setStatus(editingPost.status);
    }
  }, [editingPost]);

  const resetForm = () => {
    setTitle("");
    setPlatform("LinkedIn");
    setStatus("Published");
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Post cannot be empty!");
      return;
    }

    if (isLimitExceeded) {
      toast.error("Character limit exceeded!");
      return;
    }

    if (editingPost) {
      dispatch(
        updatePost({
          ...editingPost,
          title,
          platform,
          status,
        })
      );

      toast.success("Post updated!");

      dispatch(clearEditingPost());
    } else {
      dispatch(
        addPost({
          id: Date.now(),
          title,
          platform,
          status,
          createdAt: new Date().toLocaleString(),
          likes: 0,
          pinned: false,
        })
      );

      toast.success("Post published successfully!");
    }

    resetForm();
  };

  return (
    <div className="composer">
      <div className="composer-header">
        <h2>
          {editingPost ? "Edit Post" : "Create New Post"}
        </h2>

        <p>
          Create content for your social media platforms.
        </p>
      </div>

      <div className="composer-grid">
        <div className="input-group">
          <label>Platform</label>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option>LinkedIn</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>X</option>
          </select>
        </div>

        <div className="input-group">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>Post Content</label>

        <textarea
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="character-info">
        <span>
          {title.length} / {maxChars} characters
        </span>

        <span
          className={
            isLimitExceeded
              ? "danger"
              : remaining < 50
              ? "warning"
              : "success"
          }
        >
          Remaining: {remaining}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className={`progress-fill ${
            isLimitExceeded ? "error" : ""
          }`}
          style={{
            width: `${Math.min(progress, 100)}%`,
          }}
        />
      </div>

      {isLimitExceeded && (
        <div className="limit-error">
          ⚠️ Character limit exceeded by{" "}
          {Math.abs(remaining)} characters.
          <br />
          Please shorten your post before publishing.
        </div>
      )}

      <div className="button-row">
        {editingPost && (
          <button
            className="cancel-btn"
            onClick={() => {
              dispatch(clearEditingPost());
              resetForm();
              toast("Edit cancelled");
            }}
          >
            Cancel
          </button>
        )}

        <button
          className="publish-btn"
          disabled={isLimitExceeded}
          onClick={handleSubmit}
        >
          {editingPost ? "Update Post" : "Publish Post"}
        </button>
      </div>
    </div>
  );
}

export default PostForm;