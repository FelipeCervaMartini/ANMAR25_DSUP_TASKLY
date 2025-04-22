import { TaskRepository } from "../repositories/TaskRepository";
import { createTaskSchema } from "../validators/task.schema";
import { updateTaskSchema } from "../validators/task.schema";
import { Status, Priority } from "@prisma/client";

export class TaskService {
  private repository = new TaskRepository();

  async createTask(input: unknown) {
    const parse = createTaskSchema.safeParse(input);

    if (!parse.success) {
      throw { type: "validation", details: parse.error.format() };
    }

    const data = {
      ...parse.data,
      status: parse.data.status ?? "TODO",
      priority: parse.data.priority ?? "MEDIUM",
    };

    return this.repository.create(data);
  }

  async getAllTasks() {
    return await this.repository.findAll();
  }

  async getTaskById(id: number) {
    return await this.repository.getById(id);
  }
  async getTasksByStatus(status: string) {
    if (!Object.values(Status).includes(status as Status)) {
      throw new Error("Invalid status");
    }
    return this.repository.findByStatus(status as Status);
  }

  async deleteTask(id: number) {
    return await this.repository.delete(id);
  }
  async updateTask(id: number, input: unknown) {
    const parse = updateTaskSchema.safeParse(input);

    if (!parse.success) {
      throw { type: "validation", details: parse.error.format() };
    }

    const existing = await this.repository.getById(id);
    if (!existing) {
      return null;
    }

    return await this.repository.update(id, parse.data);
  }
  async getTasksWithFiltersAndPagination(
    filters: { title?: string; status?: Status; priority?: Priority },
    page: number,
    limit: number
  ) {
    return this.repository.findWithFiltersAndPagination(filters, page, limit);
  }
}
