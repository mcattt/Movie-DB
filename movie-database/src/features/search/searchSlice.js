// searchSlice.js

import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '', // Initialize to an empty string
  reducers: {
    setSearchQuery: (state, action) => {
      return action.payload; // Update the search query with the payload
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
