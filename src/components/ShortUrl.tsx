// import { Modal } from 'antd';
import { useState } from 'react';
import {
  MdBarChart,
  MdOutlineContentCopy,
  MdOutlineQrCode2,
} from 'react-icons/md';
import { copyToClipboard } from '../utils/helpers';
import { ShortUrlProps } from '../types';
import { Link } from 'react-router-dom';

export const ShortUrl = ({ long_url, short_url, id }: ShortUrlProps) => {
  const [showQr, setShowQr] = useState<boolean>(false);

  const modalHandler = () => {
    setShowQr(!showQr);
  };

  return (
    <div className='flex justify-between p-3 border-none rounded-md bg-primary mt-10'>
      <p className='hidden md:block'>{long_url}</p>
      <div className='flex items-center gap-3 justify-between w-full s'>
        <a
          href={`http://localhost:3000/${short_url}`}
          target='_blank'
          rel='noreferrer'
        >
          {short_url}
        </a>
        <div className='flex items-center gap-5'>
          <MdOutlineQrCode2 onClick={modalHandler} className='cursor-pointer' />
          <Link to={`url/${id}`}>
            <MdBarChart className='cursor-pointer' />
          </Link>
          <MdOutlineContentCopy
            onClick={() => copyToClipboard(short_url)}
            className='cursor-pointer'
          />
        </div>
      </div>
      {/* <Modal open={showQr} onCancel={modalHandler} centered footer={null}>
        <div className='flex flex-col items-center justify-center'>
          <img src={qr_code} alt={short_url} />
          <small>{short_url}</small>
          <a
            href={qr_code}
            download={short_url}
            className='btn btn-primary hover:text-white mt-10'
          >
            Download
          </a>
        </div>
      </Modal> */}
    </div>
  );
};
