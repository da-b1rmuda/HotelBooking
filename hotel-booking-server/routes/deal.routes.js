import Router from 'express';
import DealController from '../controller/deal.controller.js';

const dealController = new DealController();
const dealRouter = new Router();

dealRouter.get('/getDeal', dealController.GetDeal);
dealRouter.post('/createDeal', dealController.CreateDeal);
dealRouter.put('/editDeal', dealController.EditDeal);
dealRouter.delete('/deleteDeal/:id', dealController.DeleteDeal);

export default dealRouter;
