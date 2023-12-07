import React, { useState } from 'react';
import { Card, Input, Button, Tag, Form } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const StepSecond = ({ dataBooking, setDataBooking, onChangeStep, selectedRoom, filterRate }) => {
  const setDiscountRate = (item) => {
    if (item.discount !== null) {
      return item.rate - (item.rate / 100) * item.discount;
    } else {
      return item.rate;
    }
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setDataBooking({
      ...dataBooking,
      firstName: values.name,
      lastName: values.surname,
      surname: values.fathername,
      email: values.email,
      number: values.phone,
    });
    onChangeStep(2);
  };
  const handleClick = () => {
    form.submit();
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  return (
    <>
      <div className="d-f jc-sb">
        <Card style={{ marginBottom: '2vh', marginTop: '2vh', width: '48%' }}>
          <p className="title-card-step-two">Выбранная комната</p>
          <div className="d-f fd-c jc-sb">
            <div style={{ paddingBottom: '15vh' }}>
              <div className="desc-block d-f">
                <p>Номер комнаты:ㅤ</p>
                <p>{selectedRoom.room_number}</p>
              </div>
              <div className="desc-block d-f">
                <p>Тип комнаты:ㅤ</p>
                <p>{selectedRoom.room_type}</p>
              </div>
              <div className="desc-block d-f">
                <p>Этаж:ㅤ</p>
                <p>{selectedRoom.room_floor}</p>
              </div>
            </div>
            <div>
              <div className="desc-block d-f">
                <p>Цена номера за сутки:ㅤ</p>
                <Tag color={dataBooking.rate.discount !== null ? 'green' : 'blue'}>
                  {setDiscountRate(dataBooking.rate) + ' руб.'}
                </Tag>
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ marginBottom: '2vh', marginTop: '2vh', width: '48%' }}>
          <p className="title-card-step-two">Контактная информация</p>
          <Form
            {...formItemLayout}
            form={form}
            className="form-card-step-two"
            name="basic"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}

            autoComplete="off"
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError>
            <Form.Item
              label="Имя"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите имя!',
                },
              ]}>
              <Input placeholder="Виктор" />
            </Form.Item>
            <Form.Item
              label="Фамилия"
              name="surname"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите фамилию!',
                },
              ]}>
              <Input placeholder="Антипов" />
            </Form.Item>
            <Form.Item
              label="Отчество"
              name="fathername"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите отчество!',
                },
              ]}>
              <Input placeholder="Александрович" />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Введена некорректная почта!',
                },
              ]}>
              <Input placeholder="example@mail.ru" />
            </Form.Item>
            <Form.Item
              label="Номер телефона"
              name="phone"
              rules={[{ required: true, message: 'Пожалуйста введите номер телефона!' }]}>
              <Input addonBefore={'+7'} style={{ width: '100%' }} placeholder="(908)-908-08-08" />
            </Form.Item>
          </Form>
        </Card>
      </div>
      <div style={{ marginTop: '3vh', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => onChangeStep(0)} icon={<ArrowLeftOutlined />}>
          Назад
        </Button>
        <Button type="primary" htmlType="submit" onClick={handleClick}>
          Далее <ArrowRightOutlined />
        </Button>
      </div>
    </>
  );
};

export default StepSecond;
