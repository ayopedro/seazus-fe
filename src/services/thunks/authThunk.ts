import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/requestMethod';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthResponse, LoginUser } from '../../types';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request.post('auth/register', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.message;
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const authWithGoogle = createAsyncThunk(
  'auth/authWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const response = await request('auth/social-auth');
      console.log('🚀 ~ file: auth-thunks.ts:27 ~ response:', response);

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('isLoggedIn', 'true');

      Cookies.set('access_token', accessToken);
      Cookies.set('refresh_token', refreshToken);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.message;
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, LoginUser>(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request.post('auth/login', data);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('isLoggedIn', 'true');

      Cookies.set('access_token', accessToken);
      Cookies.set('refresh_token', refreshToken);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.message;
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  localStorage.removeItem('isLoggedIn');

  return null;
});
