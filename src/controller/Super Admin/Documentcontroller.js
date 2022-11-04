const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const Documentservices = require("../../service/Super admin/Documentservices");
const fs = require("fs");

class Documentcontroller {
  constructor() {}

  async addDocumentdetails(req, res) {
    try {
      req
        .checkBody("document_name")
        .notEmpty()
        .withMessage("Please enter subject name.");

      req
        .checkBody("description")
        .notEmpty()
        .withMessage("Please enter description.");

      const errors = req.validationErrors();

      if (errors) {
        if (req.file) {
          fs.unlinkSync(req.file?.path);
        }
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
        // return responseHandler.errorResponse(
        //   res,
        //   400,
        //   MessageConstant.SOMETHING_WRONG,
        //   errors
        // );
      }
      // if (errors) {

      // }

      if (!req.body?.document_files && req.file) {
        if (req.file === undefined) {
          return responseHandler.errorResponse(
            res,
            400,
            MessageConstant.LOGO_MSG,
            errors
          );
        }
      }

      let filename = (await req.file)
        ? req.file?.filename
        : req.body.document_files;
      const detail = await Documentservices.addDocumentdetails(
        req.body,
        filename
      );

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.DOCUMENT_ADD,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async documentAllDetails(req, res) {
    try {
      const detail = await Documentservices.documentAllDetails(req.body);

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

  async editDocumentdetails(req, res) {
    try {
      req
        .checkBody("document_name")
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
        if (req.file) {
          fs.unlinkSync(req.file?.path);
        }
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
        // return responseHandler.errorResponse(
        //   res,
        //   400,
        //   MessageConstant.SOMETHING_WRONG,
        //   errors
        // );
      }

      let data = await Documentservices.viewDocumentdetails(req.params.id);

      if (!req.body?.document_files && req.file) {
        if (req.file === undefined) {
          return responseHandler.errorResponse(
            res,
            400,
            MessageConstant.LOGO_MSG,
            errors
          );
        }
      }

      let filename = (await req.file)
        ? req.file?.filename
        : req.body.document_files;

      if (filename !== data.document_files) {
        if (fs.existsSync(`${process.env.UPLOAD_DIR}/${data.document_files}`)) {
          fs.unlinkSync(`${process.env.UPLOAD_DIR}/${data.document_files}`);
        }
      }
      const detail = await Documentservices.editDocumentdetails(
        req.params.id,
        req.body,
        filename
      );

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.DOCUMENT_UPDATE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewDocumentdetails(req, res) {
    try {
      const detail = await Documentservices.viewDocumentdetails(req.params.id);

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

  async deleteDocumentdetails(req, res) {
    try {
      const detail = await Documentservices.deleteDocumentdetails(
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
          MessageConstant.DOCUMENT_DELETE,
          detail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Documentcontroller();
