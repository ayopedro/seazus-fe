import { request } from '../../utils/requestMethod';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  ForgotPassword,
  LoginUser,
  RegisterUser,
  ResetPassword,
} from '../../types';
import { notifyUser } from '../../utils/helpers';

export const registerUser = async (
  data: RegisterUser,
  navigate: (arg0: string) => void
) => {
  try {
    const response = await request.post('/auth/register', data);
    notifyUser(response.data.message, 'success');
    navigate('/confirm-email');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      notifyUser(errorData.message, 'error');
      return errorData.message;
    }
    throw new Error('Error encountered!');
  }
};

export const confirmEmail = async (
  data: { token: string },
  id: string | undefined,
  navigate: (arg0: string) => void
) => {
  try {
    const response = await request.post(`/auth/verify-email/${id}`, data);
    notifyUser(response.data.message, 'success');
    navigate('/login');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      notifyUser(errorData.message, 'error');
      return errorData.message;
    }
    throw new Error('Error encountered!');
  }
};

export const authWithGoogle = async () => {
  try {
    const response = await request('auth/social-auth');
    // console.log('🚀 ~ file: auth-thunks.ts:27 ~ response:', response);

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('isLoggedIn', 'true');

    Cookies.set('access_token', accessToken);
    Cookies.set('refresh_token', refreshToken);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }
    throw new Error('Error encountered!');
  }
};

export const loginUser = async (
  data: LoginUser,
  navigate: (arg0: string) => void
) => {
  try {
    const response = await request.post('auth/login', data);
    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('isLoggedIn', 'true');

    Cookies.set('access_token', accessToken);
    Cookies.set('refresh_token', refreshToken);
    notifyUser('Login successful', 'success');
    navigate('/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      notifyUser(errorData.message, 'error');
      return errorData.message;
    }
    throw new Error('Error encountered!');
  }
};

export const forgotPassword = async (
  data: ForgotPassword,
  navigate: (arg0: string) => void
) => {
  try {
    const response = await request.post('auth/forgot-password', data);
    notifyUser(response.data.message.message, 'success');
    navigate('/reset-password');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      notifyUser(errorData.message, 'error');
      return errorData.message;
    }
    throw new Error('Error encountered!');
  }
};

export const resetPassword = async (
  data: ResetPassword,
  id: string | undefined,
  navigate: (arg0: string) => void
) => {
  try {
    const response = await request.patch(
      `auth/reset-password?userId=${id}`,
      data
    );
    notifyUser(response.data.message, 'success');
    navigate('/login');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      notifyUser(errorData.message, 'error');
      return errorData.message;
    }
    throw new Error('Error encountered!');
  }
};
