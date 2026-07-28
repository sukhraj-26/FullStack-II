import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

/*
===================================
Save Redux state to Local Storage
===================================
*/

store.subscribe(() => {
  localStorage.setItem(
    "reduxPosts",
    JSON.stringify(store.getState().posts.posts)
  );
});