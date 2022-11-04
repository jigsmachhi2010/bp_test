const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Gradecontroller = require("../../controller/Super Admin/Gradecontroller");

const routes = (app) => {
  app.post("/grade/add", auth, Gradecontroller.addGradedetails);

  app.get("/grade/alldetails", auth, Gradecontroller.GradeAllDetails);

  app.post("/grade/edit/:id", auth, Gradecontroller.editGradedetails);

  app.get("/grade/view/:id", auth, Gradecontroller.viewGradedetails);

  app.delete("/grade/delete/:id", auth, Gradecontroller.deleteGradedetails);
};

module.exports = routes;
