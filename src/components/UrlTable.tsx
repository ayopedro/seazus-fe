import type { ColumnsType } from 'antd/es/table';
import { TableData } from '../types';
import {
  MdDelete,
  MdOutlineClose,
  MdOutlineContentCopy,
  MdOutlineQrCode2,
  MdRemoveRedEye,
} from 'react-icons/md';
import { TbQrcodeOff } from 'react-icons/tb';
import { ConfigProvider, Modal, Table, Tag, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { copyToClipboard } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { deleteUrl, getUserUrlDetails } from '../services/api-calls';
import { format, parseISO } from 'date-fns';
import noData from '../assets/3009287 1.png';
import { AiOutlineLink } from 'react-icons/ai';

export const UrlTable = () => {
  const [data, setData] = useState<TableData[]>([] as TableData[]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const navigate = useNavigate();

  const columns: ColumnsType<TableData> = [
    {
      key: 'shortUrl',
      title: 'Short URL',
      dataIndex: 'shortUrl',
      render: (text) => (
        <div className='flex items-center gap-3'>
          <a
            href={text}
            target='_blank'
            rel='noreferrer'
            className='hover:text-primary text-sm md:text-md'
          >
            https://seazus.onrender.com/{text}
          </a>
          <div className='copy'>
            <Tooltip placement='top' title={'Copy'} color='#353C4A'>
              <MdOutlineContentCopy
                onClick={() =>
                  copyToClipboard(`https://seazus.onrender.com/${text}`)
                }
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      key: 'longUrl',
      title: 'Original Link',
      dataIndex: 'longUrl',
    },
    {
      key: 'QrCode',
      title: 'QR Code',
      dataIndex: 'QrCode',
      render: (value) =>
        value ? (
          <Tooltip placement='top' title={'QR code'} color='#353C4A'>
            <MdOutlineQrCode2 className='text-3xl' />
          </Tooltip>
        ) : (
          <Tooltip placement='top' title={'No QR code'} color='#353C4A'>
            <TbQrcodeOff className='text-3xl' />
          </Tooltip>
        ),
    },
    {
      key: 'clicks',
      title: 'Clicks',
      dataIndex: 'clicks',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (val) =>
        val === true ? (
          <Tag color='green'>Active</Tag>
        ) : (
          <Tag color='yellow'>Inactive</Tag>
        ),
    },
    {
      key: 'createdAt',
      title: 'Date Created',
      dataIndex: 'createdAt',
      render: (value) => format(parseISO(value), 'dd MMMM yyyy'),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <div className='flex items-center gap-3 justify-center'>
            <Link to={`/url/${record.id}`}>
              <Tooltip placement='top' title={'View'} color='#353C4A'>
                <MdRemoveRedEye className='text-lg hover:text-blue-400' />
              </Tooltip>
            </Link>
            <button>
              <Tooltip placement='top' title={'Delete'} color='#353C4A'>
                <MdDelete
                  className='text-lg hover:text-red-500'
                  onClick={() => setShowDeleteModal(true)}
                />
              </Tooltip>
            </button>
            <Modal
              open={showDeleteModal}
              onCancel={() => setShowDeleteModal(!showDeleteModal)}
              centered
              title={<h4 className='text-white bg-grey-full'>Delete URL?</h4>}
              footer={null}
              closeIcon={
                <MdOutlineClose
                  className={'text-white hover:text-primary text-lg'}
                />
              }
            >
              <h3 className='text-white text-lg text-center mt-10'>
                Are you sure you want to delete this URL?
              </h3>
              <div className='flex justify-end gap-3 items-center mt-14'>
                <button
                  className='btn bg-secondary border-none py-4'
                  onClick={() => setShowDeleteModal(!showDeleteModal)}
                >
                  Cancel
                </button>
                <button
                  className='btn bg-red-500 border-none py-4'
                  onClick={() => deleteShortUrl(record.id)}
                >
                  Delete
                </button>
              </div>
            </Modal>
          </div>
        );
      },
    },
  ];

  const deleteShortUrl = (id: string) => {
    deleteUrl(id);
    setShowDeleteModal(false);
    setReload(true);
  };

  useEffect(() => {
    getUserUrlDetails().then((res) => setData(res));
    if (reload) getUserUrlDetails().then((res) => setData(res));
  }, [reload]);

  return (
    <div className='mt-10'>
      {data.length ? (
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#181E29',
              colorBorderSecondary: '#353C4A',
              colorText: '#f6f6f6',
              fontFamily: 'Open Sans, sans-serif',
            },
          }}
        >
          <Table
            dataSource={data}
            columns={columns}
            pagination={data.length <= 10 && false}
            scroll={{ x: 1400 }}
          />
        </ConfigProvider>
      ) : (
        <div className='flex flex-col items-center justify-center w-full'>
          <img src={noData} alt='No Data' width={350} />
          <p className='mb-2'>No URL Data.</p>
          <button
            className='btn btn-primary mt-2 md:py-1 flex items-center justify-center'
            onClick={() => navigate('/')}
          >
            <AiOutlineLink className='mr-2' />
            Shorten URL
          </button>
        </div>
      )}
    </div>
  );
};
