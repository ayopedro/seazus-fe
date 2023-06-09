import { AiOutlineScissor } from 'react-icons/ai';
import { FaLink } from 'react-icons/fa';
import {
  MdArrowBackIosNew,
  MdContentCopy,
  MdOutlineAdsClick,
  MdOutlineCalendarMonth,
  MdOutlineQrCode2,
} from 'react-icons/md';
import { RiShareBoxFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { UrlAnalytics } from '../components/UrlAnalytics';
import { Modal, Tooltip } from 'antd';
import { useState } from 'react';

export const LinkDetail = () => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const modalHandler = () => {
    setShowQr(!showQr);
  };
  console.log('🚀 ~ file: LinkDetail.tsx:7 ~ LinkDetail ~ id:', id);

  return (
    <div>
      <button
        className='btn btn-primary flex items-center gap-1'
        onClick={() => navigate(-1)}
      >
        <MdArrowBackIosNew />
        Return
      </button>
      <div className='md:w-10/12 mx-auto mt-10'>
        <div className='flex justify-between items-center md:mb-5'>
          <h2 className='text-2xl md:text-3xl flex items-center gap-2'>
            <AiOutlineScissor className='text-primary' />
            short url
          </h2>
          <div className='flex items-center gap-3 md:gap-5'>
            <Tooltip placement='top' title={'Visit URL'} color='#353C4A'>
              <RiShareBoxFill className='cursor-pointer text-2xl md:text-3xl hover:text-secondary' />
            </Tooltip>
            <Tooltip placement='top' title={'Copy'} color='#353C4A'>
              <MdContentCopy className='cursor-pointer text-2xl md:text-3xl hover:text-secondary' />
            </Tooltip>
            <Tooltip placement='top' title={'QR Code'} color='#353C4A'>
              <MdOutlineQrCode2
                className='cursor-pointer text-2xl md:text-3xl hover:text-secondary'
                onClick={modalHandler}
              />
            </Tooltip>
          </div>
        </div>
        <div>
          <p className='flex items-center gap-2 text-sm md:text-base my-3 text-slate-500'>
            <FaLink />
            https://www.twitter.com/tweets/8erelCoihu/
          </p>
          <p className='flex items-center gap-2 text-sm md:text-base my-3 text-slate-500'>
            <MdOutlineAdsClick />
            27 Clicks
          </p>
          <small className='flex gap-2 items-center md:text-base'>
            <MdOutlineCalendarMonth />
            Jun 08, 2023
          </small>
        </div>
        <section className='mt-10 md:mt-20'>
          <UrlAnalytics />
        </section>
      </div>
      <Modal open={showQr} onCancel={modalHandler} centered footer={null}>
        <div className='flex flex-col items-center justify-center'>
          <img src={'qr_code'} alt={'short_url'} />
          <small>{'short_url'}</small>
          <div className='mt-10 flex gap-3 items-center'>
            <button className='btn bg-secondary border-none py-4'>
              Generate
            </button>
            <a
              href={'qr_code'}
              download={'short_url'}
              className='btn bg-secondary hover:text-white'
            >
              Download
            </a>
            <button className='btn bg-red-500 border-none py-4'>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
