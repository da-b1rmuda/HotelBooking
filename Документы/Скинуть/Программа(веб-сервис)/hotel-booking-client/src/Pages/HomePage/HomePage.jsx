import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import {
  HomeOutlined,
  EditOutlined,
  AuditOutlined,
  AppstoreOutlined,
  FireOutlined,
  DollarOutlined,
  ControlOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, message, Avatar, Dropdown, Divider } from 'antd';
import { ContextBooking } from '../../context/booking.context';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFacilityAction,
  getStatusAction,
  getTypeAction,
  getStatusDealAction,
  getCancelPolicyAction,
  getStatusGuestAction,
  getStatusGuestRoomAction,
} from '../../store/actions/additionalsAction';
import Loading from '../../components/Loading/Loading';
import {
  LoadingAction,
  logoutAction,
  resetMessagesAction,
  userGetAction,
} from '../../store/actions/userAction';
import { isEmpty, firstLetterNameUser } from '../../services/functionService';
import { userLogout } from '../../store/reducers/userReducer';
import { guestsGetAction } from '../../store/actions/bookingAction';
import { roomGetAction } from '../../store/actions/roomAction';
import { dealGetAction } from '../../store/actions/dealAction';
import { rateGetAction } from '../../store/actions/rateAction';

const { Header, Content, Footer, Sider } = Layout;
const { useToken } = theme;

const HomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { isAuth, isLoading, success, userInfo } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(userGetAction());
    setUser(JSON.parse(localStorage.getItem('userInfo')));
    dispatch(LoadingAction(true));
  }, []);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userInfo')));
    setLoad(true);
  }, [isAuth]);

  useEffect(() => {
    if (!load) return;
    if (user === undefined || user === null || Object.keys(user).length === 0) {
      navigation('/login');
    } else {
      navigation('/overview');
      dispatch(getStatusAction());
      dispatch(getFacilityAction());
      dispatch(getTypeAction());
      dispatch(getStatusDealAction());
      dispatch(getCancelPolicyAction());
      dispatch(guestsGetAction());
      dispatch(roomGetAction());
      dispatch(dealGetAction());
      dispatch(rateGetAction());
      dispatch(getStatusGuestAction());
      dispatch(getStatusGuestRoomAction());
    }

    dispatch(LoadingAction(false));
  }, [user]);

  //
  // Notification
  //
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!isEmpty(success)) {
      dispatch(resetMessagesAction());
      messageSuccess(success);
    }
    // eslint-disable-next-line
  }, [success]);

  const messageSuccess = (text) => {
    messageApi.open({
      type: 'success',
      content: text,
    });
  };

  //
  // Menu
  //
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const { themeMenu } = useContext(ContextBooking);

  const items = [
    getItem('Обзор', 'overview', <HomeOutlined />),
    getItem('Оформление', 'frontdesk', <EditOutlined />),
    getItem('Гости', 'guest', <AuditOutlined />),
    getItem('Комнаты', 'rooms', <AppstoreOutlined />),
    getItem('Акции', 'deal', <FireOutlined />),
    getItem('Расценки', 'rate', <DollarOutlined />),
    // getItem('Дополнительно', 'advanced', <ControlOutlined />),
  ];

  //
  // Menu item click
  //
  const navigation = useNavigate();
  const onMenuItemClick = (e) => {
    navigation(`/${e.key}`);
  };

  //
  // Collapsed menu
  //
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //
  // Load data additional table
  //

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  const onClick = ({ key }) => {
    if (key === 'exit') {
      dispatch(logoutAction());
      navigation('/login');
      messageSuccess('Вы успешно вышли из аккаунта');
    }
  };

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={{ background: themeMenu === 'light' ? 'white' : '' }} collapsed={collapsed}>
            <div className="d-f ai-c jc-c">
              <img src="/image/logo.png" alt="logo" style={{ width: '7vh' }} />
              <div
                className="loginPage__logo"
                style={collapsed ? { display: 'none' } : { display: 'block' }}>
                <p style={{ fontSize: '3.5vh' }}>BHotel</p>
              </div>
            </div>
            <Menu
              onClick={onMenuItemClick}
              theme={themeMenu}
              defaultSelectedKeys={['overview']}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <div className="d-f jc-sb ai-c" style={{ padding: '0 2vh 0 0' }}>
                <Button type="primary" onClick={toggleCollapsed} style={{ marginLeft: 16 }}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <div>
                  <p>Добро пожаловать, {user?.login}!</p>
                </div>
                <Dropdown
                  menu={{
                    items: [
                      getItem('Профиль', 'profile', <UserOutlined />),
                      getItem('Выйти из аккаунта', 'exit', <LogoutOutlined />),
                    ],
                    onClick,
                  }}
                  dropdownRender={(menu) => (
                    <div style={contentStyle}>
                      <div style={{ padding: '1vh 2vh' }}>
                        <div className="userInfo-dropdown">
                          <span>Логин: </span>
                          <span> {user?.login}</span>
                        </div>
                        <div className="userInfo-dropdown">
                          <span>Роль: </span>
                          <span> {user?.role}</span>
                        </div>
                      </div>
                      <Divider style={{ margin: 0 }} />
                      {React.cloneElement(menu, {
                        style: menuStyle,
                      })}
                    </div>
                  )}
                  trigger={['click']}>
                  <Avatar
                    shape="square"
                    size="large"
                    style={{ backgroundColor: '#3B92FF', cursor: 'pointer' }}>
                    <p className="userName noselect">{firstLetterNameUser(user?.login)}</p>
                  </Avatar>
                </Dropdown>
              </div>
            </Header> 

            <Content style={{ margin: '16px' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}>
                <Outlet />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              ДИТИ НИЯУ МИФИ ©2023 Сделано Мясниковым Денисом
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
