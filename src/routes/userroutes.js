const mongoose = require("mongoose");
const Usercontroller = require("../controller/Usercontroller");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

const routes = (app) => {
  app.post("/user/register", Usercontroller.userRegister);

  app.post("/user/login", Usercontroller.userLogin);

  app.get("/user/logout", auth, Usercontroller.userLogout);

  app.get("/user/getAll", auth, Usercontroller.getUserProfile);

  app.put(
    "/user/editDetails/:id",
    auth,
    upload.single("logo"),
    Usercontroller.updateUserProfile
  );

  app.post("/user/change-password", auth, Usercontroller.changePassword);

  app.post("/user/resetpassword", Usercontroller.resetPassword);

  app.post("/user/forgetpassword", Usercontroller.forgetPassword);
};

module.exports = routes;
