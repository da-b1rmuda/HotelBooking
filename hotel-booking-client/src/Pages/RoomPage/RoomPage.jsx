import React, { useState } from 'react';
import { Radio, Button, Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import './Room.css';
import RoomCreate from './RoomCreate';

const Room = () => {
  const [onCreateRoom, setOnCreateRoom] = useState(true);

  const columns = [
    {
      title: '№ Комнаты',
      dataIndex: 'id_room',
      key: 'id_room',
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: 'Тип комнаты',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Этаж',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Удобства',
      key: 'facility',
      dataIndex: 'facility',
      render: (_, { facility }) => (
        <>
          {facility.map((tag) => {
            return (
              <Tag color={'green'} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
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
      id_room: '#001',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Доступно'],
    },
    {
      key: '2',
      id_room: '#002',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Забронировано'],
    },
    {
      key: '3',
      id_room: '#003',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Заселено'],
    },
    {
      key: '4',
      id_room: '#004',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Заблокировано'],
    },
    {
      key: '5',
      id_room: '#005',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Ожидание'],
    },
    {
      key: '6',
      id_room: '#006',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Заблокировано'],
    },
    {
      key: '7',
      id_room: '#007',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Свободно'],
    },
    {
      key: '8',
      id_room: '#008',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Свободно'],
    },
    {
      key: '9',
      id_room: '#009',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Свободно'],
    },
    {
      key: '10',
      id_room: '#010',
      room_type: 'Двуспальная',
      floor: 1,
      facility: ['Ванная', 'Холодильник', 'WI-FI'],
      status: ['Свободно'],
    },
  ];

  const contentView = onCreateRoom ? (
    <Table
      pagination={{
        pageSize: 6,
      }}
      style={{ marginTop: '10px' }}
      columns={columns}
      dataSource={data}
    />
  ) : (
    <RoomCreate setOnCreateRoom={setOnCreateRoom}/>
  );

  return (
    <>
      {onCreateRoom ?
      <>
      <h2>Комнаты</h2>
      <div className="d-f jc-sb mt-10">
        <Radio.Group defaultValue="a" size="large">
          <Radio.Button value="a">Все комнаты</Radio.Button>
          <Radio.Button value="b">Свободные комнаты</Radio.Button>
          <Radio.Button value="c">Занятые комнаты</Radio.Button>
        </Radio.Group> 
        <Button size="large" type="primary" onClick={() => setOnCreateRoom(false)}>
          Добавить комнату
        </Button>
      </div>
      </>
      : null}
      {contentView}
    </>
  );
};

export default Room;
