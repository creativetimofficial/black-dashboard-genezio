import { Schema, model } from "mongoose";
const rolesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const roles = model("roles", rolesSchema);

export default roles;
