const responseHandler = require("../../handler/responsehandler");
const NotesModel = require("../../modal/note");
const Notedao = require("../../dao/Notedao");

class Gradeservice {
  constructor() {}

  async addNotedetails(payload) {
    try {
      let data = await NotesModel.create({
        note: payload.note,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async NoteAllDetails() {
    try {
      let data = await NotesModel.find({});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editNotedetails(id, payload) {
    try {
      let data = await Notedao.findAndUpdateNote(id, {
        payload,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewNotedetails(id) {
    try {
      let data = await NotesModel.findById({ _id: id });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteNotedetails(id) {
    try {
      let data = await Notedao.findAndDeleteNote(id, {});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Gradeservice();
