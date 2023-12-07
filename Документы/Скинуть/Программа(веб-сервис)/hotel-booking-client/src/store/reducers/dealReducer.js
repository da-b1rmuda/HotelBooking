import { createSlice } from '@reduxjs/toolkit';

const dealSlice = createSlice({
  name: 'dealStore',
  initialState: {
    deal: [],
    isLoading: false,
    error: '',
    success: '',
  },
  reducers: {
    dealCreate(state) {
      state.isLoading = true;
    },
    dealCreateSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    dealCreateError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    dealEdit(state) {
      state.isLoading = true;
    },
    dealEditSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    dealEditError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    dealGet(state) {
      state.isLoading = true;
    },
    dealGetSuccess(state, action) {
      state.isLoading = false;
      state.deal = action.payload.data;
    },
    dealGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    dealDelete(state) {
      state.isLoading = true;
    },
    dealDeleteSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    dealDeleteError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetMessages(state) {
      state.error = '';
      state.success = '';
    },
  },
});

export default dealSlice.reducer;
export const {
  dealCreate,
  dealCreateError,
  dealCreateSuccess,
  dealDelete,
  dealDeleteError,
  dealDeleteSuccess,
  dealEdit,
  dealEditError,
  dealEditSuccess,
  dealGet,
  dealGetError,
  dealGetSuccess,

  resetMessages,
} = dealSlice.actions;
