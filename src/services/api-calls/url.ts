import axios from 'axios';
import { privateRequest } from '../../utils/requestMethod';
import { notifyUser } from '../../utils/helpers';

export const generateUrl = async (data: any) => {
  try {
    const response = await (await privateRequest()).post('/url', data);
    console.log('🚀 ~ file: url.ts:8 ~ generateUrl ~ response:', response);
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
