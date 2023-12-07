import client from '../db.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
  async login(login, password) {
    const response = await client.query(
      `select id_user, login, role, email from public.users where (login = $1 or email = $1) and password = $2`,
      [login, password],
    );
    if (response.rows[0] === null || response.rows[0] === undefined) {
      throw ApiError.BadRequest('Неправильный логин или пароль');
    }
    return response;
  }
  async getUsers() {
    const response = await client.query(
      `select * from public.users
      order by public.users.id_user asc `,
    );
    return response;
  }
  async createUser(login, email, password) {
    let hasAlreadyLogin = await client.query(`select login from public.users where login = $1`, [
      login,
    ]);
    let hasAlreadyEmail = await client.query(`select email from public.users where email = $1`, [
      email,
    ]);
    if (hasAlreadyLogin.rows[0] !== null && hasAlreadyLogin.rows[0] !== undefined) {
      throw ApiError.BadRequest('Данный логин уже существует');
    }
    if (hasAlreadyEmail.rows[0] !== null && hasAlreadyEmail.rows[0] !== undefined) {
      throw ApiError.BadRequest('Данная почта уже существует');
    }
    await client.query(
      `insert into public.users (login, email, password) 
        values ($1, $2, $3)`,
      [login, email, password],
    );
  }
  async editUser(id_user, login, email, password, role) {
    await client.query(
      `update public.users set login = $1, email = $2, password = $3, role = $4  
      where id_user = $5`,
      [login, email, password, role, id_user],
    );
  }
  async deleteUser(id_user) {
    await client.query(`delete from public.users where id_user = $1`, [id_user]);
  }
}

export default UserService;
