import React, { useState } from 'react';
import { ArrowLeftOutlined, PlusOutlined, MinusOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Card, Radio, DatePicker, Table, Tag, Space, Dropdown } from 'antd';
import './FrontdeskPage.css';

const FrontdeskCreate = (props) => {
  const [onEditFrontdesk, setOnEditFrontdesk] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const columns = [
    {
      title: '№ Комнаты',
      dataIndex: 'number_room',
      key: 'number_room',
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
      width: 450,
      render: (_, { facility }) => (
        <>
          {facility?.map((tag) => {
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

  //
  // Back button
  //
  const onBackButton = () => {
    props.setOnCreateBooking(false);
  };
  return (
    <>
      {onEditFrontdesk ? <h2>Изменение заказов</h2> : <h2>Оформление комнаты</h2>}
      <Button
        style={{ marginTop: '1vh' }}
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => onBackButton()}>
        Назад
      </Button>
      <Card style={{ marginTop: '2vh' }}>
        <div className="d-f jc-sb flex-center">
          <div>
            <div className="d-f jc-sb mt-10">
              <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a">Все комнаты</Radio.Button>
                <Radio.Button value="b">Одиночная</Radio.Button>
                <Radio.Button value="c">Двойная</Radio.Button>
                <Radio.Button value="d">Тройная</Radio.Button>
                <Radio.Button value="e">VIP</Radio.Button>
              </Radio.Group>
            </div>
            <div className="d-f p-t-3 text-fontdesk">
              <div className="p-r-2">
                <p>Заезд</p>
                <DatePicker showTime={{ format: 'HH:mm' }} onChange={onChange} onOk={onOk} />
              </div>
              <div>
                <p>Выезд</p>
                <DatePicker showTime={{ format: 'HH:mm' }} onChange={onChange} onOk={onOk} />
              </div>
            </div>
            <div className="d-f text-fontdesk p-t-3 ">
              <div className="d-f p-r-2">
                <div>
                  <p>Взрослые</p>
                  <span>Старше 12 лет</span>
                </div>
                <div className="d-f counter-fontdesk">
                  <Button type="primary" shape="circle" icon={<PlusOutlined />} />
                  <p>0</p>
                  <Button type="primary" shape="circle" icon={<MinusOutlined />} />
                </div>
              </div>
              <div className="d-f">
                <div>
                  <p>Дети</p>
                  <span>0-12 лет</span>
                </div>
                <div className="d-f counter-fontdesk">
                  <Button type="primary" shape="circle" icon={<PlusOutlined />} />
                  <p>0</p>
                  <Button type="primary" shape="circle" icon={<MinusOutlined />} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button size="large" type="primary">
              Проверить свободные
            </Button>
          </div>
        </div>
      </Card>
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

export default FrontdeskCreate;
