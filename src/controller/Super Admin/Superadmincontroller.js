const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const User = require("../../modal/user");
const UserHelper = require("../../helper/userhelper");
const bcrypt = require("bcryptjs");
const Superadminservices = require("../../service/Super admin/Superadminservices");
const moment = require("moment");
const fs = require("fs");
const CryptoJS = require("crypto-js");
const stripe_service = require("../../StripeService/stripe");
const { stripeDetailsForUsingApi } = require("../../helper/StripeDetails");
const SubscriptionPackageservice = require("../../service/Super admin/SubscriptionPackageservice");

class Superadmincontroller {
  constructor() {}

  async superadminlogin(req, res) {
    try {
      const userDetail = await Superadminservices.superadminlogin(req.body);
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
  async superadminforgetpassword(req, res) {
    try {
      const userDetail = await Superadminservices.forgetPassword(req.body, res);
      if (!userDetail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.INVALID_EMAIL,
          []
        );
      }
      console.log(userDetail, "userDetail");
      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.LINK_SEND_SUCCESSFULLY
      );
    } catch (error) {
      return responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async resetpassword(req, res) {
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
      const userDetail = await Superadminservices.resetpassword(req.body, user);

      if (!userDetail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.PASSWORD_RESET_SUCCESS,
        userDetail
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  // async resetUserpassword(req, res) {
  //   try {
  //     const userDetails = await userservice.resetUserpassword(req.body);
  //     if (!userDetails) {
  //       responseHandler.errorResponse(
  //         res,
  //         400,
  //         MessageConstant.SOMETHING_WRONG,
  //         []
  //       );
  //     }
  //     responseHandler.successResponse(
  //       res,
  //       200,
  //       MessageConstant.PASSWORD_RESET_SUCCESS,
  //       userDetails
  //     );
  //   } catch (error) {
  //     responseHandler.errorResponse(res, 400, error.message, []);
  //   }
  // }
  async superadminlogout(req, res) {
    try {
      const AdminDetails = req.user;
      const userDetail = await Superadminservices.superadminlogout(
        AdminDetails
      );
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

  async get_superadmin_profile(req, res) {
    try {
      let admin_details = req.user;
      // console.log(admin_details);
      // var decodedString = atob(admin_details.smtp_password);
      // admin_details.smtp_password = decodedString;
      responseHandler.successResponse(res, 200, "", admin_details);
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async update_admin_profile(req, res) {
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

      if (req.body.smtp_password) {
        req.body.smtp_password = CryptoJS.AES.encrypt(
          req.body.smtp_password,
          "secret key 123"
        ).toString();
        // req.body.smtp_password = btoa(req.body.smtp_password);
      }

      if (req.body.stripe_public_key) {
        req.body.stripe_public_key = CryptoJS.AES.encrypt(
          req.body.stripe_public_key,
          "secret key 123"
        ).toString();
      }

      if (req.body.stripe_secret_key) {
        req.body.stripe_secret_key = CryptoJS.AES.encrypt(
          req.body.stripe_secret_key,
          "secret key 123"
        ).toString();
      }

      // req body stripe public_key
      var de_stripe_public_key = CryptoJS.AES.decrypt(
        req.body.stripe_public_key,
        "secret key 123"
      );
      var original_stripe_public_key = de_stripe_public_key.toString(
        CryptoJS.enc.Utf8
      );

      // req body stripe secret_key
      var de_stripe_secret_key = CryptoJS.AES.decrypt(
        req.body.stripe_secret_key,
        "secret key 123"
      );
      var original_stripe_secret_key = de_stripe_secret_key.toString(
        CryptoJS.enc.Utf8
      );

      // req body stripe public_key get user
      var de_stripe_public_key_user = CryptoJS.AES.decrypt(
        req.user.stripe_public_key,
        "secret key 123"
      );
      var original_stripe_public_key_user = de_stripe_public_key_user.toString(
        CryptoJS.enc.Utf8
      );

      // req body stripe secret_key get user
      var de_stripe_secret_key_user = CryptoJS.AES.decrypt(
        req.user.stripe_secret_key,
        "secret key 123"
      );
      var original_stripe_secret_key_user = de_stripe_secret_key_user.toString(
        CryptoJS.enc.Utf8
      );

      await User.find({ _id: admin_details._id }).updateOne({
        ...req.body,
        file: filename,
      });

      if (
        original_stripe_public_key !== original_stripe_public_key_user ||
        original_stripe_secret_key !== original_stripe_secret_key_user
      ) {
        var product_data = await stripe_service.createProduct();

        let sub_pack_details =
          await SubscriptionPackageservice.SubscriptionALLDetails();

        const detail = await SubscriptionPackageservice.editSubscriptiondetails(
          sub_pack_details._id,
          {
            monthly_price_id: product_data.monthly_price_id,
            yearly_price_id: product_data.yearly_price_id,
            stripe_product_id: product_data.product_id,
          }
        );

        // console.log("detai;s", detail);
      }

      let updated_user = await User.find({ _id: admin_details._id });

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.SUPERADMIN_UPDATE_PROFILE,
        updated_user
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async change_password(req, res) {
    try {
      const admin_details = req.user;
      const comparePassword = await UserHelper.comparePassword(
        req.body.current_password,
        admin_details.password
      );

      if (!comparePassword) {
        throw new Error(MessageConstant.wrong_current_password);
      }
      if (req.body.new_password != req.body.confirm_new_password) {
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
        MessageConstant.password_changed,
        {}
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new Superadmincontroller();
