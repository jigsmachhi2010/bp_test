const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const SubscriptionPackagecontroller = require("../../controller/Super Admin/SubscriptionPackagecontroller");

const routes = (app) => {
  // app.post(
  //   "/subscription-package/add",
  //   auth,
  //   SubscriptionPackagecontroller.addSubscriptiondetails
  // );

  app.get(
    "/subscription-package/alldetails",
    auth,
    SubscriptionPackagecontroller.SubscriptionAllDetails
  );

  app.get(
    "/subscription-package/view/:id",
    auth,
    SubscriptionPackagecontroller.SubscriptionView
  );

  app.post(
    "/subscription-package/edit/:id",
    auth,
    SubscriptionPackagecontroller.editSubscriptiondetails
  );
};

module.exports = routes;
