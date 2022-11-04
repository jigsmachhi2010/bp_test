const SubscriptionPackageModel = require("../../modal/subscriptionPackage");
const Userdao = require("../../dao/userdao");
const subject = require("../../modal/subject");
const subjectdao = require("../../dao/subjectdao");

class SubscriptionPackageservice {
  constructor() {}

  async addSubjectdetails(payload) {
    try {
      let data = await subject.create({
        subject_name: payload.subject_name,
        description: payload.description,
        // yearly_price: payload.yearly_price,
        // package_info: payload.package_info,
        // is_free: payload.is_free,
        // monthly_price_id: payload.monthly_price_id,
        // yearly_price_id: payload.yearly_price_id,
        // trial_days: payload.trial_days,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async SubjectAllDetails() {
    try {
      let data = await subject.find({});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async editSubjectdetails(id, payload) {
    try {
      let data = await subjectdao.findAndUpdateSubject(id, {
        payload,
      });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async viewSubjectdetails(id) {
    try {
      let data = await subject.findById({ _id: id });

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteSubjectdetails(id, payload) {
    try {
      let data = await subjectdao.findAndDeleteSubject(id, {});

      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new SubscriptionPackageservice();
