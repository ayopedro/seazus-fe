import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const ChangePassword = () => {
  return (
    <div className='min-h-[80vh] mt-5'>
      <p className='mb-10 text-slate-500 flex items-center gap-2'>
        <Link to='/' className='hover:text-secondary'>
          Home
        </Link>
        <MdKeyboardArrowRight />
        <span className='text-primary'>Change Password</span>
      </p>
    </div>
  );
};
