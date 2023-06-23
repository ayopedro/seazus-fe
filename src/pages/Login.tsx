import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from '../components/PasswordInput';
import { useForm } from '../utils/hooks/useForm';
import { loginValidator } from '../utils/validators';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHook';
import { authWithGoogle, loginUser } from '../services/api-calls';
import { LoginUser } from '../types';
import { loginStart } from '../services/slices/authSlice';
import { loading } from '../services/selectors';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

export const Login = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(loading);

  const submitHandler = async () => {
    dispatch(loginStart());
    loginUser(values as LoginUser, dispatch, navigate);
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState,
    validate: loginValidator,
    callback: submitHandler,
  });

  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) =>
      await authWithGoogle(response, dispatch, navigate),
  });

  useGoogleOneTapLogin({
    onSuccess: (response) => authWithGoogle(response, dispatch, navigate),
  });

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label htmlFor='email'>Email Address</label>
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
          <label htmlFor='password'>Password</label>
          <PasswordInput
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.password}</span>
          <small className='mt-2 text-end text-slate-400'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </small>
        </div>
        <button className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-5'>
          {isLoading === 'pending' ? 'Logging in...' : 'Login'}
        </button>
        <p className='text-center before:border-gray-400 before:border-b-2 before:w-full'>
          or
        </p>
        <button
          type='button'
          className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-2 flex items-center justify-center'
          onClick={() => loginGoogle()}
        >
          Login with <FcGoogle className='ml-2' />
        </button>
        <small className='block text-end'>
          Don't have an account?{' '}
          <span className='underline underline-offset-2 text-primary'>
            <Link to={'/signup'}>Sign up</Link>
          </span>
        </small>
      </form>
    </div>
  );
};
