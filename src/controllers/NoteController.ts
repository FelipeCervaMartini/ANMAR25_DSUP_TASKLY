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
  async getAllByTaskId(req: Request, res: Response) {
    const taskId = Number(req.params.taskId);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const content = req.query.content as string | undefined;

    try {
      const notes = await this.service.getNotesByTaskId(taskId, {
        page,
        limit,
        content,
      });
      return res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    try {
      const note = await this.service.getNoteById(id);

      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      return res.status(200).json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid note ID" });

    try {
      const note = await this.service.updateNote(id, req.body);
      return res.status(200).json(note);
    } catch (error: any) {
      if (error.type === "validation") {
        return res.status(400).json({ error: error.details });
      }
      if (error.type === "not_found") {
        return res.status(404).json({ error: error.message });
      }
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    try {
      await this.service.deleteNote(id);
      return res.status(200).json({ message: "Note deleted" });
    } catch (error: any) {
      if (error.type === "not_found") {
        return res.status(404).json({ error: error.message });
      }

      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
