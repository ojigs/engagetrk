import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import modalSlice from "./features/modalSlice";
import { apiSlice } from "./features/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    category: categorySlice,
    modal: modalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
