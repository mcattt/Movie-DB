// searchSlice.js

import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
   // Initialize to an empty string
  initialState: '',
  reducers: {
    setSearchQuery: (state, action) => {
       // Update the search query with the payload
      return action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
