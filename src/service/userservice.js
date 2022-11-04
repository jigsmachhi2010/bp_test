const UserDao = require("../dao/userdao");
const MessageConstant = require("../constant/messageconstant");
const Userhelper = require("../helper/userhelper");
const utility = require("../lib/utility");
const bcrypt = require("bcryptjs");
const forgetpswHtmlString = require("../emailer/forgetpassword");
require("dotenv").config();
const emailHandler = require("../handler/emailhandler");
const crypto = require("crypto");
const User = require("../modal/user");
const moment = require("moment");
const responseHandler = require("../handler/responsehandler");
// const messages = require("../helper/messages");

class UserService {
  constructor() {}

  // new admin create
  async userRegister(payload, res) {
    try {
      let email = payload.email;

      const userEmail = await User.findOne({ email }).lean(); // Finding Email

      if (userEmail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.EMAIL_ALREDY_EXIST,
          []
        );
      }

      const hash = await bcrypt.hash(payload.password, 8);

      const newUser = await User.create({
        name: payload.name,
        phone_number: payload.phone_number,
        email: payload.email,
        password: hash,
        is_admin: payload.is_admin,
        is_superadmin: payload.is_superadmin,
        user_status: payload.user_status,
        permission: payload.permission,
      });

      console.log("payload", newUser);

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  // admin login
  async userLogin(payload) {
    Userhelper.checkAdminUser(payload);

    const user = await UserDao.findUserDetails({
      email: payload.email,
      is_admin: true,
    });

    if (!user) {
      throw new Error(MessageConstant.USER_NOT_REGISTERED);
    } else {
      const comparePassword = await Userhelper.comparePassword(
        payload.password,
        user.password
      );

      if (!comparePassword) {
        throw new Error(MessageConstant.INVALID_DETAILS);
      }

      const is_login = true;
      const token = utility.generateJwtToken(user._id);

      const updateUser = await UserDao.findAndUpdateUser(user._id, {
        is_login,
        token,
      });

      user.token = token;
      return user;
    }
  }

  // admin logout
  async userLogout(payload) {
    try {
      const token = "";

      const updateUser = await UserDao.findAndUpdateUser(payload._id, {
        token,
      });

      return updateUser;
    } catch (error) {
      throw new Error(MessageConstant.WRONG_ID);
    }
  }

  async getAlldetails(req, res) {
    try {
      let data = await User.find({ is_superadmin: { $ne: true } });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // forgot password for authentication
  async forgetPassword(request_data) {
    const user = await UserDao.findUserDetails({
      email: request_data.email,
    });

    const user1 = await UserDao.findUserDetails({
      is_superadmin: true,
    });

    if (!user) {
      return false;
    }

    var link = process.env.BASE_URL_ADMIN;
    var current_date = new Date().valueOf().toString();
    var random = Math.random().toString();

    let reset_password_token = crypto
      .createHash("sha1")
      .update(current_date + random)
      .digest("hex");

    const body = forgetpswHtmlString.Forgetpassword(
      link + "/admin/reset-password?token=" + reset_password_token
    );
    ///// Name of admin is used to send email to////

    await emailHandler.sendEmail(
      user.email,
      body,
      "Forget password",
      "",
      "",
      user1
    );
    let reset_token_data = {
      reset_tokens: {
        reset_password_token: {
          token: reset_password_token,
          expiry: moment().add(5, "minutes"),
        },
      },
    };

    await User.find({ _id: user._id }).update(reset_token_data);

    return true;
  }

  // reset password for user with authentication
  async resetPassword(payload, user) {
    console.log(payload, user);
    const salt = await bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hashSync(payload.new_password, salt);
    const password = hash;
    const updateUserPassword = await UserDao.findAndUpdateUser(user._id, {
      password,
    });
    return true;
  }
}

module.exports = new UserService();
