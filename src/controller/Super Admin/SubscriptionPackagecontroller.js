const responseHandler = require("../../handler/responsehandler");
const MessageConstant = require("../../constant/messageconstant");
const SubscriptionPackageservice = require("../../service/Super admin/SubscriptionPackageservice");
const stripe_service = require("../../StripeService/stripe");

class SubscriptionPackageController {
  constructor() {}

  // async addSubscriptiondetails(req, res) {
  //   try {
  //     req
  //       .checkBody("name")
  //       .notEmpty()
  //       .withMessage("Please enter subscription name.");

  //     req
  //       .checkBody("monthly_price")
  //       .notEmpty()
  //       .withMessage("Please enter monthly_price.");

  //     req
  //       .checkBody("yearly_price")
  //       .notEmpty()
  //       .withMessage("Please enter yearly_price.");

  //     //   req.checkBody("is_free").notEmpty();

  //     //   req.checkBody("monthly_price_id").notEmpty();

  //     //   req.checkBody("yearly_price_id").notEmpty();

  //     //   req.checkBody("trial_days").notEmpty();

  //     const errors = req.validationErrors();

  //     const detail = await SubscriptionPackageservice.addSubscriptiondetails(
  //       req.body
  //     );

  //     if (errors) {
  //       return responseHandler.errorResponse(
  //         res,
  //         400,
  //         MessageConstant.SOMETHING_WRONG,
  //         []
  //       );
  //     }

  //     if (detail) {
  //       return responseHandler.successResponse(
  //         res,
  //         200,
  //         MessageConstant.SUBSCRIPTION_PACKAGE_ADD,
  //         detail
  //       );
  //     }
  //   } catch (error) {
  //     responseHandler.errorResponse(res, 400, error.message, []);
  //   }
  // }

  async SubscriptionAllDetails(req, res) {
    try {
      const detail = await SubscriptionPackageservice.SubscriptionALLDetails(
        req.body
      );

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.SUCCESS,
        detail
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async SubscriptionView(req, res) {
    try {
      const detail = await SubscriptionPackageservice.SubscriptionView(
        req.params.id
      );

      responseHandler.successResponse(
        res,
        200,
        MessageConstant.SUCCESS,
        detail
      );
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editSubscriptiondetails(req, res) {
    try {
      req
        .checkBody("name")
        .notEmpty()
        .withMessage("Please enter subscription name.");

      req
        .checkBody("monthly_price")
        .notEmpty()
        .withMessage("Please enter monthly_price.");

      req
        .checkBody("yearly_price")
        .notEmpty()
        .withMessage("Please enter yearly_price.");

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      const packageDetails = await SubscriptionPackageservice.SubscriptionView(
        req.params.id
      );

      if (
        packageDetails[0].monthly_price.toString() !== req.body.monthly_price
      ) {
        var month_price_id = await stripe_service.createPrice({
          price: req.body.monthly_price?.toString()?.replace(".", ""),
          type: "month",
          product_id: packageDetails[0].stripe_product_id,
        });

        // const ongoingSubscriptionsArr = await Package.getOngoingSubscriptions(
        //   "Monthly"
        // );
        // var i = 0;
        // while (ongoingSubscriptionsArr.length > i) {
        //   await stripe_service.updateSubscriptionPrice(
        //     ongoingSubscriptionsArr[i].subscription_id,
        //     price_id
        //   );
        //   i++;
        // }
        // req.body.monthly_price_id = price_id;
      }

      if (packageDetails[0].yearly_price.toString() !== req.body.yearly_price) {
        var year_price_id = await stripe_service.createPrice({
          price: parseInt(req.body.yearly_price?.toString()?.replace(".", "")),
          type: "year",
          product_id: packageDetails[0].stripe_product_id,
        });

        // const ongoingSubscriptionsArr = await Package.getOngoingSubscriptions(
        //   "Yearly"
        // );
        // var i = 0;
        // while (ongoingSubscriptionsArr.length > i) {
        //   await stripe_service.updateSubscriptionPrice(
        //     ongoingSubscriptionsArr[i].subscription_id,
        //     price_id
        //   );
        //   i++;
        // }
        // req.body.yearly_price_id = price_id;
      }

      let new_monthly_price_id =
        packageDetails[0].monthly_price !== req.body.monthly_price
          ? month_price_id
          : req.body.monthly_price_id;

      let new_year_price_id =
        packageDetails[0].yearly_price !== req.body.yearly_price
          ? year_price_id
          : req.body.yearly_price_id;

      const detail = await SubscriptionPackageservice.editSubscriptiondetails(
        req.params.id,
        {
          ...req.body,
          monthly_price_id: new_monthly_price_id,
          yearly_price_id: new_year_price_id,
        }
      );

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.SUBSCRIPTION_PACKAGE_UPDATE,
          detail
        );
      }
    } catch (error) {
      console.log(error);
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new SubscriptionPackageController();
