const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Subjectcontroller = require("../../controller/Super Admin/Subjectcontroller");

const routes = (app) => {
  app.post("/subject/add", auth, Subjectcontroller.addSubjectdetails);

  app.get("/subject/alldetails", auth, Subjectcontroller.SubjectAllDetails);

  app.post("/subject/edit/:id", auth, Subjectcontroller.editSubjectdetails);

  app.get("/subject/view/:id", auth, Subjectcontroller.viewSubjectdetails);

  app.delete(
    "/subject/delete/:id",
    auth,
    Subjectcontroller.deleteSubjectdetails
  );
};

module.exports = routes;
