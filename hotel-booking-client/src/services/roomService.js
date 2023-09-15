import $api from '../http';

export default class RoomService {
  static async createRoom(id_room_type, room_floor, id_status, numberRoom, targetKeys) {
    return await $api.post('/room/createRoom', { id_room_type, room_floor, id_status, numberRoom, targetKeys });
  }
}
