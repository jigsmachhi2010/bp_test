const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const Subjectservices = require("../../service/Super admin/Subjectservices");
const Tasktypeservices = require("../../service/Super admin/Tasktypeservices");

class Tasktypecontroller {
  constructor() {}

  async addTasktypedetails(req, res) {
    try {
      req
        .checkBody("task_type")
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
      const detail = await Tasktypeservices.addTasktypedetails(req.body);

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.TASKTYPE_ADD,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async TasktypeAllDetails(req, res) {
    try {
      const detail = await Tasktypeservices.TasktypeAllDetails(req.body);

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

  async editTasktypedetails(req, res) {
    try {
      req
        .checkBody("subject_name")
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

      const detail = await Tasktypeservices.editTasktypedetails(
        req.params.id,
        req.body
      );

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.TASKTYPE_UPDATE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewTasktypedetails(req, res) {
    try {
      const detail = await Tasktypeservices.viewTasktypedetails(req.params.id);

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

  async deleteTasktypedetails(req, res) {
    try {
      const detail = await Tasktypeservices.deleteTasktypedetails(
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
          MessageConstant.TASKTYPE_DELETE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Tasktypecontroller();
