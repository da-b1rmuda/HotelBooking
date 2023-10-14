import $api from '../http';

export default class RateService {
  static async getRate() {
    return await $api.get('/rate/getRate');
  }
  static async createRateRoom(id_room_type, id_cancellation_policy, rate) {
    return await $api.post('/rate/createRateRoom', {
      id_room_type,
      id_cancellation_policy,
      rate,
    });
  }
  static async createRateDeal(id_room_type, id_cancellation_policy, id_deal, rate) {
    return await $api.post('/rate/createRateDeal', {
      id_room_type,
      id_cancellation_policy,
      id_deal,
      rate,
    });
  }
  static async editRate(rate, id_room_type, id_cancellation_policy, id_deal, id_rate) {
    return await $api.put('/rate/editRate', {
      rate,
      id_room_type,
      id_cancellation_policy,
      id_deal,
      id_rate,
    });
  }
  static async deleteRate(id_rate) {
    return await $api.delete(`/rate/deleteRate/${id_rate}`);
  }
}
