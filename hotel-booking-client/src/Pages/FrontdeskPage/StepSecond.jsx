import React from 'react';
import { Card, Input, Button, Descriptions, Tag } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const StepSecond = ({ dataBooking, setDataBooking, onChangeStep, selectedRoom, filterRate }) => {
  const setDiscountRate = (item) => {
    if (item.discount !== null) {
      return item.rate - (item.rate / 100) * item.discount;
    } else {
      return item.rate;
    }
  };
  const items = [
    {
      key: '1',
      label: 'Номер комнаты',
      children: selectedRoom.room_number,
    },
    {
      key: '2',
      label: 'Тип комнаты',
      children: selectedRoom.room_type,
    },
    {
      key: '3',
      label: 'Этаж',
      children: selectedRoom.room_floor,
    },
    {
      key: '5',
      label: 'Цена номера за сутки',
      children: (
        <Tag color={dataBooking.rate.discount !== null ? 'green' : 'blue'}>
          {setDiscountRate(dataBooking.rate) + ' руб.'}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Card style={{ marginBottom: '2vh', marginTop: '2vh' }}>
        <Descriptions title="Выбранный номер" items={items} style={{ fontSize: '2vh' }} />
      </Card>
      <Card>
        <div className="d-f jc-sb w50p g3 inputs_fd" style={{ marginBottom: '2vh' }}>
          <div>
            <span style={{ fontSize: '2vh' }}>Имя</span>
            <Input
              showCount
              placeholder="Введите имя..."
              maxLength={50}
              value={dataBooking.firstName}
              onChange={(e) => setDataBooking({ ...dataBooking, firstName: e.target.value })}
            />
          </div>
          <div>
            <span style={{ fontSize: '2vh' }}>Фамилия</span>
            <Input
              showCount
              placeholder="Введите фамилию..."
              maxLength={50}
              value={dataBooking.lastName}
              onChange={(e) => setDataBooking({ ...dataBooking, lastName: e.target.value })}
            />
          </div>
          <div>
            <span style={{ fontSize: '2vh' }}>Отчество</span>
            <Input
              showCount
              placeholder="Введите отчество..."
              maxLength={50}
              value={dataBooking.surname}
              onChange={(e) => setDataBooking({ ...dataBooking, surname: e.target.value })}
            />
          </div>
        </div>
        <div className="d-f jc-sb w50p g3 inputs_fd">
          <div>
            <span style={{ fontSize: '2vh' }}>Телефон</span>
            <Input
              placeholder="Введите номер телефона..."
              prefix={'+7'}
              maxLength={11}
              value={dataBooking.number}
              onChange={(e) => setDataBooking({ ...dataBooking, number: e.target.value })}
            />
          </div>
          <div>
            <span style={{ fontSize: '2vh' }}>Почта</span>
            <Input
              showCount
              placeholder="Введите почту..."
              maxLength={50}
              value={dataBooking.email}
              onChange={(e) => setDataBooking({ ...dataBooking, email: e.target.value })}
            />
          </div>
        </div>
      </Card>
      <div style={{ marginTop: '3vh', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => onChangeStep(0)} icon={<ArrowLeftOutlined />}>
          Назад
        </Button>
        <Button type="primary" onClick={() => onChangeStep(2)}>
          Далее <ArrowRightOutlined />
        </Button>
      </div>
    </>
  );
};

export default StepSecond;
