const tasktypedao = require("../../dao/tasktypedao");
const responseHandler = require("../../handler/responsehandler");
const Taskliststatus_superadmin = require("../../modal/Taskliststatus_superadmin");
const taskliststatusdao = require("../../dao/taskliststatusdao");

class SubscriptionPackageservice {
  constructor() {}

  async addTaskliststatusdetails(payload) {
    try {
      let data = await Taskliststatus_superadmin.create({
        tasklist_status: payload.tasklist_status,
        description: payload.description,
        // yearly_price: payload.yearly_price,
        // package_info: payload.package_info,
        // is_free: payload.is_free,
        // monthly_price_id: payload.monthly_price_id,
        // yearly_price_id: payload.yearly_price_id,
        // trial_days: payload.trial_days,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async TaskliststatusAllDetails() {
    try {
      let data = await Taskliststatus_superadmin.find({});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editTaskliststatusdetails(id, payload) {
    try {
      let data = await taskliststatusdao.findAndUpdateTaskliststatus(id, {
        payload,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewTaskliststatusdetails(id) {
    try {
      let data = await Taskliststatus_superadmin.findById({ _id: id });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteTaskliststatusdetails(id, payload) {
    try {
      let data = await taskliststatusdao.findAndDeleteTaskliststatus(id, {});

      return data;
    } catch (error) {
      // console.log(error);
      // return error;
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new SubscriptionPackageservice();
