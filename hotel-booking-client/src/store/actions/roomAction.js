import RoomService from '../../services/roomService';
import {
  roomCreate,
  roomCreateSuccess,
  roomCreateError,
  resetMessages,
} from '../reducers/roomReducer';

export const roomCreateAction = (id_room_type, room_floor, id_status, numberRoom, targetKeys) => async (dispatch) => {
  try {
    dispatch(roomCreate());
    await RoomService.createRoom(id_room_type, room_floor, id_status, numberRoom, targetKeys);
    dispatch(roomCreateSuccess('Комната успешно создана'));
  } catch (e) {
    dispatch(roomCreateError(e.response?.data.message));
  }
};

export const resetMessagesAction = () => async (dispatch) => {
  dispatch(resetMessages());
};
