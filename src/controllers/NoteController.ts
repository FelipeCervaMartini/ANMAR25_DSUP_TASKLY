import { Request, Response } from "express";
import { NoteService } from "../services/NoteService";

export class NoteController {
  constructor(private service = new NoteService()) {}

  async create(req: Request, res: Response) {
    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    try {
      const note = await this.service.createNote(taskId, req.body);
      return res.status(201).json(note);
    } catch (error: any) {
      if (error.type === "validation") {
        return res.status(400).json({ error: error.details });
      }

      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
