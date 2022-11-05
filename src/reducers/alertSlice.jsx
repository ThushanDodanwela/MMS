import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alertMMS",
  initialState: {
    isVisible: false,
    message: "",
    btnText: "",
    btnAction: () => {
      console.log("Please set the btn action");
    },
  },
  reducers: {
    showAlert: (state, action) => {
      state.isVisible = action.payload.isVisible;
      state.message = action.payload.message;
      state.btnText = action.payload.btnText;
      state.btnAction = action.payload.btnAction;
    },

    hideAlert: (state) => {
      state.isVisible = false;
      state.message = "";
      state.btnText = "";
      state.btnAction = () => {};
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
