import Router from 'express';
import UserController from '../controller/user.controller.js';

const userController = new UserController();
const userRouter = new Router();

userRouter.post('/login', userController.Login);
userRouter.get('/getUsers', userController.GetUsers);
userRouter.post('/createUser', userController.CreateUser);
userRouter.put('/editUser', userController.EditUser);
userRouter.delete('/deleteUser/:id', userController.DeleteUser);

export default userRouter;
