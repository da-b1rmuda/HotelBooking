import React, { useState, useCallback } from 'react'
import { List, Tag, Button, Select } from 'antd'
import ContentAddEmployeeTask from './ContentAddEmployeeTask'

const DataCleanerListTask = () => {
	const [addTaskEmployee, setAddTaskEmployee] = useState(false)
	const dataCleanerTasks = [
		{
			id: '231',
			title: 'Уборка комнаты',
			description: 'В комнате 431 пролили кофе, нужно прибраться.',
			status: 'Не назначена',
			color: 'red'
		},
		{
			id: '231',
			title: 'Уборка комнаты',
			description: 'В комнате 431 пролили кофе, нужно прибраться.',
			status: 'Не назначена',
			color: 'red'
		},
		{
			id: '831',
			title: 'Уборка хола',
			description: 'Один из посетителей разбил вазу, нужно убрать осколки.',
			status: 'Выполнена',
			color: 'blue'
		},
		{
			id: '561',
			title: 'Уборка туалетов',
			description: 'В туалете для сотрудников, на 2 этаже, грязный пол.',
			status: 'Выполняется',
			color: 'green'
		}
	]
	const setListActions = (item) => {
		let list = [<Tag color={item.color}>{item.status}</Tag>]
		switch (item.status) {
			case 'Выполняется':
				list.unshift(<Button>Завершить</Button>)
				list.unshift(
					<div className='list-employee-complete'>
						<p>Выполняет:</p>
						<p>Давыдов Петр Сергеевич</p>
					</div>
				)
				return list
			case 'Выполнена':
				list.unshift(
					<div className='list-employee-complete'>
						<p>Выполнил:</p>
						<p>Понамарев Виктор Александрович</p>
					</div>
				)
				return list
			case 'Не назначена':
				list.unshift(
					<div className='list-employee-complete'>
						<Button onClick={() => setAddTaskEmployee(!addTaskEmployee)}>
							{addTaskEmployee ? 'Отмена' : 'Назначить'}
						</Button>
					</div>
				)
				return list
			default:
				break
		}
	}

	return (
		<List
			className='cleaner-list-task'
			itemLayout='vertical'
			pagination={{ defaultPageSize: 5 }}
			dataSource={dataCleanerTasks}
			renderItem={(item) => (
				<List.Item extra={setListActions(item)}>
					{/* <Skeleton avatar title={false} loading={item.loading} active> */}
					<List.Item.Meta avatar={'#' + item.id} title={item.title} description={item.description} />
					<ContentAddEmployeeTask status={item.status} addTaskEmployee={addTaskEmployee} />
					{/* </Skeleton> */}
				</List.Item>
			)}
		/>
	)
}

export default DataCleanerListTask
