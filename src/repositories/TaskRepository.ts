import { PrismaClient, Status, Priority, Task } from "@prisma/client";

const prisma = new PrismaClient();

export class TaskRepository {
  async create(data: Omit<Task, "id" | "createdAt" | "updatedAt" | "notes">) {
    return await prisma.task.create({ data });
  }
  async findAll() {
    return prisma.task.findMany({
      include: {
        notes: true,
      },
    });
  }

  async getById(id: number) {
    return await prisma.task.findUnique({
      where: { id },
      include: {
        notes: true,
      },
    });
  }
  async findByStatus(status: Status) {
    return prisma.task.findMany({
      where: { status },
      include: {
        notes: true,
      },
    });
  }

  async delete(id: number) {
    return await prisma.task.delete({
      where: { id },
    });
  }
  async update(id: number, data: any) {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }
  async findAllWithFilters(filters: {
    title?: string;
    status?: Status;
    priority?: Priority;
  }) {
    return prisma.task.findMany({
      where: {
        ...(filters.title && {
          title: {
            contains: filters.title,
          },
        }),
        ...(filters.status && {
          status: filters.status,
        }),
        ...(filters.priority && {
          priority: filters.priority,
        }),
      },
      include: { notes: true },
    });
  }
  async findPaginated(skip: number, take: number) {
    return prisma.task.findMany({
      skip,
      take,
      include: {
        notes: true,
      },
      orderBy: {
        priority: "desc",
      },
    });
  }
}
