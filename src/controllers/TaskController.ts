import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  constructor(private service = new TaskService()) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const task = await this.service.createTask(req.body);
      return res.status(201).json(task);
    } catch (error: any) {
      if (error.type === "validation") {
        return res.status(400).json({ error: error.details });
      }

      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const tasks = await this.service.getAllTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    try {
      const task = await this.service.getTaskById(id);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
