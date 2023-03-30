import { Schema, model } from "mongoose";
const ordersSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  productIds: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const orders = model("orders", ordersSchema);

export default orders;
