import { Schema, model } from "mongoose";
const destinationsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  googleMapsLink: {
    type: String,
    required: true,
  },
  photoLink: {
    type: String,
    required: true,
  },
});

const destinations = model("destinations", destinationsSchema);

export default destinations;
