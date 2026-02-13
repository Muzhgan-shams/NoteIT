import Note from "../models/Note.js";
import mongoose from "mongoose";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error getting all notes", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
}
export async function getNote(req, res) {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) res.status(404).json({ message: "Not found" });
    return res.json(note);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content }); // Since both are the same({title: title, content: content})
    const note = await newNote.save();
    res.status(201).json({ note }); // json() here: serializes and sends, We could also send {message: "Note created successfully"}
  } catch (error) {
    console.error("Error creating note", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const id = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Fetch the note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note was not found" });
    }

    // Build an update object only with provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    // Check if nothing actually changed
    const noTitleChange = title === undefined || note.title === title;
    const noContentChange = content === undefined || note.content === content;

    if (noTitleChange && noContentChange) {
      return res.status(200).json({ message: "No changes detected" });
    }

    // Perform update
    const updatedNote = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Note was updated successfully!",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    // const { title, content } = req.body;
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return res
        .status(404)
        .json({ message: `Note with the id of ${id} was not found` });
    }
    return res.status(200).json({
      success: true,
      message: "Note was deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    console.error("Error updating note", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
