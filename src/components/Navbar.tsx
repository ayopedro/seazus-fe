import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLogin } from 'react-icons/md';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
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
            <FaUserCircle />
            <p>Anonymous</p>
          </div>
          <FaCaretDown className='cursor-pointer' onClick={showDropdown} />
          {dropdown && (
            <div className='absolute top-10 border border-grey-mid bg-grey-full shadow-xl mt-3 w-full left-0 rounded-md p-3'>
              <ul className='flex flex-col text-center divide-y divide-grey-mid gap-3'>
                <li onClick={showDropdown}>
                  <Link to={'/profile'}>Profile</Link>
                </li>
                <li onClick={showDropdown} className='pt-2'>
                  <Link to={'/history'}>History</Link>
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
