import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Card, Tag, Input, Table, Button } from 'antd';
import {
  FilePdfOutlined,
  AuditOutlined,
  AppstoreOutlined,
  FireOutlined,
  DollarOutlined,
  UserOutlined,
  SearchOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { getFullDate } from '../../services/functionService';
import './OverviewPage.css';
import ReactECharts from 'echarts-for-react';
import { optionVisitors, optionActivityGuest, optionAvailableRooms } from './optionsCharts';
import QuerysService from '../../services/querysService';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import ReactToPrint from 'react-to-print';
import { columnsGuests, columnsRoom, columnsRate, columnsDeal, columnsUsers } from './optionTables';

const OverviewPage = () => {
  const [queryData, setQueryData] = useState();
  const dispatch = useDispatch();

  const { guests, isLoading: loadGuests } = useSelector((state) => state.bookingStore);
  const { room, isLoading: loadRoom } = useSelector((state) => state.roomStore);
  const { deal, isLoading: loadDeal } = useSelector((state) => state.dealStore);
  const { rate, isLoading: loadRate } = useSelector((state) => state.rateStore);
  const { users, userInfo, isLoading: loadUsers } = useSelector((state) => state.userStore);

  let refGuests = useRef(null);
  let refRoom = useRef(null);
  let refDeal = useRef(null);
  let refRate = useRef(null);
  let refUsers = useRef(null);

  const [data, setData] = useState({
    userInfo: [],

    guestsData: [],
    roomData: [],
    dealData: [],
    rateData: [],
    usersData: [],
    revenuePerMonth: [],
    roomInformation: [],
    visitorsInThreeMonths: [],
    howManyArrivedAndHowManyLeft: [],
  });
  useEffect(() => {
    const querysOverview = async () => {
      let RevenuePerMonth = await QuerysService.getRevenuePerMonth();
      let RoomInformation = await QuerysService.getRoomInformation();
      let VisitorsInThreeMonths = await QuerysService.getVisitorsInThreeMonths();
      let HowManyArrived = await QuerysService.getHowManyArrived();
      let HowManyLeft = await QuerysService.getHowManyLeft();

      setData({
        ...data,
        userInfo: JSON.parse(localStorage.getItem('userInfo')),
        guestsData: guests,
        roomData: room,
        dealData: deal,
        rateData: rate,
        usersData: users,
        revenuePerMonth: RevenuePerMonth.data[0],
        roomInformation: RoomInformation.data[0],
        visitorsInThreeMonths: VisitorsInThreeMonths.data[0],
        HowManyArrived: HowManyArrived.data,
        HowManyLeft: HowManyLeft.data,
      });
    };
    querysOverview();
  }, [guests, room, deal, rate, users]);

  function numberWithSpaces(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function profitThenLastMonth(present, last) {
    if (present > last) {
      return '+' + (((present - last) / present) * 100).toFixed(1);
    } else {
      return '-' + (((last - present) / last) * 100).toFixed(1);
    }
  }

  const querysGet = async (query) => {
    if (query === 'MostExpensiveBooking') {
      let data = await QuerysService.getMostExpensiveBooking();
      setQueryData(
        `Клиент: ${
          data.data[0].last_name + ' ' + data.data[0].first_name + ' ' + data.data[0].father_name
        }, забронировал номер за ${data.data[0].amount_paid} руб.`,
      );
      return;
    }
    if (query === 'FrequentlySelectedRoomAllTime') {
      let data = await QuerysService.getFrequentlySelectedRoomAllTime();
      setQueryData(`Самый выбираемый номер за все время: #${data.data[0].room_number}`);
      return;
    }
    if (query === 'FrequentlySelectedRoomForMonth') {
      let data = await QuerysService.getFrequentlySelectedRoomForMonth();
      setQueryData(`Самый выбираемый номер за этот месяц: #${data.data[0].room_number}`);
      return;
    }
    if (query === 'AverageCheckPerDayThisMonth') {
      let data = await QuerysService.getAverageCheckPerDayThisMonth();
      setQueryData(`Средний чек за день в этом месяце: ${data.data[0].round} руб.`);
      return;
    }
    if (query === 'MostVisitedDay') {
      let data = await QuerysService.getMostVisitedDay();
      setQueryData(
        `Самый посещаемый день за все время: ${
          data.data[0].day + '.' + data.data[0].month + '.' + data.data[0].year
        } год.`,
      );
      return;
    }
  };

  return (
    <>
      {(loadGuests || loadUsers || loadRate || loadDeal || loadRoom) && <Loading />}
      <div>
        <div className="overview-day">
          <p style={{ fontSize: '2vh', paddingBottom: '3vh' }}>{getFullDate(dayjs())}</p>
        </div>
        <div className="overview-card__text">
          <Card style={{ marginBottom: '3vh' }}>
            <p>Обзор</p>
            <div className="d-f overview-card__overview">
              <div className="d-f">
                <div className="d-f" style={{ marginRight: '11vh' }}>
                  <div className="d-f ai-c">
                    <img src="image/1.png" alt="img" style={{ width: '8vh', height: '8vh' }} />
                  </div>
                  <div
                    className="overview-card__overview__text d-f fd-c jc-c"
                    style={{ paddingLeft: '2vh' }}>
                    <p>₽{numberWithSpaces(data.revenuePerMonth?.current_month)}</p>
                    <p>Выручка за месяц</p>
                  </div>
                </div>
                <div className="d-f">
                  <div>
                    <img src="image/plus.png" alt="img" style={{ width: '20vh' }} />
                  </div>
                  <div
                    className="overview-card__overview__text d-f fd-c jc-c"
                    style={{ paddingLeft: '2vh', width: '18vh' }}>
                    <p style={{ color: '#89D69D' }}>
                      {profitThenLastMonth(
                        data.revenuePerMonth?.current_month,
                        data.revenuePerMonth?.last_month,
                      )}
                      %
                    </p>
                    <p>
                      Чем в прошлом <br /> месяце
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="d-f jc-sb overview-card__overview__block"
                style={{ width: '100%', marginLeft: '6vh' }}>
                <div
                  className="d-f jc-sb ai-c"
                  style={{ backgroundColor: '#3B92FF', padding: '2vh' }}>
                  <div
                    className="overview-card__overview__block__text"
                    style={{ width: '100%', paddingLeft: '2vh' }}>
                    <p>{data.visitorsInThreeMonths?.count_guests}</p>
                    <p>Новых гостей</p>
                  </div>
                  <div>
                    <img src="image/2.png" alt="img" style={{ width: '8vh', height: '8vh' }} />
                  </div>
                </div>
                <div
                  className="d-f jc-sb ai-c"
                  style={{ backgroundColor: '#5571C9', padding: '2vh' }}>
                  <div
                    className="overview-card__overview__block__text"
                    style={{ width: '100%', paddingLeft: '2vh' }}>
                    <p>{data.roomInformation?.all_rooms}</p>
                    <p>Комнат</p>
                  </div>
                  <div>
                    <img src="image/3.png" alt="img" style={{ width: '8vh', height: '8vh' }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <div className="d-f overview-card__room__container">
            <Card style={{ width: '60%' }}>
              <div className="overview-card__room">
                <p style={{ marginBottom: '3vh' }}>Статистика комнат</p>
                <div className="d-f jc-sb status-room__text">
                  <div style={{ width: '45%' }}>
                    <div className="d-f fd-c status-room__list">
                      <div>
                        <p>Свободные комнаты ㅤㅤㅤㅤㅤ</p>
                        <Tag>
                          <p>{data.roomInformation?.available_room}</p>
                        </Tag>
                      </div>
                      <div>
                        <p>Чистые</p>
                        <Tag>
                          <p>{data.roomInformation?.count_clear_room_available}</p>
                        </Tag>
                      </div>
                      <div>
                        <p>Грязные</p>
                        <Tag>
                          <p>{data.roomInformation?.count_dirty_room_available}</p>
                        </Tag>
                      </div>
                      <div>
                        <p>Проверено</p>
                        <Tag>
                          <p>{data.roomInformation?.count_wating_room_available}</p>
                        </Tag>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '45%' }}>
                    <div className="d-f fd-c status-room__list">
                      <div>
                        <p>Забронированные комнаты</p>
                        <Tag>
                          <p>{data.roomInformation?.reserved_room}</p>
                        </Tag>
                      </div>
                      <div>
                        <p>Чистые</p>
                        <Tag>
                          <p>{data.roomInformation?.count_clear_room_reserved}</p>
                        </Tag>
                      </div>
                      <div>
                        <p>Грязные</p>
                        <Tag>
                          <p>{data.roomInformation?.count_dirty_room_reserved}</p>
                        </Tag>
                      </div>
                      <div>
                        <p>Проверено</p>
                        <Tag>
                          <p>{data.roomInformation?.count_wating_room_reserved}</p>
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card style={{ width: '36%' }}>
              <div className="overview-card__room">
                <div>
                  <p>Посетители</p>
                  <ReactECharts
                    option={optionVisitors(data.visitorsInThreeMonths)}
                    style={{ width: '90%', height: '30vh' }}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="d-f overview-card__room__container">
            <Card style={{ width: '68%', marginBottom: '3vh' }}>
              <div className="overview-card__guests">
                <p>Активность гостей</p>
                <ReactECharts option={optionActivityGuest(data.HowManyArrived, data.HowManyLeft)} />
              </div>
            </Card>
            <Card style={{ width: '28%', marginBottom: '3vh' }}>
              <div className="overview-card__guests">
                <p>Свободные комнаты</p>
                <ReactECharts option={optionAvailableRooms(data.roomInformation)} />
              </div>
            </Card>
          </div>
          {data.userInfo.role === 'admin' && (
            <>
              <div>
                <Card>
                  <p>
                    Вывод файлов в pdf <FilePdfOutlined />
                  </p>
                  <div className="d-f fd-r jc-sb pdfCard" style={{ marginTop: '1vh' }}>
                    <ReactToPrint
                      trigger={() => (
                        <Card hoverable style={{ backgroundColor: '#5571c9' }}>
                          <p>
                            Вывести таблицу Гости <AuditOutlined />
                          </p>
                        </Card>
                      )}
                      content={() => refGuests}
                    />
                    <ReactToPrint
                      trigger={() => (
                        <Card hoverable style={{ backgroundColor: '#5571c9' }}>
                          <p>
                            Вывести таблицу Комнаты <AppstoreOutlined />
                          </p>
                        </Card>
                      )}
                      content={() => refRoom}
                    />
                    <ReactToPrint
                      trigger={() => (
                        <Card hoverable style={{ backgroundColor: '#5571c9' }}>
                          <p>
                            Вывести таблицу Акции <FireOutlined />
                          </p>
                        </Card>
                      )}
                      content={() => refDeal}
                    />
                    <ReactToPrint
                      trigger={() => (
                        <Card hoverable style={{ backgroundColor: '#5571c9' }}>
                          <p>
                            Вывести таблицу Расценки <DollarOutlined />
                          </p>
                        </Card>
                      )}
                      content={() => refRate}
                    />
                    <ReactToPrint
                      trigger={() => (
                        <Card hoverable style={{ backgroundColor: '#5571c9' }}>
                          <p>
                            Вывести всех Пользователей <UserOutlined />
                          </p>
                        </Card>
                      )}
                      content={() => refUsers}
                    />
                  </div>
                </Card>
              </div>
              <div style={{ marginTop: '3.5vh' }}>
                <Card>
                  <p>
                    Запросы на интересующие темы <SearchOutlined />
                  </p>
                  <Input
                    type="text"
                    readOnly={true}
                    style={{ fontSize: '2.5vh', margin: '2vh 0' }}
                    placeholder="Здесь появиться запись по запросу..."
                    value={queryData ? queryData : null}
                  />

                  <div className="d-f fd-r jc-sb pdfCard" style={{ marginTop: '1vh' }}>
                    <Card
                      hoverable
                      style={{ backgroundColor: '#3B92FF' }}
                      onClick={() => querysGet('MostExpensiveBooking')}>
                      <p>Самое дорогое бронирование</p>
                    </Card>
                    <Card
                      hoverable
                      style={{ backgroundColor: '#3B92FF' }}
                      onClick={() => querysGet('FrequentlySelectedRoomAllTime')}>
                      <p>Самый выбираемый номер за все время</p>
                    </Card>
                    <Card
                      hoverable
                      style={{ backgroundColor: '#3B92FF' }}
                      onClick={() => querysGet('FrequentlySelectedRoomForMonth')}>
                      <p>Самый выбираемый номер за этот месяц</p>
                    </Card>
                    <Card
                      hoverable
                      style={{ backgroundColor: '#3B92FF' }}
                      onClick={() => querysGet('AverageCheckPerDayThisMonth')}>
                      <p>Средний чек за день в этом месяце</p>
                    </Card>
                    <Card
                      hoverable
                      style={{ backgroundColor: '#3B92FF' }}
                      onClick={() => querysGet('MostVisitedDay')}>
                      <p>Самый посещаемый день за все время</p>
                    </Card>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
        <div style={{ display: 'none' }}>
          <div ref={(el) => (refGuests = el)}>
            <h2 className="d-f jc-c">Таблица гости</h2>
            <Table
              pagination={false}
              style={{ marginTop: '10px' }}
              columns={columnsGuests}
              dataSource={data.guestsData ? data.guestsData : null}
            />
          </div>
          <div ref={(el) => (refRate = el)}>
            <h2 className="d-f jc-c">Таблица расценки</h2>
            <Table
              pagination={false}
              style={{ marginTop: '10px' }}
              columns={columnsRate}
              dataSource={data.rateData}
            />
          </div>
          <div ref={(el) => (refRoom = el)}>
            <h2 className="d-f jc-c">Таблица комнаты</h2>
            <Table
              pagination={false}
              style={{ marginTop: '10px' }}
              columns={columnsRoom}
              dataSource={data.roomData}
            />
          </div>
          <div ref={(el) => (refDeal = el)}>
            <h2 className="d-f jc-c">Таблица акции</h2>
            <Table
              pagination={false}
              style={{ marginTop: '10px' }}
              columns={columnsDeal}
              dataSource={data.dealData}
            />
          </div>
          <div ref={(el) => (refUsers = el)}>
            <h2 className="d-f jc-c">Таблица пользователи</h2>
            <Table
              pagination={false}
              style={{ marginTop: '10px' }}
              columns={columnsUsers}
              dataSource={data.usersData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
