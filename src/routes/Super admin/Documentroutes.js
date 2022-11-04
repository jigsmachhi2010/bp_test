const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Tasktypecontroller = require("../../controller/Super Admin/Tasktypecontroller");
const Documentcontroller = require("../../controller/Super Admin/Documentcontroller");
const { upload } = require("../../middleware/multer");

const routes = (app) => {
  app.post(
    "/document/add",
    auth,
    upload.single("document_files"),
    Documentcontroller.addDocumentdetails
  );

  app.get("/document/alldetails", auth, Documentcontroller.documentAllDetails);

  app.post(
    "/document/edit/:id",
    auth,
    upload.single("document_files"),
    Documentcontroller.editDocumentdetails
  );

  app.get("/document/view/:id", auth, Documentcontroller.viewDocumentdetails);

  app.delete(
    "/document/delete/:id",
    auth,
    Documentcontroller.deleteDocumentdetails
  );
};

module.exports = routes;
