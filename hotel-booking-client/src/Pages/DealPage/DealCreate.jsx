import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Card, Col, Row, Select, message, InputNumber, Input, DatePicker } from 'antd';
import Loading from '../../components/Loading/Loading';
import './DealPage.css';
import { getConvertedDate, isEmpty } from '../../services/functionService';
import {
  dealCreateAction,
  dealEditAction,
  dealGetAction,
  resetMessagesAction,
} from '../../store/actions/dealAction';
const { TextArea } = Input;
dayjs.extend(customParseFormat);
const dateFormat = 'DD.MM.YYYY';

const DealCreate = (props) => {
  //Notification
  const [messageApi, contextHolder] = message.useMessage();

  //
  // Back button
  //
  const onBackButton = () => {
    //Закрыть окно редактирования\добавления
    props.setOnCreateDeal(true);
    //Изменяем статус редактирования
    props.setOnEditDeal(false);
  };

  //
  // Data
  //
  const [dataField, setDataField] = useState({
    numberDealf: '',
    nameDealf: '',
    discountDealf: null,
    dateStartf: '',
    dateEndf: '',
    typeRoomf: null,
    statusDealf: null,
    reservationLeftf: null,
    descriptionDealf: '',
  });

  //
  // Redux
  //
  const dispatch = useDispatch();
  const { deal, isLoading, error, success } = useSelector((state) => state.dealStore);
  const { typeRoom, statusDeal } = useSelector((state) => state.additionalsStore);
  const typeData = () => {
    let temp = [];
    typeRoom.map((item) => {
      temp.push({
        value: item.id_room_type,
        label: item.room_type,
      });
    });
    return temp;
  };
  const statusDealData = () => {
    let temp = [];
    statusDeal.map((item) => {
      temp.push({
        value: item.id_status_deal,
        label: item.status_deal,
      });
    });
    return temp;
  };

  //
  // Load data for editing
  //
  useEffect(() => {
    if (props.onEditDeal === true) {
      loadDataForEdit();
    }
    // eslint-disable-next-line
  }, [props.onEditDeal]);

  const loadDataForEdit = () => {
    deal.map((item) => {
      console.log(item.start_date);

      if (item.id_deal === props?.editRow) {
        // Получение id по названию поля
        let id_room_type;
        typeRoom.map((sub) => {
          if (item.room_type === sub.room_type) {
            id_room_type = sub.id_room_type;
          }
        });
        let id_status_deal;
        statusDeal.map((sub) => {
          if (item.status_deal === sub.status_deal) {
            id_status_deal = sub.id_status_deal;
          }
        });
        console.log(item.start_date);
        // Загрузка данных в стэйт
        console.log(getConvertedDate(item.start_date));
        setDataField({
          ...dataField,
          numberDealf: item.deal_number,
          nameDealf: item.deal_name,
          discountDealf: item.discount,
          dateStartf: getConvertedDate(item.start_date),
          dateEndf: getConvertedDate(item.end_date),
          typeRoomf: id_room_type,
          statusDealf: id_status_deal,
          reservationLeftf: item.reservation_left,
          descriptionDealf: item.description,
        });
      }
    });
  };

  //
  // Notification
  //
  useEffect(() => {
    if (!isEmpty(success)) {
      dispatch(resetMessagesAction());
      dispatch(dealGetAction());
    }
    // eslint-disable-next-line
  }, [error, success]);
  const errorEmptyField = () => {
    messageApi.open({
      type: 'error',
      content: 'Не все поля заполнены',
    });
  };

  //
  // Create room button
  //
  const onCreateRoom = () => {
    if (props.onEditDeal) {
      dispatch(
        dealEditAction(
          dataField.numberDealf,
          dataField.nameDealf,
          dataField.discountDealf,
          dataField.dateStartf,
          dataField.dateEndf,
          dataField.typeRoomf,
          dataField.statusDealf,
          dataField.reservationLeftf,
          dataField.descriptionDealf,
          props.editRow,
        ),
      );
      return;
    } else {
      console.log(dataField.dateEndf);
      if (
        isEmpty(dataField.numberDealf) ||
        isEmpty(dataField.nameDealf.target?.value) ||
        isEmpty(dataField.discountDealf, true) ||
        isEmpty(dataField.dateStartf) ||
        isEmpty(dataField.dateEndf) ||
        isEmpty(dataField.typeRoomf, true) ||
        isEmpty(dataField.statusDealf, true) ||
        isEmpty(dataField.reservationLeftf, true) ||
        isEmpty(dataField.descriptionDealf.target?.value)
      ) {
        errorEmptyField();
      } else {
        dispatch(
          dealCreateAction(
            dataField.numberDealf,
            dataField.nameDealf.target.value,
            dataField.discountDealf,
            dataField.dateStartf,
            dataField.dateEndf,
            dataField.typeRoomf,
            dataField.statusDealf,
            dataField.reservationLeftf,
            dataField.descriptionDealf.target.value,
          ),
        );
      }
    }
  };

  return (
    <>
      {contextHolder}
      {props.onEditDeal ? <h2>Редактирование акции</h2> : <h2>Создание акции</h2>}
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
        Назад
      </Button>
      <Row gutter={20}>
        <Col span={4.5}>
          <Card title="Номер акции" bordered={true}>
            <InputNumber
              min={1000}
              max={9999}
              placeholder="Введите номер комнаты..."
              value={dataField.numberDealf}
              onChange={(e) => setDataField({ ...dataField, numberDealf: e })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Название акции" bordered={true}>
            <Input
              showCount
              placeholder="Введите название акции..."
              maxLength={50}
              value={dataField.nameDealf}
              onChange={(e) => setDataField({ ...dataField, nameDealf: e.target.value })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Скидка" bordered={true}>
            <InputNumber
              min={1}
              max={99}
              placeholder="Скидка..."
              value={dataField.discountDealf}
              onChange={(e) => setDataField({ ...dataField, discountDealf: e })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Дата начала акции" bordered={true}>
            {console.log(dataField.dateStartf)}
            <DatePicker
              format={'DD.MM.YYYY'}
              allowClear={false}
              value={
                props.onEditDeal ? dayjs(dataField.dateStartf, dateFormat) : dataField.dateStartf
              }
              onChange={(e) => setDataField({ ...dataField, dateStartf: e })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Дата окончания акции" bordered={true}>
            <DatePicker
              format={'DD.MM.YYYY'}
              allowClear={false}
              value={props.onEditDeal ? dayjs(dataField.dateEndf, dateFormat) : dataField.dateEndf}
              onChange={(e) => setDataField({ ...dataField, dateEndf: e })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Тип комнаты" bordered={true}>
            <Select
              placeholder="Выберите тип..."
              style={{ width: 220 }}
              value={dataField.typeRoomf}
              options={typeData()}
              onChange={(e) => setDataField({ ...dataField, typeRoomf: e })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Статус акции" bordered={true}>
            <Select
              placeholder="Выберите статус..."
              style={{ width: 220 }}
              value={dataField.statusDealf}
              options={statusDealData()}
              onChange={(e) => setDataField({ ...dataField, statusDealf: e })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Количество использований" bordered={true}>
            <InputNumber
              min={1}
              max={999}
              style={{ width: '40vh' }}
              placeholder="Введите количество использований..."
              value={dataField.reservationLeftf}
              onChange={(e) => setDataField({ ...dataField, reservationLeftf: e })}
            />
          </Card>
        </Col>
        <Col span={4.5}>
          <Card title="Описание акции" bordered={true}>
            <TextArea
              showCount
              maxLength={250}
              value={dataField.descriptionDealf}
              style={{ width: '50vh', height: 120, resize: 'none' }}
              onChange={(e) => setDataField({ ...dataField, descriptionDealf: e.target.value })}
              placeholder="Описание акции..."
            />
          </Card>
        </Col>
      </Row>
      <Button type="primary" onClick={() => onCreateRoom()}>
        {props.onEditDeal ? 'Сохранить' : 'Создать'}
      </Button>
      {isLoading && <Loading />}
    </>
  );
};

export default DealCreate;
