import React from 'react'
import { Select, Card, Radio, TimePicker, Button, Tag } from 'antd'
import './Employee.scss'

export default function SсheduleEmployee() {
	const listEmployeeWithSchedule = [
		{
			value: '1',
			label: 'Not Identified'
		},
		{
			value: '2',
			label: 'Closed'
		},
		{
			value: '3',
			label: 'Communicated'
		},
		{
			value: '4',
			label: 'Identified'
		},
		{
			value: '5',
			label: 'Resolved'
		},
		{
			value: '6',
			label: 'Cancelled'
		}
	]
	const listEmployeeWithoutSchedule = [
		{
			value: '1',
			label: 'Not Identified'
		},
		{
			value: '2',
			label: 'Closed'
		},
		{
			value: '3',
			label: 'Communicated'
		},
		{
			value: '4',
			label: 'Identified'
		},
		{
			value: '5',
			label: 'Resolved'
		},
		{
			value: '6',
			label: 'Cancelled'
		}
	]

	return (
		<>
			<h2>Расписание сотрудников</h2>
			<Card title='Выбор сотрудника'>
				<div className='d-flex justify-content-between'>
					<div className='schedule_choice_employee'>
						<p style={{ marginBottom: 0, fontSize: '2.5vh' }}>Сотрудники с готовым распсианием:</p>
						<span style={{ color: 'gray' }}>Данных пункт, предназначен для редактирования расписания сотрудников.</span>
						<Select
							showSearch
							style={{ width: '100%', marginTop: '1vh' }}
							placeholder='Выбрать пользователя'
							optionFilterProp='children'
							filterOption={(input, option) => (option?.label ?? '').includes(input)}
							filterSort={(optionA, optionB) =>
								(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
							}
							options={listEmployeeWithSchedule}
						/>
						<p style={{ marginBottom: 0, marginTop: '2vh', fontSize: '2.5vh' }}>Сотрудники у которых нет расписания:</p>
						<span style={{ color: 'gray' }}>Данных пункт, предназначен для создания расписания сотрудников.</span>
						<Select
							showSearch
							style={{ width: '100%', marginTop: '1vh' }}
							placeholder='Выбрать пользователя'
							optionFilterProp='children'
							filterOption={(input, option) => (option?.label ?? '').includes(input)}
							filterSort={(optionA, optionB) =>
								(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
							}
							options={listEmployeeWithSchedule}
						/>
					</div>
					<Card className='w-50'>
						<p style={{ fontSize: '2.5vh' }}>Информация о пользователе:</p>
						<div className='d-flex'>
							<div className='schedule_employee_info'>
								<p>ФИО:</p>
								<p>Должность:</p>
								<p>Дата наема:</p>
								<p>Номер телефона:</p>
								<p style={{ marginBottom: 0 }}>Зарплата: </p>
							</div>
							<div>
								<p>Алексев Алексей Алексеевич</p>
								<p>Ресепшн</p>
								<p>29.10.2023г.</p>
								<p>+7(990)909-90-90</p>
								<p>32.500 руб.</p>
							</div>
						</div>
					</Card>
				</div>
			</Card>
			<Card title='Настройка графика' style={{ marginTop: '3vh' }}>
				<div className='d-flex justify-content-between'>
					<Card className='d-flex ' style={{ width: '35%' }}>
						<div className='d-flex flex-column justify-content-between'>
							<div>
								<p style={{ marginBottom: 0, fontSize: '2.5vh' }}>Выбор графика работы:</p>
								<span style={{ color: 'gray' }}>
									Данных пункт, предназначен для выбора графика,
									<br /> через который будет работать сотрудник.
								</span>
							</div>
							<div className='d-flex justify-content-center' style={{ paddingTop: '5vh' }}>
								<Radio.Group size='large' defaultValue='a' buttonStyle='solid'>
									<Radio.Button value='a'>5/2</Radio.Button>
									<Radio.Button value='b'>2/2</Radio.Button>
									<Radio.Button value='c'>1/1</Radio.Button>
								</Radio.Group>
							</div>
						</div>
					</Card>
					<Card style={{ width: '60%' }}>
						<div className='d-flex flex-row justify-content-between'>
							<div className='d-flex flex-column justify-content-between'>
								<div>
									<p style={{ marginBottom: 0, fontSize: '2.5vh' }}>Выбор времени рабочего дня:</p>
									<span style={{ color: 'gray' }}>
										Данных пункт, предназначен для выбора времени,
										<br /> когда сотрудник будет работать.
									</span>
								</div>
								<TimePicker.RangePicker />
							</div>
							<div className='d-flex' style={{ marginLeft: '3vh' }}>
								<Card>
									<p style={{ marginBottom: 0, fontSize: '2.5vh' }}>Готовые настрйоки:</p>
									<span style={{ color: 'gray' }}>8 часовой день</span>
									<div className='d-flex flex-column'>
										<Button type='primary' style={{ marginBottom: '1vh' }}>
											C 8:00 до 16:00
										</Button>
										<Button type='primary'>C 13:00 до 21:00</Button>
									</div>
								</Card>
							</div>
						</div>
					</Card>
				</div>
				<Card style={{ marginTop: '3vh' }}>
					<p style={{ marginBottom: 0, fontSize: '2.5vh' }}>Выбор рабочих дней:</p>
					<span style={{ color: 'gray' }}>
						Данных пункт, предназначен для дней по которым <br />
						сотрудник будет работать с учетом его графика работы.
					</span>
					<div style={{ paddingTop: '3vh' }}>
						<span>Выбрано рабочих дней:</span> <Tag>2/5</Tag>
						<div className='schedule_weekday_card' style={{ paddingTop: '1vh' }}>
							<div>
								<p>Пн</p>
							</div>
							<div>
								<p>Вт</p>
							</div>
							<div className='schedule_weekday_card_selected'>
								<p>Ср</p>
							</div>
							<div>
								<p>Чт</p>
							</div>
							<div>
								<p>Пт</p>
							</div>
							<div>
								<p>Сб</p>
							</div>
							<div className='schedule_weekday_card_selected'>
								<p>Вс</p>
							</div>
						</div>
					</div>
				</Card>
			</Card>
			<div className='d-flex justify-content-end' style={{ marginTop: '3vh' }}>
				<Button type='primary'>Сохранить</Button>
			</div>
		</>
	)
}
