import { Schema, model } from "mongoose";
const CommentSchema = new Schema({
  userId: {
    type: String,
  },
  videoId: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  course: {
    type: Schema.ObjectId,
    ref: "Course",
    required: true,
  },
});

export let CommentModel = model("comments", CommentSchema);
