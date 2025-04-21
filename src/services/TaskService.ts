import { TaskRepository } from "../repositories/TaskRepository";
import { createTaskSchema } from "../validators/task.schema";

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
}
