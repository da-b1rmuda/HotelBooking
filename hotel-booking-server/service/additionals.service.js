import client from '../db.js';
import ApiError from '../exceptions/api-error.js';

class AdditionalsService {
  //
  // Status room
  //
  async getStatusRoom() {
    const response = await client.query(`select * from public.roomstatus`);
    return response;
  }
  async createStatusRoom(status, color) {
    let hasAlreadyField = await client.query(
      `select status from public.roomstatus where status = $1`,
      [status],
    );
    console.log(hasAlreadyField.rows[0]);
    if (hasAlreadyField.rows[0] !== null && hasAlreadyField.rows[0] !== undefined) {
      throw ApiError.BadRequest('Такое поле уже существует');
    }

    await client.query(
      `insert into public.roomstatus (status, color) 
        values ($1, $2)`,
      [status, color],
    );
  }
  async editStatusRoom(status, color, id_status) {
    await client.query(
      `update public.roomstatus set status = $1, color = $2 
      where id_status = $3`,
      [status, color, id_status],
    );
  }
  async deleteStatusRoom(id_status) {
    await client.query(`delete from public.roomstatus where id_status = $1`, [id_status]);
  }

  //
  // Facility room
  //
  async getFacilityRoom() {
    const response = await client.query(`select * from public.roomfacility`);
    return response;
  }
  async createFacilityRoom(facility) {
    let hasAlreadyField = await client.query(
      `select facility from public.roomfacility where facility = $1`,
      [facility],
    );
    if (hasAlreadyField.rows[0] !== null && hasAlreadyField.rows[0] !== undefined) {
      throw ApiError.BadRequest('Такое поле уже существует');
    }
    await client.query(
      `insert into public.roomfacility (facility) 
        values ($1)`,
      [facility],
    );
  }
  async editFacilityRoom(id_facility, facility) {
    await client.query(
      `update public.roomfacility set facility = $1 
      where id_facility = $2`,
      [facility, id_facility],
    );
  }
  async deleteFacilityRoom(id_facility) {
    await client.query(`delete from public.roomfacility where id_facility = $1`, [id_facility]);
  }

  //
  // Type room
  //
  async getTypeRoom() {
    const response = await client.query(`select * from public.roomtype`);
    return response;
  }
  async createTypeRoom(room_type) {
    let hasAlreadyField = await client.query(
      `select room_type from public.roomtype where room_type = $1`,
      [room_type],
    );
    if (hasAlreadyField.rows[0] !== null && hasAlreadyField.rows[0] !== undefined) {
      throw ApiError.BadRequest('Такое поле уже существует');
    }
    await client.query(
      `insert into public.roomtype (room_type) 
        values ($1)`,
      [room_type],
    );
  }
  async editTypeRoom(id_room_type, room_type) {
    await client.query(
      `update public.roomtype set room_type = $1 
      where id_room_type = $2`,
      [room_type, id_room_type],
    );
  }
  async deleteTypeRoom(id_room_type) {
    await client.query(`delete from public.roomtype where id_room_type = $1`, [id_room_type]);
  }

  //
  // Status deal
  //
  async getStatusDeal() {
    const response = await client.query(`select * from public.dealstatus`);
    return response;
  }
  async createStatusDeal(status_deal, color = '') {
    let hasAlreadyField = await client.query(
      `select status_deal from public.dealstatus where status_deal = $1`,
      [status_deal],
    );
    if (hasAlreadyField.rows[0] !== null && hasAlreadyField.rows[0] !== undefined) {
      throw ApiError.BadRequest('Такое поле уже существует');
    }
    await client.query(
      `insert into public.dealstatus (status_deal, color) 
        values ($1, $2)`,
      [status_deal, color],
    );
  }
  async editStatusDeal(id_status_deal, status_deal, color) {
    await client.query(
      `update public.dealstatus set dealstatus = $1, color = $2 
      where id_room_type = $3`,
      [status_deal, color, id_status_deal],
    );
  }
  async deleteStatusDeal(id_status_deal) {
    await client.query(`delete from public.dealstatus where id_status_deal = $1`, [id_status_deal]);
  }
}

export default AdditionalsService;
