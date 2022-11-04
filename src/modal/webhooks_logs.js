const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WebhookLogsSchema = new Schema({
  event: {
    type: String,
    trim: true,
  },
  res: {
    type: Text,
    trim: true,
  },
});

module.exports = mongoose.model(
  "Webhooklogs",
  WebhookLogsSchema
);
