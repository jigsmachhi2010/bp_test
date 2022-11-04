const task_type_superadmin = require("../modal/task_type_superadmin");

class TasktypeDAO {
  constructor() {}

  findAndUpdateTasktype(subjectId, userData) {
    return task_type_superadmin.findByIdAndUpdate(
      { _id: subjectId },
      userData.payload,
      {
        new: true,
      }
    );
  }

  findAndDeleteTasktype(subjectId) {
    return task_type_superadmin.deleteOne(
      { _id: subjectId },
      {
        new: true,
      }
    );
  }
}

module.exports = new TasktypeDAO();
