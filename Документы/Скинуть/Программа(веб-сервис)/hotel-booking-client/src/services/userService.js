import $api from '../http';

export default class UserService {
  static async login(login, password) {
    return await $api.post('/user/login', { login, password });
  }
  static async createUser(login, email, password) {
    return await $api.post('/user/createUser', { login, email, password });
  }
  static async editUser(id_user, login, email, password, role) {
    return await $api.put('/user/editUser', { id_user, login, email, password, role });
  }
  static async getUsers() {
    return await $api.get('/user/getUsers');
  }
  static async deleteUser(id_user) {
    return await $api.delete(`/user/deleteUser/${id_user}`);
  }
}
