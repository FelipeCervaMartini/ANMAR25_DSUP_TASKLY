import { PrismaClient, Task } from "@prisma/client";
const prisma = new PrismaClient();

export class TaskRepository {
  async create(data: Omit<Task, "id" | "createdAt" | "updatedAt" | "notes">) {
    return await prisma.task.create({ data });
  }
}
