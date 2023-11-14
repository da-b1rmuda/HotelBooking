import $api from '../http';

export default class QuerysService {
  static async getMostExpensiveBooking() {
    return await $api.get('/querys/getMostExpensiveBooking');
  }
  static async getFrequentlySelectedRoomAllTime() {
    return await $api.get('/querys/getFrequentlySelectedRoomAllTime');
  }
  static async getFrequentlySelectedRoomForMonth() {
    return await $api.get('/querys/getFrequentlySelectedRoomForMonth');
  }
  static async getAverageCheckPerDayThisMonth() {
    return await $api.get('/querys/getAverageCheckPerDayThisMonth');
  }
  static async getMostVisitedDay() {
    return await $api.get('/querys/getMostVisitedDay');
  }

  static async getRevenuePerMonth() {
    return await $api.get('/querys/getRevenuePerMonth');
  }
  static async getRoomInformation() {
    return await $api.get('/querys/getRoomInformation');
  }
  static async getVisitorsInThreeMonths() {
    return await $api.get('/querys/getVisitorsInThreeMonths');
  }
  static async getHowManyArrived() {
    return await $api.get('/querys/getHowManyArrived');
  }
  static async getHowManyLeft() {
    return await $api.get('/querys/getHowManyLeft');
  }
}
