import UserService from '../service/user.service.js';
import ApiError from '../exceptions/api-error.js';

const userService = new UserService();

class UserController {
  async Login(req, res, next) {
    try {
      const { login, password } = req.body;
      const response = await userService.login(login, password );
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async GetUsers(req, res, next) {
    try {
      const response = await userService.getUsers();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async CreateUser(req, res, next) {
    try {
      const { login, email, password } = req.body;
      await userService.createUser(login, email, password);
      return res.json('success');
    } catch (e) {
      next(e);
    }
  }
  async EditUser(req, res, next) {
    try {
      const { id_user, login, email, password, role } = req.body;
      await userService.editUser(id_user, login, email, password, role);
      return res.json('Пользователь изменен'); 
    } catch (e) {
      next(e);
    }
  }
  async DeleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.json('Пользователь удален');
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
