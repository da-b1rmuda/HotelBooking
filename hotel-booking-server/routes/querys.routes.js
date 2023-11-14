import Router from 'express';
import QuerysController from '../controller/querys.controller.js';

const querysController = new QuerysController();
const querysRouter = new Router();

querysRouter.get('/getMostExpensiveBooking', querysController.getMostExpensiveBooking);
querysRouter.get('/getFrequentlySelectedRoomForMonth', querysController.getFrequentlySelectedRoomForMonth);
querysRouter.get('/getFrequentlySelectedRoomAllTime', querysController.getFrequentlySelectedRoomAllTime);
querysRouter.get('/getAverageCheckPerDayThisMonth', querysController.getAverageCheckPerDayThisMonth);
querysRouter.get('/getMostVisitedDay', querysController.getMostVisitedDay);

querysRouter.get('/getRevenuePerMonth', querysController.getRevenuePerMonth);
querysRouter.get('/getRoomInformation', querysController.getRoomInformation);
querysRouter.get('/getVisitorsInThreeMonths', querysController.getVisitorsInThreeMonths);
querysRouter.get('/getHowManyArrived', querysController.getHowManyArrived);
querysRouter.get('/getHowManyLeft', querysController.getHowManyLeft);


export default querysRouter;
