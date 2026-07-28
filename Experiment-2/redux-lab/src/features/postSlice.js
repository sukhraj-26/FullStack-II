import { createSlice, createSelector } from "@reduxjs/toolkit";

const savedPosts = JSON.parse(
  localStorage.getItem("reduxPosts")
);

const initialState = {
  posts: savedPosts || [],

  search: "",

  platformFilter: "All",

  editingPost: null,
};
const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }

      state.editingPost = null;
    },

    likePost: (state, action) => {

      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.likes += 1;
      }

    },

    togglePin: (state, action) => {

      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.pinned = !post.pinned;
      }

    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setPlatformFilter: (state, action) => {
      state.platformFilter = action.payload;
    },

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
  setSearch,
  setPlatformFilter,
  setEditingPost,
  clearEditingPost,
} = postSlice.actions;

export default postSlice.reducer;

/* -----------------------------
        BASIC SELECTORS
------------------------------ */

export const selectPosts = (state) => state.posts.posts;

export const selectSearch = (state) => state.posts.search;

export const selectPlatformFilter = (state) =>
  state.posts.platformFilter;

export const selectEditingPost = (state) =>
  state.posts.editingPost;

/* -----------------------------
     FILTERED POSTS
------------------------------ */

export const selectFilteredPosts = createSelector(
  [
    selectPosts,
    selectSearch,
    selectPlatformFilter,
  ],

  (posts, search, filter) => {

    return posts.filter((post) => {

      const searchMatch =
        post.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const platformMatch =
        filter === "All"
          ? true
          : post.platform === filter;

      return searchMatch && platformMatch;

    });

  }
);

/* -----------------------------
      DASHBOARD STATS
------------------------------ */

export const selectTotalPosts = createSelector(
  [selectPosts],

  (posts) => posts.length
);

export const selectDraftPosts = createSelector(
  [selectPosts],

  (posts) =>
    posts.filter(
      (post) => post.status === "Draft"
    ).length
);

export const selectPublishedPosts = createSelector(
  [selectPosts],

  (posts) =>
    posts.filter(
      (post) => post.status === "Published"
    ).length
);

export const selectPinnedPosts = createSelector(
  [selectPosts],

  (posts) =>
    posts.filter(
      (post) => post.pinned
    ).length
);

export const selectTotalLikes = createSelector(
  [selectPosts],

  (posts) =>
    posts.reduce(
      (sum, post) => sum + post.likes,
      0
    )
);