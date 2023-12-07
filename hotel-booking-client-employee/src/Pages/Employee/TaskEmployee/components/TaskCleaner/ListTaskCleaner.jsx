import React from 'react'
import { Divider } from 'antd'
import DataCleanerListTask from './DataCleanerListTask'

const ListTaskCleaner = (props) => {
	return (
		<div className='list-view' key={props.key}>
			<h4>Задачи уборщиков</h4>
			<DataCleanerListTask />
		</div>
	)
}

export default ListTaskCleaner
