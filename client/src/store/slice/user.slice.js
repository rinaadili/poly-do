import { createSlice } from '@reduxjs/toolkit'

const portalSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: '',
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      if(action.payload.token) {
        state.token = action.payload.token;
      }
    },
  },
})

export const { setUser } = portalSlice.actions;
export default portalSlice.reducer;