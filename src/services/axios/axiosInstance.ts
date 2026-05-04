import axios from 'axios';
import env from '../../../env';
import { store } from '../../redux/store';

export const instance = axios.create({
  withCredentials: true,
  baseURL: env.BASE_URL,
  timeout: 60000,
});

instance.defaults.headers.Accept = 'application/json';

instance.interceptors.request.use(config => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});

export const refreshInstance = axios.create({
  withCredentials: true,
  baseURL: env.BASE_URL,
  timeout: 60000,
});
