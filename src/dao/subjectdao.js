const subject = require("../modal/subject");
const subscriptionPackageModel = require("../modal/subscriptionPackage");
const UserModel = require("../modal/user");

class SubjectDAO {
  constructor() {}

  // findUserDetails(query) {
  //   return UserModel.findOne(query);
  // }

  // Admincreate(query) {
  //   return UserModel.create(query);
  // }

  // findAndUpdateUser(userId, userData) {
  //   return UserModel.findByIdAndUpdate({ _id: userId }, userData, {
  //     new: true,
  //   });
  // }

  findAndUpdateSubject(subjectId, userData) {
    // console.log(userData);
    return subject.findByIdAndUpdate({ _id: subjectId }, userData.payload, {
      new: true,
    });
  }

  findAndDeleteSubject(subjectId) {
    return subject.deleteOne(
      { _id: subjectId },
      {
        new: true,
      }
    );
  }
}

module.exports = new SubjectDAO();
