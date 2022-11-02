import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginMMS",
  initialState: {
    isLoggedIn: false,
    lecturerId: "",
    position: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.lecturerId = action.payload.lecturerId;
      state.position = action.payload.position;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.lecturerId = "";
      state.position = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
