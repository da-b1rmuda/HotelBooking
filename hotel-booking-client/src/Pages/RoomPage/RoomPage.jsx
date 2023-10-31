import React, { useState, useEffect } from 'react';
import { Radio, Button, Space, Table, Tag, message, Dropdown, Modal } from 'antd';
import { MoreOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { isEmpty, getColorTag } from '../../services/functionService';
import './Room.css';
import RoomCreate from './RoomCreate';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetMessagesAction,
  roomDeleteAction,
  roomGetAction,
} from '../../store/actions/roomAction';

const Room = () => {
  //
  // Load data
  //
  const { room, isLoading, error, success } = useSelector((state) => state.roomStore);
  const { statusRoom } = useSelector((state) => state.additionalsStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roomGetAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [room]);
  const [onCreateRoom, setOnCreateRoom] = useState(true);
  const [onEditRoom, setOnEditRoom] = useState(false);
  const [data, setData] = useState([]);

  const loadData = () => {
    setCount();
    let tempData = [];
    if (room.length !== 0) {
      // eslint-disable-next-line
      room.map((item) => {
        tempData.push({
          key: item.id_room,
          number_room: '#' + item?.room_number,
          floor: item?.room_floor,
          room_type: item?.room_type,
          facility: item?.facility,
          status: item?.status,
        });
      });
      setData(tempData);
    }
  };

  //
  //  Set count rooms
  //
  const [roomsCount, setRoomsCount] = useState(0);
  const [availableRoomsCount, setAvailableRoomsCount] = useState(0);
  const [unavailableDateRoomsCount, setUnavailableDateRoomsCount] = useState(0);
  const setCount = () => {
    setRoomsCount(room.length);
    let available = 0;
    let unavailable = 0;
    // eslint-disable-next-line
    room.map((item) => {
      if (item.status === 'Доступно') {
        available++;
      } else {
        unavailable++;
      }
    });
    setAvailableRoomsCount(available);
    setUnavailableDateRoomsCount(unavailable);
  };

  //
  // Notification
  //
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!isEmpty(success)) {
      successCreateRoom(success);
      dispatch(roomGetAction());
      dispatch(resetMessagesAction());
    } else if (!isEmpty(error)) {
      errorCreateRoom(error);
      dispatch(resetMessagesAction());
    }
    // eslint-disable-next-line
  }, [success, error]);
  const successCreateRoom = (success) => {
    messageApi.open({
      type: 'success',
      content: success,
    });
  };
  const errorCreateRoom = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  //
  // Schema table
  //
  const [selectedRow, setSelectedRow] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const loadFilter = () => {
    let tempFilter = [];
    // eslint-disable-next-line
    statusRoom.map((item) => {
      tempFilter.push({ text: item.status, value: item.status });
    });
    return tempFilter;
  };
  const columns = [
    {
      title: '№ Комнаты',
      dataIndex: 'number_room',
      key: 'number_room',
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: 'Тип комнаты',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Этаж',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Удобства',
      key: 'facility',
      dataIndex: 'facility',
      width: 450,
      render: (_, { facility }) => (
        <>
          {facility?.map((tag) => {
            return (
              <Tag color={'green'} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      filters: loadFilter(),
      render: (_, { status }) => (
        <Tag color={getColorTag(status, 'status', statusRoom)}>{status}</Tag>
      ),
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      filterIcon: <svg width={1} height={1}></svg>,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="large">
          <Dropdown menu={{ items, onClick, record }} trigger={['click']}>
            <Space>
              <Button
                onClick={() => setSelectedRow(record.key)}
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Space>
          </Dropdown>
        </Space>
      ),
    },
  ];

  //
  // Filters
  //
  const clearFilters = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAvailabilitySort = () => {
    setFilteredInfo({
      status: ['Доступно'],
    });
  };
  const setUnavailabilitySort = () => {
    let unavailableDate = [];
    // eslint-disable-next-line
    statusRoom.map((item) => {
      if (item.status !== 'Доступно') {
        unavailableDate.push(item.status);
      }
    });
    setFilteredInfo({
      status: unavailableDate,
    });
  };
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //
  // View table
  //
  const contentView = onCreateRoom ? (
    <Table
      pagination={{
        pageSize: 6,
      }}
      style={{ marginTop: '10px' }}
      columns={columns}
      dataSource={isEmpty(data) ? [] : data}
      onChange={handleChange}
    />
  ) : (
    <RoomCreate
      setOnCreateRoom={setOnCreateRoom}
      editRow={selectedRow}
      setOnEditRoom={setOnEditRoom}
      onEditRoom={onEditRoom}
    />
  );

  //
  // Dropdown menu
  //
  const items = [
    {
      label: 'Редактировать',
      key: 'edit',
    },
    {
      label: 'Удалить',
      key: 'delete',
    },
  ];
  const onClick = ({ key }) => {
    if (key === 'delete') {
      showDeleteConfirm();
    }
    if (key === 'edit') {
      setOnCreateRoom(false);
      setOnEditRoom(true);
    }
  };

  //
  // Delete row
  //
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы уверены, что хотите удалить комнату?',
      icon: <ExclamationCircleFilled />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(roomDeleteAction(selectedRow));
      },
    });
  };

  return (
    <>
      {contextHolder}
      {onCreateRoom ? (
        <>
          <h2>Комнаты</h2>
          <div className="d-f jc-sb mt-10">
            <Radio.Group defaultValue="a" size="large">
              <Radio.Button value="a" onClick={() => clearFilters()}>
                Все комнаты {'(' + roomsCount + ')'}
              </Radio.Button>
              <Radio.Button value="b" onClick={() => setAvailabilitySort()}>
                Свободные комнаты {'(' + availableRoomsCount + ')'}
              </Radio.Button>
              <Radio.Button value="c" onClick={() => setUnavailabilitySort()}>
                Занятые комнаты {'(' + unavailableDateRoomsCount + ')'}
              </Radio.Button>
            </Radio.Group>
            <Button size="large" type="primary" onClick={() => setOnCreateRoom(false)}>
              Добавить комнату
            </Button>
          </div>
        </>
      ) : null}
      {contentView}
      {isLoading && <Loading />}
    </>
  );
};

export default Room;
