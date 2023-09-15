import AdditionalsService from '../service/additionals.service.js';
import ApiError from '../exceptions/api-error.js';

const additionalsService = new AdditionalsService();

class AdditionalsController {
  //
  // Status room
  //
  async GetStatusRoom(req, res, next) {
    try {
      const response = await additionalsService.getStatusRoom();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async CreateStatusRoom(req, res, next) {
    try {
      const { status, color } = req.body;
      await additionalsService.createStatusRoom(status, color);
      return res.json('Статус добавлена');
    } catch (e) {
      next(e);
    }
  }
  async EditStatusRoom(req, res, next) {
    try {
      const { status, color, id_status } = req.body;
      await additionalsService.editStatusRoom(status, color, id_status);
      return res.json('Статус изменен');
    } catch (e) {
      next(e);
    }
  }
  async DeleteStatusRoom(req, res, next) {
    try {
      const { id } = req.params;
      await additionalsService.deleteStatusRoom(id);
      return res.json('Статус удален');
    } catch (e) {
      next(e);
    }
  }

  //
  // Facility room
  //
  async GetFacilityRoom(req, res, next) {
    try {
      const response = await additionalsService.getFacilityRoom();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async CreateFacilityRoom(req, res, next) {
    try {
      const { facility } = req.body;
      await additionalsService.createFacilityRoom(facility);
      return res.json('Услуга добавлена');
    } catch (e) {
      next(e);
    }
  }
  async EditFacilityRoom(req, res, next) {
    try {
      const { id_facility, facility } = req.body;
      await additionalsService.editFacilityRoom(id_facility, facility);
      return res.json('Услуга изменена');
    } catch (e) {
      next(e);
    }
  }
  async DeleteFacilityRoom(req, res, next) {
    try {
      const { id } = req.params;
      await additionalsService.deleteFacilityRoom(id);
      return res.json('Услуга удалена');
    } catch (e) {
      next(e);
    }
  }

  //
  // Facility сonnection 
  //
  async GetFacilityConnectionRoom(req, res, next) {
    try {
      const response = await additionalsService.getFacilityConnectionRoom();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  //
  // Type room
  //
  async GetTypeRoom(req, res, next) {
    try {
      const response = await additionalsService.getTypeRoom();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async CreateTypeRoom(req, res, next) {
    try {
      const { room_type } = req.body;
      await additionalsService.createTypeRoom(room_type);
      return res.json('Тип добавлен');
    } catch (e) {
      next(e);
    }
  }
  async EditTypeRoom(req, res, next) {
    try {
      const { id_room_type, room_type } = req.body;
      await additionalsService.editTypeRoom(id_room_type, room_type);
      return res.json('Тип изменен');
    } catch (e) {
      next(e);
    }
  }
  async DeleteTypeRoom(req, res, next) {
    try {
      const { id } = req.params;
      await additionalsService.deleteTypeRoom(id);
      return res.json('Тип удален');
    } catch (e) {
      next(e);
    }
  }
}

export default AdditionalsController;
