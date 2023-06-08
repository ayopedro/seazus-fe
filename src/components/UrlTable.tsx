import type { ColumnsType } from 'antd/es/table';
import { TableData } from '../types';
import {
  MdDelete,
  MdOutlineContentCopy,
  MdOutlineQrCode2,
  MdRemoveRedEye,
} from 'react-icons/md';
import { ConfigProvider, QRCode, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { copyToClipboard } from '../utils/helpers';

const columns: ColumnsType<TableData> = [
  {
    key: 'short_url',
    title: 'Short URL',
    dataIndex: 'short_url',
    render: (text) => (
      <div className='flex items-center gap-3'>
        <a
          href={text}
          target='_blank'
          rel='noreferrer'
          className='hover:text-primary text-sm md:text-md'
        >
          {text}
        </a>
        <div className='cursor-pointer border border-gray-700 p-0.5 w-7 h-7 rounded-full object-contain flex items-center justify-center'>
          <MdOutlineContentCopy onClick={() => copyToClipboard(text)} />
        </div>
      </div>
    ),
  },
  {
    key: 'long_url',
    title: 'Original Link',
    dataIndex: 'long_url',
    responsive: ['lg'],
  },
  {
    key: 'qr_code',
    title: 'QR Code',
    dataIndex: 'qr_code',
    render: () => (
      <div className='flex ml-5 items-center'>
        <MdOutlineQrCode2 className='cursor-pointer text-3xl' />
      </div>
    ),
    responsive: ['md'],
  },
  {
    key: 'clicks',
    title: 'Clicks',
    dataIndex: 'clicks',
    responsive: ['md'],
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
    responsive: ['md'],
  },
  {
    key: 'date',
    title: 'Date Created',
    dataIndex: 'date',
    responsive: ['md'],
  },
  {
    key: 'action',
    title: 'Action',
    dataIndex: 'action',
    render: (_, record) => {
      return (
        <div className='flex items-center gap-3 justify-center'>
          <Link to={``}>
            <MdRemoveRedEye className='text-lg hover:text-blue-400' />
          </Link>
          <button>
            <MdDelete className='text-lg hover:text-red-500' />
          </button>
        </div>
      );
    },
  },
];

const data: TableData[] = [
  {
    key: 'sjsios',
    short_url: 'https://linkly.com/Bn41aCOlnxj',
    long_url: 'https://www.twitter.com/tweets/8erelCoihu/',
    qr_code: 'asdfghjk',
    clicks: 30,
    status: true,
    date: 'Oct-08-2023',
  },
  {
    key: 'sjsiods',
    short_url: 'https://linkly.com/Bn41aCOlnxj',
    long_url: 'https://www.twitter.com/tweets/8erelCoihu/',
    qr_code: 'asdfghgjk',
    clicks: 37,
    status: false,
    date: 'Oct-08-2023',
  },
  {
    key: 'sjsisos',
    short_url: 'https://linkly.com/Bn41aCOlnxj',
    long_url: 'https://www.twitter.com/tweets/8erelCoihu/',
    qr_code: 'asdfghjk',
    clicks: 56,
    status: true,
    date: 'Oct-08-2023',
  },
];

export const UrlTable = () => {
  return (
    <div className='mt-10'>
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
        />
      </ConfigProvider>
    </div>
  );
};
