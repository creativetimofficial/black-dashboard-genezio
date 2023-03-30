import { Schema, model } from "mongoose";
const countriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const countries = model("countries", countriesSchema);

export default countries;
