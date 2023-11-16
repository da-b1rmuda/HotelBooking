import $api from '../http';

export default class DealService {
  static async getDeal() {
    return await $api.get('/deal/getDeal');
  }
  static async createDeal(
    deal_number,
    deal_name,
    discount,
    start_date,
    end_date,
    id_room_type,
    id_status_deal,
    reservation_left,
    description,
  ) {
    return await $api.post('/deal/createDeal', {
      deal_number,
      deal_name,
      discount,
      start_date,
      end_date,
      id_room_type,
      id_status_deal,
      reservation_left,
      description,
    });
  }
  static async editDeal(
    deal_number,
    deal_name,
    discount,
    start_date,
    end_date,
    id_room_type,
    id_status_deal,
    reservation_left,
    description,
    id_deal,
  ) {
    return await $api.put('/deal/editDeal', {
      deal_number,
      deal_name,
      discount,
      start_date,
      end_date,
      id_room_type,
      id_status_deal,
      reservation_left,
      description,
      id_deal,
    });
  }
  static async deleteDeal(id_deal) {
    return await $api.delete(`/deal/deleteDeal/${id_deal}`);
  }
}
