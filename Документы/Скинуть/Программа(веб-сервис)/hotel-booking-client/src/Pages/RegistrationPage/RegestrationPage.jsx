import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './RegestrationPage.css';
import { userCreateAction } from '../../store/actions/userAction';
import Loading from '../../components/Loading/Loading';

const RegestrationPage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.userStore);

  const onFinish = (values) => {
    dispatch(userCreateAction(values.login, values.email, values.password));
    navigation('/login');
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="loginPage">
          <div className="d-f jc-c ai-c" style={{ height: '100%' }}>
            <div className="loginPage__form">
              <div className="d-f ai-c jc-c">
                <img src="/image/logo.png" alt="logo" style={{ width: '10vh' }} />
                <div className="loginPage__logo">
                  <p>BHotel</p>
                </div>
              </div>
              <div className="loginPage__text">
                <p className="d-f">
                  Приветствуем в команде BHotel!
                  <img
                    src="/image/hand.png"
                    alt="img"
                    style={{ width: '3vh', height: '3vh', marginLeft: '1vh' }}
                  />
                </p>
                <p>Зарегестрируйся и начинайте работать в нашей команде</p>
              </div>
              <Form
                size="large"
                name="normal_registration"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}>
                <Form.Item
                  name="login"
                  rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}>
                  <div className="login-form__float-input">
                    <label htmlFor="login">Логин</label>
                    <Input
                      placeholder="login123"
                      prefix={<UserOutlined style={{ marginRight: '1vh' }} />}
                      type="login"
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ type: 'email', required: true, message: 'Пожалуйста введите почту!' }]}>
                  <div className="login-form__float-input">
                    <label htmlFor="email">Почта</label>
                    <Input
                      placeholder="example@mail.ru"
                      prefix={<UserOutlined style={{ marginRight: '1vh' }} />}
                      type="email"
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}>
                  <div className="login-form__float-input">
                    <label htmlFor="login">Пароль</label>
                    <Input.Password
                      prefix={<LockOutlined style={{ marginRight: '1vh' }} />}
                      type="password"
                      placeholder="•••••••"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="Подтверждение пароля"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста введите пароль повторно!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают!'));
                      },
                    }),
                  ]}>
                  <div className="login-form__float-input">
                    <label htmlFor="login">Подтверждение пароль</label>
                    <Input.Password
                      prefix={<LockOutlined style={{ marginRight: '1vh' }} />}
                      type="password"
                      placeholder="•••••••"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Зарегистрироваться
                  </Button>
                  <div className="d-f jc-c" style={{ marginTop: '1vh' }}>
                    <span style={{ marginRight: '1vh' }}>Есть аккаунт?</span>
                    <a onClick={() => navigation('/login')}>Войти</a>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegestrationPage;
