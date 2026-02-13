import mongoose from "mongoose";
// Create a schema
// Create a model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //createAT, updatedAT
  },
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
