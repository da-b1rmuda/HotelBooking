import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'roomStore',
  initialState: {
    room: [],
    isLoading: false,
    error: '',
    success: '',
  },
  reducers: {
    roomCreate(state) {
      state.isLoading = true;
    },
    roomCreateSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    roomCreateError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },


    resetMessages(state) {
      state.error = '';
      state.success = '';
    }
  },
});

export default roomSlice.reducer;
export const { roomCreate, roomCreateSuccess, roomCreateError, resetMessages } = roomSlice.actions;
