import { Schema, model } from "mongoose";
const employeesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
});

const employees = model("employees", employeesSchema);

export default employees;
