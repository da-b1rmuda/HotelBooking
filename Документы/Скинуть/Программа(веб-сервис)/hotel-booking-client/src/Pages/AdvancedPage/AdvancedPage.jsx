import React, { useContext } from 'react';
import { Switch, Row, Col, Card, Table, Tag, Space, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { ContextBooking } from '../../context/booking.context';

const AdvancedPage = () => {
  //
  // Theme selector
  //
  const { setThemeMenu, themeMenu } = useContext(ContextBooking);
  const toggleTheme = () => {
    if (themeMenu === 'light') {
      setThemeMenu('dark');
    }
    if (themeMenu === 'dark') {
      setThemeMenu('light');
    }
  };

  const columns = [
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color;
            if (tag === 'Доступно') {
              color = 'geekblue';
            }
            if (tag === 'Забронировано') {
              color = 'volcano';
            }
            if (tag === 'Заселено') {
              color = 'green';
            }
            if (tag === 'Ожидание') {
              color = 'orange';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="large">
          <Button shape="circle" icon={<MoreOutlined />} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      status: ['Доступно'],
    },
    {
      key: '2',
      status: ['Забронировано'],
    },
    {
      key: '3',
      status: ['Заселено'],
    },
    {
      key: '4',
      status: ['Заблокировано'],
    },
    {
      key: '5',
      status: ['Ожидание'],
    },
   
  ];

  return (
    <>
      <Card title="Выбор темы" bordered={true}>
        <Switch
          onClick={toggleTheme}
          defaultChecked={true}
          checkedChildren="Светлая"
          unCheckedChildren="Темная"
        />
      </Card>

      <Card title="Статусы комнат" bordered={true}>
        <Table
          pagination={{
            pageSize: 6,
          }}
          style={{ marginTop: '10px', width: '30%' }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
};

export default AdvancedPage;
