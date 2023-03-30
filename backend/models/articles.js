import { Schema, model } from "mongoose";
const articlesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
});

const articles = model("articles", articlesSchema);

export default articles;
