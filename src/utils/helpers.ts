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
