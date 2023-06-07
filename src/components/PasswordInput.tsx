import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { PasswordInputProps } from '../types';

type PasswordType = 'password' | 'text';

export const PasswordInput = ({
  name,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) => {
  const [inputType, setInputType] = useState<PasswordType>('password');
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  const showPassword = () => {
    setRevealPassword(true);
    setInputType('text');
  };

  const hidePassword = () => {
    setRevealPassword(false);
    setInputType('password');
  };
  return (
    <div className='relative'>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder || '**********'}
        className='w-full'
        value={value}
        onChange={onChange}
      />
      {!revealPassword ? (
        <button
          type='button'
          onClick={showPassword}
          className='absolute right-5 top-1/2'
        >
          <AiFillEye />
        </button>
      ) : (
        <button
          type='button'
          onClick={hidePassword}
          className='absolute right-5 top-1/2'
        >
          <AiFillEyeInvisible />
        </button>
      )}
    </div>
  );
};
