import dayjs from 'dayjs';
import { getMonth } from '../../services/functionService.js';

export const optionVisitors = (data) => {
  let now = dayjs().month() + 1;
  let months = [getMonth(now - 2), getMonth(now - 1), getMonth(now)];
  let dataMonth = [
    data.count_guests_before_last_month,
    data.count_guests_last_month,
    data.count_guests_this_month,
  ];
  let option = {
    title: {
      text: 'Посетители',
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    toolbox: {
      showTitle: true,
      feature: {
        dataView: { title: 'Данные', show: true, readOnly: false },
        saveAsImage: { title: 'Скачать', show: true },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: months,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Гости',
        type: 'bar',
        barWidth: '60%',
        data: dataMonth,
      },
    ],
  };
  return option;
};

export const optionActivityGuest = (arrived, reserved) => {
  let arrivedData = [];
  let reservedData = [];
  const getValues = (data) => {
    let tempArray = [];
    let weekDays = [
      'Monday   ',
      'Tuesday  ',
      'Wednesday',
      'Thursday ',
      'Friday   ',
      'Saturday ',
      'Sunday   ',
    ];
    for (let i = 0; i < weekDays.length; i++) {
      let count = 0;
      for (let j = 0; j < data?.length; j++) {
        if (data[j].weekday === weekDays[i]) {
          count = data[j].count;
        }
      }
      tempArray.push(count);
    }
    return tempArray;
  };
  arrivedData = getValues(arrived);
  reservedData = getValues(reserved);
  let options = {
    color: ['#3B92FF', '#5571C9'],
    title: {
      text: 'Активность гостей',
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Заехали', 'Выехали'],
    },
    toolbox: {
      showTitle: true,
      feature: {
        dataView: { title: 'Данные', show: true, readOnly: false },
        saveAsImage: { title: 'Скачать', show: true },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Заехали',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 5,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.3,
        },
        emphasis: {
          focus: 'series',
        },
        data: arrivedData,
      },
      {
        name: 'Выехали',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 5,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.3,
        },
        emphasis: {
          focus: 'series',
        },
        data: reservedData,
      },
    ],
  };
  return options;
};

export const optionAvailableRooms = (data) => {
  let dataRoom = [
    { value: data.available_room, name: 'Свободные' },
    { value: data.reserved_room, name: 'Забронированные' },
  ];

  let options = {
    title: {
      text: 'Свободные комнаты',
      show: false,
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { title: 'Данные', show: true, readOnly: false },
        saveAsImage: { title: 'Скачать', show: true },
      },
    },
    legend: {
      top: '90%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          color: '#ffff',
        },

        data: dataRoom,
      },
    ],
  };
  return options;
};
