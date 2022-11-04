const tasktypedao = require("../../dao/tasktypedao");
const task_type_superadmin = require("../../modal/task_type_superadmin");
const responseHandler = require("../../handler/responsehandler");

class SubscriptionPackageservice {
  constructor() {}

  async addTasktypedetails(payload) {
    try {
      let data = await task_type_superadmin.create({
        task_type: payload.task_type,
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

  async TasktypeAllDetails() {
    try {
      let data = await task_type_superadmin.find({});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editTasktypedetails(id, payload) {
    try {
      let data = await tasktypedao.findAndUpdateTasktype(id, {
        payload,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewTasktypedetails(id) {
    try {
      let data = await task_type_superadmin.findById({ _id: id });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteTasktypedetails(id, payload) {
    try {
      let data = await tasktypedao.findAndDeleteTasktype(id, {});

      return data;
    } catch (error) {
      // console.log(error);
      // return error;
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new SubscriptionPackageservice();
