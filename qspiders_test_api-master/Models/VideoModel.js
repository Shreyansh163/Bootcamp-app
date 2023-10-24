import { Schema, model } from "mongoose";
const VideoSchema = new Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  imgUrl: {
    type: [String],
  },
  videoUrl: {
    type: [String],
  },

  views: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  course: {
    type: Schema.ObjectId,
    ref: "Course",
    required: true,
  },
});

export let VideoModel = model("video", VideoSchema);
