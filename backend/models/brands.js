import { Schema, model } from "mongoose";
const brandsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  photoLink: {
    type: String,
    required: false,
  },
  websiteLink: {
    type: String,
    required: false,
  },
});

const brands = model("brands", brandsSchema);

export default brands;
