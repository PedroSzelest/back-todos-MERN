import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  check: {
    type: Boolean,
    default: false,
  },
});

var TodoMessage = mongoose.model("TodoMessage", todoSchema);

export default TodoMessage;
