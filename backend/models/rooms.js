import { Schema, model } from "mongoose";
const roomsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

const rooms = model("rooms", roomsSchema);

export default rooms;
