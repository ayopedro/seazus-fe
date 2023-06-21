import { globalConfig, privateRequest } from '../../utils/requestMethod';
import { notifyUser } from '../../utils/helpers';
import axios from 'axios';
import { CreateShortUrl } from '../../types';

export const generateUrl = async (data: CreateShortUrl) => {
  return await privateRequest()
    .post('/url', data, globalConfig)
    .then((res) => {
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
