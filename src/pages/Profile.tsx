import Avatar from 'react-avatar';
import { MdKeyboardArrowRight, MdVerified } from 'react-icons/md';
import { UrlTable } from '../components/UrlTable';
import { Link } from 'react-router-dom';
// import { GoUnverified } from 'react-icons/go';

export const Profile = () => {
  return (
    <div className='min-h-[80vh] mt-5'>
      <p className='mb-10 text-slate-500 flex items-center gap-2'>
        <Link to='/' className='hover:text-secondary'>
          Home
        </Link>
        <MdKeyboardArrowRight />
        <span className='text-primary'>Profile</span>
      </p>
      <div className='flex gap-4 md:gap-6 items-center'>
        <Avatar name='John Doe' round={'8px'} size='120' />
        <div>
          <h3 className='text-2xl md:text-4xl mb-1'>John Doe</h3>
          <p className='text-slate-500 flex items-center gap-1 mb-1'>
            john.doe@email.com{' '}
            <span>
              <MdVerified className='text-green-500' />
              {/* <GoUnverified className='text-yellow-500' /> */}
            </span>
          </p>
          <p className='text-slate-500 text-sm italic'>User since June 2023</p>
        </div>
      </div>
      <section>
        <UrlTable />
      </section>
    </div>
  );
};
