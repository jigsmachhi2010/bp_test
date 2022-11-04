const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const Subjectservices = require("../../service/Super admin/Subjectservices");

class Subjectcontroller {
  constructor() {}

  async addSubjectdetails(req, res) {
    try {
      req
        .checkBody("subject_name")
        .notEmpty()
        .withMessage("Please enter subject name.");

      req
        .checkBody("description")
        .notEmpty()
        .withMessage("Please enter description.");

      const errors = req.validationErrors();

      const detail = await Subjectservices.addSubjectdetails(req.body);

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.SUBJECT_ADD,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async SubjectAllDetails(req, res) {
    try {
      const detail = await Subjectservices.SubjectAllDetails(req.body);

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

  async editSubjectdetails(req, res) {
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

      const detail = await Subjectservices.editSubjectdetails(
        req.params.id,
        req.body
      );

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.SUBJECT_UPDATE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewSubjectdetails(req, res) {
    try {
      const detail = await Subjectservices.viewSubjectdetails(req.params.id);

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

  async deleteSubjectdetails(req, res) {
    try {
      const detail = await Subjectservices.deleteSubjectdetails(
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
          MessageConstant.SUBJECT_DELETE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Subjectcontroller();
