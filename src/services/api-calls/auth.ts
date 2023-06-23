import {
  globalConfig,
  privateRequest,
  request,
} from '../../utils/requestMethod';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  AuthState,
  ChangePasswordType,
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
  const myWindow = window.open(
    'http://localhost:3000/api/auth/social-auth',
    '',
    'width=400,height=400'
  );

  myWindow?.addEventListener('message', (event: MessageEvent) => {
    // Verify that the message is coming from the expected origin and handle the data

    const dataFromPopup = event.data;
    // Process the data received from the popup window
    console.log('Data received:', dataFromPopup);
  });
  // myWindow?.document.write(
  //   `
  //     <iframe
  //       src=${'http://localhost:3000/api/auth/social-auth'}
  //       width=100%
  //       height=100%
  //       id="frames">
  //     </iframe>
  //     <script>
  //       const content = document.getElementById('frames');
  //       content.addEventListener('load', function() {
  //         var iframeDocument = content.contentWindow.document;
  //         var preElement = iframeDocument.querySelector('pre');
  //         var preContent = preElement.textContent;
  //         console.log('Content of the <pre> tag within the iframe:', preContent);
  //       });
  //     </script>
  //   `
  // );

  // myWindow?.close();

  // myWindow.document.getElementById('frames').innerText;

  // return request('auth/google-redirect')
  //   .then((response) => {
  //     console.log('🚀 ~ file: auth.ts:89 ~ .then ~ response:', response);
  //     // const { accessToken, refreshToken } = response.data;

  //     // Cookies.set('access_token', accessToken);
  //     // Cookies.set('refresh_token', refreshToken);

  //     // return response.data;
  //   })
  //   .catch((error) => {
  //     if (axios.isAxiosError(error)) {
  //       return error.message;
  //     }
  //     throw new Error('Error encountered!');
  //   });
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

export const resetToken = async (id: string | undefined) => {
  return await request
    .post(`auth/new-otp/${id}`)
    .then((response) => {
      notifyUser(response.data.message, 'success');
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

export const changePassword = async (
  data: ChangePasswordType,
  navigate: NavigateFunction
) => {
  return await privateRequest()
    .patch('auth/change-password', data, globalConfig)
    .then((response) => {
      notifyUser(response.data.message, 'success');

      navigate('/profile');
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
    .post('auth/logout', undefined, globalConfig)
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
