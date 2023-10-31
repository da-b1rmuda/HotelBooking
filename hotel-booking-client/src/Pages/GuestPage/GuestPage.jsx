import React, { useState } from 'react';
import { SearchOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Input, Radio, Table, Tag, Space, Dropdown } from 'antd';
import './GuestPage.css';

const GuestPage = () => {
  const [selectedRow, setSelectedRow] = useState();
  const columns = [
    {
      title: '№ Бронирования',
      dataIndex: 'number_room',
      key: 'number_room',
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: 'Клиент',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Номер комнаты',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Общая сумма',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Оплаченная сумма',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Статус',
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
      <div className="d-f jc-sb flex-center">
        <div className="d-f jc-sb mt-10">
          <Radio.Group defaultValue="a" size="large">
            <Radio.Button value="a">Прибыли</Radio.Button>
            <Radio.Button value="b">Выехали</Radio.Button>
          </Radio.Group>
        </div>
        <div className="d-f">
          <div className="m-r-2">
            <Button size={'large'} icon={<FilterOutlined />}>
              Фильтр
            </Button>
          </div>
          <Input
            size={'large'}
            style={{ width: '16vw' }}
            placeholder="Поиск по номеру комнаты..."
            prefix={<SearchOutlined />}
          />
        </div>
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

export default GuestPage;
