import { Schema, model } from "mongoose";
const tasksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  madeBy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const tasks = model("tasks", tasksSchema);

export default tasks;
