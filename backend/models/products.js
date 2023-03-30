import { Schema, model } from "mongoose";
const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoLink: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brandId: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  warehouseCode: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
});

const products = model("products", productsSchema);

export default products;
