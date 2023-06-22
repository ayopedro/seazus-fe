import { globalConfig, privateRequest } from '../../utils/requestMethod';
import { notifyUser } from '../../utils/helpers';
import axios from 'axios';

export const getUserDetails = async () => {
  return await privateRequest()
    .get('/user/profile', globalConfig)
    .then((res) => {
      // notifyUser(res.data.message, 'success');
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

export const getUserUrlDetails = async () => {
  return await privateRequest()
    .get('/user/urls', globalConfig)
    .then((res) => {
      // notifyUser(res.data.message, 'success');
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
