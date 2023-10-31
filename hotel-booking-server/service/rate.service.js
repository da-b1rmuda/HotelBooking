import client from '../db.js';
import ApiError from '../exceptions/api-error.js';

class RateService {
  async getRate() {
    const response = await client.query(
      `select R.id_rate, R.rate, RT.room_type, RT.id_room_type,  CP.cancellation_policy, CP.id_cancellation_policy, R.id_deal, 
      D.deal_name, D.discount, D.description, D.reservation_left, D.id_status_deal
      from public.rate as R
      inner join public.roomtype as RT on RT.id_room_type = R.id_room_type
      inner join public.cancellationpolicy as CP on CP.id_cancellation_policy = R.id_cancellation_policy
      left outer join public.deal as D on ((R.id_deal is not null ) and (D.id_deal = R.id_deal))`,
    );
    return response;
  }
  async createRateRoom(id_room_type, id_cancellation_policy, rate) {
    await client.query(
      `insert into public.rate (rate, id_room_type, id_cancellation_policy) 
        values ($1, $2, $3)`,
      [rate, id_room_type, id_cancellation_policy],
    );
  }
  async createRateDeal(id_room_type, id_cancellation_policy, id_deal, rate) {
    await client.query(
      `insert into public.rate (id_room_type, id_cancellation_policy, id_deal, rate) 
        values ($1, $2, $3, $4)`,
      [id_room_type, id_cancellation_policy, id_deal, rate],
    );
  } 

  async editRate(rate, id_room_type, id_cancellation_policy, id_rate, id_deal = null) {
    await client.query(
      `update public.rate set rate = $1, id_room_type = $2, id_cancellation_policy = $3, id_deal = $4
      where id_rate = $5`,
      [rate, id_room_type, id_cancellation_policy, id_deal, id_rate],
    );
    await client.query(`update public.rate set rate = $1 where id_room_type = $2`, 
    [rate, id_room_type],
    );
  }
  async deleteRate(id_rate) {
    let isRateRoom = await client.query(
      `select * from public.rate as rate  where rate.id_rate = $1 and rate.id_deal IS NULL`,
      [id_rate],
    );
    if (isRateRoom.rows[0] !== null && isRateRoom.rows[0] !== undefined) {
      await client.query(`delete from public.rate where id_room_type = $1`, [
        isRateRoom.rows[0].id_room_type,
      ]);
    }
    await client.query(`delete from public.rate where id_rate = $1`, [id_rate]);
  }
}

export default RateService;
