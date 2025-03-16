import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type: String,
    required: true,
    trim: true,
  },
  artistName: {
    type: String,
    required: true,
    trim: true,
  },
  album: {
    type: String,
    required: true,
    trim: true,
  },
});
 