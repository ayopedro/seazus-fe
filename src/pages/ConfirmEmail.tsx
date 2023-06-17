import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../components/PasswordInput';
import { loading, user } from '../services/selectors';
import { confirmEmail } from '../services/api-calls';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHook';
import { useForm } from '../utils/hooks/useForm';
import { resetValidator } from '../utils/validators';
import {
  confirmError,
  confirmStart,
  confirmSuccess,
} from '../services/slices/authSlice';

export const ConfirmEmail = () => {
  const initialState = {
    token: '',
  };

  const user_details = useAppSelector(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(loading);

  const submitHandler = () => {
    dispatch(confirmStart());
    confirmEmail(values as { token: string }, user_details?.id, navigate)
      .then(() => {
        dispatch(confirmSuccess());
      })
      .catch((err) => dispatch(confirmError(err.message)));
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
        <button className='btn border-gray-500 hover:bg-secondary hover:border-secondary mt-5'>
          {isLoading === 'pending' ? 'Verifying...' : 'Confirm Email'}
        </button>
      </form>
    </div>
  );
};
