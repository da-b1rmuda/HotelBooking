import React from 'react'
import { Modal, Card, Button, Input, Tag } from 'antd'
const { TextArea } = Input

const SelectRateModal = ({
	isModalOpen,
	setIsModalOpen,
	rate,
	selectedRoom,
	onChangeStep,
	setDataBooking,
	dataBooking
}) => {
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const nextStep = (item) => {
		console.log(item)
		setDataBooking({ ...dataBooking, rate: item })
		onChangeStep(1)
	}

	const filterRate = () => {
		let temp = []
		for (let i = 0; i < rate.length; i++) {
			if (rate[i].room_type === selectedRoom?.room_type) {
				temp.push(rate[i])
			}
		}
		return temp
	}

	let filter = filterRate()

	const itemRate = (item) => {
		if (item.discount !== null) {
			return item.rate - (item.rate / 100) * item.discount
		} else {
			return item.rate
		}
	}

	const rateMap = filter.map((item) => {
		return (
			<>
				<Card className='card-rate'>
					<div className='d-f'>
						<p>Название:</p>
						<span>{item.deal_name ? item.deal_name : 'Цена без акции'}</span>
					</div>
					<p>Описание:</p>
					<TextArea
						value={item.description ? item.description : 'Описание отсутствует'}
						readOnly={true}
						autoSize={{ minRows: 2 }}
					/>
					<div className='d-f card-price'>
						<p>Цена: </p>
						<Tag color={item.discount !== null ? 'green' : 'blue'}>{itemRate(item)} руб.</Tag>
						{item.discount !== null ? <Tag color='volcano'>-{item.discount}%</Tag> : null}
					</div>
					<div className='card-button'>
						<Button type='primary' onClick={() => nextStep(item)}>
							Выбрать
						</Button>
					</div>
				</Card>
			</>
		)
	})

	return (
		<Modal
			style={{ height: '100px' }}
			title='Выбор расценки'
			open={isModalOpen}
			onCancel={handleCancel}
			footer={[
				<Button key='back' onClick={handleCancel}>
					Отмена
				</Button>
			]}
		>
			<p>Пожалуйста выберите расценку для данной комнаты. С учетом скидки или без нее.</p>
			<div style={{ maxHeight: '50vh', overflowY: 'scroll', marginTop: '2vh' }}>{rateMap}</div>
		</Modal>
	)
}

export default SelectRateModal
