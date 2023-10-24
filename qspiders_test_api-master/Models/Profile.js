import { Schema, model } from "mongoose";
const ProfileSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  dob: {
    type: String,
    required: [true, "date of birth is required"],
  },
  phone: {
    // type: Number,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "others"],
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  bio: {
    type: String,
  },
  education: {
    type: String,
  },
});

export let ProfileModel = model("profile", ProfileSchema);
