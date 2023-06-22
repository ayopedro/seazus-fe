import { Link } from 'react-router-dom';
import urlImage from '../assets/url_illustration.png';
import { Shorten } from './Shorten';
import { useAppSelector } from '../utils/hooks/reduxHook';
import { isAuthenticated } from '../services/selectors';
import { useState } from 'react';
import { Modal } from 'antd';
import { MdOutlineClose } from 'react-icons/md';

export const Hero = () => {
  const isAuth = useAppSelector(isAuthenticated);
  const [showModal, setShowModal] = useState<boolean>(false);

  const modalHandler = () => {
    setShowModal(!showModal);
  };
  return (
    <section className='flex flex-col justify-center md:grid md:grid-cols-12 items-center min-h-[80vh] mt-10 md:mt-0'>
      <div className='flex flex-col gap-5 md:gap-7 col-span-6 md:col-span-7 text-center md:text-start'>
        <h1 className='text-4xl md:text-5xl capitalize colored-bg md:w-4/5'>
          Shorten your looooooong links :)
        </h1>
        <p className='text-lg text-lite opacity-50 md:w-3/5'>
          Seazus is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        {isAuth ? (
          <>
            <button
              onClick={modalHandler}
              className='btn btn-primary hover:shadow-xl w-fit mx-auto md:mx-0 text-center mt-5 block'
            >
              Create Short Link
            </button>

            <Modal
              open={showModal}
              footer={null}
              centered
              onCancel={modalHandler}
              closeIcon={
                <MdOutlineClose
                  className={'text-white hover:text-primary text-lg'}
                />
              }
            >
              <Shorten />
            </Modal>
          </>
        ) : (
          <div>
            <ol className='marker:text-sky-400 text-base text-lite opacity-50 list-decimal list-inside'>
              <li>Sign up or login</li>
              <li>Create short url</li>
              <li>Generate QR code</li>
              <li>Share 🚀</li>
            </ol>
            <Link
              to={'/login'}
              className='btn btn-primary hover:shadow-xl w-fit mx-auto md:mx-0 text-center mt-5 block'
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
      <div className='col-span-6 md:col-span-5 flex items-center justify-center mt-10 md:mt-0'>
        <img src={urlImage} alt='qrcode' className='block w-2/3 md:w-full' />
      </div>
    </section>
  );
};
