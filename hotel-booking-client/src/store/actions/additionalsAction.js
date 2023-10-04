import AdditionalsService from '../../services/additionalsService';
import {
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
} from '../reducers/additionalsReducer';

export const getStatusAction = () => async (dispatch) => {
  try {
    dispatch(statusGet());
    let response = await AdditionalsService.getStatus();
    dispatch(statusGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }));
  } catch (e) {
    dispatch(statusGetError(e.response?.data.message));
  }
};
export const getFacilityAction = () => async (dispatch) => {
  try {
    dispatch(facilityGet());
    let response = await AdditionalsService.getFacility();
    dispatch(facilityGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }));
  } catch (e) {
    dispatch(facilityGetError(e.response?.data.message));
  }
};
export const getTypeAction = () => async (dispatch) => {
  try {
    dispatch(typeGet());
    let response = await AdditionalsService.getType();
    dispatch(typeGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }));
  } catch (e) {
    dispatch(typeGetError(e.response?.data.message));
  }
};
export const getStatusDealAction = () => async (dispatch) => {
  try {
    dispatch(statusDealGet());
    let response = await AdditionalsService.getStatusDeal();
    dispatch(
      statusDealGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }),
    );
  } catch (e) {
    dispatch(statusDealGetError(e.response?.data.message));
  }
};
