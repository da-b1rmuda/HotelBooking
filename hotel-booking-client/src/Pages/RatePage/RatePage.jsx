import React, { useState, useEffect } from 'react';
import { FilterOutlined, MoreOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Table, Tag, Space, Dropdown, Tooltip, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetMessagesAction,
  rateDeleteAction,
  rateGetAction,
} from '../../store/actions/rateAction';
import { dealGetAction } from '../../store/actions/dealAction';
import Loading from '../../components/Loading/Loading';
import { isEmpty, getColorTag, getEndingWords } from '../../services/functionService';
import './RatePage.css';
import RateCreate from './RateCreate';
import { roomGetAction } from '../../store/actions/roomAction';

const RatePage = () => {
  // #region Load data
  const {
    rate,
    isLoading: LoadingRate,
    error: ErrorRate,
    success: SuccessRate,
  } = useSelector((state) => state.rateStore);
  const {
    room,
    isLoading: LoadingRoom,
    error: ErrorRoom,
    success: SuccessRoom,
  } = useSelector((state) => state.roomStore);

  const { cancelPolicy } = useSelector((state) => state.additionalsStore);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rateGetAction());
    dispatch(dealGetAction());
    dispatch(roomGetAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // setCount();
    loadData();
    // eslint-disable-next-line
  }, [rate, room]);
  const loadData = () => {
    // setCount();
    let tempData = [];
    if (rate.length !== 0) {
      // eslint-disable-next-line
      rate.map((item, key) => {
        if (item.id_deal === null) {
          tempData.push({
            key: key,
            id_rate: item.id_rate,
            rate: item?.rate,
            room_type: item?.room_type,
            id_room_type: item?.id_room_type,
            cancellation_policy: item?.cancellation_policy,
            id_cancellation_policy: item?.id_cancellation_policy,
            id_deal: item?.id_deal,
            deal_name: item?.deal_name !== null ? item?.deal_name : '-',
            discount: item?.discount,
            rate_to_discount:
              item?.discount !== null ? item?.rate - (item?.rate * item?.discount) / 100 : '-',
            description: item?.description,
            reservation_left: item?.reservation_left,
            id_status_deal: item?.id_status_deal,
            children: [],
            available: setCountRoom(item?.room_type),
          });
        }
      });
      rate.map((item, key) => {
        for (let i = 0; i < tempData.length; i++) {
          if (tempData[i].room_type === item.room_type && item.id_deal !== null) {
            tempData[i].children.push({
              key: key,
              id_rate: item.id_rate,
              rate: item?.rate,
              room_type: item?.room_type,
              id_room_type: item?.id_room_type,
              cancellation_policy: item?.cancellation_policy,
              id_cancellation_policy: item?.id_cancellation_policy,
              id_deal: item?.id_deal,
              deal_name: item?.deal_name !== null ? item?.deal_name : '-',
              discount: item?.discount,
              rate_to_discount:
                item?.discount !== null ? item?.rate - (item?.rate * item?.discount) / 100 : '-',
              description: item?.description,
              reservation_left: item?.reservation_left,
              id_status_deal: item?.id_status_deal,
            });
          }
        }
      });
    }
    setData(tempData);
  };
  // #endregion

  // #region Set count room left
  const setCountRoom = (room_type) => {
    let count = 0;
    room.map((item, _) => {
      if (item.room_type === room_type && item.status === 'Доступно') {
        count++;
      }
    });
    return count;
  };
  // #endregion

  const [selectedRow, setSelectedRow] = useState();
  const columns = [
    {
      title: 'Тип комнаты',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Акция',
      dataIndex: 'deal_name',
      key: 'deal_name',
    },
    {
      title: 'Политика отмены',
      dataIndex: 'cancellation_policy',
      key: 'cancellation_policy',
      render: (_, { cancellation_policy }) => (
        <Tag color={getColorTag(cancellation_policy, 'cancellation_policy', cancelPolicy)}>
          {cancellation_policy}
        </Tag>
      ),
    },
    {
      title: 'Цена по акции',
      dataIndex: 'rate_to_discount',
      key: 'rate_to_discount',
      render: (_, { rate_to_discount, discount }) =>
        rate_to_discount !== '-' ? (
          <>
            <Tag color={'green'}>{rate_to_discount} руб.</Tag>
            <Tag color={'volcano'}>-{discount}%</Tag>
          </>
        ) : (
          rate_to_discount
        ),
    },
    {
      title: 'Цена',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Доступные комнаты',
      dataIndex: 'available',
      key: 'available',
      // filters: loadFilter(),
      render: (_, { available }) =>
        available !== undefined ? (
          <Tag color={getColorAvailable(available)}>
            {available} {getEndingWords(available)}
          </Tag>
        ) : null,
      // filteredValue: filteredInfo.status || null,
      // onFilter: (value, record) => record.status.includes(value),
      // filterIcon: <svg width={1} height={1}></svg>,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="large">
          <Dropdown menu={{ items, onClick, record }} trigger={['click']}>
            <Space>
              <Button
                onClick={() => setSelectedRow(record.id_rate)}
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Space>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const getColorAvailable = (available) => {
    let color;
    if (available === 0 || available === 1) {
      color = 'red';
    } else if (available > 1 && available <= 10) {
      color = 'orange';
    } else {
      color = 'blue';
    }
    return color;
  };

  // #region Notification
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!isEmpty(SuccessRate)) {
      successCreateRate(SuccessRate);
      dispatch(rateGetAction());
      dispatch(resetMessagesAction());
    } else if (!isEmpty(ErrorRate)) {
      errorCreateRate(ErrorRate);
      dispatch(resetMessagesAction());
    }
    // eslint-disable-next-line
  }, [SuccessRate, ErrorRate]);
  const successCreateRate = (success) => {
    messageApi.open({
      type: 'success',
      content: success,
    });
  };
  const errorCreateRate = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };
  // #endregion

  // #region Delete row
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы уверены, что хотите удалить расценку?',
      icon: <ExclamationCircleFilled />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(rateDeleteAction(selectedRow));
      },
    });
  };
  // #endregion

  // #region Edit / Create deal
  const [onCreateRate, setOnCreateRate] = useState(true);
  const [onEditRate, setOnEditRate] = useState(false);
  const contentView = onCreateRate ? (
    <Table
      pagination={{
        pageSize: 6,
      }}
      style={{ marginTop: '10px' }}
      columns={columns}
      dataSource={isEmpty(data) ? [] : data}
      // onChange={handleChange}
    />
  ) : (
    <RateCreate
      setOnCreateRate={setOnCreateRate}
      onEditRate={onEditRate}
      setOnEditRate={setOnEditRate}
      editRow={selectedRow}
      data={data}
    />
  );
  // #endregion

  // #region Dropdown menu
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
      for (let i = 0; i < data.length; i++) {
        if (data[i].id_rate === selectedRow) {
          setOnCreateRate(false);
          setOnEditRate(true);
          return;
        }
      }
    }
  };
  // #endregion

  // #region Show clue for cancellation policy
  const Clue = () => {
    return cancelPolicy.map((item, _) => {
      return (
        <>
          <Tooltip title={item.description}>
            <Tag color={getColorTag(item.cancellation_policy, 'cancellation_policy', cancelPolicy)}>
              {item.cancellation_policy}
            </Tag>
          </Tooltip>
        </>
      );
    });
  };
  // #endregion

  return (
    <>
      {contextHolder}
      {onCreateRate ? (
        <>
          <h2>Расценки</h2>
          <div className="d-f jc-sb">
            <div className="clue-rate-container">
              <p>Наведись для подсказки</p>
              <div className="clue-rate">
                <Clue />
              </div>
            </div>
            <div className="d-f ai-c">
              <div className="m-r-2">
                <Button type={'primary'} size={'large'} onClick={() => setOnCreateRate(false)}>
                  Добавить расценку
                </Button>
              </div>
              <Button size={'large'} icon={<FilterOutlined />}>
                Фильтр
              </Button>
            </div>
          </div>
        </>
      ) : null}
      {contentView}
      {LoadingRate && <Loading />}
    </>
  );
};

export default RatePage;
