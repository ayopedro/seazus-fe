import { globalConfig, privateRequest } from '../../utils/requestMethod';
import { notifyUser } from '../../utils/helpers';
import axios from 'axios';
import { CreateShortUrl } from '../../types';

export const generateUrl = async (data: CreateShortUrl) => {
  return await privateRequest()
    .post('/url', data, globalConfig)
    .then((res) => {
      notifyUser(res.data.message, 'success');
      return res.data.result;
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

export const getUrlDetails = async (urlId: string | undefined) => {
  return await privateRequest()
    .get(`/url/${urlId}`, globalConfig)
    .then((res) => res.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        notifyUser(errorData.message, 'error');
        return errorData.message;
      }
      throw new Error('Error encountered!');
    });
};

export const generateQRCode = async (urlId: string) => {
  return await privateRequest()
    .post(`/url/${urlId}/qrcode`, undefined, globalConfig)
    .then((res) => {
      notifyUser(res.data.message, 'success');
      return res.data.imageUrl;
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

export const deleteQrCode = async (urlId: string) => {
  return await privateRequest()
    .delete(`/url/${urlId}/qrcode`, globalConfig)
    .then((res) => {
      notifyUser(res.data.message, 'success');
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

export const changeStatus = async (urlId: string, status: boolean) => {
  return await privateRequest()
    .patch(`/url/${urlId}/status?status=${status}`, undefined, globalConfig)
    .then((res) => {
      notifyUser(res.data.message, 'success');
      return res.data.result;
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

export const deleteUrl = async (urlId: string) => {
  return await privateRequest()
    .delete(`/url/${urlId}`, globalConfig)
    .then((res) => {
      notifyUser(res.data.message, 'success');
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
