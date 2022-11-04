const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const Eventservices = require("../../service/Super admin/Eventservices");

class Eventcontroller {
  constructor() {}

  async addEventdetails(req, res) {
    try {
      req
        .checkBody("event_name")
        .notEmpty()
        .withMessage("Please enter event name.");

      req
        .checkBody("event_start")
        .notEmpty()
        .withMessage("Please enter event start date.");

      req
        .checkBody("event_end")
        .notEmpty()
        .withMessage("Please enter event end date.");

      req
        .checkBody("event_description")
        .notEmpty()
        .withMessage("Please enter event description.");

      req
        .checkBody("event_color")
        .notEmpty()
        .withMessage("Please select event color.");

      const errors = req.validationErrors();

      const detail = await Eventservices.addEventdetails(req.body);

      if (errors) {
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
          MessageConstant.EVENT_ADD,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getEventDetails(req, res) {
    try {
      const detail = await Eventservices.getEventDetails(req.body);

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

  async getEventdetailsbyId(req, res) {
    try {
      const detail = await Eventservices.getEventdetailsbyId(req.params.id);

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

  async editEventdetails(req, res) {
    try {
      req
        .checkBody("event_name")
        .notEmpty()
        .withMessage("Please enter event name.");

      req
        .checkBody("event_start")
        .notEmpty()
        .withMessage("Please enter event start date.");

      req
        .checkBody("event_end")
        .notEmpty()
        .withMessage("Please enter event end date.");

      req
        .checkBody("event_description")
        .notEmpty()
        .withMessage("Please enter event description.");

      req
        .checkBody("event_color")
        .notEmpty()
        .withMessage("Please select event color.");

      const errors = req.validationErrors();

      const detail = await Eventservices.editEventdetails(
        req.params.id,
        req.body
      );

      if (errors) {
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
          MessageConstant.EVENT_UPDATED,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteEventdetails(req, res) {
    try {
      const detail = await Eventservices.deleteEventdetails(req.params.id);

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.EVENT_DELETE,
        detail
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Eventcontroller();
