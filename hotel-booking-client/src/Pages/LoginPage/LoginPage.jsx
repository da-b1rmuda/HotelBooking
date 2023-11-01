import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="d-f jc-c ai-c" style={{ height: '100%' }}>
        <div className="loginPage__form">
          <div className="d-f ai-c jc-c">
            <img src="/image/logo.png" alt="logo" style={{ width: '10vh' }} />
            <div className="loginPage__logo">
              <p>BHotel</p>
            </div>
          </div>
          <div>
            <p>Добропожаловать в BHotel! </p>
            <p>Пожалуйста авторизуйтесь в ваш аккаунт и начинаете работать</p>
          </div>
          <div>
            <Input></Input>
            <Input></Input>
          </div>
          <div>
            <Checkbox></Checkbox>
          </div>
          <div>
            <Button></Button>
          </div>
          <div>
            <p>Нет аккаунта?</p>
            <span>Зарегестрироваться</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
