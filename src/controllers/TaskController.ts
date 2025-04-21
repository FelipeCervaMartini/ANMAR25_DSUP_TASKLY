import { Request, Response } from "express";
import { createTaskSchema } from "../validators/task.schema";
import { TaskService } from "../services/TaskService";

export class TaskController {
  constructor(private service = new TaskService()) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response) {
    const parse = createTaskSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format() });
    }

    try {
      const task = await this.service.createTask(parse.data);
      return res.status(201).json(task);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
