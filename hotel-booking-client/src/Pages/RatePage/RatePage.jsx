import React, { useState } from 'react';
import { FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Radio, Table, Tag, Space, Dropdown } from 'antd';
import './RatePage.css';

const RatePage = () => {
  const [selectedRow, setSelectedRow] = useState();
  const columns = [
    {
      title: 'Тип комнаты',
      dataIndex: 'number_room',
      key: 'number_room',
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: 'Акция',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Политика отмены',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Цена по акции',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Расценка',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Доступные комнаты',
      dataIndex: 'status',
      key: 'status',
      // filters: loadFilter(),
      // render: (_, { status }) => <Tag color={getColorStatus(status)}>{status}</Tag>,
      // filteredValue: filteredInfo.status || null,
      // onFilter: (value, record) => record.status.includes(value),
      // filterIcon: <svg width={1} height={1}></svg>,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="large">
          <Dropdown menu={{ items, onClick, record }} trigger={['click']}>
            <Space>
              <Button
                onClick={() => setSelectedRow(record.key)}
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Space>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const getColorStatus = (status) => {
    let color;
    // eslint-disable-next-line
    statusRoom.map((item) => {
      if (item.status === status) {
        color = item.color;
      }
    });
    return color;
  };
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  //
  // Dropdown menu
  //
  const items = [
    {
      label: 'Редактировать',
      key: 'edit',
    },
    {
      label: 'Удалить',
      key: 'delete',
    },
  ];
  const onClick = ({ key, items }) => {
    if (key === 'delete') {
      // showDeleteConfirm();
    }
    if (key === 'edit') {
      // setOnCreateRoom(false);
      // setOnEditRoom(true);
    }
  };

  //
  // Date picker
  //
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  //
  // Field is empty check
  //
  const isEmpty = (value) => {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    return false;
  };
  return (
    <>
      <h2>Гости</h2>
      <div className="d-f jc-e">
        <div className="m-r-2">
          <Button type={'primary'} size={'large'}>
            Добавить расценку
          </Button>
        </div>
        <Button size={'large'} icon={<FilterOutlined />}>
          Фильтр
        </Button>
      </div>
      <Table
        pagination={{
          pageSize: 6,
        }}
        style={{ marginTop: '10px' }}
        columns={columns}
        dataSource={isEmpty(data) ? [] : data}
        // onChange={handleChange}
      />
    </>
  );
};

export default RatePage;
