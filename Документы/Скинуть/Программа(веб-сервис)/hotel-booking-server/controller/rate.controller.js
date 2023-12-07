import RateService from '../service/rate.service.js';
const rateService = new RateService();

class RateController {
  async GetRate(req, res, next) {
    try {
      const response = await rateService.getRate();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async CreateRateRoom(req, res, next) {
    try {
      const { id_room_type, id_cancellation_policy, rate, id_rate } = req.body;
      await rateService.createRateRoom(id_room_type, id_cancellation_policy, rate, id_rate);
      return res.json('success');
    } catch (e) {
      next(e);
    }
  }
  async CreateRateDeal(req, res, next) {
    try {
      const { id_room_type, id_cancellation_policy, id_deal, rate } = req.body;
      await rateService.createRateDeal(id_room_type, id_cancellation_policy, id_deal, rate);
      return res.json('success');
    } catch (e) {
      next(e);
    }
  }
  async EditRate(req, res, next) {
    try {
      const { rate, id_room_type, id_cancellation_policy, id_deal, id_rate } = req.body;
      await rateService.editRate(rate, id_room_type, id_cancellation_policy, id_rate, id_deal);
      return res.json('Расценка изменена');
    } catch (e) {
      next(e);
    }
  }
  async DeleteRate(req, res, next) {
    try {
      const { id } = req.params;
      await rateService.deleteRate(id);
      return res.json('Расценка удалена');
    } catch (e) {
      next(e);
    }
  }
}

export default RateController;
