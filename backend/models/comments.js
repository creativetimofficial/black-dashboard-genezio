import { Schema, model } from "mongoose";
const commentsSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
});

const comments = model("comments", commentsSchema);

export default comments;
