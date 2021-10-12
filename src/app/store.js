import { configureStore } from "@reduxjs/toolkit";

import catsReducer from "../features/Cats/catsSlice";

export const store = configureStore({
  reducer: {
    cats: catsReducer,
  },
});
