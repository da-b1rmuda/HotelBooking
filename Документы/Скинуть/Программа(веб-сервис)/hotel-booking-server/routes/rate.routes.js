import Router from 'express';
import RateController from '../controller/rate.controller.js';

const rateController = new RateController();
const rateRouter = new Router();

rateRouter.get('/getRate', rateController.GetRate);
rateRouter.post('/createRateRoom', rateController.CreateRateRoom);
rateRouter.post('/createRateDeal', rateController.CreateRateDeal);
rateRouter.put('/editRate', rateController.EditRate);
rateRouter.delete('/deleteRate/:id', rateController.DeleteRate);

export default rateRouter;
