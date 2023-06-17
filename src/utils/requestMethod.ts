import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BASE_URL;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['SameSite'] = 'None';

export const request: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Credentials': 'true',
  },
});

export const privateRequest = async () => {
  const token = Cookies.get('access_token') || '';

  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return request;
};

export const refreshToken = async () => {
  const refresh_token = Cookies.get('refresh_token');
  try {
    const response = await request.post('auth/refresh-token', {
      token: refresh_token,
    });

    const { accessToken } = response.data;
    Cookies.set('access_token', accessToken);

    return accessToken;
  } catch (error) {
    console.error('Error refreshing token', error);
    redirect('/login');
  }
};

axios.interceptors.response.use(undefined, (err: AxiosError) => {
  // if (err.response?.status === 401)
  console.log(
    '🚀 ~ file: requestMethod.ts:43 ~ axios.interceptors.response.use ~ err:',
    err
  );
});
