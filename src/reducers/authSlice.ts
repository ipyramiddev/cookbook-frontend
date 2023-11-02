import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface AuthState {
  token?: string;
  email?: string;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ email: string; token: string; isAdmin: boolean }>,
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setLoading, loginSuccess, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;

export default authSlice.reducer;
