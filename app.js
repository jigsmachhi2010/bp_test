const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
var cors = require("cors");
require("dotenv").config();
const initialdbAdmin = require("./src/initialdb/Adminuser");
const http = require("http");
const path = require("path");

app.use(expressValidator());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(cors());
app.use("/uploads", express.static(__dirname.replace("/src", "") + "/uploads"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, User-Agent, Accept-Encoding, Content-Length"
  );
  next();
});

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.domainURL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  // getApiAndEmit(socket, `You have a new message from`);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

initialdbAdmin.createAdminuser();

require("./src/routes/userroutes")(app);
require("./src/routes/Super admin/Superadminroutes")(app);
require("./src/routes/Super admin/SubscriptionPackageroutes")(app);
require("./src/routes/Super admin/SubjectRoutes")(app);
require("./src/routes/Super admin/Eventroutes")(app);
require("./src/routes/Super admin/Tasktyperoutes")(app);
require("./src/routes/Super admin/Tasklistroutes")(app);
require("./src/routes/Super admin/Graderoutes")(app);
require("./src/routes/Super admin/Notesroutes")(app);
require("./src/routes/Super admin/Documentroutes")(app);

app.use("/", express.static(__dirname.replace("/src", "") + "/Public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname.replace("/src", ""), "Public/index.html"));
});

app.use("/", express.static(__dirname.replace("/src", "") + "/Public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname.replace("/src", ""), "Public/index.html"));
});

module.exports = app;
