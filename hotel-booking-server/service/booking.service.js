import client from '../db.js';
import ApiError from '../exceptions/api-error.js';

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
      `insert into public.booking (id_guest, id_room, arrival_date, departure_date, count_adults, count_children, amount_paid)
      values ($1, $2, $3, $4, $5, $6, $7)`,
      [
        idGuest.rows[0].id_guest,
        idRoom,
        arrivalDate,
        departureDate,
        countAdults,
        countChildren,
        amountPaid,
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
}

export default BookingService;
