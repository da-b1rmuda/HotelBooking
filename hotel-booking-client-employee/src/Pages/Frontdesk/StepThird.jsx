import React from 'react'
import { Card, Button, Divider, Result } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { bookingCreateAction, guestsGetAction } from '../../store/actions/bookingAction'
import { isEmpty } from '../../services/functionService'
import { resetMessages } from '../../store/reducers/bookingReducer'
import { useNavigate } from 'react-router-dom'

const StepThird = ({ dataBooking, onChangeStep, setOnCreateBooking }) => {
	const dispatch = useDispatch()
	const { success } = useSelector((state) => state.bookingStore)
	const [openSuccess, setOpenSuccess] = React.useState(false)
	const navigation = useNavigate()

	let arrivalDateConverted = `${dataBooking.arrival_date.$D}.${dataBooking.arrival_date.$M}.${dataBooking.arrival_date.$y}`
	let departureDateConverted = `${dataBooking.departure_date.$D}.${dataBooking.departure_date.$M}.${dataBooking.departure_date.$y}`
	let rateWithDiscount = dataBooking.rate.rate - (dataBooking.rate.rate / 100) * dataBooking.rate.discount
	let justDays = dataBooking.arrival_date?.diff(dataBooking.departure_date, 'day') * -1
	let justToPay = justDays * rateWithDiscount

	const onBooking = () => {
		dispatch(
			bookingCreateAction(
				dataBooking.firstName,
				dataBooking.lastName,
				dataBooking.surname,
				'+7' + dataBooking.number,
				dataBooking.id_room.id_room,
				dataBooking.arrival_date,
				dataBooking.departure_date,
				dataBooking.count_adults,
				dataBooking.count_children,
				justToPay,
				dataBooking.email,
				dataBooking.rate.id_rate
			)
		)
		dispatch(guestsGetAction())
		setOpenSuccess(true)
	}

	const onFinish = () => {
		navigation('/frontdesk')
		setOnCreateBooking(false)
		setOpenSuccess(false)
	}

	return (
		<>
			{openSuccess ? (
				<Result
					status='success'
					title='Успешно'
					subTitle={success}
					extra={
						<Button type='primary' key='console' onClick={() => onFinish()}>
							Вернуться на главную
						</Button>
					}
				/>
			) : (
				<>
					<Card>
						<div>
							<div className='desc-block d-f'>
								<p>Дата прибытия:ㅤ</p>
								<p>{arrivalDateConverted}</p>
							</div>
							<div className='desc-block d-f'>
								<p>Дата отбытия:ㅤ</p>
								<p>{departureDateConverted}</p>
							</div>
							<div className='desc-block d-f'>
								<p>Количество взрослых:ㅤ</p>
								<p>{dataBooking.count_adults}</p>
							</div>
						</div>
						<div className='desc-block d-f'>
							<p>Количество детей:ㅤ</p>
							<p>{dataBooking.count_children}</p>
						</div>
						<div className='desc-block d-f'>
							<p>ФИО:ㅤ</p>
							<p>{dataBooking.firstName + ' ' + dataBooking.lastName + ' ' + dataBooking.surname}</p>
						</div>
						<div className='desc-block d-f'>
							<p>Почта:ㅤ</p>
							<p>{dataBooking.email ? dataBooking.email : `"Почта отсутствует"`}</p>
						</div>
						<div className='desc-block d-f'>
							<p>Номер телефона:ㅤ</p>
							<p>{dataBooking.number}</p>
						</div>
						<div className='desc-block d-f'>
							<p>Номер комнаты:ㅤ</p>
							<p>{dataBooking.id_room.room_number}</p>
						</div>
						<div className='desc-block d-f'>
							<p>Тип комнаты:ㅤ</p>
							<p>{dataBooking.room_type}</p>
						</div>
						<Divider></Divider>
						<div className='d-f fd-c ai-e'>
							<div className='desc-block d-f'>
								<p>Стоимость номеар за сутки:ㅤ</p>
								<p>{dataBooking.rate.rate} руб.</p>
							</div>
							<div className='desc-block d-f'>
								{rateWithDiscount !== undefined || rateWithDiscount !== null ? (
									<>
										<p>Стоимость с учетом скидки:ㅤ</p>
										<p>{rateWithDiscount} руб.</p>
									</>
								) : (
									''
								)}
							</div>
							<div className='desc-block d-f'>
								<p>Полных дней проживания:ㅤ</p>
								<p>{justDays}</p>
							</div>
							<div className='desc-block d-f'>
								<p>Итого к оплате:ㅤ</p>
								<p>{justToPay} руб.</p>
							</div>
						</div>
					</Card>
					<div style={{ marginTop: '3vh', display: 'flex', justifyContent: 'space-between' }}>
						<Button onClick={() => onChangeStep(1)} icon={<ArrowLeftOutlined />}>
							Назад
						</Button>
						<Button type='primary' onClick={() => onBooking()}>
							Оформить
						</Button>
					</div>
				</>
			)}
		</>
	)
}

export default StepThird
