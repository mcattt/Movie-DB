
import { createSlice } from '@reduxjs/toolkit';

const showLoadingSlice = createSlice({
  name: 'showLoading',
   // Initialize to true
  initialState: true,
  reducers: {
    setshowLoading: (state, action) => {
      // Update the search query with the payload
      return action.payload; 
    },
  },
});

export const { setshowLoading } = showLoadingSlice.actions;
export default showLoadingSlice.reducer;
