import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
  private repository = new TaskRepository();

  async createTask(data: any) {
    return await this.repository.create(data);
  }
}
