import React, { useState, useEffect } from 'react';
import { MoreOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Radio, Table, Tag, Space, Dropdown, message, Modal, Input } from 'antd';
import './DealPage.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetMessagesAction,
  dealDeleteAction,
  dealGetAction,
} from '../../store/actions/dealAction';
import Loading from '../../components/Loading/Loading';
import {
  isEmpty,
  getColorTag,
  getConvertedDate,
  getListFilter,
} from '../../services/functionService';
import DealInfoModal from './DealInfoModal';
import DealCreate from './DealCreate';

const DealPage = () => {
  //
  // Load data
  //
  const { deal, isLoading, error, success } = useSelector((state) => state.dealStore);
  const { statusDeal, typeRoom } = useSelector((state) => state.additionalsStore);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dealGetAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setCount();
    loadData();
    // eslint-disable-next-line
  }, [deal]);
  const loadData = () => {
    // setCount();
    let tempData = [];
    if (deal.length !== 0) {
      // eslint-disable-next-line
      deal.map((item, key) => {
        tempData.push({
          key: item.id_deal,
          deal_name: item?.deal_name,
          deal_number: '#' + item?.deal_number,
          discount: item?.discount,
          description: item?.description,
          start_date: getConvertedDate(item?.start_date),
          end_date: getConvertedDate(item?.end_date),
          id_deal: item?.id_deal,
          room_type: item?.room_type,
          id_room_type: item?.id_room_type,
          status_deal: item?.status_deal,
          reservation_left: item?.reservation_left,
        });
      });
      setData(tempData);
    }
  };

  //
  // Filters
  //
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const clearFilters = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setDealSoonFilter = () => {
    setFilteredInfo({
      status: ['Скоро'],
    });
  };
  const setDealNewFilter = () => {
    setFilteredInfo({
      status: ['Новая'],
    });
  };
  const setDealActiveFilter = () => {
    setFilteredInfo({
      status: ['Активная'],
    });
  };
  const setDealInactiveFilter = () => {
    setFilteredInfo({
      status: ['Закончилась', 'Максимум', 'Неактивно'],
    });
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //
  // Initial column
  //
  const [selectedRow, setSelectedRow] = useState();
  const columns = [
    {
      title: '№ Акции',
      dataIndex: 'deal_number',
      key: 'deal_number',
      render: (text) => <h3>{text}</h3>,

      sorter: (a, b) => a.deal_number.substring(1) - b.deal_number.substring(1),
    },
    {
      title: 'Название',
      dataIndex: 'deal_name',
      key: 'deal_name',

      sorter: (a, b) => a.deal_name.length - b.deal_name.length,
    },
    {
      title: 'Осталось использований',
      dataIndex: 'reservation_left',
      key: 'reservation_left',

      sorter: (a, b) => a.reservation_left - b.reservation_left,
    },
    {
      title: 'Дата начала',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Дата окончания',
      dataIndex: 'end_date',
      key: 'end_date',

      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.room_type).toLowerCase().includes(value.toLowerCase()) ||
        String(record.deal_number).toLowerCase().includes(value.toLowerCase()) ||
        String(record.deal_name).toLowerCase().includes(value.toLowerCase()) ||
        String(record.start_date).toLowerCase().includes(value.toLowerCase()) ||
        String(record.end_date).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Тип  комнаты',
      dataIndex: 'room_type',
      key: 'room_type',

      filters: getListFilter(typeRoom, 'room_type'),
      filteredValue: filteredInfo.room_type,
      onFilter: (value, record) => record.room_type.includes(value),
    },
    {
      title: 'Статус',
      dataIndex: ' status_deal',
      key: ' status_deal',
      filters: getListFilter(statusDeal, 'status_deal'),
      render: (_, { status_deal }) => (
        <Tag color={getColorTag(status_deal, 'status_deal', statusDeal)}>{status_deal}</Tag>
      ),
      filteredValue: filteredInfo.status,
      filterIcon: <svg width={1} height={1}></svg>,
      onFilter: (value, record) => record.status_deal.includes(value),
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
  // Notification
  //
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!isEmpty(success)) {
      successCreateDeal(success);
      dispatch(dealGetAction());
      dispatch(resetMessagesAction());
    } else if (!isEmpty(error)) {
      errorCreateDeal(error);
      dispatch(resetMessagesAction());
    }
    // eslint-disable-next-line
  }, [success, error]);
  const successCreateDeal = (success) => {
    messageApi.open({
      type: 'success',
      content: success,
    });
  };
  const errorCreateDeal = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  //
  // Edit / Create deal
  //
  const [onCreateDeal, setOnCreateDeal] = useState(true);
  const [onEditDeal, setOnEditDeal] = useState(false);
  const contentView = onCreateDeal ? (
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
    <DealCreate
      setOnCreateDeal={setOnCreateDeal}
      editRow={selectedRow}
      setOnEditDeal={setOnEditDeal}
      onEditDeal={onEditDeal}
    />
  );

  //
  // Dropdown menu
  //
  const items = [
    {
      label: 'Информация',
      key: 'info',
    },
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
      setOnCreateDeal(false);
      setOnEditDeal(true);
    }
    if (key === 'info') {
      setIsModalOpen(true);
    }
  };

  //
  // Delete row
  //
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы уверены, что хотите удалить акцию?',
      icon: <ExclamationCircleFilled />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(dealDeleteAction(selectedRow));
      },
    });
  };

  //
  //  Set count rooms
  //
  const [dataCount, setDataCount] = useState({
    dealCount: 0,
    dealSoon: 0,
    dealNew: 0,
    dealActive: 0,
    dealInactive: 0,
  });
  const setCount = () => {
    let dealSoon = 0;
    let dealNew = 0;
    let dealActive = 0;
    let dealInactive = 0;
    // eslint-disable-next-line
    deal.map((item) => {
      switch (item.status_deal) {
        case 'Скоро':
          dealSoon++;
          break;
        case 'Новая':
          dealNew++;
          break;
        case 'Активная':
          dealActive++;
          break;
        default:
          dealInactive++;
          break;
      }
    });
    setDataCount({
      ...dataCount,
      dealCount: deal.length,
      dealSoon: dealSoon,
      dealNew: dealNew,
      dealActive: dealActive,
      dealInactive: dealInactive,
    });
  };

  //
  // Modal info deal
  //
  const [isModalInfoOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {contextHolder}
      {onCreateDeal ? (
        <>
          <h2>Акции</h2>
          <div className="d-f jc-sb flex-center">
            <div className="d-f jc-sb mt-10">
              <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a" onClick={() => clearFilters()}>
                  Все акции {'(' + dataCount.dealCount + ')'}
                </Radio.Button>
                <Radio.Button value="b" onClick={() => setDealSoonFilter()}>
                  Скоро {'(' + dataCount.dealSoon + ')'}
                </Radio.Button>
                <Radio.Button value="c" onClick={() => setDealNewFilter()}>
                  Новая {'(' + dataCount.dealNew + ')'}
                </Radio.Button>
                <Radio.Button value="d" onClick={() => setDealActiveFilter()}>
                  Активные {'(' + dataCount.dealActive + ')'}
                </Radio.Button>
                <Radio.Button value="e" onClick={() => setDealInactiveFilter()}>
                  Неактивные {'(' + dataCount.dealInactive + ')'}
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className="d-f">
              <div className="m-r-2">
                <Input.Search
                  size={'large'}
                  placeholder="Поиск..."
                  onSearch={(value) => {
                    setSearchText(value);
                  }}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                {console.log(searchText)}
              </div>
              <Button type={'primary'} size={'large'} onClick={() => setOnCreateDeal(false)}>
                Добавить акцию
              </Button>
            </div>
          </div>
        </>
      ) : null}
      {contentView}
      <DealInfoModal
        isModalInfoOpen={isModalInfoOpen}
        setIsModalOpen={setIsModalOpen}
        deal={data}
        selectedRow={selectedRow}
      />
      {isLoading && <Loading />}
    </>
  );
};

export default DealPage;
