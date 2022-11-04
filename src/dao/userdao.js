const eventModel = require("../modal/event_superadmin");
const subscriptionPackageModel = require("../modal/subscriptionPackage");
const UserModel = require("../modal/user");

class UserDAO {
  constructor() {}

  findUserDetails(query) {
    return UserModel.findOne(query);
  }

  Admincreate(query) {
    return UserModel.create(query);
  }

  SubscriptionCreate(query) {
    return subscriptionPackageModel.create(query);
  }

  findAndUpdateUser(userId, userData) {
    return UserModel.findByIdAndUpdate({ _id: userId }, userData, {
      new: true,
    });
  }

  findAndUpdateSubscriptionDetails(userId, userData) {
    return subscriptionPackageModel.findByIdAndUpdate(
      { _id: userId },
      userData.payload,
      {
        new: true,
      }
    );
  }

  findAndUpdateEventDetails(userId, userData) {
    return eventModel.findByIdAndUpdate(
      { _id: userId },
      userData.payload,
      {
        new: true,
      }
    );
  }

  newpassword(query) {
    query["deleted_at"] = null;
    // query["password"] = null;
    return UserModel.find(query);
  }
}

module.exports = new UserDAO();
