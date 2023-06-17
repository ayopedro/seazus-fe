import { notification } from 'antd';

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      notification.success({
        message: 'URL copied successfully',
        duration: 5,
        placement: 'top',
      });
    })
    .catch((error) => {
      notification.error({
        message: 'Failed to copy text to clipboard',
        duration: 5,
        placement: 'top',
      });
      console.error(error);
    });
};

export const notifyUser = (message: string, type: 'success' | 'error') => {
  if (type === 'success') {
    return notification.success({
      message,
      duration: 5,
      placement: 'top',
    });
  } else {
    return notification.error({
      message,
      duration: 5,
      placement: 'top',
    });
  }
};
