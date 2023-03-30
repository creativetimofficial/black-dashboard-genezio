import { Schema, model } from "mongoose";
const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  photoLink: {
    type: String,
    required: false,
  },
  numberOfPages: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  aparitionYear: {
    type: String,
    required: true,
  },
});

const books = model("books", booksSchema);

export default books;
