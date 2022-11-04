const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Tasktypecontroller = require("../../controller/Super Admin/Tasktypecontroller");

const routes = (app) => {
  app.post("/task_type/add", auth, Tasktypecontroller.addTasktypedetails);

  app.get("/task_type/alldetails", auth, Tasktypecontroller.TasktypeAllDetails);

  app.post("/task_type/edit/:id", auth, Tasktypecontroller.editTasktypedetails);

  app.get("/task_type/view/:id", auth, Tasktypecontroller.viewTasktypedetails);

  app.delete(
    "/task_type/delete/:id",
    auth,
    Tasktypecontroller.deleteTasktypedetails
  );
};

module.exports = routes;
