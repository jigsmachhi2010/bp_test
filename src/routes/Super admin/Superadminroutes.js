const Superadmincontroller = require("../../controller/Super Admin/Superadmincontroller");
const auth = require("../../middleware/auth");
const { upload } = require("../../middleware/multer");

const routes = (app) => {
  app.post("/api/v1/superadminlogin", Superadmincontroller.superadminlogin);

  app.get(
    "/api/v1/superadminlogout",
    auth,
    Superadmincontroller.superadminlogout
  );

  app.get(
    "/api/v1/superadmin/profile",
    auth,
    Superadmincontroller.get_superadmin_profile
  );

  app.put(
    "/api/v1/superadmin/editprofile",
    auth,
    upload.single("logo"),
    Superadmincontroller.update_admin_profile
  );

  app.post(
    "/api/v1/superadmin/change-password",
    auth,
    Superadmincontroller.change_password
  );

  app.post(
    "/api/v1/superadmin/resetpassword",
    Superadmincontroller.resetpassword
  );

  app.post(
    "/api/v1/superadmin/forgetpassword",
    Superadmincontroller.superadminforgetpassword
  );

  //   app.get(
  //     "/api/v1/AdminCheckActiveSession",
  //     passport.authenticate("user-authorization", {
  //       session: false,
  //     }),
  //     Usercontroller.AdminCheckActiveSession
  //   );
};

module.exports = routes;
