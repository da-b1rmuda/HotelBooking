import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Button, Card, Col, Row, Select, message, InputNumber, Input, Form } from 'antd'
import Loading from '../../components/Loading/Loading'
import { getConvertedDate, isEmpty } from '../../services/functionService'
import { dealCreateAction, dealEditAction, dealGetAction, resetMessagesAction } from '../../store/actions/dealAction'
const { TextArea } = Input
dayjs.extend(customParseFormat)
const dateFormat = 'DD.MM.YYYY'

export default function EmployeeCreate(props) {
	const onBackButton = () => {
		//Закрыть окно редактирования\добавления
		props.setOnCreateEmployee(false)
		//Изменяем статус редактирования
		// props.setOnEditDeal(false)
	}
	const [dataField, setDataField] = useState({
		numberDealf: '',
		nameDealf: '',
		discountDealf: null,
		dateStartf: '',
		dateEndf: '',
		typeRoomf: null,
		statusDealf: null,
		reservationLeftf: null,
		descriptionDealf: ''
	})
	const formItemLayout = {
		labelCol: {
			xs: {
				span: 24
			},
			sm: {
				span: 8
			}
		},
		wrapperCol: {
			xs: {
				span: 24
			},
			sm: {
				span: 16
			}
		}
	}

	const [form] = Form.useForm()
	const onFinish = (values) => {}
	const handleClick = () => {
		form.submit()
	}


	return (
		<>
			<h2>Добавление сотрудника</h2>
			<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
				Назад
			</Button>
			<Card>
				<h5 style={{ paddingBottom: '2vh' }}>Введите контакные данные сотрудника:</h5>
				<div className='d-flex justify-content-around'>
					<div style={{ width: '40%' }}>
						<Form
							{...formItemLayout}
							form={form}
							className='form-card-step-two'
							name='basic'
							onFinish={onFinish}
							autoComplete='off'
							style={{
								maxWidth: 600
							}}
							scrollToFirstError
						>
							<Form.Item
								label='Имя'
								name='name'
								rules={[
									{
										required: true,
										message: 'Пожалуйста введите имя!'
									}
								]}
							>
								<Input placeholder='Виктор' />
							</Form.Item>
							<Form.Item
								label='Фамилия'
								name='surname'
								rules={[
									{
										required: true,
										message: 'Пожалуйста введите фамилию!'
									}
								]}
							>
								<Input placeholder='Антипов' />
							</Form.Item>
							<Form.Item
								label='Отчество'
								name='fathername'
								rules={[
									{
										required: true,
										message: 'Пожалуйста введите отчество!'
									}
								]}
							>
								<Input placeholder='Александрович' />
							</Form.Item>
							<Form.Item
								label='E-mail'
								name='email'
								rules={[
									{
										type: 'email',
										message: 'Введена некорректная почта!'
									}
								]}
							>
								<Input placeholder='example@mail.ru' />
							</Form.Item>
							<Form.Item
								label='Номер телефона'
								name='phone'
								rules={[{ required: true, message: 'Пожалуйста введите номер телефона!' }]}
							>
								<Input addonBefore={'+7'} style={{ width: '100%' }} placeholder='(908)-908-08-08' />
							</Form.Item>
						</Form>
					</div>
					<div style={{ width: '40%' }}>
						<p>Загрузить аватар пользователя:</p>
						<div className='upload-user-avatar'><PlusOutlined/> <p>Загрузить изображение</p></div>
					</div>
				</div>
			</Card>
			<Card title='Выбериете должность' bordered={true}>
				<div className='addEmployee-card'>
					<div>
						<p>Технический персонал</p>
					</div>
					<div>
						<p>Администратор</p>
					</div>
					<div>
						<p>Ресепшн</p>
					</div>
					<div>
						<p>Горничный</p>
					</div>
					<div>
						<p>Повар</p>
					</div>
					<div>
						<p>Официант</p>
					</div>
					<div>
						<p>Портье</p>
					</div>
				</div>
			</Card>
			<Row gutter={20}>
				<Col span={4.5}>
					<Card title='Номер акции' bordered={true}>
						<InputNumber
							min={1000}
							max={9999}
							placeholder='Введите номер комнаты...'
							value={dataField.numberDealf}
							onChange={(e) => setDataField({ ...dataField, numberDealf: e })}
						/>
					</Card>
				</Col>
				<Col span={4.5}>
					<Card title='Название акции' bordered={true}>
						<Input
							showCount
							placeholder='Введите название акции...'
							maxLength={50}
							value={dataField.nameDealf}
							onChange={(e) => setDataField({ ...dataField, nameDealf: e.target.value })}
						/>
					</Card>
				</Col>
				<Col span={4.5}>
					<Card title='Скидка' bordered={true}>
						<InputNumber
							min={1}
							max={99}
							placeholder='Скидка...'
							value={dataField.discountDealf}
							onChange={(e) => setDataField({ ...dataField, discountDealf: e })}
						/>
					</Card>
				</Col>
				<Col span={4.5}>
					<Card title='Количество использований' bordered={true}>
						<InputNumber
							min={1}
							max={999}
							style={{ width: '40vh' }}
							placeholder='Введите количество использований...'
							value={dataField.reservationLeftf}
							onChange={(e) => setDataField({ ...dataField, reservationLeftf: e })}
						/>
					</Card>
				</Col>
				<Col span={4.5}>
					<Card title='Описание акции' bordered={true}>
						<TextArea
							showCount
							maxLength={250}
							value={dataField.descriptionDealf}
							style={{ width: '50vh', height: 120, resize: 'none' }}
							onChange={(e) => setDataField({ ...dataField, descriptionDealf: e.target.value })}
							placeholder='Описание акции...'
						/>
					</Card>
				</Col>
			</Row>
			<Button type='primary' onClick={() => onCreateRoom()}>
				{/* {props.onEditDeal ? 'Сохранить' : 'Создать'} */} Создать
			</Button>
		</>
	)
}
