import DealService from '../../services/dealService';
import {
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
} from '../reducers/dealReducer';

export const dealCreateAction =
  (
    deal_number,
    deal_name,
    discount,
    start_date,
    end_date,
    id_room_type,
    id_status_deal,
    reservation_left,
    description,
  ) =>
  async (dispatch) => {
    try {
      dispatch(dealCreate());
      await DealService.createDeal(
        deal_number,
        deal_name,
        discount,
        start_date,
        end_date,
        id_room_type,
        id_status_deal,
        reservation_left,
        description,
      );
      dispatch(dealCreateSuccess('Акция успешно создана'));
    } catch (e) {
      dispatch(dealCreateError(e.response?.data.message));
    }
  };

export const dealEditAction =
  (
    deal_number,
    deal_name,
    discount,
    start_date,
    end_date,
    id_room_type,
    id_status_deal,
    reservation_left,
    description,
    id_deal,
  ) =>
  async (dispatch) => {
    try {
      dispatch(dealEdit());
      await DealService.editDeal(
        deal_number,
        deal_name,
        discount,
        start_date,
        end_date,
        id_room_type,
        id_status_deal,
        reservation_left,
        description,
        id_deal,
      );
      dispatch(dealEditSuccess('Акция успешно изменена'));
    } catch (e) {
      dispatch(dealEditError(e.response?.data.message));
    }
  };

export const dealGetAction = () => async (dispatch) => {
  try {
    dispatch(dealGet());
    let response = await DealService.getDeal();
    dispatch(dealGetSuccess({ data: response.data }));
  } catch (e) {
    dispatch(dealGetError(e.response?.data.message));
  }
};

export const dealDeleteAction = (id_deal) => async (dispatch) => {
  try {
    dispatch(dealDelete());
    await DealService.deleteDeal(id_deal);
    dispatch(dealDeleteSuccess('Акция успешно удалена'));
  } catch (e) {
    dispatch(dealDeleteError(e.response?.data.message));
  }
};

export const resetMessagesAction = () => async (dispatch) => {
  dispatch(resetMessages());
};
