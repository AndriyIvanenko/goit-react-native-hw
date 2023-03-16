import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    avatarURL: "",
    userId: "",
    userName: "",
    userEmail: "",
    isLoggedIn: false,
  },
  reducers: {
    updateUser: (state, { payload }) => ({
      ...state,
      avatarURL: payload.avatarURL,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
    }),
    updateAuthState: (state, { payload }) => ({
      ...state,
      isLoggedIn: payload.isLoggedIn,
    }),
    updateAvatar: (state, { payload }) => ({
      ...state,
      avatarURL: payload.avatarURL,
    }),
  },
});

export const authReducer = authSlice.reducer;
