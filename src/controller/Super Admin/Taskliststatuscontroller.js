const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const Task_List_status = require("../../service/Super admin/Tasklistservices");

class Tasktypecontroller {
  constructor() {}

  async addTaskliststatusdetails(req, res) {
    try {
      req
        .checkBody("tasklist_status")
        .notEmpty()
        .withMessage("Please enter subject name.");

      req
        .checkBody("description")
        .notEmpty()
        .withMessage("Please enter description.");

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }
      const detail = await Task_List_status.addTaskliststatusdetails(req.body);

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.TASKLISTSTATUS_ADD,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async TaskliststatusAllDetails(req, res) {
    try {
      const detail = await Task_List_status.TaskliststatusAllDetails(req.body);

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.SUCCESS,
        detail
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editTaskliststatusdetails(req, res) {
    try {
      req
        .checkBody("tasklist_status")
        .notEmpty()
        .withMessage("Please enter subject name.");

      req
        .checkBody("description")
        .notEmpty()
        .withMessage("Please enter description.");

      //   req.checkBody("is_free").notEmpty();

      //   req.checkBody("monthly_price_id").notEmpty();

      //   req.checkBody("yearly_price_id").notEmpty();

      //   req.checkBody("trial_days").notEmpty();

      const errors = req.validationErrors();
      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      const detail = await Task_List_status.editTaskliststatusdetails(
        req.params.id,
        req.body
      );

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.TASKLISTSTATUS_UPDATE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewTaskliststatusdetails(req, res) {
    try {
      const detail = await Task_List_status.viewTaskliststatusdetails(
        req.params.id
      );

      if (!detail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      if (detail) {
        return responseHandler.successResponse(res, 200, "", detail);
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteTaskliststatusdetails(req, res) {
    try {
      const detail = await Task_List_status.deleteTaskliststatusdetails(
        req.params.id,
        req.body
      );

      if (!detail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.TASKLISTSTATUS_DELETE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Tasktypecontroller();
