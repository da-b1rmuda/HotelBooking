import React, { useState, useEffect, useRef } from 'react'
import {
	SearchOutlined,
	FilterOutlined,
	MoreOutlined,
	InfoCircleOutlined,
	ExclamationCircleFilled
} from '@ant-design/icons'
import { Button, Input, Radio, Table, Tag, Space, Dropdown, Tooltip, Modal, message } from 'antd'
import { isEmpty } from '../../services/functionService.js'
import { useDispatch, useSelector } from 'react-redux'
import {
	BookingDeleteAction,
	guestsGetAction,
	makeGuestCheckOutAction,
	resetMessagesAction
} from '../../store/actions/bookingAction'
import { getConvertedDate, getListFilter } from '../../services/functionService.js'
import Loading from '../../components/Loading/Loading.jsx'
import EmployeeCreate from './EmployeeCreate.jsx'

export default function AllEmployee() {
	//serach
	const [searchText, setSearchText] = useState('')
	const [selectedRow, setSelectedRow] = useState()
	const [items, setItems] = useState([])
	const [data, setDate] = useState([])
	const [onCreateEmployee, setOnCreateEmployee] = useState(false)
	const handleChange = (pagination, filters, sorter) => {
		// setFilteredInfo(filters)
		// setSortedInfo(sorter)
	}
	let columnsGuest = [
		{
			title: '№ Сотрудника',
			dataIndex: 'numberGuest',
			key: 'numberGuest'
		},
		{
			title: 'Фамилия',
			dataIndex: 'lastName',
			key: 'lastName'
		},
		{
			title: 'Должность',
			dataIndex: 'numberRoom',
			key: 'numberRoom'
		},
		{
			title: 'Зарплата',
			dataIndex: 'amountPaid',
			key: 'amountPaid'
		},
		{
			title: 'Номер телефона',
			dataIndex: 'statusGuestRoom',
			key: 'statusGuestRoom'
		},
		items.length > 0
			? {
					title: '',
					key: 'action',
					render: (_, record) => (
						<Space size='large'>
							<Dropdown menu={{ items, onClick, record }} trigger={['click']}>
								<Space>
									<Button onClick={() => setSelectedRow(record.idGuest)} shape='circle' icon={<MoreOutlined />} />
								</Space>
							</Dropdown>
						</Space>
					)
			  }
			: {}
	]

	return (
		<>
			{!onCreateEmployee ? (
				<>
					<div className='d-flex justify-content-between'>
						<h2>Все сотрудники</h2>
						<Button size='large' type='primary' onClick={() => setOnCreateEmployee(true)}>
							Добавить сотрудника
						</Button>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex'>
							<Radio.Group defaultValue='a' size='large'>
								<Radio.Button value='a'>Все</Radio.Button>
								<Radio.Button value='b'>Технический персонал</Radio.Button>
								<Radio.Button value='c'>Администратор</Radio.Button>
								<Radio.Button value='d'>Ресепшн</Radio.Button>
								<Radio.Button value='e'>Горничный</Radio.Button>
								<Radio.Button value='f'>Повар</Radio.Button>
								<Radio.Button value='g'>Официант</Radio.Button>
								<Radio.Button value='h'>Портье</Radio.Button>
							</Radio.Group>
						</div>
						<div className='d-f'>
							<Input
								size={'large'}
								style={{ width: '16vw' }}
								placeholder='Поиск...'
								prefix={<SearchOutlined />}
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
						</div>
					</div>
					<Table
						pagination={{
							pageSize: 6
						}}
						style={{ marginTop: '10px' }}
						columns={columnsGuest}
						dataSource={isEmpty(data) ? [] : data}
						onChange={handleChange}
					/>
				</>
			) : (
				<EmployeeCreate setOnCreateEmployee={setOnCreateEmployee}/>
			)}
		</>
	)
}
