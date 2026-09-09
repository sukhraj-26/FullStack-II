import { useEffect, useState, memo } from "react";

function PostModal({
  post,
  selectedDate,
  onSave,
  onDelete,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [date, setDate] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("Scheduled");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setPlatform(post.platform);
      setDate(post.date);
      setCaption(post.caption);
      setStatus(post.status || "Scheduled");
    } else {
      setTitle("");
      setPlatform("Instagram");
      setDate(selectedDate || "");
      setCaption("");
      setStatus("Scheduled");
    }
  }, [post, selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: post?.id || Date.now().toString(),
      title: title.trim(),
      platform,
      date,
      caption: caption.trim(),
      status,
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              CONTENT SCHEDULER
            </span>

            <h2>
              {post
                ? "Edit Post"
                : "Create New Post"}
            </h2>
          </div>

          <button
            className="close-modal"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Post Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Summer Collection Launch"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Platform</label>

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(e.target.value)
                }
              >
                <option value="Instagram">
                  📸 Instagram
                </option>

                <option value="Facebook">
                  📘 Facebook
                </option>

                <option value="LinkedIn">
                  💼 LinkedIn
                </option>

                <option value="Twitter">
                  𝕏 Twitter
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="Scheduled">
                  🟡 Scheduled
                </option>

                <option value="Draft">
                  📝 Draft
                </option>

                <option value="Published">
                  🟢 Published
                </option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Schedule Date & Time</label>

            <input
              type="datetime-local"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Caption
              <span className="character-count">
                {caption.length}/280
              </span>
            </label>

            <textarea
              value={caption}
              maxLength={280}
              onChange={(e) =>
                setCaption(e.target.value)
              }
              placeholder="Write your caption..."
              rows="5"
            />
          </div>

          <div className="modal-footer">
            {post && (
              <button
                type="button"
                className="delete-btn"
                onClick={() =>
                  onDelete(post.id)
                }
              >
                🗑 Delete
              </button>
            )}

            <div className="modal-right-actions">
              <button
                type="button"
                onClick={onClose}
                className="cancel-btn"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                {post
                  ? "Save Changes"
                  : "Schedule Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(PostModal);