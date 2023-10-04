import $api from '../http';

export default class RoomService {
  static async createRoom(id_room_type, room_floor, id_status, numberRoom, targetKeys) {
    return await $api.post('/room/createRoom', {
      id_room_type,
      room_floor,
      id_status,
      numberRoom,
      targetKeys,
    });
  }
  static async editRoom(id_room, id_room_type, room_floor, id_status, numberRoom, targetKeys) {
    return await $api.put('/room/editRoom', {
      id_room,
      id_room_type,
      room_floor,
      id_status,
      numberRoom,
      targetKeys,
    });
  }
  static async getRoom() {
    return await $api.get('/room/getRoom');
  }
  static async deleteRoom(id_room) {
    return await $api.delete(`/room/deleteRoom/${id_room}`);
  }
}
