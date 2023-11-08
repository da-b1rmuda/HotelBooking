export const optionVisitors = {
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
      data: ['Август', 'Сентябрь', 'Ноябрь'],
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
      data: [147, 210, 107],
    },
  ],
};

export const optionActivityGuest = {
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
      data: [140, 232, 101, 264, 90, 340, 250],
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
      data: [120, 282, 111, 234, 220, 340, 310],
    },
  ],
};

export const optionAvailableRooms = {
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

      data: [
        { value: 1048, name: 'Свободные' },
        { value: 735, name: 'Забронированные' },
      ],
    },
  ],
};
