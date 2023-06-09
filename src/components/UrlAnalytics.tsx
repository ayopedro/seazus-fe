import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AnalyticsData } from '../types';

export const UrlAnalytics = () => {
  const columns: ColumnsType<AnalyticsData> = [
    {
      key: 'device',
      title: 'Device',
      dataIndex: 'device',
    },
    {
      key: 'browser',
      title: 'Browser',
      dataIndex: 'browser',
    },
    {
      key: 'operating_system',
      title: 'Operating System',
      dataIndex: 'operating_system',
    },
    {
      key: 'ip',
      title: 'IP Address',
      dataIndex: 'ip',
    },
    {
      key: 'timestamp',
      title: 'Timestamp',
      dataIndex: 'timestamp',
    },
  ];

  const data: AnalyticsData[] = [];
  return (
    <div className='md:w-3/4 flex justify-center mx-auto bg-grey-full rounded-lg p-3'>
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
          columns={columns}
          dataSource={data}
          className='w-full text-white'
        />
      </ConfigProvider>
    </div>
  );
};
