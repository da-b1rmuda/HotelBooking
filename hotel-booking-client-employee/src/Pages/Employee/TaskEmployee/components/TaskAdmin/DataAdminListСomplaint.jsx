import { List, Avatar } from 'antd'
import { useState } from 'react'
import AdminListComplaintModal from './AdminListComplaintModal'

const DataAdminListСomplaint = ({ guests }) => {
	const [modalOpen, setModalOpen] = useState(false)
	const dataAdminListСomplaint = [
		{
			name: 'Пупа лупа',
			title: 'Э админ толчок грязный, иди слижи'
		},
		{
			name: 'name',
			title: 'title'
		},
		{
			name: 'name',
			title: 'title'
		},
		{
			name: 'name',
			title: 'title'
		}
	]
	return (
		<>
			<AdminListComplaintModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
			<List
				className='demo-loadmore-list'
				itemLayout='horizontal'
				pagination={{ defaultPageSize: 5 }}
				dataSource={dataAdminListСomplaint}
				renderItem={(item) => (
					<List.Item
						actions={[
							<a key='list-loadmore-edit' onClick={() => setModalOpen(true)}>
								подробнее
							</a>
						]}
					>
						{/* <Skeleton avatar title={false} loading={item.loading} active> */}
						<List.Item.Meta avatar={<Avatar />} title={item.name} description={item.title} />
						{/* <div>content</div> */}
						{/* </Skeleton> */}
					</List.Item>
				)}
			/>
		</>
	)
}
export default DataAdminListСomplaint
