import axios from 'axios';

export const API_URL = 'http://localhost:5001';
export const API_URL_Host = 'https://jlk0wqq0-5001.euw.devtunnels.ms';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default $api;
