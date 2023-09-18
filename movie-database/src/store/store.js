import { configureStore } from "@reduxjs/toolkit";
import favsReducer from "../features/favs/favsSlice";

export const store = configureStore({
  reducer: {
    favs: favsReducer,
  },
});

export default store;
