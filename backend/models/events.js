import { Schema, model } from "mongoose";
const eventsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  organiser: {
    type: String,
    required: true,
  },
});

const events = model("events", eventsSchema);

export default events;
