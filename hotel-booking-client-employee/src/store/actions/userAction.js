import UserService from '../../services/userService';
import {
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
} from '../reducers/userReducer';

export const userLoginAction = (login, password) => async (dispatch) => {
  try {
    dispatch(userLogin());
    let response = await UserService.login(login, password);
    dispatch(userLoginSuccess({ data: response.data, successMessage: 'Вы успешно вошли' }));
  } catch (e) {
    dispatch(userLoginError(e.response?.data.message));
  }
};

export const userCreateAction = (login, email, password) => async (dispatch) => {
  try {
    dispatch(userCreate());
    await UserService.createUser(login, email, password);
    dispatch(userCreateSuccess('Пользователь успешно зарегистрирован'));
  } catch (e) {
    dispatch(userCreateError(e.response?.data.message));
  }
};

export const userEditAction = (id_user, login, email, password, role) => async (dispatch) => {
  try {
    dispatch(userEdit());
    await UserService.editUser(id_user, login, email, password, role);
    dispatch(userEditSuccess('Пользователь успешно изменен'));
  } catch (e) {
    dispatch(userEditError(e.response?.data.message));
  }
};

export const userGetAction = () => async (dispatch) => {
  try {
    dispatch(userGet());
    let response = await UserService.getUsers();
    dispatch(userGetSuccess({ data: response.data }));
  } catch (e) {
    dispatch(userGetError(e.response?.data.message));
  }
};

export const userDeleteAction = (id_user) => async (dispatch) => {
  try {
    dispatch(userDelete());
    await UserService.deleteUser(id_user);
    dispatch(userDeleteSuccess('Пользователь успешно удален'));
  } catch (e) {
    dispatch(userDeleteError(e.response?.data.message));
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch(userLogout());
  sessionStorage.removeItem('userInfo');
  localStorage.removeItem('userInfo');
};

export const LoadingAction = (isLoading) => async (dispatch) => {
  dispatch(setLoading({ isLoad: isLoading }));
};

export const resetMessagesAction = () => async (dispatch) => {
  dispatch(resetMessages());
};
