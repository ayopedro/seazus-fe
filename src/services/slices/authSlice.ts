import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthResponse, AuthState } from '../../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: Boolean(localStorage.getItem('isLoggedIn')),
  access_token: null,
  refresh_token: null,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<AuthResponse>) {
      state.user = action.payload.user;
    },
    registerStart(state) {
      state.loading = 'pending';
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<AuthResponse>) {
      state.loading = 'idle';
      state.user = action.payload.user;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = 'idle';
      state.error = action.payload;
    },
    confirmStart(state) {
      state.loading = 'pending';
      state.error = null;
    },
    confirmSuccess(state) {
      state.loading = 'idle';
      state.error = null;
    },
    confirmError(state, action: PayloadAction<string>) {
      state.loading = 'idle';
      state.error = action.payload;
    },
    loginStart(state) {
      state.loading = 'pending';
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<AuthResponse>) {
      state.loading = 'idle';
      state.user = action.payload.user;
      state.access_token = action.payload.accessToken;
      state.refresh_token = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = 'idle';
      state.error = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  saveUser,
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  confirmError,
  confirmStart,
  confirmSuccess,
  logoutUser,
} = authSlice.actions;

export default authSlice;
