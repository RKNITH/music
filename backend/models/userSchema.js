import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  playLists: [
    {
      listName: { type: String, required: true, trim: true },
      state: { type: Boolean, default: false },
      songs: [ { type: mongoose.Schema.Types.ObjectId, ref: "Song" } ],
    },
  ],
});


export default mongoose.model("User", userSchema);