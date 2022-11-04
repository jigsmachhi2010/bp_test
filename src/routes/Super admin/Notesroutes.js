const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Notescontroller = require("../../controller/Super Admin/Notescontroller");

const routes = (app) => {
  app.post("/notes/add", auth, Notescontroller.addNotedetails);

  app.get("/notes/alldetails", auth, Notescontroller.NoteAllDetails);

  app.post("/notes/edit/:id", auth, Notescontroller.editNotedetails);

  app.get("/notes/view/:id", auth, Notescontroller.viewNotedetails);

  app.delete("/notes/delete/:id", auth, Notescontroller.deleteNotedetails);
};

module.exports = routes;
