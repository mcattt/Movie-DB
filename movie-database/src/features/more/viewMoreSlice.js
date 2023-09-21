import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 12,
}

export const viewMoreSlice = createSlice({
  name: 'viewMore',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 12
    },
    resetCount: (state) => {
      state.count = 12
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment } = viewMoreSlice.actions
export const { resetCount } = viewMoreSlice.actions 

export default viewMoreSlice.reducer