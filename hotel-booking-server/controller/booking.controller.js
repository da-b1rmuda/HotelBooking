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
      } = req.body;
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
}

export default BookingController;
