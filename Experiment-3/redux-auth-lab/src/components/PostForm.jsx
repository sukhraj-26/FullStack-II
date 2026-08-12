import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

import {
  addPost,
  updatePost,
  clearEditingPost,
} from "../features/postSlice";

function PostForm() {
  const dispatch = useDispatch();

  // Logged in user's role
  const role = useSelector(
    (state) => state.auth.user?.role
  );

  // Post currently being edited
  const editingPost = useSelector(
    (state) => state.posts.editingPost
  );

  // Form State
  const [title, setTitle] = useState("");
  const [platform, setPlatform] =
    useState("LinkedIn");
  const [status, setStatus] =
    useState("Published");

  const [image, setImage] =
    useState(null);

  const [fileName, setFileName] =
    useState("");

  const [showEmojiPicker,
    setShowEmojiPicker] =
    useState(false);

  // Platform character limits
  const platformLimits = {
    LinkedIn: 3000,
    Instagram: 2200,
    Facebook: 63206,
    X: 280,
  };

  const maxChars =
    platformLimits[platform];

  const remaining =
    maxChars - title.length;

  const progress =
    (title.length / maxChars) * 100;

  const exceeded =
    remaining < 0;

  // Load data while editing
  useEffect(() => {

    if (!editingPost) return;

    setTitle(editingPost.title);

    setPlatform(editingPost.platform);

    setStatus(editingPost.status);

    setImage(
      editingPost.image || null
    );

    setFileName(
      editingPost.fileName || ""
    );

  }, [editingPost]);

  // Reset Form
  const resetForm = () => {

    setTitle("");

    setPlatform("LinkedIn");

    setStatus("Published");

    setImage(null);

    setFileName("");

    setShowEmojiPicker(false);

  };

  // Emoji Picker
  const onEmojiClick = (
    emojiObject
  ) => {

    setTitle(
      (prev) =>
        prev + emojiObject.emoji
    );

  };

  // Image Upload
  const handleImageUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () =>

      setImage(reader.result);

    reader.readAsDataURL(file);

  };

  // File Upload
  const handleFileUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setFileName(file.name);

  };

  // Publish / Update
  const handleSubmit = () => {

    if (!title.trim()) {

      toast.error(
        "Post cannot be empty."
      );

      return;

    }

    if (exceeded) {

        toast.error(
    `Character limit exceeded by ${Math.abs(
      remaining
    )} characters.`
  );

  return;


    }

    // Updating existing post

    if (editingPost) {

      dispatch(
        updatePost({
          ...editingPost,

          title,

          platform,

          status,

          image,

          fileName,
        })
      );

      dispatch(
        clearEditingPost()
      );

      toast.success(
        "Post Updated!"
      );

      resetForm();

      return;

    }

    // Only Admin can create

    if (role !== "Admin") {

      toast.error(
        "Only Admin can create posts."
      );

      return;

    }

    dispatch(
      addPost({

        id: Date.now(),

        title,

        platform,

        status,

        createdAt:
          new Date().toLocaleString(),

        likes: 0,

        pinned: false,

        image,

        fileName,

      })
    );

    toast.success(
      "Post Published!"
    );

    resetForm();

  };
    // -----------------------------
  // Role Based Access Control
  // -----------------------------

  if (role === "Viewer") {
    return (
      <div className="composer restricted">
        <div className="composer-header">
          <h2>🔒 Access Restricted</h2>

          <p>
            Viewer accounts can browse and like posts only.
          </p>
        </div>
      </div>
    );
  }

  if (role === "Editor" && !editingPost) {
    return (
      <div className="composer restricted">
        <div className="composer-header">
          <h2>✏️ Editor Mode</h2>

          <p>
            Editors cannot create new posts.
            <br />
            Click <strong>Edit</strong> on an existing post.
          </p>
        </div>
      </div>
    );
  }

  return (

    <div className="composer">

      <div className="composer-header">

        <h2>
          {editingPost
            ? "✏️ Edit Post"
            : "🚀 Create New Post"}
        </h2>

        <p>

          Share content across your social media platforms.

        </p>

      </div>

      <div className="composer-grid">

        <div className="input-group">

          <label>

            Platform

          </label>

          <select
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value)
            }
          >

            <option>LinkedIn</option>

            <option>Instagram</option>

            <option>Facebook</option>

            <option>X</option>

          </select>

        </div>

        <div className="input-group">

          <label>

            Status

          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option>
              Published
            </option>

            <option>
              Draft
            </option>

          </select>

        </div>

      </div>

      <div className="input-group">

        <label>

          Post Content

        </label>

        <div className="editor-toolbar">

          <button
            type="button"
            className="emoji-btn"
            onClick={() =>
              setShowEmojiPicker(
                !showEmojiPicker
              )
            }
          >

            😀 Emoji Picker

          </button>

        </div>

        {showEmojiPicker && (

          <div className="emoji-picker">

            <EmojiPicker
              onEmojiClick={
                onEmojiClick
              }
              width="100%"
              height={350}
            />

          </div>

        )}

        <textarea
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

      </div>

      <div className="character-info">

        <span>

          {title.length} / {maxChars}

        </span>

        <span
          className={
            exceeded
              ? "danger"
              : remaining < 50
              ? "warning"
              : "success"
          }
        >

          Remaining : {remaining}

        </span>

      </div>

      <div className="progress-bar">

        <div
          className={`progress-fill ${
            exceeded
              ? "error"
              : ""
          }`}
          style={{
            width: `${Math.min(
              progress,
              100
            )}%`,
          }}
        />

      </div>
      {exceeded && (
     <div className="limit-error">
        ⚠️ Character limit exceeded by{" "}
        {Math.abs(remaining)} characters.

         <br />

        Please shorten your post before publishing.
     </div>
)}


      <hr />

      <h3>

        📷 Upload Image

      </h3>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleImageUpload
        }
      />

      {image && (

        <div className="image-preview">

          <img
            src={image}
            alt="Uploaded preview"
            className="preview-image"
          />

          <button
            type="button"
            onClick={() =>
              setImage(null)
            }
          >

            Remove Image

          </button>

        </div>

      )}

      <hr />

      <h3>

        📎 Upload File

      </h3>

      <input
        type="file"
        onChange={
          handleFileUpload
        }
      />

      {fileName && (

        <div className="file-preview">

          📄 {fileName}

          <button
            type="button"
            onClick={() =>
              setFileName("")
            }
          >

            Remove File

          </button>

        </div>

      )}
            <hr />

      <div className="button-row">

        {editingPost && (

          <button
            type="button"
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
          type="button"
          className="publish-btn"
          disabled={exceeded || !title.trim()}
          onClick={handleSubmit}
        >

          {editingPost
            ? "💾 Update Post"
            : "🚀 Publish Post"}

        </button>

      </div>

    </div>

  );

}

export default PostForm;