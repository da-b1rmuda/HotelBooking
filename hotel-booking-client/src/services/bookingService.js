import $api from '../http';

export default class BookingService {
  static async getGuests() {
    return await $api.get('/booking/getGuests');
  }
  static async createBooking( 
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
    email,
  ) {
    return await $api.post('/booking/createBooking', {
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
      email,
    });
  }

  static async deleteBooking(id_guest) {
    return await $api.delete(`/booking/deleteBooking/${id_guest}`);
  }
}
