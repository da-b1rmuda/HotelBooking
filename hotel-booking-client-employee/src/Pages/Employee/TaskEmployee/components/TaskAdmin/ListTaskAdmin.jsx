import React from 'react'
import DataAdminListCancelReservation from './DataAdminListCancelReservation'
import DataAdminListСomplaint from './DataAdminListСomplaint'
import { Divider } from 'antd'

const ListTaskAdmin = (props) => {
	return (
		<div className='list-view' key={props.key}>
			<h4>Задачи администратора</h4>
			<Divider orientation='left'>Жалобы и притензии</Divider>
			<DataAdminListСomplaint guests={props.guests}/>
			<Divider orientation='left'>Отмена бронирования</Divider>
			<DataAdminListCancelReservation guests={props.guests}/>
			<Divider orientation='left'>Приход / Уход сотрудников (концепт)</Divider>
		</div>
	)
}

export default ListTaskAdmin
