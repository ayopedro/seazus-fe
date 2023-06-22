import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdLogin } from 'react-icons/md';
import { FaCaretDown } from 'react-icons/fa';
import Avatar from 'react-avatar';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHook';
import { isAuthenticated, user } from '../services/selectors';
import { logoutUserApi } from '../services/api-calls';

export const Navbar = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const isAuth = useAppSelector(isAuthenticated);
  const user_details = useAppSelector(user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const logoutHandler = async () => {
    logoutUserApi(navigate, dispatch);
    setDropdown(!dropdown);
  };

  return (
    <nav className='py-5 md:py-10 flex justify-between items-center'>
      <h1 className='uppercase text-2xl md:text-4xl colored-bg'>
        <Link to={'/'}>seazus</Link>
      </h1>
      {!isAuth ? (
        <div className='flex gap-3'>
          <Link
            to={'/login'}
            className='btn border-grey-mid bg-grey-full hover:shadow-lg flex items-center gap-2 hover:bg-secondary hover:border-secondary'
          >
            Login <MdLogin className='text-xl' />
          </Link>
          <Link to={'/signup'} className='btn btn-primary hidden md:block'>
            Register Now
          </Link>
        </div>
      ) : (
        <div
          className='border border-grey-mid bg-grey-full p-2 w-40 md:w-48 rounded-full flex justify-between items-center relative'
          onClick={showDropdown}
        >
          <div className='flex items-center gap-2'>
            <Avatar
              name={`${user_details?.firstName} ${user_details?.lastName}`}
              size='30'
              round
            />
            <p className='text-sm md:text-base'>
              {user_details?.firstName} {user_details?.lastName.charAt(0)}.
            </p>
          </div>
          <FaCaretDown className='cursor-pointer' />
          {dropdown && (
            <div className='absolute top-10 md:top-14 border border-grey-mid bg-grey-full shadow-xl mt-3 w-full right-0 rounded-md p-3'>
              <ul className='flex flex-col text-center divide-y divide-grey-mid gap-3'>
                <li onClick={showDropdown}>
                  <NavLink
                    to={'/profile'}
                    className={({ isActive }) =>
                      isActive ? 'text-primary' : ''
                    }
                  >
                    My Profile
                  </NavLink>
                </li>
                <li onClick={showDropdown} className='pt-2'>
                  <NavLink
                    to={'/change-password'}
                    className={({ isActive }) =>
                      isActive ? 'text-primary' : ''
                    }
                  >
                    Change Password
                  </NavLink>
                </li>
                <li onClick={logoutHandler} className='pt-2 cursor-pointer'>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
