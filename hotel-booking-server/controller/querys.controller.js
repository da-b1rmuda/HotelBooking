import client from '../db.js';
import ApiError from '../exceptions/api-error.js';

class QueryController {
  async getMostExpensiveBooking(req, res, next) {
    const response = await client.query(
      `select G.first_name, G.last_name, G.father_name, B.amount_paid
      from public.booking as B
      join public.guests as G on B.id_guest = G.id_guest 
      ORDER BY amount_paid DESC LIMIT 1`,
    );
    return res.json(response.rows);
  }
  async getFrequentlySelectedRoomAllTime(req, res, next) {
    const response = await client.query(
      `select R.room_number, count(R.room_number) as countR
      from public.booking as B
      join public.room as R on B.id_room = R.id_room
      group by R.room_number having count(R.room_number)>1 order by countR desc limit 1;`,
    );
    return res.json(response.rows);
  }
  async getFrequentlySelectedRoomForMonth(req, res, next) {
    const response = await client.query(
      `select R.room_number, count(R.room_number) as countR
      from public.booking as B
      join public.room as R on B.id_room = R.id_room
      where DATE_PART('MONTH', B.arrival_date) = DATE_PART('MONTH', localtimestamp) AND DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp)
      group by R.room_number limit 1`,
    );
    return res.json(response.rows);
  }
  async getAverageCheckPerDayThisMonth(req, res, next) {
    const response = await client.query(
      `select round(sum(amount_paid) / (SELECT extract(days FROM date_trunc('month', now()) + interval '1 month - 1 day')))
      from public.booking as B
      where DATE_PART('MONTH', B.arrival_date) = DATE_PART('MONTH', localtimestamp) AND DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp)`,
    );
    return res.json(response.rows);
  }
  async getMostVisitedDay(req, res, next) {
    const response = await client.query(
      `select DATE_PART('DAY', arrival_date) as day, 
      DATE_PART('MONTH', arrival_date) as month, 
      DATE_PART('YEAR', arrival_date) as year, 
      count(arrival_date) as rcount
      from public.booking
      group by arrival_date
      order by rcount desc limit 1`,
    );
    return res.json(response.rows);
  }
  //Выручка За Месяц
  async getRevenuePerMonth(req, res, next) {
    const response = await client.query(
      `select round(sum(amount_paid)) as current_month, (select round(sum(amount_paid))
      from public.booking as B
      where DATE_PART('MONTH', B.arrival_date) = DATE_PART('MONTH', localtimestamp)-1 AND DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp)) as last_month
      from public.booking as B
      where DATE_PART('MONTH', B.arrival_date) = DATE_PART('MONTH', localtimestamp) AND DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp)`,
    );
    return res.json(response.rows);
  }
  //Информация о комнатах
  async getRoomInformation(req, res, next) {
    const response = await client.query(
      `select 
      count(R.id_room) as all_rooms,
      (select count(id_status) from public.room
      where id_status = '024e26c7-5e33-4f35-a88e-e6f5c9322e02') as available_room,
      (select count(id_status) from public.room
      where id_status != '024e26c7-5e33-4f35-a88e-e6f5c9322e02') as reserved_room,
      (select count(G.id_status_guest_room) as count_clear_room_available
      from public.guests as G 
      join public.room as R on G.id_room = R.id_room 
      where id_status_guest_room = '8c18094a-7f8b-4ad8-8023-e4419371c3b5' and R.id_status = '024e26c7-5e33-4f35-a88e-e6f5c9322e02'),
      (select count(G.id_status_guest_room) as count_clear_room_reserved
      from public.guests as G 
      join public.room as R on G.id_room = R.id_room 
      where id_status_guest_room = '8c18094a-7f8b-4ad8-8023-e4419371c3b5' and R.id_status != '024e26c7-5e33-4f35-a88e-e6f5c9322e02'),
      (select count(id_status_guest_room) as count_dirty_room_available
      from public.guests as G
      join public.room as R on G.id_room = R.id_room 
      where id_status_guest_room = '0623770d-2d02-495c-a60c-f757e29bd226' and R.id_status = '024e26c7-5e33-4f35-a88e-e6f5c9322e02'),
      (select count(id_status_guest_room) as count_dirty_room_reserved
      from public.guests as G
      join public.room as R on G.id_room = R.id_room 
      where id_status_guest_room = '0623770d-2d02-495c-a60c-f757e29bd226' and R.id_status != '024e26c7-5e33-4f35-a88e-e6f5c9322e02'),
      (select count(id_status_guest_room) as count_wating_room_available
      from public.guests as G
      join public.room as R on G.id_room = R.id_room 
      where id_status_guest_room = '76504da9-eff2-4fdd-becb-43b4ade0ef92' and R.id_status = '024e26c7-5e33-4f35-a88e-e6f5c9322e02'),
      (select count(id_status_guest_room) as count_wating_room_reserved
      from public.guests as G
      join public.room as R on G.id_room = R.id_room 
      where id_status_guest_room = '76504da9-eff2-4fdd-becb-43b4ade0ef92' and R.id_status != '024e26c7-5e33-4f35-a88e-e6f5c9322e02')
      from public.room as R
      join public.roomstatus as RS on R.id_status = RS.id_status
      `,
    );
    return res.json(response.rows);
  }
  //Посетители За Три Месяца
  async getVisitorsInThreeMonths(req, res, next) {
    const response = await client.query(
      `select 
      (select count(id_guest) as count_guests from public.guests),
      (sum(count_adults) + sum(count_children)) as count_guests_this_month, 
      (select 
      (sum(count_adults) + sum(count_children)) as count_guests_last_month 
      from public.booking
      where DATE_PART('MONTH', arrival_date) = DATE_PART('MONTH', localtimestamp)-1 AND DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp)),
      (select 
      (sum(count_adults) + sum(count_children)) as count_guests_before_last_month 
      from public.booking
      where DATE_PART('MONTH', arrival_date) = DATE_PART('MONTH', localtimestamp)-2 AND DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp))
      from public.booking
      where DATE_PART('MONTH', arrival_date) = DATE_PART('MONTH', localtimestamp) AND DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp)`,
    );
    return res.json(response.rows);
  }
  //Сколько Заехало
  async getHowManyArrived(req, res, next) {
    const response = await client.query(
      `SELECT to_char(arrival_date, 'Day') as weekday, (sum(count_adults) + sum(count_children)) as count
      from public.booking
      where 
      DATE_PART('WEEK', arrival_date) = DATE_PART('WEEK', localtimestamp)-1
      and 
      DATE_PART('YEAR', arrival_date) = DATE_PART('YEAR', localtimestamp)
      group by weekday, arrival_date`,
    );
    return res.json(response.rows);
  }
  //Сколько Выехало
  async getHowManyLeft(req, res, next) {
    const response = await client.query(
      `SELECT to_char(departure_date, 'Day') as weekday, (sum(count_adults) + sum(count_children)) as count
      from public.booking
      where 
      DATE_PART('WEEK', departure_date) = DATE_PART('WEEK', localtimestamp)-1
      and 
      DATE_PART('YEAR', departure_date) = DATE_PART('YEAR', localtimestamp)
      group by weekday, departure_date`,
    );
    return res.json(response.rows);
  }
}

export default QueryController;
