import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthResponse, AuthState } from '../../types';
import { authWithGoogle, loginUser, logoutUser, registerUser } from '../thunks';

const initialState: AuthState = {
  user: null,
  isAuthenticated: Boolean(localStorage.getItem('isLoggedIn')),
  access_token: null,
  refresh_token: null,
  loading: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.loading = 'idle';
        state.user = action.payload.user;
        state.access_token = action.payload.accessToken;
        state.refresh_token = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.payload;
    });
    builder.addCase(authWithGoogle.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(
      authWithGoogle.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.loading = 'idle';
        state.user = action.payload.user;
        state.access_token = action.payload.accessToken;
        state.refresh_token = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      }
    );
    builder.addCase(authWithGoogle.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.access_token = null;
      state.refresh_token = null;
    });
  },
});
