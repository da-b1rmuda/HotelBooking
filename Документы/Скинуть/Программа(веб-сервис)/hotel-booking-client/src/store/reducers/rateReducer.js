import { createSlice } from '@reduxjs/toolkit';

const rateSlice = createSlice({
  name: 'rateStore',
  initialState: {
    rate: [],
    isLoading: false,
    error: '',
    success: '',
  },
  reducers: {
    rateCreateRoom(state) {
      state.isLoading = true;
    },
    rateCreateRoomSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    rateCreateRoomError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    rateCreateDeal(state) {
      state.isLoading = true;
    },
    rateCreateDealSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    rateCreateDealError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    rateEdit(state) {
      state.isLoading = true;
    },
    rateEditSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    rateEditError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    rateGet(state) {
      state.isLoading = true;
    },
    rateGetSuccess(state, action) {
      state.isLoading = false;
      state.rate = action.payload.data;
    },
    rateGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    rateDelete(state) {
      state.isLoading = true;
    },
    rateDeleteSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    rateDeleteError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetMessages(state) {
      state.error = '';
      state.success = '';
    },
  },
});

export default rateSlice.reducer;
export const {
  rateCreateDeal,
  rateCreateDealError,
  rateCreateDealSuccess,
  rateCreateRoom,
  rateCreateRoomError,
  rateCreateRoomSuccess,
  rateDelete,
  rateDeleteError,
  rateDeleteSuccess,
  rateEdit,
  rateEditError,
  rateEditSuccess,
  rateGet,
  rateGetError,
  rateGetSuccess,

  resetMessages,
} = rateSlice.actions;
