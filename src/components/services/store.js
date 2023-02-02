import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./reducers/todoSlice";
import modalSlice from "./reducers/modalSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
    modal: modalSlice,
  },
});

export default store;
