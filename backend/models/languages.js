import { Schema, model } from "mongoose";
const languagesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isoCode: {
    type: String,
    required: true,
  },
});

const languages = model("languages", languagesSchema);

export default languages;
