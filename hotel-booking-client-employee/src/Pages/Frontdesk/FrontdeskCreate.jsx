import React, { useState, useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Steps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { roomGetAction } from '../../store/actions/roomAction'
import './FrontdeskPage.scss'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import StepSecond from './StepSecond'
import StepThird from './StepThird'
import StepOne from './StepOne'
import Loading from '../../components/Loading/Loading'
import { rateGetAction } from '../../store/actions/rateAction'
dayjs.extend(customParseFormat)

const FrontdeskCreate = (props) => {
	// #region Вспомогательные переменные
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [dataBooking, setDataBooking] = useState({
		room_type: '',
		arrival_date: '',
		departure_date: '',
		count_adults: 1,
		count_children: 0,
		firstName: '',
		lastName: '',
		surname: '',
		number: '',
		email: '',
		id_room: '',
		amount_paid: null,
		rate: null,
		id_rate: ''
	})
	// #endregion

	// #region Redux
	const { room, isLoading: roomLoading } = useSelector((state) => state.roomStore)
	const { rate, isLoading: rateLoading } = useSelector((state) => state.rateStore)
	const { guests, isLoading: guestsLoading } = useSelector((state) => state.bookingStore)
	const { statusRoom, typeRoom } = useSelector((state) => state.additionalsStore)
	// #endregion

	// #region UseEffect
	useEffect(() => {
		dispatch(roomGetAction())
		dispatch(rateGetAction())
	}, [])

	useEffect(() => {
		loadData()
	}, [room])
	// #endregion

	// #region Функция
	const loadData = () => {
		let tempData = []
		if (room.length !== 0) {
			// eslint-disable-next-line
			room.map((item) => {
				tempData.push({
					key: item.id_room,
					number_room: '#' + item?.room_number,
					floor: item?.room_floor,
					room_type: item?.room_type,
					facility: item?.facility,
					status: item?.status
				})
			})
			setData(tempData)
		}
	}

	const onBackButton = () => {
		props.setOnCreateBooking(false)
	}

	const [current, setCurrent] = useState(0)
	const onChangeStep = (value) => {
		setCurrent(value)
	}

	const [selectedRow, setSelectedRow] = useState()
	const selectedRoom = () => {
		for (let i = 0; i < room.length; i++) {
			if (room[i].id_room === selectedRow) {
				return room[i]
			}
		}
	}
	// #endregion

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
							type='text'
							icon={<ArrowLeftOutlined />}
							onClick={() => onBackButton()}
						>
							Назад
						</Button>
					)}
					<Steps
						current={current}
						items={[
							{
								title: 'Шаг 1',
								description: 'Поиск подходящей комнаты'
							},
							{
								title: 'Шаг 2',
								description: 'Ввод личных данных'
							},
							{
								title: 'Шаг 3',
								description: 'Оплата'
							}
						]}
					/>
					{current === 0 && (
						<StepOne
							dataBooking={dataBooking}
							setDataBooking={setDataBooking}
							onChangeStep={onChangeStep}
							statusRoom={statusRoom}
							typeRoom={typeRoom}
							guests={guests}
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
							onChangeStep={onChangeStep}
							setOnCreateBooking={props.setOnCreateBooking}
						/>
					)}
				</>
			)}
		</>
	)
}

export default FrontdeskCreate
