import { Modal } from 'antd';
import { useState } from 'react';
import {
  MdBarChart,
  MdOutlineContentCopy,
  MdOutlineQrCode2,
} from 'react-icons/md';
import { copyToClipboard } from '../utils/helpers';
import { ShortUrlProps } from '../types';
import { Link } from 'react-router-dom';

export const ShortUrl = ({
  long_url,
  short_url,
  id,
  qr_code,
}: ShortUrlProps) => {
  const [showQr, setShowQr] = useState<boolean>(false);

  const modalHandler = () => {
    setShowQr(!showQr);
  };

  return (
    <div className='flex justify-between p-3 border-none rounded-md bg-primary mt-10'>
      <p>{long_url}</p>
      <div className='flex items-center gap-3'>
        <p>{short_url}</p>
        <MdOutlineQrCode2 onClick={modalHandler} className='cursor-pointer' />
        <Link to={`url/${id}`}>
          <MdBarChart className='cursor-pointer' />
        </Link>
        <MdOutlineContentCopy
          onClick={() => copyToClipboard(short_url)}
          className='cursor-pointer'
        />
      </div>
      <Modal open={showQr} onCancel={modalHandler} centered footer={null}>
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
      </Modal>
    </div>
  );
};
