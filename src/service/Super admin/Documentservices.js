const tasktypedao = require("../../dao/tasktypedao");
const responseHandler = require("../../handler/responsehandler");
const Taskliststatus_superadmin = require("../../modal/Taskliststatus_superadmin");
const taskliststatusdao = require("../../dao/taskliststatusdao");
const document_superadmin = require("../../modal/document_superadmin");
const documentdao = require("../../dao/documentdao");

class SubscriptionPackageservice {
  constructor() {}

  async addDocumentdetails(payload, filename) {
    try {
      console.log("payload", payload, filename);
      let data = await document_superadmin.create({
        document_name: payload.document_name,
        description: payload.description,
        document_files: filename,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async documentAllDetails() {
    try {
      let data = await document_superadmin.find({});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editDocumentdetails(id, payload, filename) {
    try {
      let data = await documentdao.findAndUpdateDocument(id, {
        payload,
        filename,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewDocumentdetails(id) {
    try {
      let data = await document_superadmin.findById({ _id: id });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteDocumentdetails(id, payload) {
    try {
      let data = await documentdao.findAndDeleteDocument(id, {});

      return data;
    } catch (error) {
      // console.log(error);
      // return error;
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new SubscriptionPackageservice();
