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
  MdOutlineClose,
  MdOutlineDriveFileRenameOutline,
  MdOutlineQrCode2,
} from 'react-icons/md';
import { RiShareBoxFill } from 'react-icons/ri';
import { UrlAnalytics } from '../components/UrlAnalytics';
import { Modal, Skeleton, Tooltip } from 'antd';
import {
  changeStatus,
  deleteQrCode,
  generateQRCode,
  getUrlDetails,
} from '../services/api-calls';
import { copyToClipboard } from '../utils/helpers';
import { format, parseISO } from 'date-fns';
import { UrlData } from '../types';
import noData from '../assets/3009287 1.png';

export const LinkDetail = () => {
  const [urlData, setUrlData] = useState<UrlData>({} as UrlData);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [linkStatus, setLinkStatus] = useState<boolean>(urlData.status || true);
  const [showQr, setShowQr] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const modalHandler = () => {
    setShowQr(!showQr);
  };

  const generateQR = async () => {
    setLoading(true);
    await generateQRCode(urlData.id).then((res) => {
      setLoading(false);
      setQrCode(res);
    });
  };

  const deleteQR = async () => {
    setLoading(true);
    await deleteQrCode(urlData.id).then(() => {
      setLoading(false);
      setShowQr(false);
      setQrCode(null);
    });
  };

  const changeLinkStatus = async (status: boolean) => {
    await changeStatus(urlData.id, status).then((res) =>
      setLinkStatus(res.status)
    );
  };

  useEffect(() => {
    getUrlDetails(id).then((res) => {
      setUrlData(res.url);
      setQrCode(res.qrCode);
    });
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
        {urlData.shortUrl ? (
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
              {linkStatus ? (
                <Tooltip placement='top' title={'Disable link'} color='#353C4A'>
                  <MdLinkOff
                    className='cursor-pointer text-2xl md:text-3xl hover:text-secondary'
                    onClick={() => changeLinkStatus(false)}
                  />
                </Tooltip>
              ) : (
                <Tooltip placement='top' title={'Enable link'} color='#353C4A'>
                  <MdLink
                    className='cursor-pointer text-2xl md:text-3xl hover:text-secondary'
                    onClick={() => changeLinkStatus(true)}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        ) : (
          <Skeleton active />
        )}
        {urlData.shortUrl ? (
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
        ) : (
          <Skeleton active />
        )}
        <section className='mt-10 md:mt-20'>
          {urlData?.clickData && urlData?.clickData?.length ? (
            <UrlAnalytics clickData={urlData?.clickData || []} />
          ) : (
            <div className='flex flex-col items-center justify-center w-full'>
              <img src={noData} alt='No Data' width={350} />
              <p className='mb-2'>No Analytics</p>
            </div>
          )}
        </section>
      </div>
      <Modal
        open={showQr}
        onCancel={modalHandler}
        centered
        footer={null}
        closeIcon={
          <MdOutlineClose className={'text-white hover:text-primary text-lg'} />
        }
      >
        <div className='flex flex-col items-center justify-center py-5'>
          {qrCode ? (
            <div className='flex flex-col items-center gap-1'>
              <img src={qrCode} alt={'Qr Code'} />
              <small>seazus.onrender.com/{urlData.shortUrl}</small>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <img src={noData} alt='no QR code' width={300} />
              <p className='text-sm'>No QR code!</p>
            </div>
          )}
          <div className='mt-10 flex gap-3 items-center'>
            {!qrCode ? (
              <button
                className='btn bg-secondary border-none py-4'
                onClick={generateQR}
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            ) : (
              <>
                <a
                  href={qrCode}
                  download={urlData.shortUrl}
                  className='btn bg-secondary border-none hover:text-white'
                >
                  Download
                </a>
                <button
                  className='btn bg-red-500 border-none py-4'
                  onClick={deleteQR}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
