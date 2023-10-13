
import { createSlice } from '@reduxjs/toolkit';

const showLoadingSlice = createSlice({
  name: 'showLoading',
  initialState: true, // Initialize to true
  reducers: {
    setshowLoading: (state, action) => {
      return action.payload; // Update the search query with the payload
    },
  },
});

export const { setshowLoading } = showLoadingSlice.actions;
export default showLoadingSlice.reducer;
