import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";
import modalSlice from "./features/modalSlice";
import { apiSlice } from "./features/apiSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
    modal: modalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
