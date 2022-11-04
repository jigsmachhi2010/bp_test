const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskListStatusSchema = new Schema({
  tasklist_status: {
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
TaskListStatusSchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

module.exports = mongoose.model("Task_list_status", TaskListStatusSchema);
