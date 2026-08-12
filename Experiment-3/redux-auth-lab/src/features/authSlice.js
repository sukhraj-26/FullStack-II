import { createSlice } from "@reduxjs/toolkit";

// Load user from Local Storage
const savedUser = JSON.parse(
  localStorage.getItem("user")
);

const initialState = {
  user: savedUser || null,
  token: savedUser?.token || null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;

      state.token = action.payload.token;

      state.isAuthenticated = true;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;

      state.token = null;

      state.isAuthenticated = false;

      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } =
  authSlice.actions;

export default authSlice.reducer;