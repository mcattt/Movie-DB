import { configureStore } from "@reduxjs/toolkit";
import favsReducer from "../features/favs/favsSlice";
import viewMoreReducer from "../features/more/viewMoreSlice";

export const store = configureStore({
  reducer: {
    favs: favsReducer,
    viewMore: viewMoreReducer,
  },
});

export default store;
