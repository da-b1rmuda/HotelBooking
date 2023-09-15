import client from '../db.js';
import ApiError from '../exceptions/api-error.js';
import { v4 as uuidv4 } from 'uuid';

class RoomService {
  async getRoom() {
    const response = await client.query(`select * from public.room`);
    return response;
  }
  async createRoom(id_room_type, room_floor, id_status, numberRoom, targetKeys) {
    let idRoom = uuidv4();

    let hasAlreadyField = await client.query(
      `select room_number from public.room where room_number = $1`,
      [numberRoom],
    );
    if (hasAlreadyField.rows[0] !== null && hasAlreadyField.rows[0] !== undefined) {
      throw ApiError.BadRequest('Комната с данным номером уже существует');
    }

    await client.query(
      `insert into public.room (id_room_type, room_floor, id_status, room_number, id_room) 
        values ($1, $2, $3, $4, $5)`,
      [id_room_type, room_floor, id_status, numberRoom, idRoom],
    );

    await targetKeys.map((item) => {
      client.query(
        `insert into public.roomandfacility (id_facility, id_room) 
          values ($1, $2)`,
        [item, idRoom],
      );
    });
  }
  async editRoom(id_room, id_room_type, room_floor, id_status, numberRoom, targetKeys) {
    await client.query(
      `update public.room set id_room_type = $1, room_floor = $2, id_status = $3, room_number = $4 
      where id_room = $5`,
      [id_room_type, room_floor, id_status, numberRoom, id_room],
    );
    await client.query (
      `delete from public.roomandfacility where id_room = $1`,
      [id_room], 
    )
    await targetKeys.map((item) => {
      client.query(
        `insert into public.roomandfacility (id_facility, id_room) 
          values ($1, $2)`,
        [item, id_room],
      );
    });
  }
  async deleteRoom(id_room) {
    await client.query (
      `delete from public.roomandfacility where id_room = $1`,
      [id_room], 
    )
    await client.query(
      `delete from public.room where id_room = $1`,
      [id_room], 
    );
  }
}

export default RoomService;
