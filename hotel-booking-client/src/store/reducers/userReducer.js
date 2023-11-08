import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userStore',
  initialState: {
    users: [],
    userInfo: [],
    isAuth: false,
    isLoading: false,
    error: '',
    success: '',
  },
  reducers: {
    userLogin(state) {
      state.isLoading = true;
    },
    userLoginSuccess(state, action) {
      state.isLoading = false;
      state.isAuth = true;
      state.userInfo = action.payload.data;
      state.success = action.payload.successMessage;
    },
    userLoginError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    userCreate(state) {
      state.isLoading = true;
    },
    userCreateSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    userCreateError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    userEdit(state) {
      state.isLoading = true;
    },
    userEditSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    userEditError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    userGet(state) {
      state.isLoading = true;
    },
    userGetSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload.data;
    },
    userGetError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    userDelete(state) {
      state.isLoading = true;
    },
    userDeleteSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    userDeleteError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    userLogout(state) {
      state.isAuth = false;
      state.userInfo = null;
    },

    setLoading(state, action) {
      state.isLoading = action.payload.isLoad;
    },

    resetMessages(state) {
      state.error = '';
      state.success = '';
    },
  },
});

export default userSlice.reducer;
export const {
  userLogin,
  userLoginError,
  userLoginSuccess,
  userCreate,
  userCreateSuccess,
  userCreateError,
  userGet,
  userGetError,
  userGetSuccess,
  userDelete,
  userDeleteError,
  userDeleteSuccess,
  userEdit,
  userEditError,
  userEditSuccess,

  setLoading,
  userLogout,
  resetMessages,
} = userSlice.actions;
