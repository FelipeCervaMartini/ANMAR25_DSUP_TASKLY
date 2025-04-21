import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TaskRepository {
  async create(data: any) {
    return await prisma.task.create({ data });
  }
}
