import React from 'react';
import { Card, Input, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const StepThird = ({ dataBooking, setDataBooking, onChangeStep }) => {
  return (
    <>
      <p>123</p>
      <div style={{ marginTop: '3vh', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => onChangeStep(1)} icon={<ArrowLeftOutlined />}>
          Назад
        </Button>
        <Button type="primary" onClick={() => console.log(dataBooking)}>
          Оформить
        </Button>
      </div>
    </>
  );
};

export default StepThird;
