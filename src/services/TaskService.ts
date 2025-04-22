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
    const task = await this.repository.getById(id);
    if (!task) throw { type: "not_found" };
    return task;
  }
  async getTasksByStatus(status: string, page: number, limit: number) {
    if (!Object.values(Status).includes(status as Status)) {
      throw {
        type: "validation",
        details: { status: [{ message: "Invalid status value" }] },
      };
    }
    const skip = (page - 1) * limit;
    return this.repository.findByStatus(status as Status, skip, limit);
  }

  async deleteTask(id: number) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw { type: "not_found" };
    return deleted;
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
    filters: {
      title?: string;
      status?: Status;
      priority?: Priority;
      description?: string;
      category?: string;
    },

    page: number,
    limit: number,
    orderByPriority?: boolean
  ) {
    return this.repository.findWithFiltersAndPagination(
      filters,
      page,
      limit,
      orderByPriority
    );
  }
}
