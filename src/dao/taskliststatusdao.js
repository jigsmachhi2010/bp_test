const Taskliststatus_superadmin = require("../modal/Taskliststatus_superadmin");

class TasklisystatusDAO {
  constructor() {}

  findAndUpdateTaskliststatus(subjectId, userData) {
    return Taskliststatus_superadmin.findByIdAndUpdate(
      { _id: subjectId },
      userData.payload,
      {
        new: true,
      }
    );
  }

  findAndDeleteTaskliststatus(subjectId) {
    return Taskliststatus_superadmin.deleteOne(
      { _id: subjectId },
      {
        new: true,
      }
    );
  }
}

module.exports = new TasklisystatusDAO();
