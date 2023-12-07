import React, { useState, useEffect } from 'react'
import { isEmpty, getColorTag } from '../../services/functionService'
import { PlusOutlined, MinusOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Card, Radio, DatePicker, Table, Tag, Space, Dropdown, message } from 'antd'
import SelectRateModal from './SelectRateModal'
import dayjs from 'dayjs'

const StepOne = ({
	dataBooking,
	setDataBooking,
	onChangeStep,
	statusRoom,
	typeRoom,
	data,
	rate,
	setSelectedRow,
	selectedRoom,
	guests
}) => {
	// #region Функции
	const loadFilterTypeRoom = () => {
		let tempFilter = []
		// eslint-disable-next-line
		typeRoom.map((item) => {
			tempFilter.push({ text: item.room_type, value: item.room_type })
		})
		return tempFilter
	}

	const setRoomType = (type) => {
		setIsAvaliabilityChecked(false)
		setDataBooking({ ...dataBooking, room_type: type })
	}

	const [isAvaliabilityChecked, setIsAvaliabilityChecked] = useState(false)
	const checkAvailabilityRoom = () => {
		if (dataBooking.room_type && dataBooking.departure_date && dataBooking.arrival_date) {
			setFilteredInfo({
				status: ['Доступно'],
				room_type: [dataBooking.room_type],
				number_room: checkAvailabilityTime(dataBooking.departure_date, dataBooking.arrival_date)
			})
			setIsAvaliabilityChecked(true)
		}
	}

	const checkAvailabilityTime = (arrival_date, departure_date) => {
		let tempRooms = []
		for (let i = 0; i < data.length; i++) {
			let room = data[i].number_room
			for (let j = 0; j < guests.length; j++) {
				if (room === '#' + guests[j].room_number) {
					console.log(guests[j].room_number)
					if (
						betweenDates(
							dayjs(departure_date).format('YYYY-MM-DD'),
							dayjs(arrival_date).format('YYYY-MM-DD'),
							dayjs(guests[j].arrival_date).format('YYYY-MM-DD'),
							dayjs(guests[j].departure_date).format('YYYY-MM-DD')
						)
					) {
						room = ''
					}
				}
			}
			tempRooms.push(room ? room : null)
		}
		return tempRooms
	}

	const betweenDates = (DateA_start, DateA_end, DateB_start, DateB_end) => {
		// 5 3 2 1
		if (DateA_start < DateB_start) {
			// 2 complete
			if (DateA_end === DateB_start) {
				return false
			}
			// 3 complete
			if (DateA_end < DateB_start) {
				return false
			}
			// 5 complete
			if (DateB_end < DateA_end) {
				return true
			}
			// 1 complete
			if (DateA_end > DateB_start && DateA_end < DateB_end) {
				return true
			}
			// 6 4 complete
		} else if (DateA_start >= DateB_start && DateA_end <= DateB_end) {
			return true
			// 7 8 9
		} else {
			// 7
			if (DateA_start > DateB_start && DateA_start < DateB_end && DateA_end > DateB_end) {
				return true
			}
			// 8
			if (DateA_start === DateB_end && DateB_end < DateA_end) {
				return false
			}
			// 9
			if (DateA_start > DateB_end && DateA_end > DateB_end) {
				return false
			}
		}
	}

	const loadFilterNumberRoom = () => {
		let tempFilter = []
		data.map((item) => {
			tempFilter.push({ text: item.number_room, value: item.number_room })
		})
		return tempFilter
	}

	const loadFilterStatus = () => {
		let tempFilter = []
		// eslint-disable-next-line
		statusRoom.map((item) => {
			tempFilter.push({ text: item.status, value: item.status })
		})
		return tempFilter
	}

	const addToCount = (value) => {
		setIsAvaliabilityChecked(false)
		if (dataBooking.count_adults + dataBooking.count_children === maxPeopleInRoom - 1) {
			setAddButtonActive(false)
		}
		if (value === 'adult') {
			if (dataBooking.count_adults < 9) {
				setDataBooking({ ...dataBooking, count_adults: dataBooking.count_adults + 1 })
			}
		} else {
			if (dataBooking.count_children < 9) {
				setDataBooking({ ...dataBooking, count_children: dataBooking.count_children + 1 })
			}
		}
	}

	const remToCount = (value) => {
		setIsAvaliabilityChecked(false)
		if (dataBooking.count_adults + dataBooking.count_children < maxPeopleInRoom + 1) {
			setAddButtonActive(true)
		}
		if (value === 'adult') {
			if (dataBooking.count_adults > 1) {
				setDataBooking({ ...dataBooking, count_adults: dataBooking.count_adults - 1 })
			}
		} else {
			if (dataBooking.count_children > 0) {
				setDataBooking({ ...dataBooking, count_children: dataBooking.count_children - 1 })
			}
		}
	}

	const onOk = (value) => {}

	const onClick = ({ key }) => {
		if (key === 'choise') {
			if (isAvaliabilityChecked === true) {
				setIsModalOpen(true)
				setDataBooking({ ...dataBooking, id_room: selectedRoom })
			} else {
				messageApi.open({
					type: 'error',
					content: 'Проверьте доступность комнат'
				})
			}
		}
	}

	const getCountPeople = (maxCount) => {
		let all = dataBooking.count_adults + dataBooking.count_children
		if (all > maxCount) {
			return true
		} else {
			return false
		}
	}

	const [radioRoomType, setRadioRoomType] = useState()
	const selectRoomType = (type, radio) => {
		setRoomType(type)
		setRadioRoomType(radio)
	}
	// #endregion

	// #region Вспомогательные переменные
	const maxPeopleInRoom = 6
	const [filteredInfo, setFilteredInfo] = useState({})
	const [sortedInfo, setSortedInfo] = useState({})
	const [addButtonActive, setAddButtonActive] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)
	//Notification
	const [messageApi, contextHolder] = message.useMessage()

	// Table columns
	const columns = [
		{
			title: '№ Комнаты',
			dataIndex: 'number_room',
			key: 'number_room',
			filters: loadFilterNumberRoom(),
			filteredValue: filteredInfo.number_room,
			onFilter: (value, record) => record.number_room.includes(value),
			filterIcon: <svg width={1} height={1}></svg>,
			render: (text) => <h3>{text}</h3>
		},
		{
			title: 'Тип комнаты',
			dataIndex: 'room_type',
			key: 'room_type',
			filters: loadFilterTypeRoom(),
			filteredValue: filteredInfo.room_type,
			onFilter: (value, record) => record.room_type.includes(value),
			filterIcon: <svg width={1} height={1}></svg>
		},
		{
			title: 'Этаж',
			dataIndex: 'floor',
			key: 'floor'
		},
		{
			title: 'Удобства',
			key: 'facility',
			dataIndex: 'facility',
			width: 450,
			render: (_, { facility }) => (
				<>
					{facility?.map((tag) => {
						return (
							<Tag color={'green'} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						)
					})}
				</>
			)
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			filters: loadFilterStatus(),
			render: (_, { status }) => <Tag color={getColorTag(status, 'status', statusRoom)}>{status}</Tag>,
			filteredValue: filteredInfo.status,
			onFilter: (value, record) => record.status.includes(value),
			filterIcon: <svg width={1} height={1}></svg>
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size='large'>
					<Dropdown menu={{ items, onClick, record }} trigger={['click']}>
						<Space>
							<Button onClick={() => setSelectedRow(record.key)} shape='circle' icon={<MoreOutlined />} />
						</Space>
					</Dropdown>
				</Space>
			)
		}
	]

	// Dropdown menu
	const items = [
		{
			label: 'Выбрать',
			key: 'choise'
		}
	]
	// #endregion

	// #region UseEffect
	useEffect(() => {
		let all = dataBooking.count_adults + dataBooking.count_children
		if (all < 4) {
			if (getCountPeople(2)) {
				setRadioRoomType('b')
				setRoomType('Две кровати')
			}
		}
		if (getCountPeople(4)) {
			setRadioRoomType('c')
			setRoomType('Три кровати')
		}
	}, [dataBooking.count_adults, dataBooking.count_children])
	// #endregion

	return (
		<>
			{contextHolder}
			{
				<SelectRateModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					rate={rate}
					selectedRoom={selectedRoom}
					onChangeStep={onChangeStep}
					setDataBooking={setDataBooking}
					dataBooking={dataBooking}
				/>
			}
			<Card style={{ marginTop: '2vh' }}>
				<div className='d-f jc-sb flex-center'>
					<div>
						<div className='d-f jc-sb mt-10'>
							<Radio.Group size='large' value={radioRoomType}>
								<Radio.Button
									value='a'
									disabled={getCountPeople(2)}
									onClick={() => selectRoomType('Одна кровать', 'a')}
								>
									Одна кровать
								</Radio.Button>
								<Radio.Button value='b' disabled={getCountPeople(4)} onClick={() => selectRoomType('Две кровати', 'b')}>
									Две кровати
								</Radio.Button>
								<Radio.Button
									value='c'
									disabled={getCountPeople(6)}
									checked={getCountPeople(2) ? true : false}
									onClick={() => selectRoomType('Три кровати', 'c')}
								>
									Три кровати
								</Radio.Button>
								<Radio.Button value='d' disabled={getCountPeople(2)} onClick={() => selectRoomType('VIP', 'd')}>
									VIP
								</Radio.Button>
							</Radio.Group>
						</div>
						<div className='d-f p-t-3 text-fontdesk'>
							<div className='p-r-2'>
								<p>Заезд</p>
								<DatePicker
									showTime={{ format: 'HH:mm' }}
									format='DD-MM-YYYY HH:mm'
									value={dataBooking.arrival_date}
									onChange={(e) => setDataBooking({ ...dataBooking, arrival_date: e })}
									onOk={onOk}
								/>
							</div>
							<div>
								<p>Выезд</p>
								<DatePicker
									showTime={{ format: 'HH:mm' }}
									format='DD-MM-YYYY HH:mm'
									value={dataBooking.departure_date}
									onChange={(e) => setDataBooking({ ...dataBooking, departure_date: e })}
									onOk={onOk}
								/>
							</div>
						</div>
						<div className='d-f text-fontdesk p-t-3 '>
							<div className='d-f p-r-2'>
								<div>
									<p>Взрослые</p>
									<span>Старше 12 лет</span>
								</div>
								<div className='d-f counter-fontdesk'>
									<Button type='primary' shape='circle' icon={<MinusOutlined />} onClick={() => remToCount('adult')} />
									<p>{dataBooking.count_adults}</p>
									<Button
										type='primary'
										shape='circle'
										icon={<PlusOutlined />}
										onClick={() => addToCount('adult')}
										disabled={addButtonActive ? false : true}
									/>
								</div>
							</div>
							<div className='d-f'>
								<div>
									<p>Дети</p>
									<span>0-12 лет</span>
								</div>
								<div className='d-f counter-fontdesk'>
									<Button
										type='primary'
										shape='circle'
										icon={<MinusOutlined />}
										value={dataBooking.count_children}
										disabled={dataBooking.count_adults < 1 ? true : false}
										onClick={() => remToCount('children')}
									/>
									<p className={dataBooking.count_adults < 1 ? 'offChild' : ''}>{dataBooking.count_children}</p>
									<Button
										type='primary'
										shape='circle'
										icon={<PlusOutlined />}
										disabled={addButtonActive ? false : true || dataBooking.count_adults < 1 ? true : false}
										onClick={() => addToCount('children')}
									/>
								</div>
							</div>
						</div>
					</div>
					<div>
						<Button size='large' type='primary' onClick={() => checkAvailabilityRoom()}>
							Проверить свободные
						</Button>
					</div>
				</div>
			</Card>
			<Table
				pagination={{
					pageSize: 6
				}}
				style={{ marginTop: '10px' }}
				columns={columns}
				dataSource={isEmpty(data) ? [] : data}
				// onChange={handleChange}
			/>
		</>
	)
}

export default StepOne
