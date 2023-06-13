import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';
import { loginUser, registerUser } from './thunks';

const initialState: AuthState = {
  user: null,
  isAuthenticated: window.localStorage.getItem('access_token') ? true : false,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStart(state) {
      state.loading = 'pending';
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.loading = 'idle';
      state.user = action.payload;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = 'idle';
      state.error = action.payload;
    },
    loginStart(state) {
      state.loading = 'pending';
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = 'idle';
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.payload;
    });
  },
});
