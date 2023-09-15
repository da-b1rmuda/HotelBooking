import RoomService from '../service/room.service.js';
import ApiError from '../exceptions/api-error.js';

const roomService = new RoomService();

class RoomController {
  async GetRoom(req, res, next) {
    try {
      const response = await roomService.getRoom();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async CreateRoom(req, res, next) {
    try {
      const {id_room_type, room_floor, id_status, numberRoom, targetKeys} = req.body;
      await roomService.createRoom(id_room_type, room_floor, id_status, numberRoom, targetKeys);
      return res.json('success')
    } catch (e) {
      next(e);
    }
  }
  async EditRoom(req, res, next) {
    try {
      const { id_room, id_room_type, room_floor, id_status, numberRoom, targetKeys } = req.body;
      await roomService.editRoom(id_room, id_room_type, room_floor, id_status, numberRoom, targetKeys);
      return res.json('Комната изменена');
    } catch (e) {
      next(e);
    }
  }
  async DeleteRoom(req, res, next) {
    try {
      const { id } = req.params;
      await roomService.deleteRoom(id);
      return res.json('Комната удалена');
    } catch (e) {
      next(e);
    }
  }
}

export default RoomController;
