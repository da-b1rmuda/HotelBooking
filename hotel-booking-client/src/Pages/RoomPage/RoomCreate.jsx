import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Select, Spin, Transfer, message, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessagesAction, roomCreateAction } from '../../store/actions/roomAction';

import './Room.css';

const RoomCreate = (props) => {
  //Notification
  const [messageApi, contextHolder] = message.useMessage();

  //Transfer
  const [mockData, setMockData] = useState([]);
  //Selected fields
  const [targetKeys, setTargetKeys] = useState([]);

  //Room fields
  const [floorRoom, setFloorRoom] = useState();
  const [statusRoom, setStatusRoom] = useState();
  const [typeRoom, setTypeRoom] = useState();
  const [numberRoom, setNumberRoom] = useState();

  //State
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.roomStore);

  //
  // Transfer code
  //
  const getMock = () => {
    const mockData = [
      {
        key: "0f0679ee-dc18-4191-994f-356142630cb7",
        title: 'wi-fi',
        description: 'description',
      },
      {
        key: "aa837dfe-fa76-4051-9b8f-d6e6bc601ee7",
        title: 'Холодильник',
        description: 'description',
      },
      {
        key: "f4767ec1-8558-4e42-8fe6-137d61ad3f27",
        title: 'Ванна',
        description: 'description',
      },
    ];
    const initialTargetKeys = mockData
      .filter((item) => Number(item.key) > 10)
      .map((item) => item.key);
    setMockData(mockData);
    setTargetKeys(initialTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    console.log(newTargetKeys)
  };

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  //
  // Loading
  //
  const LoadingPage = () => {
    return (
      <div className="loading-container">
        <div className="d-f df-center-screen">
          <Spin />
        </div>
      </div>
    );
  };

  //
  // Notification
  //
  useEffect(() => {
    if (!isEmpty(success)) {
      successCreateRoom();
      dispatch(resetMessagesAction());
      setFloorRoom();
      setFloorRoom();
      setStatusRoom();
    }
    if (!isEmpty(error)) {
      errorCreateRoom(error);
    }
  // eslint-disable-next-line
  }, [error, success]);

  const successCreateRoom = (success) => {
    messageApi.open({
      type: 'success',
      content: 'Комната успешно создана',
    });
  };

  const errorCreateRoom = (error) => {
    console.log(error)
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  const errorEmptyField = () => {
    messageApi.open({
      type: 'error',
      content: 'Не все поля заполнены',
    });
  };

  //
  // Create room button
  //
  const isEmpty = (value) => {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    return false;
  };
  const onCreateRoom = () => {
    if (isEmpty(typeRoom) || isEmpty(floorRoom) || isEmpty(statusRoom) || isEmpty(numberRoom)) {
      errorEmptyField();
    } else {
      dispatch(roomCreateAction(typeRoom, floorRoom, statusRoom, numberRoom, targetKeys));
    }
  };

  return (
    <>
      {contextHolder}
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => props.setOnCreateRoom(true)}>
        Назад
      </Button>
      <Row gutter={20}>
        <Col span={5}>
          <Card title="Этаж комнаты" bordered={true}>
            <Select
              placeholder="Выберите этаж..."
              style={{ width: 160 }}
              options={[
                { value: '1', label: '1 Этаж' },
                { value: '2', label: '2 Этаж' },
                { value: '3', label: '3 Этаж' },
                { value: '4', label: '4 Этаж' },
                { value: '5', label: '5 Этаж' },
              ]}
              onChange={(e) => setFloorRoom(e)}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Статус комнаты" bordered={true}>
            <Select
              placeholder="Выберите статус..."
              style={{ width: 220 }}
              options={[
                { value: '024e26c7-5e33-4f35-a88e-e6f5c9322e02', label: 'Доступно' },
                { value: '91128392-8f10-4cde-9684-0148536f9a1b', label: 'Забронировано' },
                { value: '5e6c8c25-5492-447c-9c2b-eb1fe1a2a208', label: 'Заселено' },
                { value: 'c6d79c91-1ffa-4cd2-a1d2-d352914e82e2', label: 'Ожидание' },
                { value: 'b4cc08c0-0c4b-4d81-ad4e-475e816d08e6', label: 'Заблокировано' },
              ]}
              onChange={(e) => setStatusRoom(e)}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Тип комнаты" bordered={true}>
            <Select
              placeholder="Выберите тип..."
              style={{ width: 220 }}
              options={[
                { value: '34b88687-dac5-40ac-9bf5-27e83ae1d590', label: 'Односпальная комната' },
                { value: '7d500222-3191-46f5-9978-e35e67624a14', label: 'Двуспальная комната' },
                { value: '87defdd3-016b-450f-8155-bfd43d8a2edf', label: 'VIP комната' },
              ]}
              onChange={(e) => setTypeRoom(e)}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Номер комнаты" bordered={true}>
            <InputNumber
              min={100}
              max={999}
              placeholder="Введите номер комнаты..."
              value={numberRoom}
              onChange={(e) => setNumberRoom(e)}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Удобства" bordered={true}>
            <Transfer
              dataSource={mockData}
              filterOption={filterOption}
              targetKeys={targetKeys}
              onChange={handleChange}
              onSearch={handleSearch}
              render={(item) => item.title}
            />
          </Card>
        </Col>
      </Row>
      <Button type="primary" onClick={() => onCreateRoom()}>
        Создать
      </Button>

      {isLoading && <LoadingPage />}
    </>
  );
};

export default RoomCreate;
