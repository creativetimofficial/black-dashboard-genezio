import { Schema, model } from "mongoose";

const activeSessionSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const activeSession = model("ActiveSession", activeSessionSchema);

export default activeSession;
