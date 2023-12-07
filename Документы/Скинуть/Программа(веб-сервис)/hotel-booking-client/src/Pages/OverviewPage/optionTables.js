import dayjs from 'dayjs';

export const columnsGuests = [
  {
    title: '№ Бронирования',
    dataIndex: 'number_guest',
    key: 'number_guest',
    render: (text) => <h3>#{text}</h3>,
  },
  {
    title: 'Клиент',
    dataIndex: 'last_name',
    key: 'last_name',
    render: (_, { first_name, last_name, father_name }) => (
      <p>{first_name + ' ' + last_name + ' ' + father_name}</p>
    ),
  },
  {
    title: 'Почта',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Номер комнаты',
    dataIndex: 'room_number',
    key: 'room_number',
  },
  {
    title: 'Общая сумма',
    dataIndex: 'amount_paid',
    key: 'amount_paid',
    render: (text) => <p>{text} руб.</p>,
  },
  {
    title: 'Дата прибытия',
    dataIndex: 'arrival_date',
    key: 'arrival_date',
    render: (arrival_date) => <p>{dayjs(arrival_date).format('DD.MM.YYYY')}</p>,
  },
  {
    title: 'Дата отбытия',
    dataIndex: 'departure_date',
    key: 'departure_date',
    render: (departure_date) => <p>{dayjs(departure_date).format('DD.MM.YYYY')}</p>,
  },
];

export const columnsRoom = [
  {
    title: '№ Комнаты',
    dataIndex: 'room_number',
    key: 'room_number',
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: 'Тип комнаты',
    dataIndex: 'room_type',
    key: 'room_type',
  },
  {
    title: 'Этаж',
    dataIndex: 'room_floor',
    key: 'room_floor',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
  },
];

export const columnsRate = [
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
  },
  {
    title: 'Цена по акции',
    dataIndex: 'discount',
    key: 'discount',
    render: (_, { discount, rate }) => <p>{rate - (rate / 100) * discount} руб.</p>,
  },
  {
    title: 'Цена',
    dataIndex: 'rate',
    key: 'rate',
    render: (rate) => <p>{rate} руб.</p>,
  },
];

export const columnsDeal = [
  {
    title: '№ Акции',
    dataIndex: 'deal_number',
    key: 'deal_number',
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: 'Название',
    dataIndex: 'deal_name',
    key: 'deal_name',
  },
  {
    title: 'Осталось использований',
    dataIndex: 'reservation_left',
    key: 'reservation_left',
  },
  {
    title: 'Дата начала',
    dataIndex: 'start_date',
    key: 'start_date',
    render: (start_date) => <p>{dayjs(start_date).format('DD.MM.YYYY')}</p>,
  },
  {
    title: 'Дата окончания',
    dataIndex: 'end_date',
    key: 'end_date',
    render: (end_date) => <p>{dayjs(end_date).format('DD.MM.YYYY')}</p>,
  },
  {
    title: 'Тип  комнаты',
    dataIndex: 'room_type',
    key: 'room_type',
  },
  {
    title: 'Статус',
    dataIndex: 'status_deal',
    key: 'status_deal',
  },
];

export const columnsUsers = [
  {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login',
  },
  {
    title: 'Почта',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Пароль',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    key: 'role',
    render: (text) => <h3>{text}</h3>,
  },
];
