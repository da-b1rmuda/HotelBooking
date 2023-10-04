import DealService from '../service/deal.service.js';
const dealService = new DealService();

class DealController {
  async GetDeal(req, res, next) {
    try {
      const response = await dealService.getDeal();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async CreateDeal(req, res, next) {
    try {
      const {
        deal_number,
        deal_name,
        discount,
        start_date,
        end_date,
        id_room_type,
        id_status_deal,
        reservation_left,
        description,
      } = req.body;
      await dealService.createDeal(
        deal_number,
        deal_name,
        discount,
        start_date,
        end_date,
        id_room_type,
        id_status_deal,
        reservation_left,
        description,
      );
      return res.json('success');
    } catch (e) {
      next(e);
    }
  }
  async EditDeal(req, res, next) {
    try {
      const {
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
      } = req.body;
      console.log(deal_number,
        deal_name,
        discount,
        start_date,
        end_date,
        id_room_type,
        id_status_deal,
        reservation_left,
        description,)
      await dealService.editDeal(
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
      );
      return res.json('Ацкия изменена');
    } catch (e) {
      next(e);
    }
  }
  async DeleteDeal(req, res, next) {
    try {
      const { id } = req.params;
      await dealService.deleteDeal(id);
      return res.json('Акция удалена');
    } catch (e) {
      next(e);
    }
  }
}

export default DealController;
