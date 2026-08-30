import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, getAllNotes, getSingleNote, updateNote } from "../controllers/note.controller.js";
import { updateNoteSchema } from "../validations/note.validations.js";

const router = Router();

router.get("/notes", protect, getAllNotes);
router.get("/note/:id", protect, getSingleNote);
router.post("/note", protect, createNote);
router.put("/note/:id", protect, updateNote);
router.delete("/note/:id", protect, deleteNote);

export default router;