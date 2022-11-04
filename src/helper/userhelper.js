const bcrypt = require("bcryptjs");
const MessageConstant = require("../constant/messageconstant");

class UserHelper {
  constructor() {}

  comparePassword(candidatePassword, cryptPassword) {
    return bcrypt.compare(candidatePassword, cryptPassword);
  }

  checkUserDetails(user) {
    if (user.first_name === "" || user.first_name === undefined) {
      throw new Error(MessageConstant.NAME_REQUIRED);
    }
    if (user.email === "" || user.email === undefined) {
      throw new Error(MessageConstant.EMAIL_REQUIRED);
    }
    const emailValidation = this.checkEmail(user.email);
    if (!emailValidation) {
      throw new Error(MessageConstant.INVALID_EMAIL);
    }
    if (user.phone_number === "" || user.phone_number === undefined) {
      throw new Error(MessageConstant.PHONE_REQUIRED);
    }
    if (user.password === "" || user.password === undefined) {
      throw new Error(MessageConstant.PASSWORD_REQUIRED);
    }
    if (user.zipcode === "" || user.zipcode === undefined) {
      throw new Error(MessageConstant.ZIPCODE_REQUIRED);
    }
    return true;
  }

  checkEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkAdminUser(user) {
    if (user.password === "" || user.password === undefined) {
      throw new Error(MessageConstant.PASSWORD_REQUIRED);
    }
    if (user.email === "" || user.email === undefined) {
      throw new Error(MessageConstant.EMAIL_REQUIRED);
    }
    const emailValidation = this.checkEmail(user.email);
    if (!emailValidation) {
      throw new Error(MessageConstant.INVALID_EMAIL);
    }
  }

  checkemailonly(email) {
    const emailValidation = this.checkEmail(email);
    if (!emailValidation) {
      throw new Error(MessageConstant.INVALID_EMAIL);
    }
    return true;
  }

  generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
}

module.exports = new UserHelper();
