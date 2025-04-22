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
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const title = req.query.title
        ? (req.query.title as string).toLowerCase()
        : undefined;
      const description = req.query.description
        ? (req.query.description as string).toLowerCase()
        : undefined;
      const category = req.query.category
        ? (req.query.category as string).toLowerCase()
        : undefined;
      const status = req.query.status
        ? (req.query.status as string).toUpperCase()
        : undefined;
      const priority = req.query.priority
        ? (req.query.priority as string).toUpperCase()
        : undefined;
      const orderBy = req.query.orderBy;

      const filters = {
        title: title as string,
        description: description as string,
        category: category as string,
        status: status as Status,
        priority: priority as Priority,
      };
      const orderByPriority = orderBy === "priority";

      const tasks = await this.service.getTasksWithFiltersAndPagination(
        filters,
        page,
        limit,
        orderByPriority
      );

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const tasks = await this.service.getTasksByStatus(
        status as Status,
        page,
        limit
      );
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
