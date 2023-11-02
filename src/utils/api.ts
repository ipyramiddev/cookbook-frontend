import axios from 'axios';

import { store } from 'app/store';
import { logout } from 'reducers/authSlice';
import setAuthToken from './setAuthToken';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(logout);
      setAuthToken();
    }
    return Promise.reject(err);
  },
);

export default api;
