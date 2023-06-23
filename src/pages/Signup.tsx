import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from '../utils/hooks/useForm';
import { registerValidator } from '../utils/validators';
import { PasswordInput } from '../components/PasswordInput';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHook';
import { loading } from '../services/selectors';
import { registerStart } from '../services/slices/authSlice';
import { authWithGoogle, registerUser } from '../services/api-calls';
import { RegisterUser } from '../types';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

export const Signup = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(loading);

  const submitHandler = () => {
    dispatch(registerStart());
    registerUser(values as RegisterUser, dispatch, navigate);
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState,
    validate: registerValidator,
    callback: submitHandler,
  });

  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) =>
      await authWithGoogle(response, dispatch, navigate),
  });

  useGoogleOneTapLogin({
    onSuccess: (response) => {
      authWithGoogle(response, dispatch, navigate);
    },
  });

  return (
    <div className='h-5/6 flex justify-center items-center my-10'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <button
          type='button'
          className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-2 flex items-center justify-center'
          onClick={() => loginGoogle()}
        >
          Register with <FcGoogle className='ml-2' />
        </button>
        <hr />
        <div className='flex flex-col'>
          <label
            htmlFor='firstName'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            First Name
          </label>
          <input
            type='text'
            name='firstName'
            placeholder='John'
            value={values.firstName}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.firstName}</span>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='lastName'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            Last Name
          </label>
          <input
            type='text'
            name='lastName'
            placeholder='Doe'
            value={values.lastName}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.lastName}</span>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='email'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            Email Address
          </label>
          <input
            type='text'
            name='email'
            placeholder='john.doe@email.com'
            value={values.email}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.email}</span>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='password'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            Password
          </label>
          <PasswordInput
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.password}</span>
        </div>
        <button className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-5'>
          {isLoading === 'pending' ? 'Please wait...' : 'Sign up'}
        </button>
        <small className='block text-end'>
          Already got an account?{' '}
          <span className='underline underline-offset-2 text-primary'>
            <Link to={'/login'}>Login</Link>
          </span>
        </small>
      </form>
    </div>
  );
};
