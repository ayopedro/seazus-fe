import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from '../components/PasswordInput';
import { useForm } from '../utils/hooks/useForm';
import { changePasswordValidator } from '../utils/validators';
import { changePassword } from '../services/api-calls';
import { ChangePasswordType } from '../types';

export const ChangePassword = () => {
  const initialState = {
    current_password: '',
    new_password: '',
    confirm_password: '',
  };

  const navigate = useNavigate();

  const submitHandler = () => {
    const data: ChangePasswordType = {
      currentPassword: values.current_password,
      newPassword: values.new_password,
    };

    changePassword(data, navigate);
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialState,
    validate: changePasswordValidator,
    callback: submitHandler,
  });
  return (
    <div className='min-h-[80vh] mt-5'>
      <p className='mb-10 text-slate-500 flex items-center gap-2'>
        <Link to='/' className='hover:text-secondary'>
          Home
        </Link>
        <MdKeyboardArrowRight />
        <span className='text-primary'>Change Password</span>
      </p>
      <div className='mt-20'>
        <form className='auth-form mx-auto' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label
              htmlFor='current_password'
              className="after:content-['*'] after:ml-1 after:text-red-500"
            >
              Current Password
            </label>
            <PasswordInput
              name='current_password'
              placeholder='Current Password'
              value={values.current_password}
              onChange={handleChange}
            />
            <span className='text-red-500 text-sm mt-2'>
              {errors.current_password}
            </span>
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
              placeholder='New Password'
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
              placeholder='Confirm New Password'
            />
            <span className='text-red-500 text-sm mt-2'>
              {errors.confirm_password}
            </span>
          </div>
          <button className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-5'>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
