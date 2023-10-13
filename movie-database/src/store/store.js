import { configureStore } from "@reduxjs/toolkit";
import favsReducer from "../features/favs/favsSlice";
import viewMoreReducer from "../features/more/viewMoreSlice";
import searchReducer from "../features/search/searchSlice";
import loadingReducer from "../features/showLoading/showLoadingSlice";

export const store = configureStore({
  reducer: {
    favs: favsReducer,
    viewMore: viewMoreReducer,
    search: searchReducer,
    showLoading: loadingReducer
  },
});

export default store;
