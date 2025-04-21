import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  category: z.string().min(1).max(50),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  category: z.string().min(1).max(50).optional(),
});
