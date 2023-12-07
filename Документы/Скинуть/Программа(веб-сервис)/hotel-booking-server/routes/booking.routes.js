import Router from 'express';
import BookingController from '../controller/booking.controller.js';

const bookingController = new BookingController();
const bookingRouter = new Router();

bookingRouter.post('/createBooking', bookingController.CreateBooking);
bookingRouter.get('/getGuests', bookingController.GetGuests);
bookingRouter.delete('/deleteBooking/:id', bookingController.DeleteBooking);
bookingRouter.put('/checkAndChangeStatusGuest', bookingController.CheckAndChangeStatusGuest);
bookingRouter.put('/makeGuestCheckOut', bookingController.MakeGuestCheckOut);

export default bookingRouter;
