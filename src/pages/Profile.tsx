import Avatar from 'react-avatar';
import { MdKeyboardArrowRight, MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { UrlTable } from '../components/UrlTable';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserDetails } from '../services/api-calls';
import { ResponseUser } from '../types';
import { format, parseISO } from 'date-fns';
import { Skeleton } from 'antd';

export const Profile = () => {
  const [userDetails, setUserDetails] = useState<ResponseUser>(
    {} as ResponseUser
  );

  useEffect(() => {
    getUserDetails().then((res) => setUserDetails(res));
  }, []);

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
        {userDetails.firstName ? (
          <Avatar
            name={`${userDetails.firstName} ${userDetails.lastName}`}
            round={'8px'}
            size='100'
          />
        ) : (
          <Skeleton.Image active />
        )}
        {userDetails.firstName ? (
          <div>
            <h3 className='text-2xl md:text-4xl mb-1'>
              {userDetails.firstName} {userDetails.lastName}
            </h3>
            <p className='text-slate-500 flex items-center gap-1 mb-1'>
              {userDetails.email}{' '}
              <span>
                {userDetails.verified ? (
                  <MdVerified className='text-green-500' />
                ) : (
                  <GoUnverified className='text-yellow-500' />
                )}
              </span>
            </p>
            <p className='text-slate-500 text-sm italic'>
              User since{' '}
              {userDetails.createdAt &&
                format(parseISO(userDetails.createdAt), 'MMMM yyyy')}
            </p>
          </div>
        ) : (
          <Skeleton active />
        )}
      </div>
      <section>
        <UrlTable />
      </section>
    </div>
  );
};
