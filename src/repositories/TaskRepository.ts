import { PrismaClient, Task } from "@prisma/client";
const prisma = new PrismaClient();

export class TaskRepository {
  async create(data: Omit<Task, "id" | "createdAt" | "updatedAt" | "notes">) {
    return await prisma.task.create({ data });
  }
  async findAll() {
    return await prisma.task.findMany();
  }
  async getById(id: number) {
    return await prisma.task.findUnique({
      where: { id },
    });
  }
}
