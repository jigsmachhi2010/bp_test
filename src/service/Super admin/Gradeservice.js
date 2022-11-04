const tasktypedao = require("../../dao/tasktypedao");
const responseHandler = require("../../handler/responsehandler");
const GradeModel = require("../../modal/grade");
const Gradedao = require("../../dao/Gradedao");

class Gradeservice {
  constructor() {}

  async addGradedetails(payload) {
    try {
      let data = await GradeModel.create({
        grade: payload.grade,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async GradeAllDetails() {
    try {
      let data = await GradeModel.find({});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editGradedetails(id, payload) {
    try {
      let data = await Gradedao.findAndUpdateGrade(id, {
        payload,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewGradedetails(id) {
    try {
      let data = await GradeModel.findById({ _id: id });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteGradedetails(id) {
    try {
      let data = await Gradedao.findAndDeleteGrade(id, {});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Gradeservice();
