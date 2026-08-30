import { z } from "zod";

export const noteSchema = z.object({
    title: z
    .string()
    .trim()
    .max(300, "Title should not exceeds 300 characters"),
    description: z
    .string()
    .min(1, "Descripion should at least be 1 character")
    .max(3000, "Description should not exceeds 3000 characters")
    .optional(),
    status: z
    .enum(["pending", "in_progress", "completed"])
    .default("pending"),
    priority: z
    .enum(["low", "medium", "high"])
    .default("low")
});

export const getNoteSchema = z.object({
    status: z
    .enum(["pending", "in_progress", "completed"])
    .optional(),
    priority: z
    .enum(["low", "medium", "high"])
    .optional(),
    date: z
    .string()
    .optional()
});

export const updateNoteSchema = z.object({
    title: z
    .string()
    .trim()
    .max(300, "Title should not excceds 300 characters")
    .optional(),
    description: z
    .string()
    .max(3000, "Description should not exceeds 3000 characters")
    .optional(),
    status: z
    .enum(["pending", "in_progress", "completed"])
    .optional(),
    priority: z
    .enum(["low", "medium", "high"])
    .optional()
}) 

export type NoteInput = z.infer<typeof noteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;

