import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class NoteRepository {
  async create(taskId: number, content: string) {
    return prisma.note.create({
      data: {
        taskId,
        content,
      },
    });
  }

  async findByTaskId(taskId: number) {
    return prisma.note.findMany({
      where: { taskId },
    });
  }
}
