import React from 'react';
import { Badge, Calendar, Tooltip } from 'antd';
import dayjs from 'dayjs';
import './Calendar.css';

const getListData = (value, data) => {
  let listData = [];

  const getStatus = (date, type) => {
    let now = dayjs();
    // if (now.date() < date.date()) {
    //   return 'dueIn';
    // } else {
    //   return 'checkedOut';
    // }

    // if(date.date() > now.date()){
    //   return 'checkedOut';
    // } else {
    //   if(date.data >)
    // }

    if (type === 'depart') {
      return 'checkedOut';
    } else {
      if (date.format('YYYY-MM-DD') > now.format('YYYY-MM-DD')) {
        return 'dueIn';
      } else {
        return 'checkedIn';
      }
    }
  };
  if (data?.length) {
    for (let i = 0; i < data.length; i++) {
      if (
        dayjs(data[i]?.arrivalDate).date() === value.date() &&
        dayjs(data[i]?.departureDate).format('YYYY-MM-DD') >= dayjs().format('YYYY-MM-DD')
      ) {
        listData.push({
          type: '',
          content: data[i]?.lastName + ' ' + data[i]?.firstName + ' ' + data[i]?.fatherName,
          status: getStatus(dayjs(data[i]?.arrivalDate), 'arrive'),
          month: dayjs(data[i]?.arrivalDate).month() + 1,
          room: data[i]?.numberRoom,
        });
      }
      if (
        dayjs(data[i]?.departureDate).date() === value.date() &&
        dayjs(data[i]?.departureDate).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD')
      ) {
        listData.push({
          type: '',
          content: data[i]?.lastName + ' ' + data[i]?.firstName + ' ' + data[i]?.fatherName,
          status: getStatus(dayjs(data[i]?.departureDate), 'depart'),
          month: dayjs(data[i]?.departureDate).month() + 1,
          room: data[i]?.numberRoom,
        });
      }
    }
  }
  return listData || [];
};

const getInfoUser = (content, data) => {
  let indexGuest = 0;
  for (let i = 0; i < data.length; i++) {
    if (content === data[i]?.lastName + ' ' + data[i]?.firstName + ' ' + data[i]?.fatherName) {
      indexGuest = i;
    }
  }
  return (
    <div>
      <p>Фио: {content}</p>
      <p>Дата прибытия: {dayjs(data[indexGuest]?.arrivalDate).format('DD.MM.YYYY')}</p>
      <p>Дата отбытия: {dayjs(data[indexGuest]?.departureDate).format('DD.MM.YYYY')}</p>
      <p>Номер комнаты: {data[indexGuest]?.numberRoom}</p>
      <p>Этаж комнаты: {data[indexGuest]?.roomFloor}</p>
      <p>Номер телефона: {data[indexGuest]?.phoneNumber}</p>
      <p>Количество взрослых: {data[indexGuest]?.countAdults}</p>
      <p>Количество детей: {data[indexGuest]?.countChildren}</p>
    </div>
  );
};

const CalendarComp = ({ guests }) => {
  const getColor = (status) => {
    if (status === 'checkedOut') {
      return {
        background: '#E6F4FF',
        color: '#1677FF',
        border: '1px solid #91CAFF',
        borderRadius: '5px',
      };
    }
    if (status === 'checkedIn') {
      return {
        background: '#F6FFED',
        color: '#389E0D',
        border: '1px solid #B7EB8F',
        borderRadius: '5px',
      };
    }
    if (status === 'dueIn') {
      return {
        background: '#FFF7E6',
        color: '#D46B08',
        border: '1px solid #FFD591',
        borderRadius: '5px',
      };
    }
    if (status === 'dueOut') {
      return {
        background: '#FFF1F0',
        color: '#CF1322',
        border: '1px solid #FFA39E',
        borderRadius: '5px',
      };
    }
  };
  const getMonthSelected = (current) => {
    switch (current.toString().substring(4, 7)) {
      case 'Sep':
        return 9;
      case 'Oct':
        return 10;
      case 'Nov':
        return 11;
      case 'Dec':
        return 12;
      case 'Jan':
        return 1;
      case 'Feb':
        return 2;
      case 'Mar':
        return 3;
      case 'Apr':
        return 4;
      case 'May':
        return 5;
      case 'Jun':
        return 6;
      case 'Jul':
        return 7;
      case 'Aug':
        return 8;
      default:
        break;
    }
  };

  const dateCellRender = (value, month) => {
    const listData = getListData(value, guests);
    return (
      <ul className="events">
        {listData.map((item, key) => {
          if (item.month === month) {
            return (
              <li key={key}>
                <Tooltip title={getInfoUser(item.content, guests)} arrow={false} placement="left">
                  <Badge
                    style={getColor(item.status)}
                    status={item.type}
                    text={item.room + ': ' + item.content}
                  />
                </Tooltip>
              </li>
            );
          }
        })}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current, getMonthSelected(current.$d));
    // if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return <Calendar cellRender={cellRender} />;
};
export default CalendarComp;
