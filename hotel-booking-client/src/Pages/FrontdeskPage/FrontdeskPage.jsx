import React, { useState } from 'react';
import { Divider, Button, Space, Table, Tag } from 'antd';
import './FrontdeskPage.css';
import CalendarComp from '../../components/Calendar/Calendar';
import FrontdeskCreate from './FrontdeskCreate';

const FrontdeskPage = () => {
  const [onCreateBooking, setOnCreateBooking] = useState(false);

  const onCreateBookingClick = () => {
    setOnCreateBooking(true);
  };
  return (
    <>
      {onCreateBooking ? (
        <FrontdeskCreate setOnCreateBooking={setOnCreateBooking} />
      ) : (
        <>
          <h2>Оформление</h2>
          <div className="headerFrontdesk">
            <div className="headerFrontdesk-tag">
              <Divider orientation="left" orientationMargin="0">
                Обозначения
              </Divider>
              <Space size={[0, 8]} wrap>
                <Tag color="orange" style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
                  Должен прибыть
                </Tag>
                <Tag color="red" style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
                  Должен выехать
                </Tag>
                <Tag color="green" style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
                  Прибыл
                </Tag>
                <Tag color="blue" style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
                  Выехал
                </Tag>
              </Space>
            </div>
            <div className="headerFrontdesk-create">
              <Button type="primary" onClick={() => onCreateBookingClick()}>
                Оформить комнату
              </Button>
            </div>
          </div>
          <CalendarComp />
        </>
      )}
    </>
  );
};

export default FrontdeskPage;
