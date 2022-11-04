const SubscriptionPackageModel = require("../../modal/subscriptionPackage");
const Userdao = require("../../dao/userdao");
const responseHandler = require("../../handler/responsehandler");

class SubscriptionPackageservice {
  constructor() {}

  // async addSubscriptiondetails(payload) {
  //   try {
  //     let data = await SubscriptionPackageModel.create({
  //       name: payload.name,
  //       monthly_price: payload.monthly_price,
  //       yearly_price: payload.yearly_price,
  //       package_info: payload.package_info,
  //       is_free: payload.is_free,
  //       monthly_price_id: payload.monthly_price_id,
  //       yearly_price_id: payload.yearly_price_id,
  //       trial_days: payload.trial_days,
  //     });

  //     return data;
  //   } catch (error) {
  //     responseHandler.errorResponse(res, 400, error.message, []);
  //   }
  // }

  async SubscriptionALLDetails() {
    try {
      let data = await SubscriptionPackageModel.find({});

      return data;
    } catch (error) {
      console.log(error);
      // responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async SubscriptionView(id) {
    try {
      let data = await SubscriptionPackageModel.find({ _id: id });

      return data;
    } catch (error) {
      console.log(error);
      // responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editSubscriptiondetails(id, payload) {
    try {
      let data = await Userdao.findAndUpdateSubscriptionDetails(id, {
        payload,
      });

      return data;
    } catch (error) {
      console.log(error);
      // responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new SubscriptionPackageservice();
