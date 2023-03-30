import { Schema, model } from "mongoose";
const playlistsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  songIds: {
    type: [String],
    required: false,
  },
});

const playlists = model("playlists", playlistsSchema);

export default playlists;
