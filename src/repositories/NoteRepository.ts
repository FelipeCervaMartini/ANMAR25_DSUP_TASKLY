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

  async findByTaskId(
    taskId: number,
    params: { page: number; limit: number; content?: string }
  ) {
    const { page, limit, content } = params;

    const skip = (page - 1) * limit;

    return prisma.note.findMany({
      where: {
        taskId,
        ...(content && {
          content: {
            contains: content,
          },
        }),
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async findById(id: number) {
    return prisma.note.findUnique({
      where: { id },
    });
  }
  async update(id: number, data: { content: string }) {
    return prisma.note.update({
      where: { id },
      data,
    });
  }
  async delete(id: number) {
    return prisma.note.delete({
      where: { id },
    });
  }
}
