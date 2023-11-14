import BookingService from '../../services/bookingService';
import {
  bookingCreate,
  bookingCreateError,
  bookingCreateSuccess,
  bookingDelete,
  bookingDeleteError,
  bookingDeleteSuccess,
  guestsGet,
  guestsGetError,
  guestsGetSuccess,
  resetMessages,
} from '../reducers/bookingReducer';

export const bookingCreateAction =
  (
    firstName,
    lastName,
    fatherName,
    phoneNumber,
    idRoom,
    arrivalDate,
    departureDate,
    countAdults,
    countChildren,
    amountPaid,
    email,
  ) =>
  async (dispatch) => {
    try {
      dispatch(bookingCreate());
      await BookingService.createBooking(
        firstName,
        lastName,
        fatherName,
        phoneNumber,
        idRoom,
        arrivalDate,
        departureDate,
        countAdults,
        countChildren,
        amountPaid,
        email,
      );
      dispatch(bookingCreateSuccess('Клиент успешно оформлен'));
    } catch (e) {
      dispatch(bookingCreateError(e.response?.data.message));
    }
  };

export const guestsGetAction = () => async (dispatch) => {
  try {
    dispatch(guestsGet());
    let response = await BookingService.getGuests();
    dispatch(guestsGetSuccess({ data: response.data }));
  } catch (e) {
    dispatch(guestsGetError(e.response?.data.message));
  }
};

export const BookingDeleteAction = (id_guest) => async (dispatch) => {
  try {
    dispatch(bookingDelete());
    await BookingService.deleteBooking(id_guest);
    dispatch(bookingDeleteSuccess('Клиент успешно удален'));
  } catch (e) {
    dispatch(bookingDeleteError(e.response?.data.message));
  }
};

export const resetMessagesAction = () => async (dispatch) => {
  dispatch(resetMessages());
};
