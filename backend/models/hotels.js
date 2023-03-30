import { Schema, model } from "mongoose";
const hotelsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  websiteLink: {
    type: String,
    required: false,
  },
  photoLink: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const hotels = model("hotels", hotelsSchema);

export default hotels;
