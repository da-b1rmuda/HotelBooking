import React, { useState } from 'react';
import { DatePicker, Input, Button, Modal, InputNumber } from 'antd';
import './QuickBooking.css';

const { RangePicker } = DatePicker;

const QuickBooking = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('2 взрослых, 0 детей');
  const [inputAdult, setInputAdult] = useState(2);
  const [inputChild, setInputChild] = useState(0);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = (adult, children) => {
    setOpen(false);
    let value =
      adult +
      (adult === 1 ? ' взрослый, ' : ' взрослых, ') +
      children +
      (children === 1 ? ' ребенок' : children > 1 && children < 5 ? ' ребенка' : ' детей');
    setInputValue(value);
  };

  return (
    <div className="quickBooking-container">
      <div className="d-f jc-sb">
        <div className="quickBooking-text">
          <b>Бронирование номера</b>
          <p>Гарантированное засиление</p>
        </div>
        <RangePicker />
        <div>
          <Input
            size="large"
            readOnly={true}
            value={inputValue}
            onClick={() => showModal()}
          />
          <Modal
            open={open}
            title="Количество гостей"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={() => handleCancel()}>
                Отмена
              </Button>,
              <Button key="submit" type="primary" onClick={() => handleOk(inputAdult, inputChild)}>
                Готово
              </Button>,
            ]}>
            <hr />
            <div className="d-f">
              <div>
                <p>Взрослые</p>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={2}
                  value={inputAdult}
                  onChange={(e) => {
                    setInputAdult(e);
                  }}
                />
              </div>
              <div>
                <p>Дети (младше 13 лет)</p>
                <InputNumber
                  min={0}
                  max={10}
                  defaultValue={0}
                  value={inputChild}
                  onChange={(e) => {
                    setInputChild(e);
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default QuickBooking;
