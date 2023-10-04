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
} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { ContextBooking } from '../../context/booking.context';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFacilityAction,
  getStatusAction,
  getTypeAction,
  getStatusDealAction,
} from '../../store/actions/additionalsAction';
const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    getItem('Обзор', '', <HomeOutlined />),
    getItem('Оформление', 'frontdesk', <EditOutlined />),
    getItem('Гости', 'guest', <AuditOutlined />),
    getItem('Комнаты', 'rooms', <AppstoreOutlined />),
    getItem('Акции', 'deal', <FireOutlined />),
    getItem('Расценки', 'rate', <DollarOutlined />),
    getItem('Дополнительно', 'advanced', <ControlOutlined />),
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatusAction());
    dispatch(getFacilityAction());
    dispatch(getTypeAction());
    dispatch(getStatusDealAction());
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: themeMenu === 'light' ? 'white' : '' }} collapsed={collapsed}>
        <Menu
          onClick={onMenuItemClick}
          theme={themeMenu}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16, marginLeft: 16 }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
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
  );
};

export default HomePage;
