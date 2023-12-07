import React, {useState} from 'react'
import { List, Avatar } from 'antd'

const DataAdminListCancelReservation = ({guests}) => {
	const dataAdminListCancelReservation = [
		{
			idBooking: '224afb0f-fbb8-4436-90f0-146b1ceb54b5',
			description: 'Отмена по причине неприезда'
		}
	]
	//#region Functions
	const [keyBooking, setKeyBooking] = useState()
	const getKeyBooking = (idBooking) => {
		for (let i = 0; i < guests.length; i++) {
			if (guests[i].id_booking === idBooking) {
				return i
			}
		}
	}
	//#endregion
	return (
		<List
			className='demo-loadmore-list'
			itemLayout='horizontal'
			pagination={{ defaultPageSize: 5 }}
			dataSource={dataAdminListCancelReservation}
			renderItem={(item) => (
				<>
					{setKeyBooking(getKeyBooking(item.idBooking))}
					<List.Item actions={[<a key='list-loadmore-edit'>подробнее</a>]}>
						{/* <Skeleton avatar title={false} loading={item.loading} active> */}
						<List.Item.Meta
							avatar={<Avatar />}
							title={
								guests[keyBooking]?.last_name +
								' ' +
								guests[keyBooking]?.first_name +
								' ' +
								guests[keyBooking]?.father_name
							}
							description={item.description}
						/>
						{/* <div>content</div> */}
						{/* </Skeleton> */}
					</List.Item>
				</>
			)}
		/>
	)
}

export default DataAdminListCancelReservation
