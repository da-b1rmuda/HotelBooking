import { Modal, Button, Avatar, Divider, Input } from 'antd'
import React, { useState } from 'react'
import AdminReferenceModal from './AdminReferenceModal'

const { TextArea } = Input

export default function AdminListComplaintModal({ setModalOpen, modalOpen }) {
	const [adminReferenceModal, setAdminReferenceModal] = useState(false)
	const handleOk = () => {}
	const handleReference = () => {
		setAdminReferenceModal(true)
	}
	const handleCancel = () => {
		setModalOpen(false)
	}
	return (
		<>
			<AdminReferenceModal adminReferenceModal={adminReferenceModal} setAdminReferenceModal={setAdminReferenceModal} />
			<Modal
				open={modalOpen}
				title={'Разбор жалобы/притензии'}
				onOk={handleOk}
				onCancel={handleCancel}
				width={'60vw'}
				footer={[
					<Button key='back' onClick={handleReference}>
						Справка
					</Button>,
					<Button key='back' onClick={handleCancel}>
						Отмена
					</Button>,
					<Button key='submit' type='primary' onClick={handleOk}>
						Закрыть жалобу/притензию
					</Button>
				]}
			>
				<>
					<div className='complaint-modal__guest'>
						<div className='d-flex'>
							<Avatar />
							<div style={{ paddingLeft: '1vh' }}>
								<p>Пупа Лупа Александрович</p>
								<div className='d-flex'>
									<p style={{ paddingRight: '1vh', color: 'gray' }}>Номер комнаты:</p>
									<span>413</span>
								</div>
								<div className='d-flex'>
									<p style={{ paddingRight: '1vh', color: 'gray', margin: 0 }}>Номер телефона:</p>
									<span>+7(900)900-90-90</span>
								</div>
							</div>
						</div>
						<div className='d-flex'>
							<p style={{ paddingRight: '1vh', color: 'gray' }}>Дата подачи:</p>
							<p>07.12.2023г. 12:00</p>
						</div>
					</div>
					<div>
						<Divider orientation='left'>Заголовк</Divider>
						<Input readOnly={true} value={'Э админ толчок грязынй'}></Input>
						<Divider orientation='left'>Описание</Divider>
						<TextArea
							readOnly={true}
							rows={6}
							autoSize={{ minRows: 2, maxRows: 6 }}
							value={
								'Пришел я крч в номер, и сразу зайдя в толчок я увидел, что он весь в черкашах, админ ты чо не уважаешь меня?!'
							}
						/>
						<Divider orientation='left'>Ответ (необязательно)</Divider>
						<TextArea
							showCount
							maxLength={500}
							rows={6}
							autoSize={{ minRows: 2, maxRows: 6 }}
							placeContent={'Ответ гостю на его жалобу/притензию'}
							style={{ marginBottom: '2vh' }}
						/>
					</div>
				</>
			</Modal>
		</>
	)
}
