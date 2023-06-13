import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { crypt, dehashData } from './helpers';

const baseURL = import.meta.env.BASE_URL;
const APP_SALT = import.meta.env.VITE_SALT;

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
  let token = dehashData(Cookies.get('access_token') || '');

  if (tokenExpired(token)) {
    try {
      const refreshToken = dehashData(Cookies.get('refresh_token') || '');
      const response = await request.post('/auth/refresh-token', {
        token: refreshToken,
      });
      token = response.data.access_token;
      const hash = crypt(APP_SALT, token);
      Cookies.set('access_token', hash);
    } catch (error) {
      throw new Error('Failed to refresh access token');
    }
  }

  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return request;
};

const tokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    const currentTime = Date.now() / 1000;

    if (decoded.exp === undefined) return true;

    return decoded.exp < currentTime;
  } catch (error) {
    console.error(error);
    return true;
  }
};
