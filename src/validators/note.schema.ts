import { z } from "zod";

export const createNoteSchema = z.object({
  content: z.string().min(1, "Note content is required").max(1000),
});

export const updateNoteSchema = z.object({
  content: z.string().min(1).max(1000),
});
