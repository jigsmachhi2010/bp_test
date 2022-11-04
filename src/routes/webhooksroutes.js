var WebhookController = require("../controller/WebhookController");

const routes = (app) => {
  app.post("/webhook", WebhookController.index);
};

module.exports = routes;
