const Event_SuperadminModel = require("../../modal/event_superadmin");
const Userdao = require("../../dao/userdao");

class Eventservices {
  constructor() {}

  async addEventdetails(payload) {
    try {
      let data = await Event_SuperadminModel.create({
        event_name: payload.event_name,
        event_start: payload.event_start,
        event_end: payload.event_end,
        event_description: payload.event_description,
        event_color: payload.event_color
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getEventDetails() {
    try {
      let data = await Event_SuperadminModel.find({})

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getEventdetailsbyId(_id) {
    try {
      let data = await Event_SuperadminModel.findById({_id})

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }


  async editEventdetails(id, payload) {
    try {
      let data = await Userdao.findAndUpdateEventDetails(id, {
        payload,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteEventdetails(_id) {
    try {
      let data = await Event_SuperadminModel.findByIdAndDelete({_id})

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Eventservices();
