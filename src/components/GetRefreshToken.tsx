import { request } from '../utils/requestMethod';

export const GetNewToken = () => {
  const id = '';
  const getNewToken = () => {
    request(`/auth/new-otp/${id}`);
  };
  return (
    <button
      className='border-none underline text-primary'
      onClick={getNewToken}
    >
      Get new token
    </button>
  );
};
