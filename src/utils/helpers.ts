import { notification } from 'antd';

const APP_SALT = import.meta.env.VITE_SALT;

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

export const dehashData = (item: string): string => {
  if (item) {
    const dehash = decrypt(APP_SALT, item);
    if (dehash) return JSON.parse(dehash);
  }
  return '';
};

export const crypt = (salt: string, item: string): string => {
  const textToChar = (item: string): number[] =>
    item.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n: number): string => ('0' + n.toString(16)).substr(-2);

  const applySaltToChar = (code: number): number =>
    textToChar(salt).reduce((a, b) => a ^ b, code);

  return item
    .split('')
    .map((c) => textToChar(c))
    .map((chars) => applySaltToChar(chars[0]))
    .map((charCode) => byteHex(charCode))
    .join('');
};

export const decrypt = (salt: string, encoded: string): string | undefined => {
  const textToChar = (text: string): number[] =>
    text.split('').map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: number) =>
    textToChar(salt).reduce((a, b) => a ^ b, code);

  return encoded
    .match(/.{1,2}/g)
    ?.map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join('');
};
