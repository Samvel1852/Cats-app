import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "../features/cats/catsSlice";

export const store = configureStore({
  reducer: {
    cats: catsReducer,
  },
});
