import { createSlice } from "@reduxjs/toolkit";

// Load posts from Local Storage
const savedPosts = JSON.parse(
  localStorage.getItem("posts")
) || [];

const initialState = {
  posts: savedPosts,
  editingPost: null,
};

const savePosts = (posts) => {
  localStorage.setItem(
    "posts",
    JSON.stringify(posts)
  );
};

const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    // -----------------------
    // Add Post
    // -----------------------
    addPost: (state, action) => {
      state.posts.unshift(action.payload);

      savePosts(state.posts);
    },

    // -----------------------
    // Delete Post
    // -----------------------
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );

      savePosts(state.posts);
    },

    // -----------------------
    // Update Post
    // -----------------------
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;

        savePosts(state.posts);
      }
    },

    // -----------------------
    // Like Post
    // -----------------------
    likePost: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.likes += 1;

        savePosts(state.posts);
      }
    },

    // -----------------------
    // Pin / Unpin
    // -----------------------
    togglePin: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.pinned = !post.pinned;

        savePosts(state.posts);
      }
    },

    // -----------------------
    // Edit Mode
    // -----------------------
    setEditingPost: (state, action) => {
      state.editingPost = action.payload;
    },

    clearEditingPost: (state) => {
      state.editingPost = null;
    },
  },
});

export const {
  addPost,
  deletePost,
  updatePost,
  likePost,
  togglePin,
  setEditingPost,
  clearEditingPost,
} = postSlice.actions;

export default postSlice.reducer;