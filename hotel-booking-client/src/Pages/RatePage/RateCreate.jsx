import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Select, InputNumber, message, DatePicker } from 'antd';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../services/functionService';
import {
  rateCreateRoomAction,
  rateCreateDealAction,
  resetMessagesAction,
  rateGetAction,
} from '../../store/actions/rateAction';

import { rateEditAction } from '../../store/actions/rateAction';
import './RatePage.css';
const { Meta } = Card;

const RateCreate = (props) => {
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const [isCreateDiscount, setIsCreateDiscount] = useState(false);

  //
  // Redux
  //
  const dispatch = useDispatch();
  const { rate, isLoading, error, success } = useSelector((state) => state.rateStore);
  const {
    deal,
    isLoading: LoadingDeal,
    error: ErrorDeal,
    success: SuccessDeal,
  } = useSelector((state) => state.dealStore);
  const { typeRoom, cancelPolicy } = useSelector((state) => state.additionalsStore);
  const typeData = () => {
    let temp = [];
    let exception = [];
    rate.map((item) => {
      if (item.id_deal === null) exception.push(item.room_type);
    });

    typeRoom.map((item) => {
      if (exception.find((e) => e === item.room_type) === undefined) {
        temp.push({
          value: item.id_room_type,
          label: item.room_type,
        });
      }
    });
    return temp;
  };
  const typeDataDiscount = () => {
    let temp = [];
    props.data.map((item, _) => {
      temp.push({
        value: item.id_room_type,
        label: item.room_type,
      });
    });
    return temp;
  };
  const cancelPolicyData = () => {
    let temp = [];
    cancelPolicy.map((item) => {
      temp.push({
        value: item.id_cancellation_policy,
        label: item.cancellation_policy,
      });
    });
    return temp;
  };
  const dealData = () => {
    let temp = [];
    let exception = [];
    if (dataField.typeRoomf !== null) {
      deal.map((item, key) => {
        for (let i = 0; i < props.data[key]?.children.length; i++) {
          exception.push(props.data[key]?.children[i].deal_name);
        }
        if (
          dataField.typeRoomf === item.id_room_type &&
          exception.find((e) => e === item.deal_name) === undefined
        ) {
          temp.push({
            value: item.id_deal,
            label: item.deal_name,
          });
        }
      });
    }
    return temp;
  };

  //
  // Data
  //
  const [dataField, setDataField] = useState({
    typeRoomf: null,
    cancelPolicyf: null,
    rateRoomf: '',
    discountRoomf: null,
  });

  //
  // Load data for editing
  //
  useEffect(() => {
    if (props.onEditRate === true) {
      loadDataForEdit();
    }
    // eslint-disable-next-line
  }, [props.onEditRate]);

  const loadDataForEdit = () => {
    rate.map((item) => {
      setIsCreateRoom(true);
      if (item.id_rate === props?.editRow) {
        setDataField({
          ...dataField,
          idRoomTypef: item.id_room_type,
          typeRoomf: item.room_type,
          cancelPolicyf: item.cancellation_policy,
          idCancellationPolicyf: item.id_cancellation_policy,
          rateRoomf: item.rate,
        });
      }
    });
  };

  //
  // Back button
  //
  const onBackButton = () => {
    if (props.onEditRate) {
      //Закрыть окно редактирования\добавления
      props.setOnCreateRate(true);
      //Изменяем статус редактирования
      props.setOnEditRate(false);
    }
    if (isCreateDiscount || isCreateRoom) {
      setIsCreateDiscount(false);
      setIsCreateRoom(false);
      setDataField({});
    } else {
      //Закрыть окно редактирования\добавления
      props.setOnCreateRate(true);
      //Изменяем статус редактирования
      props.setOnEditRate(false);
    }
  };

  //
  // Notification
  //
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!isEmpty(success)) {
      dispatch(resetMessagesAction());
      dispatch(rateGetAction());
    }
    // eslint-disable-next-line
  }, [error, success]);
  const errorEmptyField = () => {
    messageApi.open({
      type: 'error',
      content: 'Не все поля заполнены',
    });
  };

  const onCreateRate = () => {
    rateEditAction();
    if (props.onEditRate) {
      if (
        isEmpty(dataField.typeRoomf) ||
        isEmpty(dataField.cancelPolicyf) ||
        isEmpty(dataField.rateRoomf)
      ) {
        errorEmptyField();
      } else {
        dispatch(
          rateEditAction(
            dataField.idRoomTypef,
            dataField.idCancellationPolicyf,
            dataField.rateRoomf,
            props.editRow,
          ),
        );
      }
    } else {
      if (isCreateDiscount) {
        if (
          isEmpty(dataField.typeRoomf) ||
          isEmpty(dataField.cancelPolicyf) ||
          isEmpty(getRateRoom(dataField.typeRoomf)) ||
          isEmpty(dataField.discountRoomf)
        ) {
          errorEmptyField();
        } else {
          dispatch(
            rateCreateDealAction(
              dataField.typeRoomf,
              dataField.cancelPolicyf,
              dataField.discountRoomf,
              getRateRoom(dataField.typeRoomf),
            ),
          );
          setDataField({ ...dataField, discountRoomf: null });
        }
      } else {
        if (
          isEmpty(dataField.typeRoomf) ||
          isEmpty(dataField.cancelPolicyf) ||
          isEmpty(dataField.rateRoomf)
        ) {
          errorEmptyField();
        } else {
          dispatch(
            rateCreateRoomAction(dataField.typeRoomf, dataField.cancelPolicyf, dataField.rateRoomf),
          );
          setDataField({ ...dataField, typeRoomf: null });
        }
      }
    }
  };
  const getRateRoom = (idType) => {
    let rateRoom;
    rate.map((item) => {
      if (item.id_room_type === idType && item.id_deal === null) {
        rateRoom = item.rate;
      }
    });
    return rateRoom;
  };

  return (
    <>
      {contextHolder}
      {props.onEditRate ? (
        <h2>Редактирование расценки / Расценка комнаты</h2>
      ) : (
        <h2>
          Создание расценки
          {isCreateDiscount
            ? ' / Расценка со скидкой '
            : isCreateRoom
            ? ' / Расценка комнаты '
            : ''}
        </h2>
      )}
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
        Назад
      </Button>
      {isCreateDiscount || isCreateRoom ? (
        <>
          <Row gutter={20}>
            <Col span={4.5}>
              <Card title="Тип комнаты" bordered={true}>
                <Select
                  placeholder="Выберите тип..."
                  style={{ width: 220 }}
                  value={dataField.typeRoomf}
                  options={isCreateRoom ? typeData() : isCreateDiscount ? typeDataDiscount() : null}
                  onChange={(e) => setDataField({ ...dataField, typeRoomf: e })}
                />
              </Card>
            </Col>
            <Col span={4.5}>
              <Card title="Политика отмены" bordered={true}>
                <Select
                  placeholder="Выберите политику..."
                  style={{ width: 220 }}
                  value={dataField.cancelPolicyf}
                  options={cancelPolicyData()}
                  onChange={(e) => setDataField({ ...dataField, cancelPolicyf: e })}
                />
              </Card>
            </Col>
            {isCreateRoom ? (
              <Col span={4.5}>
                <Card title="Стоимость номера" bordered={true}>
                  <InputNumber
                    min={100}
                    max={99999}
                    style={{ width: 220 }}
                    placeholder="Введите стоимость номера..."
                    value={dataField.rateRoomf}
                    // suffix={
                    //   <Tooltip title="Стоимость указывается за сутки">
                    //     <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    //   </Tooltip>
                    // }
                    onChange={(e) => setDataField({ ...dataField, rateRoomf: e })}
                  />
                </Card>
              </Col>
            ) : (
              <Col span={4.5}>
                <Card title="Выбор акции" bordered={true}>
                  <Select
                    disabled={
                      dataField.typeRoomf === null || dataField.typeRoomf === undefined
                        ? true
                        : false
                    }
                    placeholder="Выберите акцию..."
                    style={{ width: 220 }}
                    value={dataField.discountRoomf}
                    options={dealData()}
                    onChange={(e) => setDataField({ ...dataField, discountRoomf: e })}
                  />
                </Card>
              </Col>
            )}
          </Row>
          <Button type="primary" onClick={() => onCreateRate()}>
            {props.onEditRate ? 'Сохранить' : 'Создать'}
          </Button>
        </>
      ) : (
        <div className="d-f jc-sa">
          <Card
            onClick={() => setIsCreateRoom(true)}
            hoverable
            style={{ width: 340 }}
            cover={<img className="img-card" src="image/price-list.png" />}>
            <Meta
              title="Расценка комнаты"
              description="Добавить расценку на определенный тип комнат"
            />
          </Card>
          <Card
            onClick={() => setIsCreateDiscount(true)}
            hoverable
            style={{ width: 340 }}
            cover={<img className="img-card" src="image/coupon.png" />}>
            <Meta
              title="Расценка со скидкой"
              description="Добавить расценку с учетом скидки, на определенный тип комнаты"
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default RateCreate;
