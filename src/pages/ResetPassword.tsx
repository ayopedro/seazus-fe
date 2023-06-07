import { Link } from 'react-router-dom';
import { PasswordInput } from '../components/PasswordInput';
import { useForm } from '../utils/hooks/useForm';
import { resetValidator } from '../utils/validators';

export const ResetPassword = () => {
  const initialState = {
    token: '',
    new_password: '',
    confirm_password: '',
  };

  const submitHandler = () => {
    console.log(values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState,
    validate: resetValidator,
    callback: submitHandler,
  });
  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label
            htmlFor='token'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            One Time Password
          </label>
          <PasswordInput
            name='token'
            placeholder='One Time Password'
            value={values.token}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.token}</span>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='new_password'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            New Password
          </label>
          <PasswordInput
            name='new_password'
            value={values.new_password}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>
            {errors.new_password}
          </span>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='confirm_password'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            Confirm New Password
          </label>
          <PasswordInput
            name='confirm_password'
            value={values.confirm_password}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>
            {errors.confirm_password}
          </span>
        </div>
        <button className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-5'>
          Reset Password
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
