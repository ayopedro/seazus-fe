import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from '../utils/hooks/useForm';
import { registerValidator } from '../utils/validators';
import { PasswordInput } from '../components/PasswordInput';

export const Signup = () => {
  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const submitHandler = () => {
    console.log(values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState,
    validate: registerValidator,
    callback: submitHandler,
  });

  return (
    <div className='h-5/6 flex justify-center items-center my-10'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <button
          type='button'
          className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-2 flex items-center justify-center'
        >
          Register with <FcGoogle className='ml-2' />
        </button>
        <hr />
        <div className='flex flex-col'>
          <label
            htmlFor='first_name'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            First Name
          </label>
          <input
            type='text'
            name='first_name'
            placeholder='John'
            value={values.first_name}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.first_name}</span>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='last_name'
            className="after:content-['*'] after:ml-1 after:text-red-500"
          >
            Last Name
          </label>
          <input
            type='text'
            name='last_name'
            placeholder='Doe'
            value={values.last_name}
            onChange={handleChange}
          />
          <span className='text-red-500 text-sm mt-2'>{errors.last_name}</span>
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
          Sign up
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
