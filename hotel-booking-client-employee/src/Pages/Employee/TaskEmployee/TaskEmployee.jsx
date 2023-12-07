import React, { useEffect, useState } from 'react'
import { Card, List, Avatar, Divider } from 'antd'
import '.././Employee.scss'
import { useDispatch, useSelector } from 'react-redux'
import { guestsGetAction } from '../../../store/actions/bookingAction'
import ListTaskAdmin from './components/TaskAdmin/ListTaskAdmin'
import CardEmployee from './components/TaskAdmin/CardEmployee'
import ListTaskCleaner from './components/TaskCleaner/ListTaskCleaner'

export default function TaskEmployee() {
	const [selectedRole, setSelectedRole] = useState('')
	// #region Data load
	const dispatch = useDispatch()
	const { guests } = useSelector((state) => state.bookingStore)
	useEffect(() => {
		if (selectedRole === 'Администраторы') {
			dispatch(guestsGetAction())
			console.log(guests)
		}
	}, [selectedRole])
	// #endregion

	//#region Functions
	const selectList = (role) => {
		switch (role) {
			case 'Администраторы':
				return <ListTaskAdmin key={role} guests={guests} />
			case 'Уборщики':
				return <ListTaskCleaner key={role} guests={guests} />
			default:
				break
		}
	}
	//#endregion

	return (
		<>
			<h2>Задачи сотрудников</h2>
			<div>
				<Card>
					<div className='block-chart-task'>
						<CardEmployee
							employee={['Администраторы', 'Регистраторы', 'Портье']}
							color={['#244CBB', '#225677', '#62B5C3']}
							setSelectedRole={setSelectedRole}
						/>
					</div>
					<div className='block-chart-task'>
						<CardEmployee
							employee={['Уборщики', 'Технический персонал', 'Снабженцы']}
							color={['#C8DBEE', '#91BCED', '#3D70D4']}
							setSelectedRole={setSelectedRole}
						/>
					</div>
					<div style={{ paddingTop: '4vh' }}>{selectList(selectedRole)}</div>
				</Card>
			</div>
		</>
	)
}
