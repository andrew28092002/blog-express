import { Schema, model } from "mongoose";

const postSchema = new Schema({
  author: { type: String, required: true, ref: 'User' },
  message: { type: String, required: true },
  media: {type: [String]},
  createdAt: { type: Date, default: Date.now() },
});

export default model("Post", postSchema);