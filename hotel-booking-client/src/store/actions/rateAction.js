import RateService from '../../services/rateService';
import {
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
} from '../reducers/rateReducer';

export const rateCreateRoomAction =
  (id_room_type, id_cancellation_policy, rate) => async (dispatch) => {
    try {
      dispatch(rateCreateRoom());
      await RateService.createRateRoom(id_room_type, id_cancellation_policy, rate);
      dispatch(rateCreateRoomSuccess('Расценка комнаты успешно создана'));
    } catch (e) {
      dispatch(rateCreateRoomError(e.response?.data.message));
    }
  };

export const rateCreateDealAction =
  (id_room_type, id_cancellation_policy, id_deal, rate) => async (dispatch) => {
    try {
      dispatch(rateCreateDeal());
      console.log(id_room_type, id_cancellation_policy, id_deal, rate);
      await RateService.createRateDeal(id_room_type, id_cancellation_policy, id_deal, rate);
      dispatch(rateCreateDealSuccess('Расценка акции успешно создана'));
    } catch (e) {
      dispatch(rateCreateDealError(e.response?.data.message));
    }
  };

export const rateEditAction =
  (rate, id_room_type, id_cancellation_policy, id_deal, id_rate) => async (dispatch) => {
    try {
      dispatch(rateEdit());
      await RateService.editRate(rate, id_room_type, id_cancellation_policy, id_deal, id_rate);
      dispatch(rateEditSuccess('Расценка успешно изменена'));
    } catch (e) {
      dispatch(rateEditError(e.response?.data.message));
    }
  };

export const rateGetAction = () => async (dispatch) => {
  try {
    dispatch(rateGet());
    let response = await RateService.getRate();
    dispatch(rateGetSuccess({ data: response.data }));
  } catch (e) {
    dispatch(rateGetError(e.response?.data.message));
  }
};

export const rateDeleteAction = (id_rate) => async (dispatch) => {
  try {
    dispatch(rateDelete());
    await RateService.deleteRate(id_rate);
    dispatch(rateDeleteSuccess('Расценка успешно удалена'));
  } catch (e) {
    dispatch(rateDeleteError(e.response?.data.message));
  }
};

export const resetMessagesAction = () => async (dispatch) => {
  dispatch(resetMessages());
};
