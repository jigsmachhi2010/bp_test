const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Tasktypecontroller = require("../../controller/Super Admin/Tasktypecontroller");
const Taskliststatuscontroller = require("../../controller/Super Admin/Taskliststatuscontroller");

const routes = (app) => {
  app.post(
    "/tasklist_status/add",
    auth,
    Taskliststatuscontroller.addTaskliststatusdetails
  );

  app.get(
    "/tasklist_status/alldetails",
    auth,
    Taskliststatuscontroller.TaskliststatusAllDetails
  );

  app.post(
    "/tasklist_status/edit/:id",
    auth,
    Taskliststatuscontroller.editTaskliststatusdetails
  );

  app.get(
    "/tasklist_status/view/:id",
    auth,
    Taskliststatuscontroller.viewTaskliststatusdetails
  );

  app.delete(
    "/tasklist_status/delete/:id",
    auth,
    Taskliststatuscontroller.deleteTaskliststatusdetails
  );
};

module.exports = routes;
