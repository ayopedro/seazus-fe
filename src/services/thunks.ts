import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../utils/requestMethod';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request.post('/auth/register', data);
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request.post('/auth/login', data);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.message;
      } else {
        return rejectWithValue(error);
      }
    }
  }
);
