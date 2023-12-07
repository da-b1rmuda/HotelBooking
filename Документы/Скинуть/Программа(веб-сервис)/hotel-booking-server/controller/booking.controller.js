import BookingService from '../service/booking.service.js';
import ApiError from '../exceptions/api-error.js';

const bookingService = new BookingService();

class BookingController {
  async CreateBooking(req, res, next) {
    try {
      const {
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
        idRate,
      } = req.body;
      console.log(idRate)
      await bookingService.createBooking(
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
        email,
      );
    } catch (e) {
      next(e);
    }
  }

  async GetGuests(req, res, next) {
    try {
      const response = await bookingService.getGuests();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async DeleteBooking(req, res, next) {
    try {
      const { id } = req.params;
      await bookingService.deleteBooking(id);
      return res.json('Пользователь удален');
    } catch (e) {
      next(e);
    }
  }

  async CheckAndChangeStatusGuest(req, res, next) {
    try {
      const { data } = req.body;
      await bookingService.checkAndChangeStatusGuest(data);
      return res.json('Обновление статусов');
    } catch (e) {
      next(e);
    }
  }

  async MakeGuestCheckOut(req, res, next) {
    try {
      const { id_guest } = req.body;
      await bookingService.makeGuestCheckOut(id_guest);
      return res.json('Статус гостя изменен');
    } catch (e) {
      next(e);
    }
  }
}

export default BookingController;
