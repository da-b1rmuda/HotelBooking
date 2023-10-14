import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'additionalsStore',
  initialState: {
    statusRoom: [],
    facilityRoom: [],
    typeRoom: [],
    statusDeal: [],
    cancelPolicy: [],
    isLoading: false,
    error: '',
    success: '',
  },
  reducers: {
    statusGet(state) {
      state.isLoading = true;
    },
    statusGetSuccess(state, action) {
      state.isLoading = false;
      state.statusRoom = action.payload.data;
      state.success = action.payload.successLoad;
    },
    statusGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    facilityGet(state) {
      state.isLoading = true;
    },
    facilityGetSuccess(state, action) {
      state.isLoading = false;
      state.facilityRoom = action.payload.data;
      state.success = action.payload.successLoad;
    },
    facilityGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    typeGet(state) {
      state.isLoading = true;
    },
    typeGetSuccess(state, action) {
      state.isLoading = false;
      state.typeRoom = action.payload.data;
      state.success = action.payload.successLoad;
    },
    typeGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    statusDealGet(state) {
      state.isLoading = true;
    },
    statusDealGetSuccess(state, action) {
      state.isLoading = false;
      state.statusDeal = action.payload.data;
      state.success = action.payload.successLoad;
    },
    statusDealGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    cancelPolicyGet(state) {
      state.isLoading = true;
    },
    cancelPolicyGetSuccess(state, action) {
      state.isLoading = false;
      state.cancelPolicy = action.payload.data;
      state.success = action.payload.successLoad;
    },
    cancelPolicyGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
export const {
  statusGet,
  statusGetError,
  statusGetSuccess,
  facilityGet,
  facilityGetError,
  facilityGetSuccess,
  typeGet,
  typeGetError,
  typeGetSuccess,
  statusDealGet,
  statusDealGetError,
  statusDealGetSuccess,
  cancelPolicyGet,
  cancelPolicyGetError,
  cancelPolicyGetSuccess,
} = roomSlice.actions;
