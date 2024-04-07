import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  to: String,
  from: String,
  message: String,
  time: String,
});

export const Message = mongoose.model("Message", MessageSchema);
