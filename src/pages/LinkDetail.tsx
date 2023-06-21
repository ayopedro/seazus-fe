import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineScissor } from 'react-icons/ai';
import { FaLink } from 'react-icons/fa';
import {
  MdArrowBackIosNew,
  MdContentCopy,
  MdLink,
  MdLinkOff,
  MdOutlineAdsClick,
  MdOutlineCalendarMonth,
  MdOutlineDriveFileRenameOutline,
  MdOutlineQrCode2,
} from 'react-icons/md';
import { RiShareBoxFill } from 'react-icons/ri';
import { UrlAnalytics } from '../components/UrlAnalytics';
import { Modal, QRCode, Tooltip } from 'antd';
import { getUrlDetails } from '../services/api-calls/url';
import { copyToClipboard } from '../utils/helpers';
import { format, parseISO } from 'date-fns';
import { UrlData } from '../types';

export const LinkDetail = () => {
  const [urlData, setUrlData] = useState<UrlData>({} as UrlData);
  const [showQr, setShowQr] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const modalHandler = () => {
    setShowQr(!showQr);
  };
  console.log('🚀 ~ file: LinkDetail.tsx:7 ~ LinkDetail ~ urlData:', urlData);

  useEffect(() => {
    getUrlDetails(id).then((res) => setUrlData(res));
    const noQr = document.querySelector('.ant-qrcode-expired');
    if (noQr) noQr.innerHTML = 'No QR code.';
  }, [id]);

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
          <h3 className='text-xl md:text-3xl flex items-center gap-2'>
            <AiOutlineScissor className='text-primary' />
            {urlData.shortUrl}
          </h3>
          <div className='flex items-center gap-3 md:gap-5'>
            <Tooltip placement='top' title={'Visit URL'} color='#353C4A'>
              <a
                href={`https://seazus.onrender.com/${urlData.shortUrl}`}
                target='_blank'
                rel='noreferrer'
              >
                <RiShareBoxFill className='cursor-pointer text-2xl md:text-3xl hover:text-secondary' />
              </a>
            </Tooltip>
            <Tooltip placement='top' title={'Copy'} color='#353C4A'>
              <MdContentCopy
                className='cursor-pointer text-2xl md:text-3xl hover:text-secondary'
                onClick={() =>
                  copyToClipboard(
                    `https://seazus.onrender.com/${urlData.shortUrl}`
                  )
                }
              />
            </Tooltip>
            <Tooltip placement='top' title={'QR Code'} color='#353C4A'>
              <MdOutlineQrCode2
                className='cursor-pointer text-2xl md:text-3xl hover:text-secondary'
                onClick={modalHandler}
              />
            </Tooltip>
            {urlData.status === true ? (
              <Tooltip placement='top' title={'Disable link'} color='#353C4A'>
                <MdLinkOff className='cursor-pointer text-2xl md:text-3xl hover:text-secondary' />
              </Tooltip>
            ) : (
              <Tooltip placement='top' title={'Enable link'} color='#353C4A'>
                <MdLink className='cursor-pointer text-2xl md:text-3xl hover:text-secondary' />
              </Tooltip>
            )}
          </div>
        </div>
        <div>
          {urlData.title && (
            <p className='flex items-center gap-2 text-sm md:text-base my-3 text-slate-500'>
              <MdOutlineDriveFileRenameOutline />
              {urlData.title}
            </p>
          )}
          <p className='flex items-center gap-2 text-sm md:text-base my-3 text-slate-500'>
            <FaLink />
            {urlData.longUrl}
          </p>
          <p className='flex items-center gap-2 text-sm md:text-base my-3 text-slate-500'>
            <MdOutlineAdsClick />
            {urlData.clicks} Clicks
          </p>
          <small className='flex gap-2 items-center md:text-base'>
            <MdOutlineCalendarMonth />
            {urlData.createdAt &&
              format(parseISO(urlData?.createdAt), 'MMM dd, yyyy')}
          </small>
        </div>
        <section className='mt-10 md:mt-20'>
          <UrlAnalytics clickData={urlData.clickData} />
        </section>
      </div>
      <Modal open={showQr} onCancel={modalHandler} centered footer={null}>
        <div className='flex flex-col items-center justify-center'>
          {urlData.QrCode ? (
            <div>
              <img src={urlData.QrCode} alt={'Qr Code'} />
              <small>seazus.onrender.com/{urlData.shortUrl}</small>
            </div>
          ) : (
            <QRCode
              value='https://ant.design/'
              status='expired'
              // onRefresh={() => console.log('refresh')}
            />
          )}
          <div className='mt-10 flex gap-3 items-center'>
            {!urlData.QrCode ? (
              <button className='btn bg-secondary border-none py-4'>
                Generate
              </button>
            ) : (
              <>
                <a
                  href={urlData.QrCode}
                  download={urlData.shortUrl}
                  className='btn bg-secondary hover:text-white'
                >
                  Download
                </a>
                <button className='btn bg-red-500 border-none py-4'>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
