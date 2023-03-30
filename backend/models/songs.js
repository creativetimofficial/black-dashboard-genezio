import { Schema, model } from "mongoose";
const songsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  aparitionYear: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
});

const songs = model("songs", songsSchema);

export default songs;
