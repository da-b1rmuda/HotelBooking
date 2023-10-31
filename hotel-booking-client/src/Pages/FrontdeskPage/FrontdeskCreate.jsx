import React, { useState, useEffect } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { roomGetAction } from '../../store/actions/roomAction';
import './FrontdeskPage.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import StepSecond from './StepSecond';
import StepThird from './StepThird';
import StepOne from './StepOne';
import Loading from '../../components/Loading/Loading';
import { rateGetAction } from '../../store/actions/rateAction';
dayjs.extend(customParseFormat);

const FrontdeskCreate = (props) => {
  //
  // Load data
  //
  const { room, isLoading: roomLoading } = useSelector((state) => state.roomStore);
  const { rate, isLoading: rateLoading } = useSelector((state) => state.rateStore);
  const { statusRoom, typeRoom } = useSelector((state) => state.additionalsStore);

  console.log(typeRoom);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roomGetAction());
    dispatch(rateGetAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [room]);
  const [data, setData] = useState([]);
  const loadData = () => {
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
  // Back button
  //
  const onBackButton = () => {
    props.setOnCreateBooking(false);
  };

  //Tabs
  const [current, setCurrent] = useState(0);
  const onChangeStep = (value) => {
    setCurrent(value);
  };

  const [selectedRow, setSelectedRow] = useState();

  const selectedRoom = () => {
    for (let i = 0; i < room.length; i++) {
      if (room[i].id_room === selectedRow) {
        return room[i];
      }
    }
  };

  const [dataBooking, setDataBooking] = useState({
    room_type: 'Одиночная',
    arrival_date: '',
    departure_date: '',
    count_adults: 0,
    count_children: 0,
    firstName: '',
    lastName: '',
    surname: '',
    number: '',
    email: '',
    rate: null,
  });

  return (
    <>
      {roomLoading && rateLoading === true ? (
        <Loading />
      ) : (
        <>
          <h2>Оформление комнаты</h2>
          {current === 0 && (
            <Button
              style={{ marginTop: '1vh' }}
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => onBackButton()}>
              Назад
            </Button>
          )}
          <Steps
            current={current}
            items={[
              {
                title: 'Шаг 1',
                description: 'Поиск подходящей комнаты',
              },
              {
                title: 'Шаг 2',
                description: 'Ввод личных данных',
              },
              {
                title: 'Шаг 3',
                description: 'Оплата',
              },
            ]}
          />
          {current === 0 && (
            <StepOne
              dataBooking={dataBooking}
              setDataBooking={setDataBooking}
              onChangeStep={onChangeStep}
              statusRoom={statusRoom}
              typeRoom={typeRoom}
              rate={rate}
              data={data}
              setSelectedRow={setSelectedRow}
              selectedRoom={selectedRoom()}
            />
          )}
          {current === 1 && (
            <StepSecond
              dataBooking={dataBooking}
              setDataBooking={setDataBooking}
              onChangeStep={onChangeStep}
              selectedRoom={selectedRoom()}
            />
          )}
          {current === 2 && (
            <StepThird
              dataBooking={dataBooking}
              setDataBooking={setDataBooking}
              onChangeStep={onChangeStep}
            />
          )}
        </>
      )}
    </>
  );
};

export default FrontdeskCreate;
