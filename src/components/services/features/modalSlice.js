import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: "",
    showUpdate: {},
  },
  reducers: {
    show: (state, action) => {
      state.show = true;
      return state;
    },
    hide: (state) => {
      state.show = false;
      return state;
    },
    showUpdate: (state, action) => {
      state.showUpdate.show = true;
      state.showUpdate.id = action.payload;
      return state;
    },
    hideUpdate: (state) => {
      state.showUpdate.show = false;
      return state;
    },
  },
});

export const { show, hide, showUpdate, hideUpdate } = modalSlice.actions;

export default modalSlice.reducer;
