const responseHandler = require("../handler/responsehandler");
const userservice = require("../service/userservice");
const MessageConstant = require("../constant/messageconstant");
const _ = require("lodash");
const User = require("../modal/user");
const messages = require("../helper/messages");
const UserHelper = require("../helper/userhelper");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
class UserController {
  constructor() {}

  // new register user
  async userRegister(req, res) {
    try {
      req
        .checkBody("name")
        .notEmpty()
        .withMessage("Please enter username.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid username.")
        .isLength({ max: 20 })
        .withMessage("Username should not be more than 20 Characters.");

      req
        .checkBody("phone_number")
        .notEmpty()
        .withMessage("Please enter phone number.")
        .matches(/[0-9]/)
        .withMessage("Please enter a valid username.")
        .isLength({ max: 10 })
        .withMessage("Username should not be more than 20 Characters.");

      req
        .checkBody("email")
        .notEmpty()
        .withMessage("Please enter email.")
        .isEmail()
        .withMessage("The email you have entered is invalid")
        .isLength({ max: 60 })
        .withMessage("Email id should not be more than 60 Characters.");

      req
        .checkBody("password")
        .notEmpty()
        .withMessage("Please enter password.")
        .isLength({ min: 8, max: 16 })
        .withMessage("The password must be 8 to 16 characters in length.");

      req.checkBody("is_admin").notEmpty();

      req.checkBody("is_superadmin").notEmpty();

      req.checkBody("user_status").notEmpty();

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      const userDetail = await userservice.userRegister(req.body, res);

      if (userDetail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.REGISTER_SUCCESS,
          userDetail
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // user login with token
  async userLogin(req, res) {
    try {
      const userDetail = await userservice.userLogin(req.body);

      if (!userDetail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.INVALID_DETAILS,
          []
        );
      }

      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.LOGIN_SUCCESS,
        userDetail
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // user forgot password
  async forgetPassword(req, res) {
    try {
      const userDetail = await userservice.forgetPassword(req.body);

      if (!userDetail) {
        responseHandler.errorResponse(
          res,
          400,
          MessageConstant.INVALID_EMAIL,
          []
        );
      }

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.LINK_SEND_SUCCESSFULLY
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // user reset password
  async resetPassword(req, res) {
    try {
      if (!req.body.reset_token) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.invalid_request,
          []
        );
      }

      const user = await User.findOne({
        "reset_tokens.reset_password_token.token": req.body.reset_token,
      });

      console.log("req.body.reset_token", req.body.reset_token, user._id);
      if (!user) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.invalid_request,
          []
        );
      }

      if (moment.now() > user.reset_tokens.reset_password_token.expiry) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.reset_password_request_expired,
          []
        );
      }

      const userDetails = await userservice.resetPassword(req.body, user);

      if (!userDetails) {
        responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.PASSWORD_RESET_SUCCESS,
        userDetails
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // user logout
  async userLogout(req, res) {
    try {
      const userDetail = await userservice.userLogout(req.user);

      if (!userDetail) {
        responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.LOGIN_SUCCESS,
        userDetail
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // get user details
  async getUserProfile(req, res) {
    try {
      const detail = await userservice.getAlldetails(req.user, res);

      responseHandler.successResponse(res, 200, "", detail);
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // update user details
  async updateUserProfile(req, res) {
    try {
      const admin_details = req.user;

      if (!admin_details) {
        if (req.file) {
          fs.unlinkSync(req.file?.path);
        }
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      if (!req.body?.logo && req.file) {
        if (req.file === undefined) {
          return responseHandler.errorResponse(
            res,
            400,
            MessageConstant.LOGO_MSG,
            errors
          );
        }
      }

      let filename = (await req.file) ? req.file?.filename : req.body.logo;

      await User.find({ _id: admin_details._id }).update({
        ...req.body,
        file: filename,
      });

      let updated_user = await User.find({ _id: admin_details._id });

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.UPDATE_USER_PROFILE,
        updated_user
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  // user change password
  async changePassword(req, res) {
    try {
      const admin_details = req.user;

      const comparePassword = await UserHelper.comparePassword(
        req.body.current_password,
        admin_details.password
      );

      if (!comparePassword) {
        throw new Error(MessageConstant.wrong_current_password);
      }

      if (req.body.new_password !== req.body.confirm_new_password) {
        throw new Error(MessageConstant.password_change_missmatch);
      }

      const password_salt = await bcrypt.genSaltSync(
        Number(process.env.SALT_ROUNDS)
      );

      const hash_password = await bcrypt.hashSync(
        req.body.new_password,
        password_salt
      );

      await User.find({ _id: admin_details._id }).update({
        password: hash_password,
      });

      responseHandler.successResponse(
        res,
        200,
        messages.admin.password_changed,
        {}
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new UserController();
