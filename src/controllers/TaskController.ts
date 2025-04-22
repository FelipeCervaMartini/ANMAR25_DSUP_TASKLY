import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { Status, Priority } from "@prisma/client";

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const tasks = await this.service.getPaginatedTasks(page, limit);
    return res.status(200).json(tasks);

    try {
      const { title, status, priority } = req.query;

      const tasks = await this.service.getTasksWithFilters({
        title: title as string,
        status: status as Status,
        priority: priority as Priority,
      });

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
  async getByStatus(req: Request, res: Response) {
    const status = req.params.status?.toUpperCase();

    if (!["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    try {
      const tasks = await this.service.getTasksByStatus(status);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    try {
      await this.service.deleteTask(id);
      return res.status(204).send();
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    try {
      const updated = await this.service.updateTask(id, req.body);

      if (!updated) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json(updated);
    } catch (error: any) {
      if (error.type === "validation") {
        return res.status(400).json({ error: error.details });
      }

      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
