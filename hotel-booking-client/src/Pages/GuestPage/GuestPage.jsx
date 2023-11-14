import React, { useState, useEffect, useRef } from 'react';
import {
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  InfoCircleOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Button, Input, Radio, Table, Tag, Space, Dropdown, Tooltip, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  BookingDeleteAction,
  guestsGetAction,
  resetMessagesAction,
} from '../../store/actions/bookingAction';
import { getConvertedDate, getListFilter } from '../../services/functionService.js';
import './GuestPage.css';
import Loading from '../../components/Loading/Loading.jsx';

const GuestPage = () => {
  //
  // Load data
  //
  const { guests, isLoading, error, success } = useSelector((state) => state.bookingStore);
  const { statusGuestRoom, statusGuest } = useSelector((state) => state.additionalsStore);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(guestsGetAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [guests]);
  const loadData = () => {
    // setCount();
    let tempData = [];
    if (guests.length !== 0) {
      // eslint-disable-next-line
      guests.map((item, key) => {
        tempData.push({
          key: key,
          idGuest: item?.id_guest,
          statusGuest: item.status_guest,
          statusGuestRoom: item.status_guest_room,
          numberGuest: item?.number_guest,
          firstName: item?.first_name,
          lastName: item?.last_name,
          fatherName: item?.father_name,
          phoneNumber: item?.phone_number,
          email: item?.email,
          idBooking: item?.id_booking,
          arrivalDate: getConvertedDate(item?.arrival_date),
          departureDate: getConvertedDate(item?.departure_date),
          countAdults: item?.count_adults,
          countChildren: item?.count_children,
          amountPaid: item?.amount_paid,
          idRoom: item?.id_room,
          numberRoom: item?.room_number,
          roomFloor: item?.room_floor,
          idRoomStatus: item?.id_status,
          statusRoom: item?.status,
          colorSG: item.color_sg,
          colorSGR: item.color_sgr,
        });
      });
      setData(tempData);
    }
  };
  //serach
  const [searchText, setSearchText] = useState('');

  //
  // Notification
  //
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!isEmpty(success)) {
      successCreate(success);
      dispatch(guestsGetAction());
      dispatch(resetMessagesAction());
    } else if (!isEmpty(error)) {
      errorCreate(error);
      dispatch(resetMessagesAction());
    }
    // eslint-disable-next-line
  }, [success, error]);
  const successCreate = (success) => {
    messageApi.open({
      type: 'success',
      content: success,
    });
  };
  const errorCreate = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setGuestArrive = () => {
    console.log(filteredInfo)
    setFilteredInfo({
      status: ['Прибыл'],
    });
  };
  const setGuestReserved = () => {
    setFilteredInfo({
      status: ['Должен прибыть', 'Должен выехать', 'Выехал'],
    });
  };

  const [selectedRow, setSelectedRow] = useState();
  const [items, setItems] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData.role === 'admin') {
      setItems([
        {
          label: 'Удалить',
          key: 'delete',
        },
      ]);
    }
  }, []);
  let columnsGuest = [
    {
      title: '№ Бронирования',
      dataIndex: 'numberGuest',
      key: 'numberGuest',
      render: (text) => <h3>#{text}</h3>,
      sorter: (a, b) =>
        a.numberGuest.toString().substring(1) - b.numberGuest.toString().substring(1),
    },
    {
      title: 'Клиент',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (_, { firstName, lastName, fatherName }) => (
        <div className="d-f jc-sb">
          {lastName}
          <Tooltip
            title={lastName + ' ' + firstName + ' ' + fatherName}
            arrow={false}
            placement="left">
            <InfoCircleOutlined style={{ color: '#ABA09E', cursor: 'pointer' }} />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Номер комнаты',
      dataIndex: 'numberRoom',
      key: 'numberRoom',
      sorter: (a, b) => a.numberRoom - b.numberRoom,
    },
    {
      title: 'Общая сумма',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      render: (text) => <p>{text} руб.</p>,
      sorter: (a, b) => a.amountPaid - b.amountPaid,

      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.numberRoom).toLowerCase().includes(value.toLowerCase()) ||
        String(record.statusGuest).toLowerCase().includes(value.toLowerCase()) ||
        String(record.statusGuestRoom).toLowerCase().includes(value.toLowerCase()) ||
        String(record.lastName).toLowerCase().includes(value.toLowerCase()) ||
        String(record.firstName).toLowerCase().includes(value.toLowerCase()) ||
        String(record.fatherName).toLowerCase().includes(value.toLowerCase()) ||
        String(record.amountPaid).toLowerCase().includes(value.toLowerCase()) ||
        String(record.numberGuest).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Статус номера',
      dataIndex: 'statusGuestRoom',
      key: 'statusGuestRoom',
      render: (_, { statusGuestRoom, colorSGR }) => <Tag color={colorSGR}>{statusGuestRoom}</Tag>,

      filters: getListFilter(statusGuestRoom, 'status_guest_room'),
      filteredValue: filteredInfo.statusGuestRoom,
      onFilter: (value, record) => record.statusGuestRoom.includes(value),
    },
    {
      title: 'Статус гостя',
      dataIndex: 'statusGuest',
      key: 'statusGuest',
      render: (_, { statusGuest, colorSG }) => <Tag color={colorSG}>{statusGuest}</Tag>,

      filters: getListFilter(statusGuest, 'status_guest'),
      filteredValue: filteredInfo.status,
      filterIcon: <svg width={1} height={1}></svg>,
      onFilter: (value, record) => record.statusGuest.includes(value),
    },
    items.length > 0
      ? {
          title: '',
          key: 'action',
          render: (_, record) => (
            <Space size="large">
              <Dropdown menu={{ items, onClick, record }} trigger={['click']}>
                <Space>
                  <Button
                    onClick={() => setSelectedRow(record.idGuest)}
                    shape="circle"
                    icon={<MoreOutlined />}
                  />
                </Space>
              </Dropdown>
            </Space>
          ),
        }
      : {},
  ];

  const onClick = ({ key, items }) => {
    if (key === 'delete') {
      showDeleteConfirm();
    }
  };
  // Delete row
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы уверены, что хотите удалить гостя?',
      icon: <ExclamationCircleFilled />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(BookingDeleteAction(selectedRow));
      },
    });
  };

  //
  // Field is empty check
  //
  const isEmpty = (value) => {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    return false;
  };

  let ref = useRef(null);

  return (
    <>
      {contextHolder}
      {isLoading && <Loading />}
      <h2>Гости</h2>
      <div className="d-f jc-sb flex-center">
        <div className="d-f jc-sb mt-10">
          <Radio.Group defaultValue="a" size="large">
            <Radio.Button value="a" onClick={() => clearFilters()}>
              Все
            </Radio.Button>
            <Radio.Button value="b" onClick={() => setGuestArrive()}>
              Прибыли
            </Radio.Button>
            <Radio.Button value="c" onClick={() => setGuestReserved()}>
              Выехали
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="d-f">
          <Input
            size={'large'}
            style={{ width: '16vw' }}
            placeholder="Поиск..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <Table
        pagination={{
          pageSize: 6,
        }}
        style={{ marginTop: '10px' }}
        columns={columnsGuest}
        dataSource={isEmpty(data) ? [] : data}
        onChange={handleChange}
      />
    </>
  );
};

export default GuestPage;
