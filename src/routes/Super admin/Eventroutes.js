const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Eventcontroller = require("../../controller/Super Admin/Eventcontroller");

const routes = (app) => {
  app.post("/event/add", auth, Eventcontroller.addEventdetails);

  app.get("/event/alldetails", auth, Eventcontroller.getEventDetails);

  app.get("/event/view/:id", auth, Eventcontroller.getEventdetailsbyId);

  app.post("/event/edit/:id", auth, Eventcontroller.editEventdetails);

  app.delete("/event/delete/:id", auth, Eventcontroller.deleteEventdetails);
};

module.exports = routes;
