const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const Gradeservice = require("../../service/Super admin/Gradeservice");

class Gradecontroller {
  constructor() {}

  async addGradedetails(req, res) {
    try {
      req.checkBody("grade").notEmpty().withMessage("Please enter grade.");

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }
      const detail = await Gradeservice.addGradedetails(req.body);

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.GRADE_ADD,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async GradeAllDetails(req, res) {
    try {
      const detail = await Gradeservice.GradeAllDetails(req.body);

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

  async editGradedetails(req, res) {
    try {
      req.checkBody("grade").notEmpty().withMessage("Please enter grade.");

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      const detail = await Gradeservice.editGradedetails(
        req.params.id,
        req.body
      );

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.GRADE_UPDATE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewGradedetails(req, res) {
    try {
      const detail = await Gradeservice.viewGradedetails(req.params.id);

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

  async deleteGradedetails(req, res) {
    try {
      const detail = await Gradeservice.deleteGradedetails(
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
          MessageConstant.GRADE_DELETE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Gradecontroller();
