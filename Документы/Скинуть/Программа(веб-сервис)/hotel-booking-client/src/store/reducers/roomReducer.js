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

    roomEdit(state) {
      state.isLoading = true;
    },
    roomEditSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    roomEditError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    roomGet(state) {
      state.isLoading = true;
    },
    roomGetSuccess(state, action) {
      state.isLoading = false;
      state.room = action.payload.data;
    },
    roomGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    roomDelete(state) {
      state.isLoading = true;
    },
    roomDeleteSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    roomDeleteError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetMessages(state) {
      state.error = '';
      state.success = '';
    },
  },
});

export default roomSlice.reducer;
export const {
  roomCreate,
  roomCreateSuccess,
  roomCreateError,
  roomGet,
  roomGetError,
  roomGetSuccess,
  roomDelete,
  roomDeleteError,
  roomDeleteSuccess,
  roomEdit,
  roomEditError,
  roomEditSuccess,

  resetMessages,
} = roomSlice.actions;
