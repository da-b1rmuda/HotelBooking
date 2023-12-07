import client from '../db.js';
import ApiError from '../exceptions/api-error.js';
import dayjs from 'dayjs';

class BookingService {
  //Add booking
  async createBooking(
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
    idRate,
    email = null,
  ) {
    let numberGuest = Math.floor(1000 + Math.random() * 9000);
    await client.query(
      `insert into public.guests (number_guest, first_name, last_name, father_name, phone_number, id_room, email)
      values ($1, $2, $3, $4, $5, $6, $7)`,
      [numberGuest, firstName, lastName, fatherName, phoneNumber, idRoom, email],
    );
    let idGuest = await client.query(`select id_guest from public.guests where number_guest = $1`, [
      numberGuest,
    ]);
    await client.query(
      `insert into public.booking (id_guest, id_room, arrival_date, departure_date, count_adults, count_children, amount_paid, id_rate)
      values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        idGuest.rows[0].id_guest,
        idRoom,
        arrivalDate,
        departureDate,
        countAdults,
        countChildren,
        amountPaid,
        idRate,
      ],
    );
  }

  //get guests
  async getGuests() {
    const response = await client.query(
      `select
      G.id_guest, G.number_guest, G.first_name, G.last_name, G.father_name, G.phone_number, G.email,
        B.id_booking, B.arrival_date, B.departure_date, B.count_adults, B.count_adults, B.count_children, B.amount_paid,
        R.id_room, R.room_number, R.room_floor , RS.id_status, RS.status,
      SG.status_guest, SG.color_sg, SGR.status_guest_room, SGR.color_sgr
        from booking as B 
        inner join public.guests as G on B.id_guest = G.id_guest
        inner join public.room as R on B.id_room = R.id_room
        inner join public.roomstatus AS RS on R.id_status = RS.id_status
      inner join public.statusguest AS SG on G.id_status_guest = SG.id_status_guest
      inner join public.statusguestroom AS SGR on G.id_status_guest_room = SGR.id_status_guest_room
        order by B.id_booking asc
      `,
    );
    return response;
  }

  //delete guest
  async deleteBooking(idGuest) {
    await client.query(`delete from public.guests where id_guest = $1`, [idGuest]);
    await client.query(`delete from public.booking where id_guest = $1`, [idGuest]);
  }

  //change guest status
  async checkAndChangeStatusGuest(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].status_guest !== 'Выехал') {
        if (dayjs(data[i].arrival_date) > dayjs()) {
          await client.query(`update public.guests set id_status_guest = $1 where id_guest = $2`, [
            'e753c074-fb74-40e3-82a7-10df78a69fa6',
            data[i].id_guest,
          ]);
        }
        if (dayjs(data[i].arrival_date) <= dayjs() && dayjs(data[i].departure_date) >= dayjs()) {
          await client.query(`update public.guests set id_status_guest = $1 where id_guest = $2`, [
            'c5418723-6d2a-420d-93e4-9d896cecf452',
            data[i].id_guest,
          ]);
        }
        if (dayjs(data[i].departure_date) <= dayjs()) {
          await client.query(`update public.guests set id_status_guest = $1 where id_guest = $2`, [
            '700b098c-cbd1-4616-9c3f-bc82ba24b281',
            data[i].id_guest,
          ]);
        }
      }
    }
  }

  // make the guest check out
  async makeGuestCheckOut(id_guest) {
    await client.query(
      `update public.guests set id_status_guest = 'de86a967-0104-4c67-80be-8b119d34d9e0' where id_guest = $1`,
      [id_guest],
    );
  }
}

export default BookingService;
