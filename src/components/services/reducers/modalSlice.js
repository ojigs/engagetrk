import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: "",
  reducers: {
    show: (state) => {
      state = true;
      return state;
    },
    hide: (state) => {
      state = false;
      return state;
    },
  },
});

export const { show, hide } = modalSlice.actions;

export default modalSlice.reducer;
