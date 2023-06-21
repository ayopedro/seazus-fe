import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks/useForm';
import { loginValidator } from '../utils/validators';
import { useState } from 'react';
import { forgotPassword } from '../services/api-calls';
import { ForgotPassword } from '../types';
import { useAppDispatch } from '../utils/hooks/reduxHook';

export const ForgotPasswordPage = () => {
  const initialState = {
    email: '',
  };

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async () => {
    setLoading(true);
    await forgotPassword(values as ForgotPassword, dispatch, navigate);
    setLoading(false);
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState,
    validate: loginValidator,
    callback: submitHandler,
  });
  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label
            htmlFor='email'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            Email Address
          </label>
          <input
            type='email'
            name='email'
            placeholder='john.doe@email.com'
            value={values.email}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.email}</span>
        </div>
        <button className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-5'>
          {loading ? 'Sending...' : 'Send Reset Token'}
        </button>
        {/* <p className='text-center before:border-gray-400 before:border-b-2 before:w-full'>
      or
    </p> */}

        <small className='block text-end'>
          Remembered your password?{' '}
          <span className='underline underline-offset-2 text-primary'>
            <Link to={'/login'}>Login Instead</Link>
          </span>
        </small>
      </form>
    </div>
  );
};
