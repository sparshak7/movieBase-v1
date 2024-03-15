import { configureStore } from "@reduxjs/toolkit";
import { myAPI } from "../api";

export const store = configureStore({
  reducer: {
    [myAPI.reducerPath]: myAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(myAPI.middleware),
});
