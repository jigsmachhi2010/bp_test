const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  event_name: {
    type: String,
    trim: true,
  },
  event_start: {
    type: Date,
  },
  event_end: {
    type: Date,
  },
  event_description: {
    type: String,
    trim: true,
  },
  event_color: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
EventSchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

module.exports = mongoose.model(
  "Event_superadmin",
  EventSchema
);
