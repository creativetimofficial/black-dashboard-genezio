import { Schema, model } from "mongoose";
const reviewsSchema = new Schema({
  stars: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const reviews = model("reviews", reviewsSchema);

export default reviews;
