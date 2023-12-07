import Router from 'express';
import RoomController from '../controller/room.controller.js';

const roomController = new RoomController();
const roomRouter = new Router();

roomRouter.get('/getRoom', roomController.GetRoom);
roomRouter.post('/createRoom', roomController.CreateRoom);
roomRouter.put('/editRoom', roomController.EditRoom);
roomRouter.delete('/deleteRoom/:id', roomController.DeleteRoom);

export default roomRouter;
