const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskTypeSchema = new Schema({
  task_type: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    default: "",
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
TaskTypeSchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

module.exports = mongoose.model("Task_types", TaskTypeSchema);
