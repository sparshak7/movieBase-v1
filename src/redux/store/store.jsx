import { configureStore } from "@reduxjs/toolkit";
// import { playerSlice } from "../slices/playerSlice";
import { myAPI } from "../api";

export const store = configureStore({
  reducer: {
    [myAPI.reducerPath]: myAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myAPI.middleware),
});
