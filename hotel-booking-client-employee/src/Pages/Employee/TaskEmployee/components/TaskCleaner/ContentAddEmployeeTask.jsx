import React, { useCallback, useEffect, useState } from 'react'
import { Select, Button } from 'antd'

export default function ContentAddEmployeeTask({ status, addTaskEmployee }) {
	const [view, setView] = useState(true)
	const updateItem = useCallback(() => {
		setView(addTaskEmployee)
	}, [])
	const listCleanerEmployee = [
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

	switch (status) {
		case 'Не назначена':
			return (
				view && (
					<div className='d-flex'>
						<div style={{ width: '50%' }}>
							<p>Выберите сотрудника</p>
							<Select
								showSearch
								style={{ width: '100%', marginTop: '1vh' }}
								placeholder='Выбрать работника'
								optionFilterProp='children'
								filterOption={(input, option) => (option?.label ?? '').includes(input)}
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
								}
								options={listCleanerEmployee}
							/>
						</div>
						<div className='d-flex align-items-end' style={{ width: '50%', paddingLeft: '2vh' }}>
							<Button type='primary' onClick={updateItem}>
								Сохранить
							</Button>
						</div>
					</div>
				)
			)

		default:
			break
	}
}
