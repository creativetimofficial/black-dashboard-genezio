import { Schema, model } from "mongoose";
const assignmentsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const assignments = model("assignments", assignmentsSchema);

export default assignments;
