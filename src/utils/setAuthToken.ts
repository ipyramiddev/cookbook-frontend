import api from './api';

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
