import client from '../db.js';
import ApiError from '../exceptions/api-error.js';

class DealService {
  async getDeal() {
    const response = await client.query(
      `select D.id_deal, D.deal_number, D.deal_name, D.reservation_left,
      D.start_date, D.end_date, D.discount, D.description,
      DS.status_deal, RT.room_type, RT.id_room_type
      from public.deal as D 
      inner join public.dealstatus as DS on D.id_status_deal = DS.id_status_deal
      inner join public.roomtype as RT on D.id_room_type = RT.id_room_type
      order by id_deal asc`,
    );
    return response;
  }
  async createDeal(
    deal_number,
    deal_name,
    discount,
    start_date,
    end_date,
    id_room_type,
    id_status_deal,
    reservation_left,
    description,
  ) {
    let hasAlreadyFieldName = await client.query(
      `select deal_name from public.deal where deal_name = $1`,
      [deal_name],
    );
    if (hasAlreadyFieldName.rows[0] !== null && hasAlreadyFieldName.rows[0] !== undefined) {
      throw ApiError.BadRequest('Акция с данным названием уже существует');
    }
    let hasAlreadyFieldNumber = await client.query(
      `select deal_number from public.deal where deal_number = $1`,
      [deal_number],
    );
    if (hasAlreadyFieldNumber.rows[0] !== null && hasAlreadyFieldNumber.rows[0] !== undefined) {
      throw ApiError.BadRequest('Акция с данным номером уже существует');
    }

    await client.query(
      `insert into public.deal (deal_number, deal_name, discount, start_date, end_date, 
        id_room_type, id_status_deal, reservation_left, description) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        deal_number,
        deal_name,
        discount,
        start_date,
        end_date,
        id_room_type,
        id_status_deal,
        reservation_left,
        description,
      ],
    );
  }

  async editDeal(
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
  ) {

    await client.query(
      `update public.deal set deal_number = $1, deal_name = $2, discount = $3, start_date = $4, 
      end_date = $5, id_room_type = $6, id_status_deal = $7, reservation_left = $8, description = $9 
      where id_deal = $10`,
      [
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
      ],
    );
  }
  async deleteDeal(id_deal) {
    await client.query(`delete from public.deal where id_deal = $1`, [id_deal]);
    await client.query(`delete from public.rate where id_deal = $1`, [id_deal]);
  }
}

export default DealService;
