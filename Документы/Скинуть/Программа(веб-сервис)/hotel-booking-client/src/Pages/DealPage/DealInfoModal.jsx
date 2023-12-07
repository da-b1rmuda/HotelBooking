import React from 'react';
import { Modal, Button } from 'antd';
import './DealPage.css';

const DealInfoModal = ({ deal, selectedRow, isModalInfoOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let dealSelected;
  for (let i = 0; i < deal.length; i++) {
    if (deal[i].id_deal === selectedRow) {
      dealSelected = i;
    }
  }

  return (
    <Modal
      title={deal[dealSelected]?.deal_name}
      open={isModalInfoOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          OK
        </Button>,
      ]}>
      <hr />
      <div className="modalInfo_text">
        <p>Название акции: {deal[dealSelected]?.deal_name}</p>
        <p>Скидка акции: {deal[dealSelected]?.discount}%</p>
        <p>Дата начала акции: {deal[dealSelected]?.start_date}г.</p>
        <p>Дата конца акции: {deal[dealSelected]?.end_date}г.</p>
        <p>Тип комнаты: {deal[dealSelected]?.room_type}</p>
        <p>Статус акции: {deal[dealSelected]?.status_deal}</p>
        <p>Использований осталось: {deal[dealSelected]?.reservation_left}</p>
        <p>Описание акции: {deal[dealSelected]?.description}</p>
      </div>
    </Modal>
  );
};

export default DealInfoModal;
