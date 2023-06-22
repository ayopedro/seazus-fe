import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { persistor } from '../services/store';

interface RetryConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay: number;
}

export const globalConfig: RetryConfig = {
  retry: 1,
  retryDelay: 1000,
};

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

export const privateRequest: () => AxiosInstance = () => {
  const token = Cookies.get('access_token') || '';

  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return request;
};

export const refreshToken = async () => {
  const refresh_token = Cookies.get('refresh_token');
  try {
    const response = await request.post('auth/refresh-token', {
      refreshToken: refresh_token,
    });

    const { accessToken } = response.data;
    Cookies.set('access_token', accessToken);

    return accessToken;
  } catch (error) {
    console.error('Error refreshing token', error);
    persistor.purge();
    window.location.href = '/login';
  }
};

request.interceptors.response.use(
  (response) => response,
  async (err: AxiosError<RetryConfig>) => {
    const { config, response } = err;

    if (!config || !(config as RetryConfig).retry || response?.status !== 401) {
      return Promise.reject(err);
    }

    if (config && response?.statusText === 'Unauthorized') {
      const newToken = await refreshToken();

      if (newToken) {
        config.headers['Authorization'] = `Bearer ${newToken}`;
        return request(config);
      } else {
        persistor.purge();
        window.location.href = '/login';
      }
    }
  }
);
