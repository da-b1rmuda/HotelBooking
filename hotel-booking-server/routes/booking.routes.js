import Router from 'express';
import BookingController from '../controller/booking.controller.js';

const bookingController = new BookingController();
const bookingRouter = new Router();

bookingRouter.post('/createBooking', bookingController.CreateBooking);
bookingRouter.get('/getGuests', bookingController.GetGuests);
bookingRouter.delete('/deleteBooking/:id', bookingController.DeleteBooking);

export default bookingRouter;
