import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdLogin } from 'react-icons/md';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Avatar from 'react-avatar';

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className='py-5 md:py-10 flex justify-between items-center'>
      <h1 className='uppercase text-2xl md:text-4xl colored-bg'>
        <Link to={'/'}>seazus</Link>
      </h1>
      {!loggedIn ? (
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
        <div className='border border-grey-mid bg-grey-full p-2 w-40 md:w-48 rounded-full flex justify-between items-center relative'>
          <div className='flex items-center gap-2'>
            <Avatar name='John Doe' size='30' round />
            <p>John Doe</p>
          </div>
          <FaCaretDown className='cursor-pointer' onClick={showDropdown} />
          {dropdown && (
            <div className='absolute top-10 border border-grey-mid bg-grey-full shadow-xl mt-3 w-full right-0 rounded-md p-3'>
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
                <li onClick={showDropdown} className='pt-2'>
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
