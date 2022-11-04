const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const Noteservice = require("../../service/Super admin/Noteservice");

class Notecontroller {
  constructor() {}

  async addNotedetails(req, res) {
    try {
      req.checkBody("note").notEmpty().withMessage("Please enter note.");

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }
      const detail = await Noteservice.addNotedetails(req.body);

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.NOTE_ADD,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async NoteAllDetails(req, res) {
    try {
      const detail = await Noteservice.NoteAllDetails(req.body);

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

  async editNotedetails(req, res) {
    try {
      req.checkBody("note").notEmpty().withMessage("Please enter note.");

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      const detail = await Noteservice.editNotedetails(req.params.id, req.body);

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.NOTE_UPDATE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewNotedetails(req, res) {
    try {
      const detail = await Noteservice.viewNotedetails(req.params.id);

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

  async deleteNotedetails(req, res) {
    try {
      const detail = await Noteservice.deleteNotedetails(
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
          MessageConstant.NOTE_DELETE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Notecontroller();
