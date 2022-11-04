const NoteModel = require("../modal/note");

class NoteDAO {
  constructor() {}

  findAndUpdateNote(id, userData) {
    return NoteModel.findByIdAndUpdate({ _id: id }, userData.payload, {
      new: true,
    });
  }

  findAndDeleteNote(id) {
    return NoteModel.deleteOne(
      { _id: id },
      {
        new: true,
      }
    );
  }
}

module.exports = new NoteDAO();
