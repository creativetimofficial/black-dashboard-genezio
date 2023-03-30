import { Schema, model } from "mongoose";
const departmentsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const departments = model("departments", departmentsSchema);

export default departments;
