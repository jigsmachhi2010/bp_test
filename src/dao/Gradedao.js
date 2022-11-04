const GradeModel = require("../modal/grade");

class GradeDAO {
  constructor() {}

  findAndUpdateGrade(id, userData) {
    return GradeModel.findByIdAndUpdate({ _id: id }, userData.payload, {
      new: true,
    });
  }

  findAndDeleteGrade(id) {
    return GradeModel.deleteOne(
      { _id: id },
      {
        new: true,
      }
    );
  }
}

module.exports = new GradeDAO();
