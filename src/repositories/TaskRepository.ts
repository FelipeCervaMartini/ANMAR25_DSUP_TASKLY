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
  async findByStatus(status: Status, skip: number, take: number) {
    return prisma.task.findMany({
      where: { status },
      include: { notes: true },
      skip,
      take,
      orderBy: {
        priority: "desc",
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
  async findWithFiltersAndPagination(
    filters: {
      title?: string;
      description?: string;
      category?: string;
      status?: Status;
      priority?: Priority;
    },
    page: number,
    limit: number,
    orderByPriority?: boolean
  ) {
    const skip = (page - 1) * limit;

    return prisma.task.findMany({
      where: {
        ...(filters.title && {
          title: {
            contains: filters.title,
          },
        }),
        ...(filters.description && {
          description: {
            contains: filters.description,
          },
        }),
        ...(filters.category && {
          category: {
            contains: filters.category,
          },
        }),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
      },
      include: { notes: true },
      take: limit,
      skip: skip,
      orderBy: orderByPriority ? { priority: "desc" } : { id: "asc" },
    });
  }
}
