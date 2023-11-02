import { store } from 'app/store';

import { loginSuccess, logout } from 'reducers/authSlice';
import api from 'utils/api';
import setAuthToken from 'utils/setAuthToken';

const { dispatch } = store;

export const loginActon = async (username: string, password: string) => {
  try {
    const res = await api.post('/api/auth/login', {
      email: username,
      password,
    });

    dispatch(
      loginSuccess({
        email: username,
        token: res.data.token,
        isAdmin: res.data.is_admin === 1,
      }),
    );

    setAuthToken(res.data.token);
  } catch (error) {
    dispatch(logout());
  }
};

export const getUserProfile = async () => {
  try {
    const res = await api.get('api/profile');

    dispatch(
      loginSuccess({
        email: res.data.email,
        token: localStorage.getItem('token') as string,
        isAdmin: res.data.is_admin === 1,
      }),
    );
  } catch (error) {
    console.error(error);
  }
};
