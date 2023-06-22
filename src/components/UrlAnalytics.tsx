import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AnalyticsData } from '../types';
import { format, parseISO } from 'date-fns';

interface AnalyticsProps {
  clickData: AnalyticsData[];
}

export const UrlAnalytics = ({ clickData }: AnalyticsProps) => {
  const columns: ColumnsType<AnalyticsData> = [
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: 'Browser',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: 'Operating System',
      dataIndex: 'os',
      key: 'os',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (value) => <p>{format(parseISO(value), 'dd MMM yyyy')}</p>,
    },
  ];

  return (
    <div className='flex justify-center mx-auto bg-grey-full rounded-lg p-3'>
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
          dataSource={clickData}
          className='w-full text-white'
          scroll={{ x: 1000 }}
          pagination={clickData.length < 10 && false}
        />
      </ConfigProvider>
    </div>
  );
};
