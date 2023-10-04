import React from 'react';
import { Badge, Calendar } from 'antd';
import './Calendar.css';

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: '',
          content: 'Александр П.',
          status: 'checkedIn',
          month: 8,
        },
      ];
      break;
    case 9:
      listData = [
        {
          type: '',
          content: 'Игорь С.',
          status: 'checkedOut',
          month: 8,
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: '',
          content: 'Александр П.',
          status: 'dueIn',
          month: 9,
          room: 326,
        },
        {
          type: '',
          content: 'Игорь С.',
          status: 'dueOut',
          month: 8,
        },
        {
          type: '',
          content: 'Игорь С.',
          status: 'checkedOut',
          month: 9,
          room: 321,
        },
      ];
      break;
    case 11:
      listData = [
        {
          type: '',
          content: 'Александр П.',
          status: 'dueIn',
          month: 8,
        },
      ];
      break;
    default:
  }
  return listData || [];
};

const CalendarComp = () => {
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
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => {
          if (item.month === month) {
            return (
              <li key={item.content}>
                <Badge style={getColor(item.status)} status={item.type} text={item.room + ': '+item.content} />
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
