import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginMMS",
  initialState: {
    isLoggedIn: false,
    lecturerId: "",
    lecturerName: "",
    position: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.lecturerId = action.payload.lecturerId;
      state.lecturerName = action.payload.lecturerName;
      state.position = action.payload.position;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.lecturerId = "";
      state.lecturerName = "";
      state.position = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
