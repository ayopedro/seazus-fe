import { privateRequest, request } from '../../utils/requestMethod';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  AuthState,
  ForgotPassword,
  LoginUser,
  RegisterUser,
  ResetPassword,
} from '../../types';
import { notifyUser } from '../../utils/helpers';
import {
  loginFailure,
  loginSuccess,
  logoutUser,
  registerFailure,
  registerSuccess,
  saveUser,
} from '../slices/authSlice';
import {
  ThunkDispatch,
  EmptyObject,
  AnyAction,
  Dispatch,
} from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { persistor } from '../store';

export const registerUser = async (
  data: RegisterUser,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  return await request
    .post('/auth/register', data)
    .then((res) => {
      notifyUser(res.data.message, 'success');
      dispatch(registerSuccess(res.data.user));
      navigate('/confirm-email');
      return res.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        notifyUser(errorData.message, 'error');
        dispatch(registerFailure(errorData.message));
        return errorData.message;
      }
      throw new Error('Error encountered!');
    });
};

export const confirmEmail = async (
  data: { token: string },
  id: string | undefined,
  navigate: NavigateFunction
) => {
  return await request
    .post(`/auth/verify-email/${id}`, data)
    .then((res) => {
      notifyUser(res.data.message, 'success');
      navigate('/login');
      return res.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        notifyUser(errorData.message, 'error');
        return errorData.message;
      }
      throw new Error('Error encountered!');
    });
};

export const authWithGoogle = async () => {
  return await request('auth/social-auth')
    .then((response) => {
      const { accessToken, refreshToken } = response.data;

      Cookies.set('access_token', accessToken);
      Cookies.set('refresh_token', refreshToken);

      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        return error.message;
      }
      throw new Error('Error encountered!');
    });
};

export const loginUser = async (
  data: LoginUser,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  return await request
    .post('auth/login', data)
    .then((res) => {
      const { accessToken, refreshToken, user } = res.data;

      Cookies.set('access_token', accessToken);
      Cookies.set('refresh_token', refreshToken);
      notifyUser('Login successful', 'success');
      dispatch(loginSuccess(user));
      navigate('/');
      return user;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        notifyUser(errorData.message, 'error');
        dispatch(loginFailure(errorData.message));
        return errorData.message;
      }
      throw new Error('Error encountered!');
    });
};

export const forgotPassword = async (
  data: ForgotPassword,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  return await request
    .post('auth/forgot-password', data)
    .then((response) => {
      notifyUser(response.data.message.message, 'success');

      dispatch(saveUser(response.data.user));
      navigate('/reset-password');
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        notifyUser(errorData.message, 'error');
        return errorData.message;
      }
      throw new Error('Error encountered!');
    });
};

export const resetPassword = async (
  data: ResetPassword,
  id: string | undefined,
  navigate: NavigateFunction
) => {
  return await request
    .patch(`auth/reset-password?userId=${id}`, data)
    .then((response) => {
      notifyUser(response.data.message, 'success');
      navigate('/login');
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        notifyUser(errorData.message, 'error');
        return errorData.message;
      }
      throw new Error('Error encountered!');
    });
};

export const logoutUserApi = async (
  navigate: NavigateFunction,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
) => {
  return await privateRequest()
    .post('auth/logout')
    .then((response) => {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      persistor.purge();
      dispatch(logoutUser());
      notifyUser(response.data.message, 'success');
      navigate('/login');
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        notifyUser(errorData.message, 'error');
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        persistor.purge();
        dispatch(logoutUser());
        navigate('/login');
        return errorData.message;
      }
      throw new Error('Error encountered!');
    });
};
